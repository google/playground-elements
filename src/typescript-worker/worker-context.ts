/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LanguageServiceContext} from './language-service-context.js';
import {CachingCdn} from './caching-cdn.js';
import {ImportMapResolver} from './import-map-resolver.js';
import {WorkerConfig} from '../shared/worker-api.js';

let workerContext: WorkerContext | undefined;
let cacheKey = '';

/**
 * Acquire the existing worker instance, or create a fresh one if missing. If
 * the config differs from the existing instance's config, a new WorkerContext
 * is instantiated and made the new instance.
 *
 * @param forceFreshWorkerContext - When true will return a new WorkerContext instance ignoring cache.
 */
export function getWorkerContext(
  config: WorkerConfig,
  forceFreshWorkerContext = false
) {
  const configCacheKey = JSON.stringify(config);
  if (
    workerContext &&
    cacheKey === configCacheKey &&
    !forceFreshWorkerContext
  ) {
    return workerContext;
  }

  cacheKey = configCacheKey;
  workerContext = new WorkerContext(config);
  return workerContext;
}

export class WorkerContext {
  readonly cdn: CachingCdn;
  readonly importMapResolver: ImportMapResolver;
  readonly languageServiceContext: LanguageServiceContext;

  constructor(config: WorkerConfig) {
    this.importMapResolver = new ImportMapResolver(config.importMap);
    this.cdn = new CachingCdn(config.cdnBaseUrl ?? 'https://unpkg.com/');
    this.languageServiceContext = new LanguageServiceContext();
  }
}
