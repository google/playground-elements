'use strict';

const MESSAGE_TYPES = {
  ESTABLISH_HANDSHAKE: "ESTABLISH_HANDSHAKE",
  HANDSHAKE_RECEIVED: "HANDSHAKE_RECEIVED",
  PROJECT_CONTENT: "PROJECT_CONTENT",
  RESPONSES_READY: "RESPONSES_READY",
  CONTENTS_CHANGED: "CONTENTS_CHANGED",
  RESPONSES_CLEARED: "RESPONSES_CLEARED",
}

const recieveMessageChannelHandshake = () => {
  return new Promise((res) => {
    /**
     *
     * @param {MessageEvent} e
     */
    const onMessage = (e) => {
      const data = e.data;
      if (data.type === MESSAGE_TYPES.ESTABLISH_HANDSHAKE) {
        const ports = e.ports;
        if (ports && ports[0]) {
          const port = ports[0];
          port.start();
          const handshakeReceivedMessage = {
            type: MESSAGE_TYPES.HANDSHAKE_RECEIVED,
          }
          port.postMessage(handshakeReceivedMessage);
          self.removeEventListener('message', onMessage);
          res(port);
        }
      }
    };

    self.addEventListener('message', onMessage);
  });
}

/**@type {Map<string, Response>} */
let fileResponseMap = new Map();

self.addEventListener('fetch', (e) => {
  if (!e.request || !e.request.url) {
    return;
  }
  const url = new URL(e.request.url);

  const pathParts = url.pathname.split('/');
  pathParts.shift();
  pathParts.shift();
  const path = pathParts.join('/');

  if (url.origin === location.origin
      && url.pathname.startsWith('/modules/')
      && fileResponseMap.has(path)) {
    e.respondWith(fileResponseMap.get(path));
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
  const fileRecords = data.message;
  for (const fileRecord of fileRecords) {
    let contentType = '';

    switch (fileRecord.extension) {
      case 'html':
        contentType = 'text/html';
        break;
      case 'js':
        contentType = 'application/javascript';
        break;
      default:
        continue;
    }

    /** @type {ResponseInit} */
    let responseInit = {
      headers: { 'Content-Type': contentType}
    };

    fileResponseMap.set(
        `${fileRecord.name}.${fileRecord.extension}`,
        new Response(fileRecord.content, responseInit));
  }

  /** @type {import('./src/types.js').ResponsesReady} */
  const responsesReady = {
    type: MESSAGE_TYPES.RESPONSES_READY
  }

  port.postMessage(responsesReady);
}

/**
 *
 * @param {MesssagePort} port
 */
const onContentsChanged = (port) => {
  fileResponseMap = new Map();
  const responsesCleared = {
    type: MESSAGE_TYPES.RESPONSES_CLEARED,
  }
  port.postMessage(responsesCleared);
}

/**
 * @param {MessagePort} commPort
 */
const onCommMessage = (commPort) => {
  /**
   * @param {MessageEvent}
   */
  return async (e) => {
    /** @type {import('./src/types.js').Message} */
    const data = e.data;
    const messageType = data.type;

    switch (messageType) {
      case MESSAGE_TYPES.PROJECT_CONTENT:
        onProjectContent(commPort, data);
        break;
      case MESSAGE_TYPES.CONTENTS_CHANGED:
        onContentsChanged(commPort);
        break;
      default:
        console.error(`unknown message type ${messageType}`);
        break;
    }
  }
}

const main = async () => {
  const networkPort = await recieveMessageChannelHandshake();

  networkPort.addEventListener('message', onCommMessage(networkPort));
}

main();
