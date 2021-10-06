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

  window.addEventListener(
    'message',
    (event: MessageEvent<PlaygroundMessage>) => {
      if (event.data.type === UPDATE_SERVICE_WORKER) {
        // When the project handshakes with the service worker, it may notice a
        // version mismatch, in which case it will send this message to request
        // the service worker update.
        //
        // Calling update triggers a fetch of the service worker. If the scripts
        // are byte-different, then it will be installed + activated, and we'll
        // receive the "updatefound" even there. Note this is exactly the normal
        // Service Worker update lifecycle, it's just that calling update()
        // forces it to happen immediately, as opposed to at some unknown
        // opportunistic time in the future.
        //
        // TODO(aomarks) It would be good to show an error to the user somehow
        // if we never end up getting a new version here. That would indicate
        // that the SW and project are out of date *on the server*.
        registration.update();
      }
    }
  );

  const connect = (sw: ServiceWorker) => {
    const {port1, port2} = new MessageChannel();

    const projectMessage: PlaygroundMessage = {
      type: CONNECT_PROJECT_TO_SW,
      port: port1,
    };
    parentPort.postMessage(projectMessage, [projectMessage.port]);

    const swMessage: PlaygroundMessage = {
      type: CONNECT_SW_TO_PROJECT,
      port: port2,
    };
    sw.postMessage(swMessage, [swMessage.port]);
  };

  registration.addEventListener('updatefound', () => {
    // We can get a new service worker at any time, so we need to listen for
    // updates and connect to new workers on demand.
    if (registration.installing) {
      connect(registration.installing);
    }
  });

  navigator.serviceWorker.addEventListener(
    'message',
    (event: MessageEvent<PlaygroundMessage>) => {
      if (event.data.type === MISSING_FILE_API && registration.active) {
        // A fetch was made for a session that the service worker doesn't have a
        // file API for. Most likely the service worker was stopped and lost its
        // state, as can happen at any time. The fetch re-awakened it, and now
        // the fetch is waiting for us to re-connect.
        connect(registration.active);
      }
    }
  );

  if (registration.active) {
    connect(registration.active);
  }
})();
