/**
 * @license
 * Copyright 2020 Node.js contributors. All rights reserved.
 * SPDX-License-Identifier: MIT
 */

// This file is derived from
// https://github.com/nodejs/node/blob/a9dd03b1ec89a75186f05967fc76ec0704050c36/lib/internal/modules/esm/resolve.js
// and adapted for use in playground-elements.

/**
 * @param {string} match
 * @param {URL} pjsonUrl
 * @param {boolean} isExports
 * @param {string | URL | undefined} base
 * @returns {void}
 */
function emitFolderMapDeprecation(match, pjsonUrl, isExports, base) {
  const pjsonPath = fileURLToPath(pjsonUrl);

  if (emittedPackageWarnings.has(pjsonPath + '|' + match))
    return;
  emittedPackageWarnings.add(pjsonPath + '|' + match);
  process.emitWarning(
    `Use of deprecated folder mapping "${match}" in the ${isExports ?
      '"exports"' : '"imports"'} field module resolution of the package at ${
      pjsonPath}${base ? ` imported from ${fileURLToPath(base)}` : ''}.\n` +
      `Update this package.json to use a subpath pattern like "${match}*".`,
    'DeprecationWarning',
    'DEP0148'
  );
}

/**
 * @param {string} specifier
 * @param {URL} packageJSONUrl
 * @param {string | URL | undefined} base
 */
function throwExportsNotFound(subpath, packageJSONUrl, base) {
  throw new ERR_PACKAGE_PATH_NOT_EXPORTED(
    fileURLToPath(new URL('.', packageJSONUrl)), subpath,
    base && fileURLToPath(base));
}

/**
 *
 * @param {string | URL} subpath
 * @param {URL} packageJSONUrl
 * @param {boolean} internal
 * @param {string | URL | undefined} base
 */
function throwInvalidSubpath(subpath, packageJSONUrl, internal, base) {
  const reason = `request is not a valid subpath for the "${internal ?
    'imports' : 'exports'}" resolution of ${fileURLToPath(packageJSONUrl)}`;
  throw new ERR_INVALID_MODULE_SPECIFIER(subpath, reason,
                                         base && fileURLToPath(base));
}

function throwInvalidPackageTarget(
  subpath, target, packageJSONUrl, internal, base) {
  if (typeof target === 'object' && target !== null) {
    target = JSONStringify(target, null, '');
  } else {
    target = `${target}`;
  }
  throw new ERR_INVALID_PACKAGE_TARGET(
    fileURLToPath(new URL('.', packageJSONUrl)), subpath, target,
    internal, base && fileURLToPath(base));
}

const invalidSegmentRegEx = /(^|\\|\/)(\.\.?|node_modules)(\\|\/|$)/;
const patternRegEx = /\*/g;

function resolvePackageTargetString(
  target, subpath, match, packageJSONUrl, base, pattern, internal, conditions) {
  if (subpath !== '' && !pattern && target[target.length - 1] !== '/')
    throwInvalidPackageTarget(match, target, packageJSONUrl, internal, base);

  if (!StringPrototypeStartsWith(target, './')) {
    throwInvalidPackageTarget(match, target, packageJSONUrl, internal, base);
  }

  if (RegExpPrototypeTest(invalidSegmentRegEx, StringPrototypeSlice(target, 2)))
    throwInvalidPackageTarget(match, target, packageJSONUrl, internal, base);

  const resolved = new URL(target, packageJSONUrl);
  const resolvedPath = resolved.pathname;
  const packagePath = new URL('.', packageJSONUrl).pathname;

  if (!StringPrototypeStartsWith(resolvedPath, packagePath))
    throwInvalidPackageTarget(match, target, packageJSONUrl, internal, base);

  if (subpath === '') return resolved;

  if (RegExpPrototypeTest(invalidSegmentRegEx, subpath))
    throwInvalidSubpath(match + subpath, packageJSONUrl, internal, base);

  if (pattern)
    return new URL(StringPrototypeReplace(resolved.href, patternRegEx,
                                          subpath));
  return new URL(subpath, resolved);
}

/**
 * @param {string} key
 * @returns {boolean}
 */
function isArrayIndex(key) {
  const keyNum = +key;
  if (`${keyNum}` !== key) return false;
  return keyNum >= 0 && keyNum < 0xFFFF_FFFF;
}

function resolvePackageTarget(packageJSONUrl, target, subpath, packageSubpath,
                              base, pattern, internal, conditions) {
  if (typeof target === 'string') {
    return resolvePackageTargetString(
      target, subpath, packageSubpath, packageJSONUrl, base, pattern, internal,
      conditions);
  } else if (ArrayIsArray(target)) {
    if (target.length === 0)
      return null;

    let lastException;
    for (let i = 0; i < target.length; i++) {
      const targetItem = target[i];
      let resolved;
      try {
        resolved = resolvePackageTarget(
          packageJSONUrl, targetItem, subpath, packageSubpath, base, pattern,
          internal, conditions);
      } catch (e) {
        lastException = e;
        if (e.code === 'ERR_INVALID_PACKAGE_TARGET')
          continue;
        throw e;
      }
      if (resolved === undefined)
        continue;
      if (resolved === null) {
        lastException = null;
        continue;
      }
      return resolved;
    }
    if (lastException === undefined || lastException === null)
      return lastException;
    throw lastException;
  } else if (typeof target === 'object' && target !== null) {
    const keys = ObjectGetOwnPropertyNames(target);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (isArrayIndex(key)) {
        throw new ERR_INVALID_PACKAGE_CONFIG(
          fileURLToPath(packageJSONUrl), base,
          '"exports" cannot contain numeric property keys.');
      }
    }
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key === 'default' || conditions.has(key)) {
        const conditionalTarget = target[key];
        const resolved = resolvePackageTarget(
          packageJSONUrl, conditionalTarget, subpath, packageSubpath, base,
          pattern, internal, conditions);
        if (resolved === undefined)
          continue;
        return resolved;
      }
    }
    return undefined;
  } else if (target === null) {
    return null;
  }
  throwInvalidPackageTarget(packageSubpath, target, packageJSONUrl, internal,
                            base);
}

/**
 *
 * @param {Exports} exports
 * @param {URL} packageJSONUrl
 * @param {string | URL | undefined} base
 * @returns
 */
function isConditionalExportsMainSugar(exports, packageJSONUrl, base) {
  if (typeof exports === 'string' || ArrayIsArray(exports)) return true;
  if (typeof exports !== 'object' || exports === null) return false;

  const keys = ObjectGetOwnPropertyNames(exports);
  let isConditionalSugar = false;
  let i = 0;
  for (let j = 0; j < keys.length; j++) {
    const key = keys[j];
    const curIsConditionalSugar = key === '' || key[0] !== '.';
    if (i++ === 0) {
      isConditionalSugar = curIsConditionalSugar;
    } else if (isConditionalSugar !== curIsConditionalSugar) {
      throw new ERR_INVALID_PACKAGE_CONFIG(
        fileURLToPath(packageJSONUrl), base,
        '"exports" cannot contain some keys starting with \'.\' and some not.' +
        ' The exports object must either be an object of package subpath keys' +
        ' or an object of main entry condition name keys only.');
    }
  }
  return isConditionalSugar;
}

/**
 * @param {URL} packageJSONUrl
 * @param {string} packageSubpath
 * @param {PackageConfig} packageConfig
 * @param {string | URL | undefined} base
 * @param {Set<string>} conditions
 * @returns {URL}
 */
function packageExportsResolve(
  packageJSONUrl, packageSubpath, packageConfig, base, conditions) {
  let exports = packageConfig.exports;
  if (isConditionalExportsMainSugar(exports, packageJSONUrl, base))
    exports = { '.': exports };

  if (ObjectPrototypeHasOwnProperty(exports, packageSubpath) &&
      !StringPrototypeIncludes(packageSubpath, '*') &&
      !StringPrototypeEndsWith(packageSubpath, '/')) {
    const target = exports[packageSubpath];
    const resolved = resolvePackageTarget(
      packageJSONUrl, target, '', packageSubpath, base, false, false, conditions
    );
    if (resolved === null || resolved === undefined)
      throwExportsNotFound(packageSubpath, packageJSONUrl, base);
    return { resolved, exact: true };
  }

  let bestMatch = '';
  let bestMatchSubpath;
  const keys = ObjectGetOwnPropertyNames(exports);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const patternIndex = StringPrototypeIndexOf(key, '*');
    if (patternIndex !== -1 &&
        StringPrototypeStartsWith(packageSubpath,
                                  StringPrototypeSlice(key, 0, patternIndex))) {
      const patternTrailer = StringPrototypeSlice(key, patternIndex + 1);
      if (packageSubpath.length >= key.length &&
          StringPrototypeEndsWith(packageSubpath, patternTrailer) &&
          patternKeyCompare(bestMatch, key) === 1 &&
          StringPrototypeLastIndexOf(key, '*') === patternIndex) {
        bestMatch = key;
        bestMatchSubpath = StringPrototypeSlice(
          packageSubpath, patternIndex,
          packageSubpath.length - patternTrailer.length);
      }
    } else if (key[key.length - 1] === '/' &&
      StringPrototypeStartsWith(packageSubpath, key) &&
      patternKeyCompare(bestMatch, key) === 1) {
      bestMatch = key;
      bestMatchSubpath = StringPrototypeSlice(packageSubpath, key.length);
    }
  }

  if (bestMatch) {
    const target = exports[bestMatch];
    const pattern = StringPrototypeIncludes(bestMatch, '*');
    const resolved = resolvePackageTarget(packageJSONUrl, target,
                                          bestMatchSubpath, bestMatch, base,
                                          pattern, false, conditions);
    if (resolved === null || resolved === undefined)
      throwExportsNotFound(packageSubpath, packageJSONUrl, base);
    if (!pattern)
      emitFolderMapDeprecation(bestMatch, packageJSONUrl, true, base);
    return { resolved, exact: pattern };
  }

  throwExportsNotFound(packageSubpath, packageJSONUrl, base);
}

function patternKeyCompare(a, b) {
  const aPatternIndex = StringPrototypeIndexOf(a, '*');
  const bPatternIndex = StringPrototypeIndexOf(b, '*');
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