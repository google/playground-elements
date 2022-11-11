/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'configurator/playground-configurator.js',
    output: {
      file: 'configurator/deploy/playground-configurator.js',
      format: 'esm',
    },
    plugins: [
      resolve(),
      terser({
        warnings: true,
        ecma: 2017,
        compress: {
          unsafe: true,
          passes: 2,
        },
        output: {
          comments: 'some',
        },
        mangle: {
          properties: false,
        },
      }),
      copy({
        targets: [
          {
            src: 'configurator/index.html',
            dest: 'configurator/deploy/',
          },
          {
            src: 'configurator/project',
            dest: 'configurator/deploy/',
          },
          {
            src: 'playground-typescript-worker.js',
            dest: 'configurator/deploy/',
          },
          {
            src: 'playground-service-worker.js',
            dest: 'configurator/deploy/',
          },
          {
            src: 'playground-service-worker-proxy.html',
            dest: 'configurator/deploy/',
          },
        ],
      }),
    ],
  },
];
