/**
 * @license
 * Copyright 2020 Node.js contributors. All rights reserved.
 * SPDX-License-Identifier: MIT
 */

// This file is derived from
// https://github.com/nodejs/node/blob/a9dd03b1ec89a75186f05967fc76ec0704050c36/lib/internal/modules/esm/resolve.js
// and adapted for use in playground-elements.

import {fileURLToPath} from './url.js';
import {
  InvalidModuleSpecifierError,
  InvalidPackageConfigError,
  InvalidPackageTargetError,
  PackagePathNotExportedError,
} from './errors.js';
import {
  PackageExports,
  PackageExportsPathOrConditionMap,
  PackageExportsTarget,
  PackageJsonWithExports,
} from '../util.js';

function emitFolderMapDeprecation(
  match: string,
  pjsonUrl: URL,
  isExports: boolean,
  base: string
): void {
  const pjsonPath = fileURLToPath(pjsonUrl);
  console.warn(
    `Use of deprecated folder mapping "${match}" in the ${
      isExports ? '"exports"' : '"imports"'
    } field module resolution of the package at ${pjsonPath}${
      base ? ` imported from ${base}` : ''
    }.\n` +
      `Update this package.json to use a subpath pattern like "${match}*".`,
    'DeprecationWarning',
    'DEP0148'
  );
}

function makeExportsNotFoundError(
  subpath: string,
  packageJSONUrl: URL,
  base: string
): PackagePathNotExportedError {
  return new PackagePathNotExportedError(
    fileURLToPath(new URL('.', packageJSONUrl)),
    subpath,
    base
  );
}

function makeInvalidSubpathError(
  subpath: string,
  packageJSONUrl: URL,
  internal: boolean,
  base: string
) {
  const reason = `request is not a valid subpath for the "${
    internal ? 'imports' : 'exports'
  }" resolution of ${fileURLToPath(packageJSONUrl)}`;
  return new InvalidModuleSpecifierError(subpath, reason, base);
}

function makeInvalidPackageTargetError(
  subpath: string,
  target: PackageExportsTarget,
  packageJSONUrl: URL,
  internal: boolean,
  base: string
) {
  if (typeof target === 'object' && target !== null) {
    target = JSON.stringify(target, null, '');
  } else {
    target = `${target}`;
  }
  return new InvalidPackageTargetError(
    packageJSONUrl,
    subpath,
    target,
    internal,
    base
  );
}

const invalidSegmentRegEx = /(^|\\|\/)(\.\.?|node_modules)(\\|\/|$)/;
const patternRegEx = /\*/g;

function resolvePackageTargetString(
  target: string,
  subpath: string,
  match: string,
  packageJSONUrl: URL,
  base: string,
  pattern: boolean,
  internal: boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _conditions: Set<string>
): URL {
  if (subpath !== '' && !pattern && target[target.length - 1] !== '/') {
    throw makeInvalidPackageTargetError(
      match,
      target,
      packageJSONUrl,
      internal,
      base
    );
  }

  if (!target.startsWith('./')) {
    // TODO(aomarks) Add when support here for package "imports" is added.
    throw makeInvalidPackageTargetError(
      match,
      target,
      packageJSONUrl,
      internal,
      base
    );
  }

  if (invalidSegmentRegEx.test(target.slice(2))) {
    throw makeInvalidPackageTargetError(
      match,
      target,
      packageJSONUrl,
      internal,
      base
    );
  }

  const resolved = new URL(target, packageJSONUrl);
  const resolvedPath = resolved.pathname;
  const packagePath = new URL('.', packageJSONUrl).pathname;

  if (!resolvedPath.startsWith(packagePath)) {
    throw makeInvalidPackageTargetError(
      match,
      target,
      packageJSONUrl,
      internal,
      base
    );
  }

  if (subpath === '') {
    return resolved;
  }

  if (invalidSegmentRegEx.test(subpath)) {
    throw makeInvalidSubpathError(
      match + subpath,
      packageJSONUrl,
      internal,
      base
    );
  }

  if (pattern) {
    return new URL(resolved.href.replace(patternRegEx, subpath));
  }
  return new URL(subpath, resolved);
}

function isArrayIndex(key: string): boolean {
  const keyNum = +key;
  if (`${keyNum}` !== key) {
    return false;
  }
  return keyNum >= 0 && keyNum < 0xffff_ffff;
}

function resolvePackageTarget(
  packageJSONUrl: URL,
  target: PackageExportsTarget,
  subpath: string,
  packageSubpath: string,
  base: string,
  pattern: boolean,
  internal: boolean,
  conditions: Set<string>
): URL | null | undefined {
  if (typeof target === 'string') {
    return resolvePackageTargetString(
      target,
      subpath,
      packageSubpath,
      packageJSONUrl,
      base,
      pattern,
      internal,
      conditions
    );
  } else if (Array.isArray(target)) {
    if (target.length === 0) {
      return null;
    }

    let lastException;
    for (let i = 0; i < target.length; i++) {
      const targetItem = target[i];
      let resolved;
      try {
        resolved = resolvePackageTarget(
          packageJSONUrl,
          targetItem,
          subpath,
          packageSubpath,
          base,
          pattern,
          internal,
          conditions
        );
      } catch (e) {
        lastException = e;
        if (e instanceof InvalidPackageTargetError) {
          continue;
        }
        throw e;
      }
      if (resolved === undefined) continue;
      if (resolved === null) {
        lastException = null;
        continue;
      }
      return resolved;
    }
    if (lastException === undefined || lastException === null) {
      return lastException;
    }
    throw lastException;
  } else if (typeof target === 'object' && target !== null) {
    const keys = Object.getOwnPropertyNames(target);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (isArrayIndex(key)) {
        throw new InvalidPackageConfigError(
          fileURLToPath(packageJSONUrl),
          base,
          '"exports" cannot contain numeric property keys.'
        );
      }
    }
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key === 'default' || conditions.has(key)) {
        const conditionalTarget = target[key];
        const resolved = resolvePackageTarget(
          packageJSONUrl,
          conditionalTarget,
          subpath,
          packageSubpath,
          base,
          pattern,
          internal,
          conditions
        );
        if (resolved === undefined) continue;
        return resolved;
      }
    }
    return undefined;
  } else if (target === null) {
    return null;
  }
  throw makeInvalidPackageTargetError(
    packageSubpath,
    target,
    packageJSONUrl,
    internal,
    base
  );
}

function isConditionalExportsMainSugar(
  // Note we are avoiding locals called exactly "exports" because of
  // incompatibilities with JS Compiler which can produce code that expects to
  // be able to reference a global called "exports".
  _exports: PackageExports,
  packageJSONUrl: URL,
  base: string
): boolean {
  if (typeof _exports === 'string' || Array.isArray(_exports)) {
    return true;
  }
  if (typeof _exports !== 'object' || _exports === null) {
    return false;
  }

  const keys = Object.getOwnPropertyNames(_exports);
  let isConditionalSugar = false;
  let i = 0;
  for (let j = 0; j < keys.length; j++) {
    const key = keys[j];
    const curIsConditionalSugar = key === '' || key[0] !== '.';
    if (i++ === 0) {
      isConditionalSugar = curIsConditionalSugar;
    } else if (isConditionalSugar !== curIsConditionalSugar) {
      throw new InvalidPackageConfigError(
        fileURLToPath(packageJSONUrl),
        base,
        '"exports" cannot contain some keys starting with \'.\' and some not.' +
          ' The exports object must either be an object of package subpath keys' +
          ' or an object of main entry condition name keys only.'
      );
    }
  }
  return isConditionalSugar;
}

export function packageExportsResolve(
  packageJSONUrl: URL,
  packageSubpath: string,
  packageConfig: PackageJsonWithExports,
  base: string,
  conditions: Set<string>
): URL {
  let _exports = packageConfig.exports;
  if (isConditionalExportsMainSugar(_exports, packageJSONUrl, base)) {
    _exports = {'.': _exports};
  }
  _exports = _exports as PackageExportsPathOrConditionMap;

  if (
    Object.prototype.hasOwnProperty.call(_exports, packageSubpath) &&
    !packageSubpath.includes('*') &&
    !packageSubpath.endsWith('/')
  ) {
    const target = _exports[packageSubpath];
    const resolved = resolvePackageTarget(
      packageJSONUrl,
      target,
      '',
      packageSubpath,
      base,
      false,
      false,
      conditions
    );
    if (resolved === null || resolved === undefined) {
      throw makeExportsNotFoundError(packageSubpath, packageJSONUrl, base);
    }
    return resolved;
  }

  let bestMatch = '';
  let bestMatchSubpath: string | undefined = undefined;
  for (const key of Object.keys(_exports)) {
    const patternIndex = key.indexOf('*');
    if (
      patternIndex !== -1 &&
      packageSubpath.startsWith(key.slice(0, patternIndex))
    ) {
      const patternTrailer = key.slice(patternIndex + 1);
      if (
        packageSubpath.length >= key.length &&
        packageSubpath.endsWith(patternTrailer) &&
        patternKeyCompare(bestMatch, key) === 1 &&
        key.lastIndexOf('*') === patternIndex
      ) {
        bestMatch = key;
        bestMatchSubpath = packageSubpath.slice(
          patternIndex,
          packageSubpath.length - patternTrailer.length
        );
      }
    } else if (
      key.endsWith('/') &&
      packageSubpath.startsWith(key) &&
      patternKeyCompare(bestMatch, key) === 1
    ) {
      bestMatch = key;
      bestMatchSubpath = packageSubpath.slice(key.length);
    }
  }

  if (bestMatch) {
    const target = _exports[bestMatch];
    const pattern = bestMatch.includes('*');
    const resolved = resolvePackageTarget(
      packageJSONUrl,
      target,
      // bestMatchSubpath must be defined when bestMatch is not empty string
      bestMatchSubpath!,
      bestMatch,
      base,
      pattern,
      false,
      conditions
    );
    if (resolved === null || resolved === undefined) {
      throw makeExportsNotFoundError(packageSubpath, packageJSONUrl, base);
    }
    if (!pattern) {
      emitFolderMapDeprecation(bestMatch, packageJSONUrl, true, base);
    }
    return resolved;
  }

  throw makeExportsNotFoundError(packageSubpath, packageJSONUrl, base);
}

function patternKeyCompare(a: string, b: string): -1 | 0 | 1 {
  const aPatternIndex = a.indexOf('*');
  const bPatternIndex = b.indexOf('*');
  const baseLenA = aPatternIndex === -1 ? a.length : aPatternIndex + 1;
  const baseLenB = bPatternIndex === -1 ? b.length : bPatternIndex + 1;
  if (baseLenA > baseLenB) return -1;
  if (baseLenB > baseLenA) return 1;
  if (aPatternIndex === -1) return 1;
  if (bPatternIndex === -1) return -1;
  if (a.length > b.length) return -1;
  if (b.length > a.length) return 1;
  return 0;
}
