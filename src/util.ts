import { Message, MESSAGE_TYPES, EstablishHandshake, ClearContents } from "./types.js";

const generateRandomString = (): string => {
  const arr = new Uint32Array(1);
  const val = crypto.getRandomValues(arr)[0];
  return val.toString(32);
}

export const clearSession = (sessionId: string, swPort: MessagePort|null) => {
  if (window.__CodeEditorSessions) {
    window.__CodeEditorSessions.delete(sessionId);
  }

  if (swPort) {
    const message: ClearContents = {
      type: MESSAGE_TYPES.CLEAR_CONTENTS,
      message: sessionId
    }
    swPort.postMessage
  }
}

export const generateUniqueSessionId = ():string => {
  window.__CodeEditorSessions = window.__CodeEditorSessions || new Set();

  let sessionId = generateRandomString();
  while (window.__CodeEditorSessions.has(sessionId)) {
    sessionId = generateRandomString();
  }

  window.__CodeEditorSessions.add(sessionId);

  return sessionId;
};

export const establishMessageChannelHandshake = (messageTarget: ServiceWorker):Promise<MessagePort> => {
  return new Promise((res) => {
    const mc = new MessageChannel();
    const establishHandshakeMessage:EstablishHandshake = {
      type: MESSAGE_TYPES.ESTABLISH_HANDSHAKE
    };

    const onMcResponse = (e: MessageEvent) => {
      const data: Message = e.data;
      if (data.type === MESSAGE_TYPES.HANDSHAKE_RECEIVED) {
        mc.port1.removeEventListener('message', onMcResponse);
        res(mc.port1);
      }
    }

    mc.port1.addEventListener('message', onMcResponse);
    mc.port1.start();
    messageTarget.postMessage(establishHandshakeMessage, [mc.port2]);
  });
};

const getSwDir = () => {
  const currentFilepath = import.meta.url;
  const currentFilepathParts = currentFilepath.split('/');
  currentFilepathParts.pop();
  currentFilepathParts.pop();
  return currentFilepathParts.join('/')
};

export const setUpServiceWorker = async (): Promise<[ServiceWorker|null,ServiceWorkerRegistration|null]> => {
  if ('serviceWorker' in navigator) {
    try {
      const swFileDir = getSwDir();
      const registration = await navigator.serviceWorker.register(
        `${swFileDir}/sw.js`,
        {scope: `${swFileDir}/modules/`});

      const isInstalling = new Promise<ServiceWorker|null>((res) => {
        registration.addEventListener('updatefound', () => {
          res(registration.installing);
        });
      });

      // safari is fast for some reason?
      let serviceWorker = registration.active;
      if (!serviceWorker) {
        serviceWorker = await isInstalling;
      }

      window.addEventListener('unload', async () => {
        const sessions = window.__CodeEditorSessions || new Set();

        for (let sessionId of sessions) {
          const message: ClearContents = {
            type: MESSAGE_TYPES.CLEAR_CONTENTS,
            message: sessionId,
          }

          if (serviceWorker) {
            serviceWorker.postMessage(message);
          }
        }
      });

      return [serviceWorker, registration];

    } catch (e) {
      console.error(e)
      return [null, null];
    }
  } else {
    return [null, null];
  }
}

export const endWithSlash = (str: string) => {
  const endWithSlash = str[str.length - 1] === '/';
  return endWithSlash ? str : `${str}/`
}