/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import commonjs from '@rollup/plugin-commonjs';

/**
 * This Rollup config generates a JS module version of typescript from its
 * CommonJS version.
 *
 * It's generated separately from the main Rollup config because it is an input
 * to bundles generated there. We could also run this commonjs transform in the
 * main Rollup config, but having a genuine module in the sources makes a few
 * things easier:
 *
 * - We can import it into tests without also having to configure the commonjs
 *   transform there. @web/test-runner does support running the commonjs Rollup
 *   plugin, but for some reason it was still erroring.
 *
 * - The development loop generating the worker bundle is slightly faster,
 *   because we don't need to run the commonjs transform every time we build the
 *   worker.
 *
 * - We may want to use module imports in the worker at some point, for a faster
 *   development mode that doesn't bundle. Having only module sources will make
 *   this easier too.
 */
export default [
  {
    input: 'node_modules/typescript/lib/typescript.js',
    output: {
      file: 'internal/typescript.js',
      format: 'esm',
    },
    plugins: [
      commonjs({
        ignore: (id) => true,
      }),
    ],
  },
];
