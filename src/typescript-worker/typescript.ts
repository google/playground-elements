/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ts from '../internal/typescript.js';
import {TypesFetcher} from './types-fetcher.js';
import {ImportMapResolver} from './import-map-resolver.js';

import type * as lsp from 'vscode-languageserver';
import type {SampleFile, BuildOutput} from '../shared/worker-api.js';
import type {PackageJson} from './util.js';
import type {CachingCdn} from './caching-cdn.js';

const compilerOptions = {
  target: ts.ScriptTarget.ES2017,
  module: ts.ModuleKind.ESNext,
  experimentalDecorators: true,
  skipDefaultLibCheck: true,
  skipLibCheck: true,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  lib: ['dom', 'esnext'],
};

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
export class TypeScriptBuilder {
  private readonly _cdn: CachingCdn;
  private readonly _importMapResolver: ImportMapResolver;

  private readonly _languageServiceHost = new WorkerLanguageServiceHost(
    self.origin,
    compilerOptions
  );

  private readonly _languageService = ts.createLanguageService(
    this._languageServiceHost,
    ts.createDocumentRegistry()
  );

  constructor(cdn: CachingCdn, importMapResolver: ImportMapResolver) {
    this._cdn = cdn;
    this._importMapResolver = importMapResolver;
  }

  async *process(
    results: AsyncIterable<BuildOutput> | Iterable<BuildOutput>
  ): AsyncIterable<BuildOutput> {
    let packageJson: PackageJson | undefined;
    const compilerInputs = [];
    for await (const result of results) {
      if (result.kind === 'file' && result.file.name.endsWith('.ts')) {
        compilerInputs.push(result.file);
      } else {
        yield result;
        if (result.kind === 'file' && result.file.name === 'package.json') {
          try {
            packageJson = JSON.parse(result.file.content) as PackageJson;
          } catch (e) {
            // A bit hacky, but BareModuleTransformer already emits a diagnostic
            // for this case, so we don't need another one.
          }
        }
      }
    }

    if (compilerInputs.length === 0) {
      return;
    }

    // Immediately resolve local project files, and begin fetching types (but
    // don't wait for them).
    const loadedFiles = new Map<string, string>();
    const inputFiles = compilerInputs.map((file) => ({
      file,
      url: new URL(file.name, self.origin).href,
    }));

    for (const {file, url} of inputFiles) {
      loadedFiles.set(url, file.content);
    }

    // Sync the new loaded files with the servicehost.
    // If the file is missing, it's added, if the file is modified,
    // the modification data and versioning will be handled by the servicehost.
    // If a file is removed, it will be removed from the file list
    this._languageServiceHost.sync(loadedFiles);

    const program = this._languageService.getProgram();
    if (program === undefined) {
      throw new Error('Unexpected error: program was undefined');
    }

    for (const {file, url} of inputFiles) {
      for (const tsDiagnostic of this._languageService.getSyntacticDiagnostics(
        url
      )) {
        yield {
          kind: 'diagnostic',
          filename: file.name,
          diagnostic: makeLspDiagnostic(tsDiagnostic),
        };
      }
      const sourceFile = program.getSourceFile(url);
      let compiled: SampleFile | undefined = undefined;
      program!.emit(sourceFile, (url, content) => {
        compiled = {
          name: new URL(url).pathname.slice(1),
          content,
          contentType: 'text/javascript',
        };
      });
      if (compiled !== undefined) {
        yield {kind: 'file', file: compiled};
      }
    }

    // Wait for all typings to be fetched, and then retrieve slower semantic
    // diagnostics.
    const typings = await TypesFetcher.fetchTypes(
      this._cdn,
      this._importMapResolver,
      packageJson,
      inputFiles.map((file) => file.file.content),
      compilerOptions.lib
    );
    for (const [path, content] of typings.files) {
      // TypeScript is going to look for these files as paths relative to our
      // source files, so we need to add them to our filesystem with those URLs.
      const url = new URL(`node_modules/${path}`, self.origin).href;
      this._languageServiceHost.updateFileContentIfNeeded(url, content);
    }
    for (const {file, url} of inputFiles) {
      for (const tsDiagnostic of this._languageService.getSemanticDiagnostics(
        url
      )) {
        yield {
          kind: 'diagnostic',
          filename: file.name,
          diagnostic: makeLspDiagnostic(tsDiagnostic),
        };
      }
    }
  }
}

interface VersionedFile {
  version: number;
  content: string;
}

class WorkerLanguageServiceHost implements ts.LanguageServiceHost {
  readonly compilerOptions: ts.CompilerOptions;
  readonly packageRoot: string;
  readonly files: Map<string, VersionedFile> = new Map<string, VersionedFile>();

  constructor(packageRoot: string, compilerOptions: ts.CompilerOptions) {
    this.packageRoot = packageRoot;
    this.compilerOptions = compilerOptions;
  }

  /*
   *  When a new new "process" command is received, we iterate through all of the files,
   *  and update files accordingly depending on if they have new content or not.
   *
   *  With how the TS API works, we can use simple versioning to tell the
   *  Language service that a file has been updated
   *
   *  If the file submitted is a new file, we add it to our collection
   */
  updateFileContentIfNeeded(fileName: string, content: string) {
    const file = this.files.get(fileName);
    if (file && file.content !== content) {
      file.content = content;
      file.version += 1;
    } else {
      this.files.set(fileName, {content, version: 0});
    }
  }

  /**
   * Sync up the freshly acquired project files.
   * In the syncing process files yet to be added are added, and versioned.
   * Files that existed already but are modified are updated, and their version number
   * gets bumped fo that the languageservice knows to update these files.
   * */
  sync(files: Map<string, string>) {
    files.forEach((file, fileName) =>
      this.updateFileContentIfNeeded(fileName, file)
    );
    this._removeDeletedFiles(files);
  }

  private _removeDeletedFiles(files: Map<string, string>) {
    this.getScriptFileNames().forEach((fileName) => {
      if (!files.has(fileName)) {
        this.files.delete(fileName);
      }
    });
  }

  getCompilationSettings(): ts.CompilerOptions {
    return this.compilerOptions;
  }

  getScriptFileNames(): string[] {
    return [...this.files.keys()];
  }

  getScriptVersion(fileName: string) {
    return this.files.get(fileName)?.version.toString() ?? '-1';
  }

  fileExists(fileName: string): boolean {
    return this.files.has(fileName);
  }

  readFile(fileName: string): string | undefined {
    return this.files.get(fileName)?.content;
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

  getDefaultLibFileName(): string {
    return '__lib.d.ts';
  }
}

/**
 * Convert a diagnostic from TypeScript format to Language Server Protocol
 * format.
 */
function makeLspDiagnostic(tsDiagnostic: ts.Diagnostic): lsp.Diagnostic {
  return {
    code: tsDiagnostic.code,
    source: tsDiagnostic.source ?? 'typescript',
    message: ts.flattenDiagnosticMessageText(tsDiagnostic.messageText, '\n'),
    severity: diagnosticCategoryMapping[tsDiagnostic.category],
    range: {
      start:
        tsDiagnostic.file !== undefined && tsDiagnostic.start !== undefined
          ? tsDiagnostic.file.getLineAndCharacterOfPosition(tsDiagnostic.start)
          : {character: 0, line: 0},
      end:
        tsDiagnostic.file !== undefined &&
        tsDiagnostic.start !== undefined &&
        tsDiagnostic.length !== undefined
          ? tsDiagnostic.file.getLineAndCharacterOfPosition(
              tsDiagnostic.start + tsDiagnostic.length
            )
          : {character: 0, line: 0},
    },
  };
}

/**
 * We don't want a runtime import of 'vscode-languageserver' just for the
 * DiagnosticSeverity constants. We can duplicate the values instead, and assert
 * we got them right with a type constraint.
 */
const diagnosticCategoryMapping: {
  [ts.DiagnosticCategory.Error]: typeof lsp.DiagnosticSeverity['Error'];
  [ts.DiagnosticCategory.Warning]: typeof lsp.DiagnosticSeverity['Warning'];
  [ts.DiagnosticCategory.Message]: typeof lsp.DiagnosticSeverity['Information'];
  [ts.DiagnosticCategory.Suggestion]: typeof lsp.DiagnosticSeverity['Hint'];
} = {
  [ts.DiagnosticCategory.Error]: 1,
  [ts.DiagnosticCategory.Warning]: 2,
  [ts.DiagnosticCategory.Message]: 3,
  [ts.DiagnosticCategory.Suggestion]: 4,
};
