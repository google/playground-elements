/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import * as ts from 'typescript';
import {TypesFetcher} from './types-fetcher.js';
import {ModuleResolver} from './module-resolver.js';

import type * as lsp from 'vscode-languageserver';
import type {SampleFile, BuildOutput} from '../shared/worker-api.js';

const compilerOptions = {
  target: ts.ScriptTarget.ES2017,
  module: ts.ModuleKind.ESNext,
  experimentalDecorators: true,
  skipDefaultLibCheck: true,
  skipLibCheck: true,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  allowJs: true,
  // Allow emit of js files despite having the same name as input.
  suppressOutputPathCheck: true,
  lib: ['dom', 'esnext'],
};

/**
 * Rewrites bare module specifiers to unpkg.com URLs. For now, uses unpkg.com
 * module resolution from there on. We might want to change this and do all
 * rewrites ourselves to ensure less module duplication.
 */
const makeBareSpecifierTransformVisitor = (
  context: ts.TransformationContext,
  moduleResolver: ModuleResolver
): ts.Visitor => {
  const visitor: ts.Visitor = (node) => {
    if (ts.isImportDeclaration(node)) {
      const specifier = (node.moduleSpecifier as ts.StringLiteral).text;
      const {type, url} = moduleResolver.resolve(specifier, self.origin);
      if (type === 'bare') {
        const newNode = ts.getMutableClone(node);
        (
          newNode as {
            moduleSpecifier: ts.ImportDeclaration['moduleSpecifier'];
          }
        ).moduleSpecifier = ts.createStringLiteral(url);
        return newNode;
      }
    }
    return ts.visitEachChild(node, visitor, context);
  };
  return visitor;
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
  private _moduleResolver: ModuleResolver;

  constructor(moduleResolver: ModuleResolver) {
    this._moduleResolver = moduleResolver;
  }

  async *process(
    results: AsyncIterable<BuildOutput> | Iterable<BuildOutput>
  ): AsyncIterable<BuildOutput> {
    const compilerInputs = [];
    for await (const result of results) {
      if (result.kind === 'file' && isTsOrJsFile(result.file.name)) {
        compilerInputs.push(result.file);
      } else {
        yield result;
      }
    }

    // Immediately resolve local project files, and begin fetching types (but
    // don't wait for them).
    const loadedFiles = new Map<string, FileRecord>();
    const typesFetcher = new TypesFetcher(this._moduleResolver);
    const inputFiles = compilerInputs.map((file) => ({
      file,
      url: new URL(file.name, self.origin).href,
    }));
    for (const {file, url} of inputFiles) {
      loadedFiles.set(url, {
        status: 'resolved',
        content: file.content,
      });
      typesFetcher.addBareModuleTypings(file.content);
    }
    for (const lib of compilerOptions.lib) {
      typesFetcher.addLibTypings(lib);
    }

    // Fast initial compile for JS emit and syntax errors.
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
    if (program === undefined) {
      throw new Error('Unexpected error: program was undefined');
    }
    const transformers: ts.CustomTransformers = {
      after: [
        (context: ts.TransformationContext) =>
          <T extends ts.Node>(node: T) => {
            return ts.visitNode(
              node,
              makeBareSpecifierTransformVisitor(context, this._moduleResolver)
            );
          },
      ],
    };

    for (const {file, url} of inputFiles) {
      for (const tsDiagnostic of languageService.getSyntacticDiagnostics(url)) {
        yield {
          kind: 'diagnostic',
          filename: file.name,
          diagnostic: makeLspDiagnostic(tsDiagnostic),
        };
      }
      const sourceFile = program.getSourceFile(url);
      let compiled: SampleFile | undefined = undefined;
      program!.emit(
        sourceFile,
        (url, content) => {
          compiled = {
            name: new URL(url).pathname.slice(1),
            content,
            contentType: 'text/javascript',
          };
        },
        undefined,
        undefined,
        transformers
      );
      if (compiled !== undefined) {
        yield {kind: 'file', file: compiled};
      }
    }

    // Wait for all typings to be fetched, and then retrieve slower semantic
    // diagnostics.
    for (const [specifier, content] of await typesFetcher.getFiles()) {
      // TypeScript is going to look for these files as paths relative to our
      // source files, so we need to add them to our filesystem with those
      // URLs.
      const url = new URL(`node_modules/${specifier}`, self.origin).href;
      loadedFiles.set(url, {
        status: 'resolved',
        content,
      });
    }
    for (const {file, url} of inputFiles) {
      for (const tsDiagnostic of languageService.getSemanticDiagnostics(url)) {
        yield {
          kind: 'diagnostic',
          filename: file.name,
          diagnostic: makeLspDiagnostic(tsDiagnostic),
        };
      }
    }
  }
}

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
    return [...this.files.keys()].filter((name) => isTsOrJsFile(name));
  }

  getScriptVersion(_fileName: string) {
    return '-1';
  }

  fileExists(fileName: string): boolean {
    const file = this.files.get(fileName);
    return file !== undefined && file.status === 'resolved';
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

const isTsOrJsFile = (file: string) =>
  file.endsWith('.ts') || file.endsWith('.js');
