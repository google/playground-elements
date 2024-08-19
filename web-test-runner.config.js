/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {playwrightLauncher} from '@web/test-runner-playwright';
import {fakeCdnPlugin} from './test/fake-cdn-plugin.js';
import {startDevServer} from '@web/dev-server';

// For some tests we want a separate origin to use as the sandbox-base-url.
const separateOriginServer = await startDevServer({
  config: {
    rootDir: './',
    nodeResolve: true,
  },
});

// This plugin lets our tests discover the origin (this way we don't have to
// hard-code a port and assume it is available).
const separateOriginPlugin = () => ({
  name: 'separate-origin-plugin',
  executeCommand({command}) {
    if (command === 'separate-origin') {
      const {hostname, port} = separateOriginServer.config;
      return `http://${hostname}:${port}/`;
    }
  },
});

// https://modern-web.dev/docs/test-runner/cli-and-configuration/
export default {
  rootDir: './',
  // Note this file list can be overridden by wtr command-line arguments.
  files: ['test/**/*_test.js'],
  nodeResolve: true,
  browsers: [
    playwrightLauncher({product: 'chromium'}),
    playwrightLauncher({product: 'webkit'}),
    playwrightLauncher({product: 'firefox'}),
  ],
  concurrentBrowsers: Number(process.env.CONCURRENT_BROWSERS) || 2, // default 2
  browserStartTimeout: 30000, // default 30000
  testsStartTimeout: 20000, // default 10000
  testsFinishTimeout: 120000, // default 20000
  testFramework: {
    // https://mochajs.org/api/mocha
    config: {
      ui: 'tdd',
      timeout: '30000', // default 2000
    },
  },
  plugins: [fakeCdnPlugin(), separateOriginPlugin()],
  filterBrowserLogs: ({args}) =>
    // This warning will always happen because we use the same local server for
    // the elements and the service worker, and that's fine.
    !args.join('').includes('executing with the same origin as its parent'),
};
