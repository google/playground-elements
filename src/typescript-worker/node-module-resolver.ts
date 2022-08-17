/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {packageExportsResolve} from './node/resolve.js';
import {NpmFileLocation, PackageJson, PackageJsonWithExports} from './util.js';

/**
 * Resolves a path according to the Node package exports algorithm.
 *
 * Documentation:
 *
 *   Node: https://nodejs.org/api/packages.html#packages_package_entry_points
 *   Rollup: https://github.com/rollup/plugins/tree/master/packages/node-resolve/#package-entrypoints
 *   Webpack: https://webpack.js.org/guides/package-exports/
 *
 * Reference implementations:
 *
 *   Node: https://github.com/nodejs/node/blob/a9dd03b1ec89a75186f05967fc76ec0704050c36/lib/internal/modules/esm/resolve.js#L615
 *   Rollup:
 * https://github.com/rollup/plugins/blob/53fb18c0c2852598200c547a0b1d745d15b5b487/packages/node-resolve/src/package/resolvePackageImportsExports.js#L6
 */
export class NodeModuleResolver {
  private readonly _conditions: Set<string>;

  constructor({conditions}: {conditions: string[]}) {
    this._conditions = new Set(conditions);
  }

  /**
   * @param location Package/version/path to resolve.
   * @param packageJson The package's package.json (parsed object, not string).
   * @param base Path of the importing module, used for error messages (e.g.
   * "./my-element.js").
   * @return The resolved subpath.
   * @throws If the given subpath could not be resolved.
   */
  resolve(
    location: NpmFileLocation,
    packageJson: PackageJson,
    base: string
  ): string {
    const packageSubpath = addRelativePrefix(location.path);

    if (packageJson.exports === undefined) {
      if (packageSubpath === '.') {
        if (packageJson.module !== undefined) {
          return removeRelativePrefix(packageJson.module);
        }
        if (packageJson.main !== undefined) {
          return removeRelativePrefix(packageJson.main);
        }
        return 'index.js';
      }
      return location.path;
    }

    // Node's resolve functions works with file:// URLs. It doesn't really
    // matter what we use as the base, but let's make one that matches the
    // Playground URL space for dependencies, so that errors make sense.
    const packageBase = `/node_modules/${location.pkg}@${location.version}/`;
    const packageJsonUrl = new URL(packageBase, 'file://');

    const resolved = packageExportsResolve(
      packageJsonUrl,
      packageSubpath,
      packageJson as PackageJsonWithExports,
      base,
      this._conditions
    );
    if (!resolved.pathname.startsWith(packageBase)) {
      throw new Error(
        `Unexpected error: ${resolved.pathname} expected to start with ${packageBase}`
      );
    }
    return resolved.pathname.slice(packageBase.length);
  }
}

/**
 * Convert e.g. "" to "." and "foo.js" to "./foo.js".
 */
const addRelativePrefix = (path: string): string => {
  if (path === '') {
    return '.';
  }
  if (!path.startsWith('.') && !path.startsWith('/')) {
    return './' + path;
  }
  return path;
};

/**
 * Convert e.g. "." to "" and "./foo.js" to "foo.js".
 */
const removeRelativePrefix = (path: string): string => {
  if (path === '.') {
    return '';
  }
  if (path.startsWith('./')) {
    return path.slice(2);
  }
  return path;
};
