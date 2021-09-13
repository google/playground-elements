/**
 * @license
 * Copyright 2016 Node.js contributors. All rights reserved.
 * SPDX-License-Identifier: MIT
 */

// This file is derived from
// https://github.com/nodejs/node/blob/a9dd03b1ec89a75186f05967fc76ec0704050c36/lib/internal/url.js
// and adapted for use in playground-elements.

export function fileURLToPath(path: URL | string): string {
  if (typeof path === 'string') {
    path = new URL(path);
  }
  if (path.protocol !== 'file:') {
    throw new Error('The URL must be of scheme file');
  }
  return path.pathname;
}
