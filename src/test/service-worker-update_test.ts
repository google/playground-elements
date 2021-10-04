/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, render} from 'lit';
import {readFile, writeFile} from '@web/test-runner-commands';
// import {pierce, waitUntilIframeContains} from './test-util.js';

import '../playground-project.js';
import '../playground-preview.js';

const RAND = String(Math.random());
const TEST_DIR = `temp/${RAND}/service-worker-update`;

const mustReadFile = async (path: string) => {
  const data = await readFile({path});
  if (!data) {
    throw new Error(`Could not read file ${path}`);
  }
  return data;
};

const writeServiceWorkerProxy = async () => {
  await writeFile({
    path: `${TEST_DIR}/playground-service-worker-proxy.html`,
    content: await mustReadFile('../playground-service-worker-proxy.html'),
  });
};

// const writeCurrentServiceWorker = async () => {
//   await writeFile({
//     path: `${TEST_DIR}/playground-service-worker.js`,
//     content: await mustReadFile('../playground-service-worker.js'),
//   });
// };

const extractHash = (swCode: string) => {
  const matches = [
    ...swCode.matchAll(/version:\s*(?<quote>["'`])(?<hex>[a-z0-9]+)\k<quote>/g),
  ];
  if (matches.length !== 1) {
    throw new Error(`Expected 1 hash match, got ${matches.length}`);
  }
  const hash = matches[0].groups?.hex;
  if (!hash) {
    throw new Error('Hash did not match');
  }
  return hash;
};

const writeOutdatedServiceWorker = async () => {
  const currentSw = await mustReadFile('../playground-service-worker.js');
  const hash = extractHash(currentSw);
  const outdatedSw = currentSw.replace(hash, 'outdated-hash');
  await writeFile({
    path: `${TEST_DIR}/playground-service-worker.js`,
    content: outdatedSw,
  });
};

suite('service worker update', () => {
  let container: HTMLDivElement;
  let abort: AbortController;

  // const assertPreviewContains = async (text: string) =>
  //   await waitUntilIframeContains(
  //     (await pierce('playground-preview', 'iframe')) as HTMLIFrameElement,
  //     text,
  //     abort.signal
  //   );

  setup(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    abort = new AbortController();
    await writeServiceWorkerProxy();
  });

  teardown(async () => {
    container.remove();
    abort.abort();
  });

  test('updates from outdated to current service worker', async () => {
    await writeOutdatedServiceWorker();

    await navigator.serviceWorker.register(
      `/test/${TEST_DIR}/playground-service-worker.js`,
      {
        scope: `/test/${TEST_DIR}/playground-elements`,
      }
    );

    // await writeCurrentServiceWorker();

    render(
      html`
        <playground-project id="p" sandbox-base-url="/test/temp">
          <script type="sample/html" filename="index.html">
            <body>
              <p>Hello</p>
            </body>
          </script>
        </playground-project>

        <playground-preview project="p"></playground-preview>
      `,
      container
    );

    // await assertPreviewContains('Hello');
  });
});
