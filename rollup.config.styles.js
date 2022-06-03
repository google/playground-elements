/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import litcss from 'rollup-plugin-lit-css';

export default [
  {
    input: 'playground-styles.css',
    output: {
      file: 'src/playground-styles.ts',
    },
    plugins: [litcss()],
  },
];
