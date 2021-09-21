/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LanguageServiceContext} from './language-service-context.js';
import {CachingCdn} from './caching-cdn.js';
import {ImportMapResolver} from './import-map-resolver.js';
import {TypeScriptWorkerConfig} from '../shared/worker-api.js';

export let languageServiceContext: LanguageServiceContext;
let cacheKey = '';

/**
 * Acquire the existing builder instance, or create a fresh one if missing.
 * If the config differs from the existing instance's config, a new TypeScriptBuilder is
 * instantiated and made the new builderInstance.
 *
 * You can provide the caching cdn and moduleResolved instances yourself
 * or let the function generate then from default values.
 */
export function getLanguageServiceContext(
  config: TypeScriptWorkerConfig,
  cdn?: CachingCdn,
  moduleResolver?: ImportMapResolver
) {
  const configCacheKey = JSON.stringify(config);
  if (languageServiceContext && cacheKey === configCacheKey) {
    return languageServiceContext;
  }

  if (!cdn) {
    cdn = new CachingCdn(config.cdnBaseUrl ?? 'https://unpkg.com/');
  }

  if (!moduleResolver) {
    moduleResolver = new ImportMapResolver(config.importMap);
  }

  cacheKey = configCacheKey;
  languageServiceContext = new LanguageServiceContext(cdn, moduleResolver);
  return languageServiceContext;
}
