/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {BareModuleTransformer} from './bare-module-transformer.js';
import {ImportMapResolver} from './import-map-resolver.js';

import type {
  SampleFile,
  ModuleImportMap,
  BuildOutput,
} from '../shared/worker-api.js';
import {CachingCdn} from './caching-cdn.js';
import { getBuilder } from './project-cache.js';

export const build = async (
  files: Array<SampleFile>,
  config: {
    importMap: ModuleImportMap;
    cdnBaseUrl?: string;
  },
  emit: (result: BuildOutput) => void
): Promise<void> => {
  const moduleResolver = new ImportMapResolver(config.importMap);
  const cdn = new CachingCdn(config.cdnBaseUrl ?? 'https://unpkg.com/');
  const tsBuilder = getBuilder(cdn, moduleResolver);
  const bareModuleBuilder = new BareModuleTransformer(cdn, moduleResolver);
  const results = bareModuleBuilder.process(
    tsBuilder.process(files.map((file) => ({kind: 'file', file})))
  );
  for await (const result of results) {
    emit(result);
  }
  emit({kind: 'done'});
};
