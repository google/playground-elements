/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {BareModuleTransformer} from './bare-module-transformer.js';
import {makeLspDiagnostic} from './diagnostic.js';

import type {
  SampleFile,
  BuildOutput,
  TypeScriptWorkerConfig,
} from '../shared/worker-api.js';
import {getLanguageServiceContext} from './project-cache.js';
import {PackageJson} from './util.js';
import {LanguageServiceContext} from './language-service-context.js';
import {TypesFetcher} from './types-fetcher.js';

export const build = async (
  files: Array<SampleFile>,
  config: TypeScriptWorkerConfig,
  emit: (result: BuildOutput) => void
): Promise<void> => {
  const lsContext = getLanguageServiceContext(config);
  const bareModuleBuilder = new BareModuleTransformer(
    lsContext.cdn,
    lsContext.importMapResolver
  );

  const results = bareModuleBuilder.process(
    processFiles(
      lsContext,
      files.map((file) => ({kind: 'file', file}))
    )
  );
  for await (const result of results) {
    emit(result);
  }
  emit({kind: 'done'});
};

async function* processFiles(
  lsContext: LanguageServiceContext,
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
  lsContext.serviceHost.sync(loadedFiles);

  const program = lsContext.service.getProgram();
  if (program === undefined) {
    throw new Error('Unexpected error: program was undefined');
  }

  for (const {file, url} of inputFiles) {
    for (const tsDiagnostic of lsContext.service.getSyntacticDiagnostics(url)) {
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
    lsContext.cdn,
    lsContext.importMapResolver,
    packageJson,
    inputFiles.map((file) => file.file.content),
    lsContext.compilerOptions.lib
  );
  for (const [path, content] of typings.files) {
    // TypeScript is going to look for these files as paths relative to our
    // source files, so we need to add them to our filesystem with those URLs.
    const url = new URL(`node_modules/${path}`, self.origin).href;
    lsContext.serviceHost.updateFileContentIfNeeded(url, content);
  }
  for (const {file, url} of inputFiles) {
    for (const tsDiagnostic of lsContext.service.getSemanticDiagnostics(url)) {
      yield {
        kind: 'diagnostic',
        filename: file.name,
        diagnostic: makeLspDiagnostic(tsDiagnostic),
      };
    }
  }
}
