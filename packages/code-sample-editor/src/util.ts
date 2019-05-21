import { Message, MESSAGE_TYPES, EstablishHandshake } from "./types.js";

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

export const setUpServiceWorker = async (): Promise<[ServiceWorker|null,ServiceWorkerRegistration|null]> => {
  if ('serviceWorker' in navigator) {
    try {
      // try to unregister any conrolling SWs that may have not been unregistered
      if(navigator.serviceWorker.controller) {
        const swRegistrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of swRegistrations) {
          await registration.unregister();
        }
      }

      const registration = await navigator.serviceWorker.register('../modules/sw.js');

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