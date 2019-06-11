import { MESSAGE_TYPES, Message, FileRecord } from './lib/types';
import { endWithSlash } from './lib/util';
import * as Comlink from 'comlink';

const swScope = self as ServiceWorkerGlobalScope;

const recieveMessageChannelHandshake = (e: MessageEvent) => {
  const ports = e.ports;
  if (ports && ports[0]) {
    const port = ports[0];
    port.start();
    const handshakeReceivedMessage: Message = {
      type: MESSAGE_TYPES.HANDSHAKE_RECEIVED,
    }
    Comlink.expose(SwController, port);
    port.postMessage(handshakeReceivedMessage);
  }
}

interface ResponseParams {
  content: string,
  init: ResponseInit
}

let fileResponseMap = new Map<string, Map<string, ResponseParams>>();

const onFetch = (e: FetchEvent) => {
  if (!e.request || !e.request.url || !e.respondWith) {
    return;
  }
  const url = new URL(e.request.url);
  const href = url.href;
  const scope = endWithSlash(swScope.registration.scope);
  if (href.startsWith(scope)) {
    const fullPath = href.substring(scope.length);
    const fullPathParts = fullPath.split('/');
    const sessionId = fullPathParts.shift();
    if (!sessionId) {
      return;
    }
    const path = fullPathParts.join('/');

    const sessionMap = fileResponseMap.get(sessionId);
    const responseRecord = sessionMap ? sessionMap.get(path) : null;

    if (responseRecord) {
      const response = new Response(responseRecord.content, responseRecord.init);
      e.respondWith(response);
    }
  }

};

self.addEventListener('fetch', (onFetch as EventListenerOrEventListenerObject));

export type SwControllerAPI = typeof SwController;

export class SwController {
  static setProjectContent(fileRecords: FileRecord[], sessionId: string) {
    const fileMap = new Map<string, ResponseParams>();
    fileResponseMap.set(sessionId, fileMap);

    for (const fileRecord of fileRecords) {
      let contentType = '';

      switch (fileRecord.extension) {
        case 'html':
          contentType = 'text/html; charset=UTF-8';
          break;
        case 'js':
          contentType = 'application/javascript; charset=UTF-8';
          break;
        default:
          continue;
      }

      let responseInit: ResponseInit = {
        headers: {
          'Content-Type': contentType
        }
      };

      const filename = `${fileRecord.name}.${fileRecord.extension}`;
      const responseParams: ResponseParams = {
        content: fileRecord.content,
        init: responseInit
      };

      fileMap.set(filename, responseParams)
    }
  }

  static clearContents (sessionId: string) {
    fileResponseMap.delete(sessionId);
  }

  static get scope(): string {
    return swScope.registration.scope;
  }
}

const onMessage = (e: MessageEvent) => {
  const data: Message = e.data;

  switch (data.type) {
    case MESSAGE_TYPES.ESTABLISH_HANDSHAKE:
      recieveMessageChannelHandshake(e);
      break;
  }
}

self.addEventListener('message', onMessage);
