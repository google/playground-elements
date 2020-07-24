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
import { endWithSlash } from '../shared/util.js';
import { expose } from 'comlink';

declare var self: ServiceWorkerGlobalScope;

/**
 * API exposed to the UI thread via Comlink. The static methods on this class
 * become instance methods on SwControllerAPI.
 */
const workerAPI: ServiceWorkerAPI = {
  setFileAPI(fileAPI: FileAPI, sessionID: string) {
    fileAPIs.set(sessionID, fileAPI);
  },
};

const fileAPIs = new Map<string, FileAPI>();
const getFile = async (e: FetchEvent, path: string, sessionId: string) => {
  const fileAPI = fileAPIs.get(sessionId);
  if (fileAPI) {
    const file = await fileAPI.getFile(path);
    if (file) {
      const headers = file.contentType
        ? { 'Content-Type': file.contentType }
        : undefined;
      return new Response(file.content, { headers });
    }
  }
  return fetch(e.request);
};

const onFetch = (e: FetchEvent) => {
  const url = new URL(e.request.url);
  const href = url.href;
  const scope = endWithSlash(self.registration.scope);
  if (href.startsWith(scope)) {
    const fullPath = href.substring(scope.length);
    const fullPathParts = fullPath.split('/');
    const sessionId = fullPathParts.shift();
    if (!sessionId) {
      return;
    }
    const path = fullPathParts.join('/');
    e.respondWith(getFile(e, path, sessionId));
  }
};

const onInstall = (_e: Event) => {
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
