import { TypeScriptBuilder } from "./typescript";
import {CachingCdn} from './caching-cdn.js';
import { ImportMapResolver } from "./import-map-resolver";


export let builderInstance: TypeScriptBuilder;

export function getBuilder(cdn: CachingCdn, moduleResolver: ImportMapResolver) {
  if (builderInstance) {
    return builderInstance;
  }
  builderInstance = new TypeScriptBuilder(cdn, moduleResolver);
  return builderInstance;
}
