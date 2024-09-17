/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
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
import {serviceWorkerHash} from '../shared/version.js';

// eslint-disable-next-line no-var
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
    if (deferred === undefined || deferred.settled) {
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
  if (fileAPI === undefined) {
    return new Response('Playground project not available', {
      status: /* Service Unavailable */ 503,
    });
  }
  const fileOrError = await fileAPI.getFile(path);
  if ('status' in fileOrError) {
    const {body, status} = fileOrError;
    return new Response(body, {status});
  }
  const {content, contentType} = fileOrError;
  const headers = new Headers();
  // By default, a browser is only able to allocate a separate process or thread
  // for the Playground preview iframe if it is hosted on a different _site_
  // (protocol + top-level domain) from the parent window. For example, lit.dev
  // and playground.lit.dev are the same site, but different origins. By setting
  // this Origin-Agent-Cluster header, we additionally allow process isolation
  // for different origins even if they are same-site.
  //
  // Note that _all_ responses from the sandbox origin must include this header
  // in order isolation to be possible, because the browser persists the setting
  // based on the first response it gets from that origin, so users will also
  // need to configure their HTTP server's response headers, since this line
  // only affects responses handled by the the service worker, and not e.g. the
  // service worker script itself.
  //
  // See:
  // https://web.dev/origin-agent-cluster/
  // https://html.spec.whatwg.org/multipage/origin.html#origin-keyed-agent-clusters
  headers.set('Origin-Agent-Cluster', '?1');
  if (contentType) {
    headers.set('Content-Type', contentType);
  }
  return new Response(content, {headers});
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
  // URLs in scope will be of the form: {scope}{sessionId}/{filePath}. Scope is
  // always a full URL prefix, including a trailing slash. Strip query params or
  // else the filename won't match.
  const sessionAndPath = url.substring(scope.length).split('?')[0];
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
  void self.skipWaiting();
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
    const ack: PlaygroundMessage = {
      type: ACKNOWLEDGE_SW_CONNECTION,
      version: serviceWorkerHash,
    };
    e.data.port.postMessage(ack);
    expose(workerAPI, e.data.port);
  }
};

self.addEventListener('fetch', onFetch);
self.addEventListener('activate', onActivate);
self.addEventListener('install', onInstall);
self.addEventListener('message', onMessage);
