/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {playwrightLauncher} from '@web/test-runner-playwright';
import {puppeteerLauncher} from '@web/test-runner-puppeteer';
import {fakeCdnPlugin} from './test/fake-cdn-plugin.js';

// https://modern-web.dev/docs/test-runner/cli-and-configuration/
export default {
  rootDir: './',
  // Note this file list can be overridden by wtr command-line arguments.
  files: ['test/**/*_test.js'],
  nodeResolve: true,
  browsers: [
    playwrightLauncher({product: 'chromium'}),
    playwrightLauncher({product: 'webkit'}),
    // Playwright Firefox does not seem to work at all with Service Workers. The
    // issue can be reproduced by launching Firefox with flag "-juggler 0". So
    // for now we'll use Puppeteer for Firefox.
    //
    // Also note we can't use Puppeteer for both Chromium and Firefox, because
    // only one or the other can be installed at once (see our "postinstall" NPM
    // script). See
    // https://modern-web.dev/docs/test-runner/browser-launchers/puppeteer/.
    //
    // TODO(aomarks) Look into this a little more and file an issue on
    // Playwright (or Firefox).
    puppeteerLauncher({launchOptions: {product: 'firefox'}}),
  ],
  browserStartTimeout: 30000, // default 30000
  testsStartTimeout: 20000, // default 10000
  testsFinishTimeout: 60000, // default 20000
  testFramework: {
    // https://mochajs.org/api/mocha
    config: {
      ui: 'tdd',
      timeout: '30000', // default 2000
    },
  },
  plugins: [fakeCdnPlugin()],
  filterBrowserLogs: ({args}) =>
    // This warning will always happen because we use the same local server for
    // the elements and the service worker, and that's fine.
    !args.join('').includes('executing with the same origin as its parent'),
};
