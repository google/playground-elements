import { EntryPointRequest, EntryPointResponse, Message, MESSAGE_TYPES } from './types.js';
import { recieveMessageChannelHandshake } from './util.js';

const requestEntryPoint = (port: MessagePort): Promise<string> => {
  return new Promise((res) => {
    const onEntryPointReponse =  (e: MessageEvent) => {
      const data = e.data as Message;
      if (data && data.type === MESSAGE_TYPES.ENTRYPOINT_RESPONSE) {
        const response = data as EntryPointResponse;
        const entrypoint = response.message;

        const entryElement = document.createElement(entrypoint.name);
        document.body.appendChild(entryElement);
        import(`/modules/${entrypoint.name}.${entrypoint.extension}`);
        port.removeEventListener('message', onEntryPointReponse);
      }
    };


    port.addEventListener('message', onEntryPointReponse);

    const request:EntryPointRequest = {
      type: MESSAGE_TYPES.ENTRYPOINT_REQUEST
    }
    console.log('requesting entrypoint...')
    port.postMessage(request);
  });
}

const setup = async () => {
  const port = await recieveMessageChannelHandshake();

  requestEntryPoint(port)
};

setup();