/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import resolve from '@rollup/plugin-node-resolve';
import {maybeTerser} from './rollup.config.common.js';

export default {
  input: 'typescript-worker/playground-typescript-worker.js',
  output: {
    file: 'playground-typescript-worker.js',
    format: 'iife',
    exports: 'none',
  },
  plugins: [resolve(), ...maybeTerser],
};
