/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import resolve from '@rollup/plugin-node-resolve';
import {maybeTerser} from './rollup.config.common.js';
import * as path from 'path';

const internalTypescriptPath = path.resolve(process.cwd(), 'internal/typescript.js');

export default {
  input: 'playground-typescript-worker-entrypoint.js',
  external(id, parentId, isResolved) {
    if (!isResolved && parentId !== undefined) {
      id = path.resolve(path.dirname(parentId), id);
    }
    return id === internalTypescriptPath;
  },
  output: {
    file: 'playground-typescript-worker.js',
    format: 'esm',
    exports: 'none',
  },
  plugins: [resolve(), ...maybeTerser],
};
