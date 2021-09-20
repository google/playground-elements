/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {TypeScriptBuilder} from './typescript';
import {CachingCdn} from './caching-cdn.js';
import {ImportMapResolver} from './import-map-resolver';
import {TypeScriptWorkerConfig} from '../shared/worker-api';

export let builderInstance: TypeScriptBuilder;
let cacheKey: string = '';

/**
 * Acquire the existing builder instance, or create a fresh one if missing.
 * If the config differs from the existing instance's config, a new TypeScriptBuilder is
 * instantiated and made the new builderInstance.
 */
export function getBuilder(
  config: TypeScriptWorkerConfig,
  cdn: CachingCdn,
  moduleResolver: ImportMapResolver
) {
  const configCacheKey = JSON.stringify(config);
  if (builderInstance && cacheKey === configCacheKey) {
    return builderInstance;
  }

  cacheKey = configCacheKey;
  builderInstance = new TypeScriptBuilder(cdn, moduleResolver);
  return builderInstance;
}
