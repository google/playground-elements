/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {test, expect} from '@playwright/test';
import {startDevServer} from '@web/dev-server';
import {readFile} from 'fs/promises';
// eslint-disable-next-line import/extensions
import {Deferred} from '../../shared/deferred.js';

import type {Page} from 'playwright';
import type {DevServer, Plugin} from '@web/dev-server-core';

const indexHtml = `
<!DOCTYPE html>
<html>
  <body>
    <script type="module">
      import './playground-project.js';
      import './playground-preview.js';
    </script>

    <playground-project id="p" sandbox-base-url=".">
      <script type="sample/html" filename="index.html">
        index.html
      </script>
    </playground-project>

    <playground-preview project="p">
    </playground-preview>
  </body>
</html>
`;

test.describe('service worker', () => {
  let server: DevServer;
  let indexUrl: string;
  let originalSwCode: string;
  let originalSwVersion: string;

  /**
   * When serving the service worker script, substitute the entire script for
   * the given code.
   */
  const setServiceWorkerCode = (code: string) => {
    swCode = code;
  };
  let swCode: string;

  /**
   * When serving the service worker script, substitute the given version in
   * place of the real one.
   */
  const setServiceWorkerVersion = (version: string) => {
    swVersion = version;
  };
  let swVersion: string;

  /**
   * When serving component code, substitute the given expected service worker
   * version in place of the real one.
   */
  const setExpectedVersion = (version: string) => {
    expectedVersion = version;
  };
  let expectedVersion: string;

  const setServiceWorkerAndExpectedVersion = (version: string) => {
    setServiceWorkerVersion(version);
    setExpectedVersion(version);
  };

  /**
   * Return a proimse that resolves the next time the service worker is served.
   */
  const serviceWorkerServed = () => serviceWorkerServedDeferred.promise;
  let serviceWorkerServedDeferred = new Deferred<void>();

  test.beforeAll(async () => {
    originalSwCode = await readFile('./playground-service-worker.js', 'utf8');

    const versionPattern =
      /version:\s*(?<quote>["'`])(?<hex>[a-z0-9]+)\k<quote>/g;
    const versionMatches = [...originalSwCode.matchAll(versionPattern)];
    if (versionMatches.length !== 1) {
      throw new Error(
        'Expected 1 version string in playground-service-worker.js. ' +
          `Found ${versionMatches.length}.`
      );
    }
    const hex = versionMatches[0].groups?.['hex'];
    if (!hex) {
      throw new Error('Could not find "hex" capture group in regexp match.');
    }
    originalSwVersion = hex;

    const plugin: Plugin = {
      name: 'test-plugin',

      serve(ctx) {
        if (ctx.path === '/') {
          return indexHtml;
        }
        return undefined;
      },

      transform(ctx) {
        let body = ctx.body as string;
        if (typeof body !== 'string') {
          throw new Error('Expected string body');
        }
        if (ctx.path.endsWith('playground-service-worker.js')) {
          body = swCode
            .replace(originalSwVersion, swVersion)
            // Extreme hack! We need some way to check which service worker
            // served a response. Prepend the version into all responses.
            .replace(/new Response\(/g, `new Response("${swVersion} "+`);
          serviceWorkerServedDeferred.resolve();
          serviceWorkerServedDeferred = new Deferred();
        } else {
          body = body.replace(originalSwVersion, expectedVersion);
        }
        return {body};
      },

      transformCacheKey() {
        // By default @web/dev-server will cache transformed responses in memory
        // based purely on the request path. We need to override this because
        // [1] we serve varying responses for the same path, and [2] we want to
        // observe every response so we can resolve a promise.
        return String(Math.random());
      },
    };

    server = await startDevServer({
      config: {
        rootDir: '.',
        nodeResolve: true,
        plugins: [plugin],
      },
    });
    indexUrl = `http://localhost:${server.config.port}/`;
  });

  test.beforeEach(() => {
    setServiceWorkerCode(originalSwCode);
    setServiceWorkerAndExpectedVersion(originalSwVersion);
    serviceWorkerServedDeferred = new Deferred();
  });

  test.afterAll(async () => {
    await server.stop();
  });

  const getIframeBodyText = async (page: Page): Promise<string> => {
    const iframe = await page.waitForSelector('playground-preview iframe');
    const contentFrame = await iframe.contentFrame();
    if (contentFrame === null) {
      throw new Error('iframe had null contentFrame');
    }
    const bodyText = await contentFrame.textContent('body');
    if (bodyText === null) {
      throw new Error('contentFrame had null body text');
    }
    return bodyText;
  };

  const expectIframeServesVersion = async (
    page: Page,
    version: string
  ): Promise<void> => {
    const text = await getIframeBodyText(page);
    expect(text).toEqual(`${version} index.html`);
  };

  const clickReloadButton = async (page: Page): Promise<void> => {
    await page.click('#reload-button');
  };

  const expectConsoleLog = (page: Page, expect: string): Promise<void> =>
    new Promise((resolve) =>
      page.on('console', async (msg) => {
        const text = await msg.text();
        if (text === expect) {
          resolve();
        }
      })
    );

  test('simple fresh load', async ({browser}) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();

    setServiceWorkerAndExpectedVersion('new');
    await page.goto(indexUrl);
    await expectIframeServesVersion(page, 'new');
  });

  test('updates after tab reload', async ({browser}) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();

    setServiceWorkerAndExpectedVersion('old');
    await page.goto(indexUrl);
    await expectIframeServesVersion(page, 'old');

    setServiceWorkerAndExpectedVersion('new');
    await page.reload();
    await expectIframeServesVersion(page, 'new');
  });

  test('two tabs at same version', async ({browser}) => {
    const ctx = await browser.newContext();
    const page1 = await ctx.newPage();
    const page2 = await ctx.newPage();

    setServiceWorkerAndExpectedVersion('new');
    await page1.goto(indexUrl);
    await page2.goto(indexUrl);
    await expectIframeServesVersion(page1, 'new');
    await expectIframeServesVersion(page2, 'new');
  });

  test('two tabs both update after tab reload', async ({browser}) => {
    const ctx = await browser.newContext();
    const page1 = await ctx.newPage();
    const page2 = await ctx.newPage();

    setServiceWorkerAndExpectedVersion('old');
    await page1.goto(indexUrl);
    await page2.goto(indexUrl);
    await expectIframeServesVersion(page1, 'old');
    await expectIframeServesVersion(page2, 'old');

    setServiceWorkerAndExpectedVersion('new');
    await page1.reload();
    await page2.reload();
    await expectIframeServesVersion(page1, 'new');
    await expectIframeServesVersion(page2, 'new');
  });

  test('two tabs at different versions', async ({browser}) => {
    const ctx = await browser.newContext();
    const page1 = await ctx.newPage();
    const page2 = await ctx.newPage();

    setServiceWorkerAndExpectedVersion('old');
    await page1.goto(indexUrl);
    await page2.goto(indexUrl);
    await expectIframeServesVersion(page1, 'old');
    await expectIframeServesVersion(page2, 'old');

    setServiceWorkerAndExpectedVersion('new');
    await page1.reload();
    await expectIframeServesVersion(page1, 'new');

    // The other tab can still keep using the old version because the new one is
    // one a different scope and not contending for the same URL space.
    await clickReloadButton(page2);
    await expectIframeServesVersion(page2, 'old');
  });

  test('recover from outdated service worker', async ({browser}) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();

    setServiceWorkerVersion('old');

    const oldServedAndNewSwappedIn = (async () => {
      await serviceWorkerServed();
      setServiceWorkerVersion('new');
    })();

    setExpectedVersion('new');
    const loggedAboutUpdate = expectConsoleLog(
      page,
      'Playground service worker is outdated. Want new but got old. Waiting for update.'
    );
    await page.goto(indexUrl);
    await oldServedAndNewSwappedIn;
    await loggedAboutUpdate;
    await expectIframeServesVersion(page, 'new');
  });
});
