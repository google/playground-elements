/**
 * @license
 * Copyright 2017 Node.js contributors. All rights reserved.
 * SPDX-License-Identifier: MIT
 */

// This file is derived from
// https://github.com/nodejs/node/blob/a9dd03b1ec89a75186f05967fc76ec0704050c36/lib/internal/errors.js
// and adapted for use in playground-elements.

E(
  'ERR_INVALID_MODULE_SPECIFIER',
  (request, reason, base = undefined) => {
    return `Invalid module "${request}" ${reason}${
      base ? ` imported from ${base}` : ''
    }`;
  },
  TypeError
);

E(
  'ERR_INVALID_PACKAGE_CONFIG',
  (path, base, message) => {
    return `Invalid package config ${path}${
      base ? ` while importing ${base}` : ''
    }${message ? `. ${message}` : ''}`;
  },
  Error
);

E(
  'ERR_INVALID_PACKAGE_TARGET',
  (pkgPath, key, target, isImport = false, base = undefined) => {
    const relError =
      typeof target === 'string' &&
      !isImport &&
      target.length &&
      !StringPrototypeStartsWith(target, './');
    if (key === '.') {
      assert(isImport === false);
      return (
        `Invalid "exports" main target ${JSONStringify(target)} defined ` +
        `in the package config ${pkgPath}package.json${
          base ? ` imported from ${base}` : ''
        }${relError ? '; targets must start with "./"' : ''}`
      );
    }
    return `Invalid "${
      isImport ? 'imports' : 'exports'
    }" target ${JSONStringify(
      target
    )} defined for '${key}' in the package config ${pkgPath}package.json${
      base ? ` imported from ${base}` : ''
    }${relError ? '; targets must start with "./"' : ''}`;
  },
  Error
);

E(
  'ERR_PACKAGE_PATH_NOT_EXPORTED',
  (pkgPath, subpath, base = undefined) => {
    if (subpath === '.')
      return `No "exports" main defined in ${pkgPath}package.json${
        base ? ` imported from ${base}` : ''
      }`;
    return `Package subpath '${subpath}' is not defined by "exports" in ${pkgPath}package.json${
      base ? ` imported from ${base}` : ''
    }`;
  },
  Error
);
