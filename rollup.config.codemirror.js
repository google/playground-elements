/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import resolve from '@rollup/plugin-node-resolve';

import {maybeTerser} from './rollup.config.common.js';

function simpleReplace(replacements) {
  return {
    name: 'simple-replace',
    renderChunk(code) {
      for (const [from, to] of replacements) {
        code = code.replace(from, to);
      }
      return {code};
    },
  };
}


export default {
  input: 'src/_codemirror/codemirror-bundle.js',
  output: {
    file: '_codemirror/codemirror-bundle.js',
    format: 'esm',
    // CodeMirror doesn't include any @license or @preserve annotations on the
    // copyright headers, so terser doesn't know which comments need to be
    // preserved. Add it back with the annotation.
    banner: `/* @license CodeMirror, copyright (c) by Marijn Haverbeke and others
Distributed under an MIT license: https://codemirror.net/LICENSE */
`,
  },
  // TODO(aomarks) If we created and exported some module-scoped object as our
  // context, then we should be able to make a properly isolated ES module
  // here which doesn't set `window.CodeMirror`. However, there seems to be
  // some code in the `google_modes` files use a hard-coded `CodeMirror`
  // global instead of using the "global" variable that is passed into the
  // factory, so some extra patching/search-replacing would be required.
  context: 'window',
  plugins: [
    resolve(),
    simpleReplace([
      // Every CodeMirror file includes UMD-style tests to check for CommonJS
      // or AMD. Re-write these expressions directly to `false` so that we
      // always run in global mode, and terser will dead-code remove the other
      // branches.
      [/typeof exports ?===? ?['"`]object['"`]/g, 'false'],
      [/typeof define ?===? ?['"`]function['"`]/g, 'false'],
    ]),
    ...maybeTerser
  ],
};
