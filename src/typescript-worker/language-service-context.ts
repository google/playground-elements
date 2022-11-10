/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ts from '../internal/typescript.js';

const compilerOptions = {
  target: ts.ScriptTarget.ES2021,
  module: ts.ModuleKind.ESNext,
  experimentalDecorators: true,
  skipDefaultLibCheck: true,
  skipLibCheck: true,
  allowJs: true,
  moduleResolution: ts.ModuleResolutionKind.NodeNext,
  jsx: ts.JsxEmit.React,
  lib: ['dom', 'esnext'],
};

/**
 * Compiles a project, returning a Map of compiled file contents. The map only
 * contains context for files that are compiled. Other files are skipped.
 *
 * TODO (justinfagnani):  We could share a DocumentRegistry across
 * multiple <playground-project> instances to save memory and type analysis of
 * common lib files like lit-element, lib.d.ts and dom.d.ts.
 */
export class LanguageServiceContext {
  readonly compilerOptions = compilerOptions;

  readonly serviceHost = new WorkerLanguageServiceHost(
    self.origin,
    compilerOptions
  );

  readonly service = ts.createLanguageService(
    this.serviceHost,
    ts.createDocumentRegistry()
  );
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
      // Do not delete the dependency files, as then they will get re-applied every compilation.
      // This is because the compilation step is aware of these files, but the completion step isn't.
      if (!fileName.includes('node_modules') && !files.has(fileName)) {
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
