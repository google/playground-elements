/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {TypeScriptBuilder} from './typescript.js';
import {BareModuleTransformer} from './bare-module-transformer.js';
import {ModuleResolver} from './module-resolver.js';

import type {
  SampleFile,
  ModuleImportMap,
  BuildOutput,
} from '../shared/worker-api.js';

export const build = async (
  files: Array<SampleFile>,
  config: {
    importMap: ModuleImportMap;
    cdnBaseUrl?: string;
  },
  emit: (result: BuildOutput) => void
): Promise<void> => {
  const moduleResolver = new ModuleResolver(importMap);
  const tsBuilder = new TypeScriptBuilder(moduleResolver);
  const bareModuleBuilder = new BareModuleTransformer(moduleResolver);
  const results = bareModuleBuilder.process(
    tsBuilder.process(files.map((file) => ({kind: 'file', file})))
  );
  for await (const result of results) {
    emit(result);
  }
  emit({kind: 'done'});
};
