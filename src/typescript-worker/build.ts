/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {TypeScriptBuilder} from './typescript.js';
import {ModuleResolver} from './module-resolver.js';

import type {
  SampleFile,
  ModuleImportMap,
  BuildOutput,
} from '../shared/worker-api.js';

export const build = async (
  files: Array<SampleFile>,
  importMap: ModuleImportMap,
  emit: (result: BuildOutput) => void
): Promise<void> => {
  const moduleResolver = new ModuleResolver(importMap);
  const tsBuilder = new TypeScriptBuilder(moduleResolver);
  const results = tsBuilder.process(
    files.map((file) => ({kind: 'file', file}))
  );
  for await (const result of results) {
    emit(result);
  }
  emit({kind: 'done'});
};
