import { recieveMessageChannelHandshake, establishMessageChannelHandshake } from './util.js';
import { Message, MESSAGE_TYPES, AwaitingContent } from './types.js';

const setUpServiceWorker = async (): Promise<ServiceWorker|null> => {
  if ('serviceWorker' in navigator) {
    try {
      // try to unregister any conrolling SWs that may have not been unregistered
      if(navigator.serviceWorker.controller) {
        const swRegistrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of swRegistrations) {
          await registration.unregister();
        }
      }
      const registration = await navigator.serviceWorker.register('/editor-sw.js');

      window.addEventListener('unload', async () => {
        await registration.unregister();
      });

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

      return serviceWorker;

    } catch (e) {
      console.error(e)
      return null;
    }
  } else {
    return null;
  }
}

const onResponsesReady = () => {
  const documentIframe = document.querySelector('iframe');
  if (documentIframe) {
    documentIframe.contentWindow!.location.reload();
  } else {
    const iframe = document.createElement('iframe');
    iframe.src = '/modules/index.html';
    document.body.appendChild(iframe);
  }
}

const onResponsesCleared = (port: MessagePort) => {
  const awaitingContentMessage: AwaitingContent = {
    type: MESSAGE_TYPES.AWAITING_CONTENT,
  };

  port.postMessage(awaitingContentMessage);
}

const onSwMessage = (documentPort: MessagePort) => {
  return async (e: MessageEvent) => {
    const data = e.data as Message;
    const messageType = data.type;

    switch (messageType) {
      case MESSAGE_TYPES.RESPONSES_READY:
        onResponsesReady();
        break;
      case MESSAGE_TYPES.RESPONSES_CLEARED:
        onResponsesCleared(documentPort);
        break;
      default:
          console.error(`unknown message type ${messageType}`);
        break;
    }
    if (e.data.type === MESSAGE_TYPES.RESPONSES_READY) {

    }
  }
}

const onProjectContent = (port: MessagePort, data: Message) => {
  // TODO (emarquez): Implement babel transforms here
  port.postMessage(data);
}

const onContentsChanged = (port: MessagePort, data: Message) => {
  port.postMessage(data);
}

const onDocumentMessage = (swPort: MessagePort) => {
  return (e: MessageEvent) => {
    const data:Message = e.data;
    const messageType = data.type;

    switch (messageType) {
      case MESSAGE_TYPES.PROJECT_CONTENT:
        onProjectContent(swPort, data);
        break;
      case MESSAGE_TYPES.CONTENTS_CHANGED:
        onContentsChanged(swPort, data);
        break;
      default:
        console.error(`unknown message type ${messageType}`)
        break;
    }
  }
};

const main = async () => {
  if (parent === window) {
    console.error('this is not in an iframe');
  } else {
    const documentPortPromise = recieveMessageChannelHandshake();
    const swPromise = setUpServiceWorker();
    const [documentPort, sw] =
        await Promise.all([documentPortPromise, swPromise]);
    if (!sw) {
      console.error('There was an error setting up the serviceworker');
    }

    if (!documentPort) {
      console.error('there was an error setting up a message channel with your domain');
    }

    if (!documentPort || !sw) {
      return;
    }

    const swPort = await establishMessageChannelHandshake(sw, '');
    documentPort.addEventListener('message', onDocumentMessage(swPort));
    swPort.addEventListener('message', onSwMessage(documentPort));
    const awaitingContentMessage:AwaitingContent = {
      type: MESSAGE_TYPES.AWAITING_CONTENT,
    }
    documentPort.postMessage(awaitingContentMessage);
  }
};

main();

