/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

const config = {
  testDir: 'src/test/playwright',
  // There is some flakiness, especially in webkit.
  //
  // TODO(aomarks) Investigate this further. Haven't been able to isolate the
  // flakes yet, but it could indicate a genuine problem.
  // https://github.com/google/playground-elements/issues/229
  retries: 3,
  // Not running both browsers at the same time helps with flakiness too. Could
  // this imply a race condition that is influenced by CPU load?
  workers: 1,
  // Defaults to 30 seconds. We shouldn't need that much time, and it's better
  // to fail fast and retry.
  timeout: 10000,
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
    // Webkit tests are *very* flakey compared to Chrome. Temporarily disabled.
    // {
    //   name: 'webkit',
    //   use: {
    //     browserName: 'webkit',
    //   },
    // },
    // Sadly playwright Firefox does not currently work with service workers at
    // all, see https://github.com/microsoft/playwright/issues/7288.
    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //   },
    // },
  ],
};
export default config;
