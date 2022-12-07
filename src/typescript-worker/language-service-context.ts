/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {createLanguageService} from '../../packages/typescript/lib/services/services.js';
import {createDocumentRegistry} from '../../packages/typescript/lib/services/documentRegistry.js';
import {
  ScriptTarget,
  ModuleKind,
  ModuleResolutionKind,
  JsxEmit,
  CompilerOptions,
} from '../../packages/typescript/lib/compiler/types.js';
import {
  LanguageServiceHost,
  ScriptSnapshot,
  IScriptSnapshot,
} from '../../packages/typescript/lib/services/types.js';

const compilerOptions = {
  target: ScriptTarget.ES2021,
  module: ModuleKind.ESNext,
  experimentalDecorators: true,
  skipDefaultLibCheck: true,
  skipLibCheck: true,
  allowJs: true,
  moduleResolution: ModuleResolutionKind.NodeNext,
  jsx: JsxEmit.React,
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

  readonly service = createLanguageService(
    this.serviceHost,
    createDocumentRegistry()
  );
}

interface VersionedFile {
  version: number;
  content: string;
}

class WorkerLanguageServiceHost implements LanguageServiceHost {
  readonly compilerOptions: CompilerOptions;
  readonly packageRoot: string;
  readonly files: Map<string, VersionedFile> = new Map<string, VersionedFile>();

  constructor(packageRoot: string, compilerOptions: CompilerOptions) {
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

  getCompilationSettings(): CompilerOptions {
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

  getScriptSnapshot(fileName: string): IScriptSnapshot | undefined {
    if (!this.fileExists(fileName)) {
      return undefined;
    }
    return ScriptSnapshot.fromString(this.readFile(fileName)!);
  }

  getCurrentDirectory(): string {
    return this.packageRoot;
  }

  getDefaultLibFileName(): string {
    return '__lib.d.ts';
  }
}
