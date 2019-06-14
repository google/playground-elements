import { Endpoint, expose } from 'comlink';
import { Message, EstablishHandshake } from './types';
import { MESSAGE_TYPES } from './constants';

export const endpointFromClient = (client: Client): Promise<Endpoint> => {
  return new Promise((res) => {
    const mc = new MessageChannel();
    const establishHandshakeMessage: EstablishHandshake = {
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
    client.postMessage(establishHandshakeMessage, [mc.port2]);
  });
}

export const exposeOnSwIframeWindow = (obj: any, iframeWindow: Window) => {
  const onMessage = (e: MessageEvent) => {
    const ports = e.ports;
    if (ports && ports[0]) {
      const port = ports[0];
      port.start();
      const handshakeReceivedMessage: Message = {
        type: MESSAGE_TYPES.HANDSHAKE_RECEIVED,
      }
      expose(obj, port);
      port.postMessage(handshakeReceivedMessage);
    }
  }

  iframeWindow.navigator.serviceWorker.addEventListener('message', onMessage as any);
}