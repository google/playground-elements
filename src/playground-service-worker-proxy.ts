/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  PlaygroundMessage,
  CONNECT_SW_TO_PROJECT,
  CONNECT_PROJECT_TO_SW,
  CONFIGURE_PROXY,
  MISSING_FILE_API,
  UPDATE_SERVICE_WORKER,
} from './shared/worker-api.js';

(async () => {
  try {
    // Note we detect same-origin here by actually trying to access the parent
    // window. We can't trust the parent to compare the origins of the URLs,
    // because a redirect could have lead us back to the same origin.
    parent.window.console.warn(
      'Playground sandbox is executing with the same origin as its parent.',
      'This is a security risk.',
      'https://github.com/google/playground-elements#sandbox-security'
    );
    // eslint-disable-next-line no-empty
  } catch {}

  // Wait for our parent to send us:
  // 1. The URL and scope of the Service Worker to register.
  // 2. A MessagePort, on which we'll forward up new Service Worker ports.
  const {
    url,
    scope,
    port: parentPort,
  } = await new Promise<{
    url: string;
    scope: string;
    port: MessagePort;
  }>((resolve) => {
    const listener = (event: MessageEvent<PlaygroundMessage>) => {
      if (event.data.type === CONFIGURE_PROXY) {
        window.removeEventListener('message', listener);
        resolve(event.data);
      }
    };
    window.addEventListener('message', listener);
  });

  const registration = await navigator.serviceWorker.register(
    new URL(url, import.meta.url).href,
    {scope}
  );

  /** https://www.w3.org/TR/service-workers/#get-newest-worker-algorithm */
  const getNewestWorker = () =>
    registration.installing ?? registration.waiting ?? registration.active;

  /** The service worker we most recently connected to. */
  let newest: ServiceWorker | null = null;

  /**
   * Resolve when the given service worker reaches its activated state.
   */
  const activated = async (sw: ServiceWorker): Promise<void> => {
    if (sw.state === 'activated') {
      return;
    }
    return new Promise<void>((resolve) => {
      const aborter = new AbortController();
      sw.addEventListener(
        'statechange',
        () => {
          if (sw.state === 'activated') {
            resolve();
            aborter.abort();
          }
        },
        {signal: aborter.signal}
      );
    });
  };

  const connectToNewest = async () => {
    const sw = getNewestWorker();
    newest = sw;
    if (sw === null) {
      // Can't find a way to reproduce this scenario, possibly can't happen.
      console.error('No playground service worker found.');
      return;
    }

    // Don't connect to the project until the service worker is activated.
    // Otherwise the project might try to load a preview before the service
    // worker is actively controlling the preview's URL space.
    await activated(sw);
    if (sw !== newest) {
      // A new service worker appeared while we were waiting.
      return;
    }

    const {port1, port2} = new MessageChannel();
    const projectMessage: PlaygroundMessage = {
      type: CONNECT_PROJECT_TO_SW,
      port: port1,
    };
    parentPort.postMessage(projectMessage, [port1]);
    const swMessage: PlaygroundMessage = {
      type: CONNECT_SW_TO_PROJECT,
      port: port2,
    };
    sw.postMessage(swMessage, [port2]);
  };

  connectToNewest();

  registration.addEventListener('updatefound', () => {
    // We can get a new service worker at any time, so we need to listen for
    // updates and connect to new workers on demand.
    //
    // Note this event fires on the very first install, but in that case we've
    // already called connectToNewest, so this conditional guards against a
    // double connect.
    if (registration.installing !== newest) {
      connectToNewest();
    }
  });

  // A message from the service worker.
  navigator.serviceWorker.addEventListener(
    'message',
    (event: MessageEvent<PlaygroundMessage>) => {
      if (event.source !== newest) {
        // Ignore messages from outdated service workers.
        return;
      }
      if (event.data.type === MISSING_FILE_API) {
        // A fetch was made for a session that the service worker doesn't have a
        // file API for. Most likely the service worker was stopped and lost its
        // state, as can happen at any time. The fetch re-awakened it, and now
        // the fetch is waiting for us to re-connect.
        connectToNewest();
      }
    }
  );

  // A message from the project.
  window.addEventListener(
    'message',
    async (event: MessageEvent<PlaygroundMessage>) => {
      if (event.data.type === UPDATE_SERVICE_WORKER) {
        // When the project handshakes with the service worker, it may notice a
        // version mismatch, and will send this message to request an update.
        const newestBefore = getNewestWorker();
        await registration.update();
        if (getNewestWorker() === newestBefore) {
          // The update() promise resolves when the check has finished, but it
          // might not have actually found a new service worker. In that case,
          // maybe one of these things happened:
          //
          // - The project code is outdated so the page needs to be reloaded.
          // - The server(s) are returning mismatched versions.
          // - A caching issue is preventing the new version from being fetched.
          //
          // TODO(aomarks) Show a more prominent error directly on the preview
          // prompting the user to reload the page. Otherwise it will just spin
          // forever.
          console.error('Playground service worker update failed.');
        }
      }
    }
  );
})();
