/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ModuleImportMap} from '../shared/worker-api.js';

export type ResolvedSpecifier = {
  type: 'url' | 'relative' | 'bare';
  url: string;
};

/**
 * Resolve an import specifier. Uses HTML-spec semantics for URLs and relative
 * paths. Uses import map configuration if provided and matching, otherwise
 * falls back to unpkg.com URL for bare-specifiers.
 */
export class ModuleResolver {
  private importMap: ModuleImportMap;

  constructor(importMap: ModuleImportMap) {
    this.importMap = importMap;
  }

  // TODO(aomarks) Remove this method and rename this class to ImportMapResolver
  // once TypeFetcher has been updated to the new dependency handling approach
  // that won't need this method.
  resolve(specifier: string, referrer: string | URL): ResolvedSpecifier {
    const importMapUrl = this.resolveUsingImportMap(specifier);
    if (importMapUrl !== null) {
      return {type: 'bare' as const, url: importMapUrl};
    }
    try {
      return {
        type: 'url' as const,
        url: new URL(specifier).href,
      };
    } catch (e) {
      if (isRelativeOrAbsolutePath(specifier)) {
        return {
          type: 'relative' as const,
          url: new URL(specifier, referrer).href,
        };
      }
      return {
        type: 'bare' as const,
        url: `https://unpkg.com/${specifier}?module`,
      };
    }
  }

  resolveUsingImportMap(specifier: string): string | null {
    // For overview, see https://github.com/WICG/import-maps
    // For algorithm, see https://wicg.github.io/import-maps/#resolving
    // TODO(aomarks) Add support for `scopes`.
    for (const [specifierKey, resolutionResult] of Object.entries(
      this.importMap.imports ?? {}
    )) {
      // Note that per spec we shouldn't do a lookup for the exact match case,
      // because if a trailing-slash mapping also matches and comes first, it
      // should have precedence.
      if (specifierKey === specifier) {
        return resolutionResult;
      }

      if (specifierKey.endsWith('/') && specifier.startsWith(specifierKey)) {
        if (!resolutionResult.endsWith('/')) {
          console.warn(
            `Could not resolve module specifier "${specifier}"` +
              ` using import map key "${specifierKey}" because` +
              ` address "${resolutionResult}" must end in a forward-slash.`
          );
          return null;
        }

        const afterPrefix = specifier.substring(specifierKey.length);
        let url;
        try {
          url = new URL(afterPrefix, resolutionResult);
        } catch {
          console.warn(
            `Could not resolve module specifier "${specifier}"` +
              ` using import map key "${specifierKey}" because` +
              ` "${afterPrefix}" could not be parsed` +
              ` relative to "${resolutionResult}".`
          );
          return null;
        }

        const urlSerialized = url.href;
        if (!urlSerialized.startsWith(resolutionResult)) {
          console.warn(
            `Could not resolve module specifier "${specifier}"` +
              ` using import map key "${specifierKey}" because` +
              ` "${afterPrefix}" backtracked above "${resolutionResult}".`
          );
          return null;
        }
        return urlSerialized;
      }
    }
    return null;
  }
}

export const isRelativeOrAbsolutePath = (s: string) =>
  s.match(/^(\.){0,2}\//) !== null;
