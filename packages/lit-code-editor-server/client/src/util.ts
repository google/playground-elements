import { Message, MESSAGE_TYPES, HandshakeRecieved, EstablishHandshake } from "./types.js";

export const recieveMessageChannelHandshake = ():Promise<MessagePort> => {
  return new Promise((res) => {
    const onMessage = (e: MessageEvent) => {
      const data:Message = e.data;
      if (data.type === MESSAGE_TYPES.ESTABLISH_HANDSHAKE) {
        const ports = e.ports;
        if (ports && ports[0]) {
          const port = ports[0];
          port.start();
          const handshakeReceivedMessage:HandshakeRecieved = {
            type: MESSAGE_TYPES.HANDSHAKE_RECEIVED,
          }
          port.postMessage(handshakeReceivedMessage);
          window.removeEventListener('message', onMessage);
          res(port);
        }
      }
    };

    window.addEventListener('message', onMessage);
  });
}

export const establishMessageChannelHandshake = (messageTarget: ServiceWorker|Window, targetOrigin?:string):Promise<MessagePort> => {
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
    if (!targetOrigin && 'scriptURL' in messageTarget) {
      messageTarget.postMessage(establishHandshakeMessage, [mc.port2]);
    } else if (targetOrigin) {
      (messageTarget as Window).postMessage(establishHandshakeMessage, targetOrigin, [mc.port2])
    } else {
      throw new Error('targetOrigin must be defined for message targets of type Window');
    }
    
  });
};