/**
 * @license
 * Copyright 2017 Node.js contributors. All rights reserved.
 * SPDX-License-Identifier: MIT
 */

// This file is derived from
// https://github.com/nodejs/node/blob/a9dd03b1ec89a75186f05967fc76ec0704050c36/lib/internal/errors.js
// and adapted for use in playground-elements.

import {fileURLToPath} from './url.js';
import {PackageExportsTarget} from '../util.js';

export class InvalidModuleSpecifierError extends Error {
  constructor(request: string, reason: string, base?: string) {
    super(
      `Invalid module "${request}" ${reason}${
        base ? ` imported from ${base}` : ''
      }`
    );
  }
}

export class InvalidPackageConfigError extends Error {
  constructor(path: string, base: string, message: string) {
    super(
      `Invalid package config ${path}${base ? ` while importing ${base}` : ''}${
        message ? `. ${message}` : ''
      }`
    );
  }
}

export class InvalidPackageTargetError extends Error {
  constructor(
    pkgPath: URL,
    key: string,
    target: PackageExportsTarget,
    isImport = false,
    base?: string
  ) {
    const relError =
      typeof target === 'string' &&
      !isImport &&
      target.length &&
      !target.startsWith('./');
    let msg;
    if (key === '.') {
      msg =
        `Invalid "exports" main target ${JSON.stringify(target)} defined ` +
        `in the package config ${fileURLToPath(pkgPath)}package.json${
          base ? ` imported from ${base}` : ''
        }${relError ? '; targets must start with "./"' : ''}`;
    } else {
      msg = `Invalid "${
        isImport ? 'imports' : 'exports'
      }" target ${JSON.stringify(
        target
      )} defined for '${key}' in the package config ${fileURLToPath(
        pkgPath
      )}package.json${base ? ` imported from ${base}` : ''}${
        relError ? '; targets must start with "./"' : ''
      }`;
    }
    super(msg);
  }
}
export class PackagePathNotExportedError extends Error {
  constructor(pkgPath: string, subpath: string, base?: string) {
    if (subpath === '.') {
      super(
        `No "exports" main defined in ${pkgPath}package.json${
          base ? ` imported from ${base}` : ''
        }`
      );
    } else {
      super(
        `Package subpath '${subpath}' is not defined by "exports" in ${pkgPath}package.json${
          base ? ` imported from ${base}` : ''
        }`
      );
    }
  }
}
