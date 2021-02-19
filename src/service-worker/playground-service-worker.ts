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
  ACKNOWLEDGE_SW_CONNECTION,
  CONNECT_SW_TO_PROJECT,
  MISSING_FILE_API,
  PlaygroundMessage,
  ServiceWorkerAPI,
  FileAPI,
} from '../shared/worker-api.js';
import {expose} from 'comlink';
import {Deferred} from '../shared/deferred.js';

declare var self: ServiceWorkerGlobalScope;

type SessionID = string;

/**
 * A collection of FileAPI objects registered by <playground-project> instances,
 * keyed by session ID.
 */
const fileAPIs = new Map<string, Deferred<FileAPI>>();

/**
 * API exposed to the UI thread via Comlink. The static methods on this class
 * become instance methods on SwControllerAPI.
 */
const workerAPI: ServiceWorkerAPI = {
  setFileAPI(fileAPI: FileAPI, sessionID: SessionID) {
    let deferred = fileAPIs.get(sessionID);
    if (deferred === undefined || deferred.resolved) {
      deferred = new Deferred();
      fileAPIs.set(sessionID, deferred);
    }
    deferred.resolve(fileAPI);
  },
};

const findSessionProxyClient = async (
  sessionId: string
): Promise<Client | undefined> => {
  for (const client of await self.clients.matchAll({
    includeUncontrolled: true,
  })) {
    const hash = new URL(client.url).hash;
    const hashParams = new URLSearchParams(hash.slice(1));
    if (hashParams.get('playground-session-id') === sessionId) {
      return client;
    }
  }
  return undefined;
};

const getFileApi = async (sessionId: string): Promise<FileAPI | undefined> => {
  let deferred = fileAPIs.get(sessionId);
  if (deferred !== undefined) {
    return deferred.promise;
  }
  // Find the proxy that manages this session, and tell it to connect us to the
  // session file API. Service Workers can stop and start at any time, clearing
  // global state. This kind of restart does _not_ count as a state change. The
  // only way we can tell this has happened is that a fetch occurs for a session
  // we don't know about.
  const client = await findSessionProxyClient(sessionId);
  if (client === undefined) {
    // This could happen if a user directly opened a playground URL after a
    // proxy iframe has been destroyed.
    return undefined;
  }
  deferred = new Deferred();
  fileAPIs.set(sessionId, deferred);
  const missingMessage: PlaygroundMessage = {type: MISSING_FILE_API};
  client.postMessage(missingMessage);
  return deferred.promise;
};

const getFile = async (_e: FetchEvent, path: string, sessionId: SessionID) => {
  const fileAPI = await getFileApi(sessionId);
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
  // Don't delegate to a server fetch. We know this request was within our
  // scope, so it's in our virtual filesystem, and we're within our rights to
  // force a 404 here. Who knows what the server would respond with.
  return new Response('404 playground file not found', {status: 404});
};

const onFetch = (e: FetchEvent) => {
  const url = e.request.url;
  if (url.startsWith(self.registration.scope)) {
    const {filePath, sessionId} = parseScopedUrl(url);
    if (sessionId !== undefined) {
      e.respondWith(getFile(e, filePath!, sessionId));
    }
  }
};

const parseScopedUrl = (url: string) => {
  const scope = self.registration.scope;
  // URLs in scope will be of the form: {scope}{sessionId}/{filePath}
  // scope is always a full URL prefix, including a trailing slash
  const sessionAndPath = url.substring(scope.length);
  const slashIndex = sessionAndPath.indexOf('/');
  let sessionId, filePath: string | undefined;
  if (slashIndex === -1) {
    console.warn(`Invalid sample file URL: ${url}`);
  } else {
    sessionId = sessionAndPath.slice(0, slashIndex);
    filePath = sessionAndPath.slice(slashIndex + 1);
  }
  return {
    sessionId,
    filePath,
  };
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

const onMessage = (
  e: Omit<ExtendableMessageEvent, 'data'> & {data: PlaygroundMessage}
) => {
  // Receive a handshake message from a page and setup Comlink.
  if (e.data.type === CONNECT_SW_TO_PROJECT) {
    const ack: PlaygroundMessage = {type: ACKNOWLEDGE_SW_CONNECTION};
    e.data.port.postMessage(ack);
    expose(workerAPI, e.data.port);
  }
};

self.addEventListener('fetch', onFetch);
self.addEventListener('activate', onActivate);
self.addEventListener('install', onInstall);
self.addEventListener('message', onMessage);
