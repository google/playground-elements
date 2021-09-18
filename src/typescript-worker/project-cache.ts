import { TypeScriptBuilder } from "./typescript";
import {CachingCdn} from './caching-cdn.js';
import { ImportMapResolver } from "./import-map-resolver";


export const builderCache = new Map();

export function getBuilder(projectId: string, cdn: CachingCdn, moduleResolver: ImportMapResolver) {
  if (builderCache.has(projectId)) {
    return builderCache.get(projectId);
  }
  const tsBuilder = new TypeScriptBuilder(cdn, moduleResolver);
  builderCache.set(projectId, tsBuilder);
  return tsBuilder;
}
