/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import resolve from '@rollup/plugin-node-resolve';
import {maybeTerser} from './rollup.config.common.js';

const resolveTypeScript = () => {
  return {
    resolveId: (file) => {
      if (file.startsWith('../../packages/typescript/')) {
        return file.slice('../../'.length);
      }
    },
  };
}

export default {
  input: 'typescript-worker/playground-typescript-worker.js',
  output: {
    file: 'playground-typescript-worker.js',
    format: 'iife',
    exports: 'none',
  },
  plugins: [resolveTypeScript(), resolve(), ...maybeTerser],
};
