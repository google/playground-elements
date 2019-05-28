import {MESSAGE_TYPES as MESSAGE_TYPES_, Message, ClearContents, ProjectContent, ResponsesCleared} from './src/types';

const swScope = self as ServiceWorkerGlobalScope;

const MESSAGE_TYPES = {
  ESTABLISH_HANDSHAKE: "ESTABLISH_HANDSHAKE",
  HANDSHAKE_RECEIVED: "HANDSHAKE_RECEIVED",
  PROJECT_CONTENT: "PROJECT_CONTENT",
  RESPONSES_READY: "RESPONSES_READY",
  AWAITING_CONTENT: "AWAITING_CONTENT",
  RESPONSES_CLEARED: "RESPONSES_CLEARED",
  CLEAR_CONTENTS: "CLEAR_CONTENTS",
} as unknown as typeof MESSAGE_TYPES_;

const recieveMessageChannelHandshake = (e: MessageEvent) => {
  const ports = e.ports;
  if (ports && ports[0]) {
    const port = ports[0];
    port.start();
    const handshakeReceivedMessage: Message = {
      type: MESSAGE_TYPES.HANDSHAKE_RECEIVED,
    }
    port.addEventListener('message', onCommMessage(port));
    port.postMessage(handshakeReceivedMessage);
  }
}

interface ResponseParams {
  content: string,
  init: ResponseInit
}

let fileResponseMap = new Map<string, Map<string, ResponseParams>>();

const endWithSlash = (str:string) => {
  const endsWithSlash = str[str.length - 1] === '/';
  return endsWithSlash ? str : `${str}/`
}

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

self.addEventListener('fetch', onFetch);

const onProjectContent = (port: MessagePort, data: ProjectContent) => {
  const fileRecords = data.message.records;
  const sessionId = data.message.sesionId;
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

  const responsesReady: Message = {
    type: MESSAGE_TYPES.RESPONSES_READY,
  }

  port.postMessage(responsesReady);
}

const clearContents = (data: ClearContents, port?: MessagePort) => {
  const sessionId = data.message;
  fileResponseMap.delete(sessionId);
  if (port) {
    const responsesCleared: Message = {
      type: MESSAGE_TYPES.RESPONSES_CLEARED,
    }
    port.postMessage(responsesCleared);
  }
}

const onCommMessage = (commPort: MessagePort) => {
  return (e: MessageEvent) => {
    const data: Message = e.data;

    switch (data.type) {
      case MESSAGE_TYPES.PROJECT_CONTENT:
        onProjectContent(commPort, data);
        break;
      case MESSAGE_TYPES.CLEAR_CONTENTS:
        clearContents(data as ClearContents, commPort);
        break;
      default:
        console.error(`unknown message type ${data.type}`);
        break;
    }
  }
}

const onMessage = (e: MessageEvent) => {
  const data: Message = e.data;

  switch (data.type) {
    case MESSAGE_TYPES.ESTABLISH_HANDSHAKE:
      recieveMessageChannelHandshake(e);
      break;
    case MESSAGE_TYPES.CLEAR_CONTENTS:
      clearContents(data);
      break;
    default:
      break;
  }
}

self.addEventListener('message', onMessage);
