import { FileRecord } from '@polymer/lit-code-editor/src/types.js';
import { recieveMessageChannelHandshake, establishMessageChannelHandshake } from './util.js';
import { Message, MESSAGE_TYPES, ProjectContent, EntryPointResponse, AwaitingContent } from './types.js';

const setUpServiceWorker = async (): Promise<ServiceWorker|null> => {
  if ('serviceWorker' in navigator) {
    try {
      console.log('registering sw...');
      const registration = await navigator.serviceWorker.register('/editor-sw.js');
      console.log('sw registered', registration);

      window.addEventListener('unload', async () => {
        await registration.unregister();
      });

      console.log('waiting for sw active...');

      const isInstalling = new Promise<ServiceWorker|null>((res) => {
        registration.addEventListener('updatefound', () => {
          res(registration.installing);
        });
      });
      const serviceWorker = await isInstalling;
      console.log('sw installing!', serviceWorker);
      return serviceWorker;

    } catch (e) {
      console.error(e)
      return null;
    }
  } else {
    return null;
  }
}

const eventCaught = (target: EventTarget, eventType: string): Promise<Event> => {
  return new Promise((res) => {
    const onEvent = (e: Event) => {
      target.removeEventListener(eventType, onEvent);
      res(e);
    }

    target.addEventListener(eventType, onEvent);
  });
}

const onSwResponsesReady = (parentMessage: FileRecord[], swPort:MessagePort) => {
  return async (e: MessageEvent) => {
    if (e.data.type === MESSAGE_TYPES.RESPONSES_READY) {
      console.log('sw done populating map!');
      console.log('generating page...');
      // const page = generatePage(parentMessage);
      // const iframe = document.querySelector('#content') as HTMLIFrameElement;
      console.log('setting iframe contents...', navigator.serviceWorker.controller);
      // debugger;
      const iframe = document.createElement('iframe');
      iframe.src = '/modules/index.html';
      // iframe.srcdoc = page;
      document.body.appendChild(iframe);
      // document.write(page);
      // await eventCaught(iframe, 'load');
      // if (iframe.contentWindow) {
      //   console.log('handshaking...')
      //   const iframePort
      //       = await establishMessageChannelHandshake(iframe.contentWindow!, '*');
      //   console.log('listening for request from display')
      //   iframePort.addEventListener('message', (e) => {
      //     const data = e.data;
      //     if (data.type === MESSAGE_TYPES.ENTRYPOINT_REQUEST) {
      //       const epResponse:EntryPointResponse = {
      //         type: MESSAGE_TYPES.ENTRYPOINT_RESPONSE,
      //         message: parentMessage.entrypoint
      //       }
      //       console.log('sending entrypoint')
      //       iframePort.postMessage(epResponse);
      //     }
      //   })
      // }
    }
  }
}

const onParentContentMessage = (swPort: MessagePort, sw:ServiceWorker) => {
  return (e: MessageEvent) => {
    console.log('content message received!');
    const data:Message = e.data;
    if (data.type === MESSAGE_TYPES.PROJECT_CONTENT) {
      const contentMessage = data as ProjectContent;
      const message = contentMessage.message;
      console.log('waiting for sw to finish populating response map...');
      swPort.addEventListener('message', onSwResponsesReady(message, swPort));

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

    console.log('awaiting port from SW...')
    const swPort = await establishMessageChannelHandshake(sw, '');
    console.log('SW port established!');
    console.log('listening to for content messages...')
    parentPort.addEventListener('message', onParentContentMessage(swPort, sw));
    const awaitingContentMessage:AwaitingContent = {
      type: MESSAGE_TYPES.AWAITING_CONTENT
    }
    parentPort.postMessage(awaitingContentMessage);
  }
};

main();

