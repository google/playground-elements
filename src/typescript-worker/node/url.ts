/**
 * @license
 * Copyright 2016 Node.js contributors. All rights reserved.
 * SPDX-License-Identifier: MIT
 */

// This file is derived from
// https://github.com/nodejs/node/blob/a9dd03b1ec89a75186f05967fc76ec0704050c36/lib/internal/url.js
// and adapted for use in playground-elements.

function fileURLToPath(path) {
    if (typeof path === 'string')
      path = new URL(path);
    else if (!isURLInstance(path))
      throw new ERR_INVALID_ARG_TYPE('path', ['string', 'URL'], path);
    if (path.protocol !== 'file:')
      throw new ERR_INVALID_URL_SCHEME('file');
    return isWindows ? getPathFromURLWin32(path) : getPathFromURLPosix(path);
  }
  