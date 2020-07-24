/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
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

import {
  HANDSHAKE_RECEIVED,
  ESTABLISH_HANDSHAKE,
  ServiceWorkerAPI,
  FileAPI,
} from '../shared/worker-api.js';
import {endWithSlash} from '../shared/util.js';
import {expose} from 'comlink';

declare var self: ServiceWorkerGlobalScope;

type SessionID = string;

/**
 * API exposed to the UI thread via Comlink. The static methods on this class
 * become instance methods on SwControllerAPI.
 */
const workerAPI: ServiceWorkerAPI = {
  setFileAPI(fileAPI: FileAPI, sessionID: SessionID) {
    console.log(`Setting FileAPI for session ${sessionID}`);
    fileAPIs.set(sessionID, fileAPI);
  },
};

/**
 * A collection of FileAPI objects registered by <code-sample-editor> instances,
 * keyed by session ID.
 */
const fileAPIs = new Map<SessionID, FileAPI>();
const getFile = async (e: FetchEvent, path: string, sessionId: SessionID) => {
  const fileAPI = fileAPIs.get(sessionId);
  if (fileAPI) {
    const file = await fileAPI.getFile(path);
    if (file) {
      const headers = file.contentType
        ? {'Content-Type': file.contentType}
        : undefined;
      return new Response(file.content, {headers});
    }
  } else {
    console.warn(`No FileAPI for session ${sessionId}`);
  }
  return fetch(e.request);
};

const onFetch = (e: FetchEvent) => {
  const url = e.request.url;
  const scope = endWithSlash(self.registration.scope);
  if (url.startsWith(scope)) {
    const fullPath = url.substring(scope.length);
    const slashIndex = fullPath.indexOf('/');
    const sessionId = fullPath.slice(0, slashIndex);
    const path = fullPath.slice(slashIndex + 1);
    if (!sessionId) {
      return;
    }
    e.respondWith(getFile(e, path, sessionId));
  }
};

const onInstall = () => {
  // Force this service worker to become the active service worker, in case
  // it's an updated worker and waiting.
  self.skipWaiting();
};

const onActivate = (event: ExtendableEvent) => {
  // Make sure active clients use this service worker instance without being
  // reloaded.
  event.waitUntil(self.clients.claim());
};

const onMessage = (e: ExtendableMessageEvent) => {
  // Receive a handshake message from a page and setup Comlink.
  if (e.data.initComlink === ESTABLISH_HANDSHAKE) {
    (e.data.port as MessagePort).postMessage({
      initComlink: HANDSHAKE_RECEIVED,
    });
    expose(workerAPI, e.data.port);
  }
};

self.addEventListener('fetch', onFetch);
self.addEventListener('activate', onActivate);
self.addEventListener('install', onInstall);
self.addEventListener('message', onMessage);
