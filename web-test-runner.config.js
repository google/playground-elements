/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {playwrightLauncher} from '@web/test-runner-playwright';

// https://modern-web.dev/docs/test-runner/cli-and-configuration/
export default {
  rootDir: './',
  // Note this file list can be overridden by wtr command-line arguments.
  files: ['test/**/*_test.js'],
  nodeResolve: true,
  browsers: [
    playwrightLauncher({product: 'chromium'}),
    // TODO(aomarks) Firefix is flaky, with service worker 404s. Probably needs
    // to be addressed as part of
    // https://github.com/PolymerLabs/playground-elements/issues/39
    // playwrightLauncher({product: 'firefox'}),
    playwrightLauncher({product: 'webkit'}),
  ],
  browserStartTimeout: 30000, // default 30000
  testsStartTimeout: 20000, // default 10000
  testsFinishTimeout: 60000, // default 20000
  testFramework: {
    // https://mochajs.org/api/mocha
    config: {
      ui: 'tdd',
      timeout: '10000', // default 2000
    },
  },
};
