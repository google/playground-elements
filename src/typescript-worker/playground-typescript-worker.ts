/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {TypeScriptWorkerAPI, SampleFile} from '../shared/worker-api.js';
import {expose} from 'comlink';
import * as ts from 'typescript';

const compilerOptions = {
  target: ts.ScriptTarget.ES2017,
  module: ts.ModuleKind.ESNext,
  experimentalDecorators: true,
  skipDefaultLibCheck: true,
  skipLibCheck: true,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
};

/**
 * Rewrites bare module specifiers to unpkg.com URLs. For now, uses unpkg.com
 * module resolution from there on. We might want to change this and do all
 * rewrites ourselves to ensure less module duplication.
 */
const makeBareSpecifierTransformVisitor = (
  context: ts.TransformationContext
): ts.Visitor => {
  const visitor: ts.Visitor = (node) => {
    if (ts.isImportDeclaration(node)) {
      const specifier = (node.moduleSpecifier as ts.StringLiteral).text;
      const {type, url} = resolveSpecifier(specifier, self.origin);
      if (type === 'bare') {
        const newNode = ts.getMutableClone(node);
        (newNode as {
          moduleSpecifier: ts.ImportDeclaration['moduleSpecifier'];
        }).moduleSpecifier = ts.createStringLiteral(url + '?module');
        return newNode;
      }
    }
    return ts.visitEachChild(node, visitor, context);
  };
  return visitor;
};

const transformers: ts.CustomTransformers = {
  after: [
    (context: ts.TransformationContext) => <T extends ts.Node>(node: T) => {
      return ts.visitNode(node, makeBareSpecifierTransformVisitor(context));
    },
  ],
};

const workerAPI: TypeScriptWorkerAPI = {
  /**
   * Compiles a project, returning a Map of compiled file contents. The map only
   * contains context for files that are compiled. Other files are skipped.
   *
   * TODO (justinfagnani): This does a new compilation for each call, we should
   * keep the Program in memory and accept updates to the files to do
   * incremental compilation. We could also share a DocumentRegistry across
   * multiple <playground-project> instances to save memory and type analysis of
   * common lib files like lit-element, lib.d.ts and dom.d.ts.
   */
  async compileProject(files: Array<SampleFile>) {
    const loadedFiles = await loadFiles(files);
    const languageServiceHost = new WorkerLanguageServiceHost(
      loadedFiles,
      self.origin,
      compilerOptions
    );
    const languageService = ts.createLanguageService(
      languageServiceHost,
      ts.createDocumentRegistry()
    );
    const program = languageService.getProgram();
    const emittedFiles = new Map<string, string>();
    for (const file of files) {
      // Request an emit for ach TypeScritp file
      if (file.name.endsWith('.ts')) {
        const url = new URL(file.name, self.origin).href;
        const sourceFile = program!.getSourceFile(url);
        program!.emit(
          sourceFile,
          (fileName: string, data: string) => {
            emittedFiles.set(fileName, data);
          },
          undefined,
          undefined,
          transformers
        );
      }
    }
    return emittedFiles;
  },
};
expose(workerAPI);

type ResolvedFileRecord = {
  status: 'resolved';
  originalUrl?: string;
  content: string;
  // contentType: string;
};
type RedirectedFileRecord = {
  status: 'redirected';
  redirectedUrl: string;
};
type PendingFileRecord = {
  status: 'pending';
};
type FileRecord = PendingFileRecord | ResolvedFileRecord | RedirectedFileRecord;

/**
 * Loads source files and their imports. Returns a Map of FileRecords, with
 * entries for the given source files and other source files in the module graph.
 *
 * Also includes entries for the expected output of compilation, ie a .ts source
 * file will have entries for the .ts source and a redirect entry for the .js
 * file so that imports of the .js file are mapped back to the .ts file like in
 * tsc.
 *
 * Note that this loader is not recursive yet - it only loads the direct
 * dependencies of the source files, and relies on unpkg.com for transitive
 * dependencies to load in the preview iframe. In order to enable propert type
 * checking we will load the entire module graph here.
 */
const loadFiles = (
  files: Array<SampleFile>
): Promise<Map<string, FileRecord>> => {
  return new Promise(async (resolve, _reject) => {
    const fileRecords = new Map<string, FileRecord>();

    // Prime the file map with the sample files so they're marked as already
    // loaded.
    for (const file of files) {
      // TODO: include session/scope id?
      const url = new URL(file.name, self.origin).href;

      // .ts files are imported with .js extensions. Since we aim to redirect
      // .js imports to either .ts or .d.ts files when available, we add a
      // redirect for the .js extension.
      // TODO (justinfagnani): handle .d.ts files
      if (url.endsWith('.ts')) {
        const redirectedUrl = changeExtension(url, 'js');

        // Redirect .js -> .ts
        fileRecords.set(redirectedUrl, {
          status: 'redirected',
          redirectedUrl: url,
        });

        // .ts has the content
        fileRecords.set(url, {
          status: 'resolved',
          originalUrl: redirectedUrl,
          content: file.content,
        });
      } else {
        fileRecords.set(url, {
          status: 'resolved',
          content: file.content,
        });
      }
    }

    let pendingFileCount = 0;

    // For each file, fetch its imports
    for (const file of files) {
      if (file.name.endsWith('.ts')) {
        const referrerUrl = new URL(file.name, self.origin);
        const preProcessedFile = ts.preProcessFile(
          file.content,
          undefined,
          true
        );

        for (const importedFile of preProcessedFile.importedFiles) {
          const specifier = importedFile.fileName;
          const {type, url} = resolveSpecifier(specifier, referrerUrl);

          if (!fileRecords.has(url)) {
            pendingFileCount++;

            // Synchronously set the file to pending so subsequent imports don't
            // trigger another loading task.
            fileRecords.set(url, {
              status: 'pending',
            });

            // Load a file, but don't block
            (async () => {
              await loadFile(url, type, fileRecords);
              pendingFileCount--;
              if (pendingFileCount === 0) {
                resolve(fileRecords);
              }
            })();
          }
        }
      }
    }
    if (pendingFileCount === 0) {
      resolve(fileRecords);
    }
  });
};

// Async task to load the imported file
const loadFile = async (
  url: string,
  type: ResolvedSpecifier['type'],
  fileRecords: Map<string, FileRecord>
) => {
  const response = await fetch(url);

  if (type === 'bare') {
    // Fetch any types. Doesn't yet look in package.json
    const resolvedUrl = new URL(response.url);
    if (resolvedUrl.pathname.endsWith('.js')) {
      const typesUrl = new URL(resolvedUrl.href);
      typesUrl.pathname = changeExtension(resolvedUrl.pathname, 'd.ts');
      const typesResponse = await fetch(resolvedUrl.href);
      if (typesResponse.ok) {
        // TODO: store both .js and .d.ts content?
        // TODO: store original file and types in same file record?
        // Redirects .js -> .d.ts
        fileRecords.set(url, {
          status: 'redirected',
          redirectedUrl: typesUrl.href,
        });
        fileRecords.set(typesUrl.href, {
          status: 'resolved',
          content: await typesResponse.text(),
        });
      } else {
        fileRecords.set(url, {
          status: 'resolved',
          content: await response.text(),
        });
      }
    } else {
      // Dunno what type of file this would be? A CSS import?
      fileRecords.set(url, {
        status: 'resolved',
        content: await response.text(),
      });
    }
  } else {
    // Presumably this isn't an import of a sample file, because
    // it would have been pre-loaded in the file map
    fileRecords.set(url, {
      status: 'resolved',
      content: await response.text(),
    });
  }
};

const changeExtension = (path: string, ext: string) => {
  const lastDotIndex = path.lastIndexOf('.');
  return path.slice(0, lastDotIndex + 1) + ext;
};

const isRelativeOrAbsolutePath = (s: string) =>
  s.match(/^(\.){0,2}\//) !== null;

type ResolvedSpecifier = {
  type: 'url' | 'relative' | 'bare';
  url: string;
};

/**
 * Resolve an import specifier. Uses HTML-spec semantics for URLs and relative
 * paths, and returns an unpkg.com URL for bare-specifiers.
 */
const resolveSpecifier = (
  specifier: string,
  referrer: string | URL
): ResolvedSpecifier => {
  try {
    return {
      type: 'url' as const,
      url: new URL(specifier).href,
    };
  } catch (e) {
    if (isRelativeOrAbsolutePath(specifier)) {
      return {
        type: 'relative' as const,
        url: new URL(specifier, referrer).href,
      };
    }
    return {
      type: 'bare' as const,
      url: `https://unpkg.com/${specifier}`,
    };
  }
};

class WorkerLanguageServiceHost implements ts.LanguageServiceHost {
  readonly compilerOptions: ts.CompilerOptions;
  readonly packageRoot: string;
  readonly files: Map<string, FileRecord>;

  constructor(
    files: Map<string, FileRecord>,
    packageRoot: string,
    compilerOptions: ts.CompilerOptions
  ) {
    this.packageRoot = packageRoot;
    this.compilerOptions = compilerOptions;
    this.files = files;
  }

  getCompilationSettings(): ts.CompilerOptions {
    return this.compilerOptions;
  }

  getScriptFileNames(): string[] {
    return Array.from(this.files.keys());
  }

  getScriptVersion(_fileName: string) {
    return '-1';
  }

  fileExists(fileName: string): boolean {
    return this.files.has(fileName);
  }

  readFile(fileName: string): string | undefined {
    const file = this.files.get(fileName);
    if (file !== undefined && file.status === 'resolved') {
      return file.content;
    }
    return undefined;
  }

  getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined {
    if (!this.fileExists(fileName)) {
      return undefined;
    }
    return ts.ScriptSnapshot.fromString(this.readFile(fileName)!);
  }

  getCurrentDirectory(): string {
    return this.packageRoot;
  }

  getDefaultLibFileName(_options: ts.CompilerOptions): string {
    return '__lib.d.ts';
  }
}
