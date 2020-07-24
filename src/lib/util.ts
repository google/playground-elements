import {
  Message,
  FileRecord,
  RemoteSw,
  SwControllerAPI,
} from '../shared/types.js';
import { MESSAGE_TYPES } from '../shared/constants.js';
import { wrap } from 'comlink';
import { endWithSlash } from '../shared/util.js';

export interface CodeSampleEditorTextarea extends HTMLTextAreaElement {
  extension: 'js' | 'ts' | 'html';
  name: string;
}

const generateRandomString = (): string => {
  const arr = new Uint32Array(1);
  const val = crypto.getRandomValues(arr)[0];
  return val.toString(32);
};

export const generateUniqueSessionId = (): string => {
  window.__CodeEditorSessions = window.__CodeEditorSessions || new Set();

  let sessionId = generateRandomString();
  while (window.__CodeEditorSessions.has(sessionId)) {
    sessionId = generateRandomString();
  }

  window.__CodeEditorSessions.add(sessionId);

  return sessionId;
};

const establishMessageChannelHandshake = (
  messageTarget: ServiceWorker
): Promise<MessagePort> => {
  return new Promise((res) => {
    const mc = new MessageChannel();
    const establishHandshakeMessage: Message = {
      type: MESSAGE_TYPES.ESTABLISH_HANDSHAKE,
    };

    const onMcResponse = (e: MessageEvent) => {
      const data: Message = e.data;
      if (data.type === MESSAGE_TYPES.HANDSHAKE_RECEIVED) {
        mc.port1.removeEventListener('message', onMcResponse);
        res(mc.port1);
      }
    };

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
  return currentFilepathParts.join('/');
};

export const setUpServiceWorker = async (sandboxScope: string): RemoteSw => {
  if ('serviceWorker' in navigator) {
    try {
      const swFileDir = getSwDir();
      const sScopeSlash = endWithSlash(sandboxScope);
      const registration = await navigator.serviceWorker.register(
        `${swFileDir}/sw.js`,
        { scope: `${swFileDir}/${sScopeSlash}` }
      );

      const isInstalling = new Promise<ServiceWorker | null>((res) => {
        registration.addEventListener('updatefound', () => {
          res(registration.installing);
        });
      });

      // safari is fast for some reason?
      let serviceWorker = registration.active;
      if (!serviceWorker) {
        serviceWorker = await isInstalling;
      }

      if (!serviceWorker) {
        return null;
      }

      const port = await establishMessageChannelHandshake(serviceWorker);
      const linkedSw = wrap<SwControllerAPI>(port);

      window.addEventListener('unload', async () => {
        const sessions = window.__CodeEditorSessions || new Set();

        for (let sessionId of sessions) {
          linkedSw.clearContents(sessionId);
        }
      });

      return linkedSw;
    } catch (e) {
      console.error(e);
      return null;
    }
  } else {
    return null;
  }
};

export const connectToServiceWorker = (
  previousRemoteSw: RemoteSw,
  sessionId: string,
  scope: string
): RemoteSw => {
  return previousRemoteSw
    .then(async (sw) => sw && (await sw.clearContents(sessionId)))
    .then(async (_: any) => await setUpServiceWorker(scope));
};

export const reloadIframe = (iframe: HTMLIFrameElement) => {
  if (iframe.contentWindow) {
    iframe.contentWindow.location.reload();
  }
};

export const getFileRecordsFromTextareas = (
  textareas: NodeListOf<CodeSampleEditorTextarea>
) => {
  const fileRecords: FileRecord[] = Array.from(textareas).map((e) => {
    const name = e.name;
    const extension = e.extension;
    const content = e.value;
    return { name, extension, content };
  });

  return fileRecords;
};
