'use strict';
const MESSAGE_TYPES = {
  ESTABLISH_HANDSHAKE: "ESTABLISH_HANDSHAKE",
  HANDSHAKE_RECEIVED: "HANDSHAKE_RECEIVED",
  PROJECT_CONTENT: "PROJECT_CONTENT",
  RESPONSES_READY: "RESPONSES_READY",
  RESPONSES_CLEARED: "RESPONSES_CLEARED",
  CLEAR_CONTENTS: "CLEAR_CONTENTS",
}

/**
 *
 * @param {MessageEvent} e
 */
const recieveMessageChannelHandshake = (e) => {
  const ports = e.ports;
  if (ports && ports[0]) {
    const port = ports[0];
    port.start();
    const handshakeReceivedMessage = {
      type: MESSAGE_TYPES.HANDSHAKE_RECEIVED,
    }
    port.addEventListener('message', onCommMessage(port));
    port.postMessage(handshakeReceivedMessage);
  }
}

/**@type {Map<string, Map<string, {content: string, init: ResponseInit}>>} */
let fileResponseMap = new Map();

const endWithSlash = (str) => {
  const endsWithSlash = str[str.length - 1] === '/';
  return endsWithSlash ? str : `${str}/`
}

self.addEventListener('fetch', (e) => {
  if (!e.request || !e.request.url) {
    return;
  }
  console.log(fileResponseMap);
  const url = new URL(e.request.url);
  const href = url.href;
  const scope = endWithSlash(self.registration.scope);
  if (href.startsWith(scope)) {
    const fullPath = href.substring(scope.length);
    const fullPathParts = fullPath.split('/');
    const sessionId = fullPathParts.shift();
    const path = fullPathParts.join('/');

    const sessionMap = fileResponseMap.get(sessionId);
    const responseRecord = sessionMap ? sessionMap.get(path) : null;

    if (responseRecord) {
      const response = new Response(responseRecord.content, responseRecord.init);
      e.respondWith(response);
    }
  }

});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

/**
 *
 * @param {MessagePort} port
 * @param {import('./src/types.js').ProjectContent} data
 */
const onProjectContent = (port, data) => {
  const fileRecords = data.message.records;
  const sessionId = data.message.sesionId;
  /** @type {Map<string, {content: string, init: ResponseInit}>} */
  const fileMap = new Map();
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

    /** @type {ResponseInit} */
    let responseInit = {
      headers: {
        'Content-Type': contentType
      }
    };

    fileMap.set(
        `${fileRecord.name}.${fileRecord.extension}`,
        {
          content: fileRecord.content,
          init: responseInit
        });
  }

  /** @type {import('./src/types.js').ResponsesReady} */
  const responsesReady = {
    type: MESSAGE_TYPES.RESPONSES_READY
  }

  port.postMessage(responsesReady);
}

/**
 *
 * @param {import('./src/types.js').ClearContents} data
 * @param {MesssagePort=} port
 */
const clearContents = (data, port) => {
  const sessionId = data.message;
  fileResponseMap.delete(sessionId);
  if (port) {
    const responsesCleared = {
      type: MESSAGE_TYPES.RESPONSES_CLEARED,
    }
    port.postMessage(responsesCleared);
  }
}

/**
 * @param {MessagePort} commPort
 */
const onCommMessage = (commPort) => {
  /**
   * @param {MessageEvent}
   */
  return (e) => {
    /** @type {import('./src/types.js').Message} */
    const data = e.data;
    const messageType = data.type;

    switch (messageType) {
      case MESSAGE_TYPES.PROJECT_CONTENT:
        onProjectContent(commPort, data);
        break;
      case MESSAGE_TYPES.CLEAR_CONTENTS:
        clearContents(data, commPort);
        break;
      default:
        console.error(`unknown message type ${messageType}`);
        break;
    }
  }
}

/**
 *
 * @param {MessageEvent} e
 */
const onMessage = (e) => {
  /** @type {import('./src/types.js').Message} */
  const data = e.data;
  const type = data.type;

  switch (type) {
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
