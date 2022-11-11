/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {BuildOutput, SampleFile} from '../shared/worker-api.js';
import {TypesFetcher} from './types-fetcher.js';
import {PackageJson} from './util.js';
import {makeLspDiagnostic} from './diagnostic.js';
import {WorkerContext} from './worker-context.js';

const PROCESSED_FILE_ENDINGS = ['.ts', '.jsx', '.tsx'];

export async function* processTypeScriptFiles(
  workerContext: WorkerContext,
  results: AsyncIterable<BuildOutput> | Iterable<BuildOutput>
): AsyncIterable<BuildOutput> {
  // Instantiate langservice variables for ease of access
  const langService = workerContext.languageServiceContext.service;
  const langServiceHost = workerContext.languageServiceContext.serviceHost;
  let packageJson: PackageJson | undefined;
  const compilerInputs = [];
  for await (const result of results) {
    if (result.kind !== 'file') continue;

    // Collect filetypes that need to be compiled. They will be handled later on in the process.
    if (
      PROCESSED_FILE_ENDINGS.some((ending) => result.file.name.endsWith(ending))
    ) {
      compilerInputs.push(result.file);
      continue;
    }
    // Everything that reaches this point should be usable out of the box without compiling.
    // Therefore we can just yield the result to the caller.
    yield result;

    // Even though we don't need to compile javascript files, we want to append them to our
    // compilerinputs to get completions and diagnostics for those files.
    if (result.file.name.endsWith('.js')) {
      compilerInputs.push(result.file);
      continue;
    }

    if (result.file.name === 'package.json') {
      try {
        packageJson = JSON.parse(result.file.content) as PackageJson;
      } catch (e) {
        // A bit hacky, but BareModuleTransformer already emits a diagnostic
        // for this case, so we don't need another one.
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
  langServiceHost.sync(loadedFiles);

  const program = langService.getProgram();
  if (program === undefined) {
    throw new Error('Unexpected error: program was undefined');
  }

  for (const {file, url} of inputFiles) {
    for (const tsDiagnostic of langService.getSyntacticDiagnostics(url)) {
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
    workerContext.cdn,
    workerContext.importMapResolver,
    packageJson,
    inputFiles.map((file) => file.file.content),
    workerContext.languageServiceContext.compilerOptions.lib
  );
  for (const [path, content] of typings.files) {
    // TypeScript is going to look for these files as paths relative to our
    // source files, so we need to add them to our filesystem with those URLs.
    const url = new URL(`node_modules/${path}`, self.origin).href;
    langServiceHost.updateFileContentIfNeeded(url, content);
  }
  for (const {file, url} of inputFiles) {
    for (const tsDiagnostic of langService.getSemanticDiagnostics(url)) {
      yield {
        kind: 'diagnostic',
        filename: file.name,
        diagnostic: makeLspDiagnostic(tsDiagnostic),
      };
    }
  }
}
