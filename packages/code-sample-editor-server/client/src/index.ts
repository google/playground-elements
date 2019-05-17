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

const onSwResponsesReady = () => {
  return async (e: MessageEvent) => {
    if (e.data.type === MESSAGE_TYPES.RESPONSES_READY) {
      const iframe = document.createElement('iframe');
      iframe.src = '/modules/index.html';
      document.body.appendChild(iframe);
    }
  }
}

const onParentContentMessage = (swPort: MessagePort) => {
  return (e: MessageEvent) => {
    const data:Message = e.data;
    if (data.type === MESSAGE_TYPES.PROJECT_CONTENT) {
      // TODO (emarquez): Implement babel transforms here
      swPort.postMessage(data);
    }
  }
};

const main = async () => {
  if (parent === window) {
    console.error('this is not in an iframe');
  } else {
    const parentPortPromise = recieveMessageChannelHandshake();
    const swPromise = setUpServiceWorker();
    const [parentPort, sw] = await Promise.all([parentPortPromise, swPromise]);
    if (!sw) {
      console.error('There was an error setting up the serviceworker');
    }

    if (!parentPort) {
      console.error('there was an error setting up a message channel with your domain');
    }

    if (!parentPort || !sw) {
      return;
    }

    const swPort = await establishMessageChannelHandshake(sw, '');
    parentPort.addEventListener('message', onParentContentMessage(swPort));
    swPort.addEventListener('message', onSwResponsesReady());
    const awaitingContentMessage:AwaitingContent = {
      type: MESSAGE_TYPES.AWAITING_CONTENT
    }
    parentPort.postMessage(awaitingContentMessage);
  }
};

main();

