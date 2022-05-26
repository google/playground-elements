/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import resolve from '@rollup/plugin-node-resolve';
import * as fs from 'fs';
import {maybeTerser} from './rollup.config.common.js';

/**
 * Rollup plugin which generates an HTML file with all input JavaScript
 * bundles inlined into script tags.
 */
function inlineHtml(htmlOutPath) {
  return {
    name: 'inline-html',
    generateBundle: async (_outputOptions, bundles, isWrite) => {
      if (!isWrite) {
        return;
      }
      const scripts = [];
      for (const [name, bundle] of Object.entries(bundles)) {
        scripts.push(`<script type="module">${bundle.code.trim()}</script>`);
        // Don't emit the input bundle as its own file.
        delete bundles[name];
      }
      const html = `<!doctype html>${scripts.join('')}`;
      await fs.promises.writeFile(htmlOutPath, html, 'utf8');
    },
  };
}

export default [
  // Generate playground-service-worker-proxy.html, the HTML file + inline
  // script that proxies between a project and a service worker on a possibly
  // different origin.
  {
    input: 'playground-service-worker-proxy.js',
    output: {
      file: 'playground-service-worker-proxy-temp-bundle.js',
      format: 'esm',
    },
    plugins: [
      ...maybeTerser,
      inlineHtml('playground-service-worker-proxy.html'),
    ],
  },
  {
    input: 'service-worker/playground-service-worker.js',
    output: {
      file: 'playground-service-worker.js',
      format: 'iife',
      exports: 'none',
    },
    plugins: [resolve(), ...maybeTerser],
  }
];
