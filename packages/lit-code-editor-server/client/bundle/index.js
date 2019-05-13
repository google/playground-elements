(function () {
    'use strict';

    var MESSAGE_TYPES;
    (function (MESSAGE_TYPES) {
        MESSAGE_TYPES["ENTRYPOINT_REQUEST"] = "ENTRYPOINT_REQUEST";
        MESSAGE_TYPES["ENTRYPOINT_RESPONSE"] = "ENTRYPOINT_RESPONSE";
        MESSAGE_TYPES["ESTABLISH_HANDSHAKE"] = "ESTABLISH_HANDSHAKE";
        MESSAGE_TYPES["HANDSHAKE_RECEIVED"] = "HANDSHAKE_RECEIVED";
        MESSAGE_TYPES["PROJECT_CONTENT"] = "PROJECT_CONTENT";
        MESSAGE_TYPES["RESPONSES_READY"] = "RESPONSES_READY";
        MESSAGE_TYPES["AWAITING_CONTENT"] = "AWAITING_CONTENT";
    })(MESSAGE_TYPES || (MESSAGE_TYPES = {}));
    //# sourceMappingURL=types.js.map

    const recieveMessageChannelHandshake = () => {
        return new Promise((res) => {
            const onMessage = (e) => {
                const data = e.data;
                if (data.type === MESSAGE_TYPES.ESTABLISH_HANDSHAKE) {
                    const ports = e.ports;
                    if (ports && ports[0]) {
                        const port = ports[0];
                        port.start();
                        const handshakeReceivedMessage = {
                            type: MESSAGE_TYPES.HANDSHAKE_RECEIVED,
                        };
                        port.postMessage(handshakeReceivedMessage);
                        window.removeEventListener('message', onMessage);
                        res(port);
                    }
                }
            };
            window.addEventListener('message', onMessage);
        });
    };
    const establishMessageChannelHandshake = (messageTarget, targetOrigin) => {
        return new Promise((res) => {
            const mc = new MessageChannel();
            const establishHandshakeMessage = {
                type: MESSAGE_TYPES.ESTABLISH_HANDSHAKE
            };
            const onMcResponse = (e) => {
                const data = e.data;
                if (data.type === MESSAGE_TYPES.HANDSHAKE_RECEIVED) {
                    mc.port1.removeEventListener('message', onMcResponse);
                    res(mc.port1);
                }
            };
            mc.port1.addEventListener('message', onMcResponse);
            mc.port1.start();
            if (!targetOrigin && 'scriptURL' in messageTarget) {
                messageTarget.postMessage(establishHandshakeMessage, [mc.port2]);
            }
            else if (targetOrigin) {
                messageTarget.postMessage(establishHandshakeMessage, targetOrigin, [mc.port2]);
            }
            else {
                throw new Error('targetOrigin must be defined for message targets of type Window');
            }
        });
    };
    //# sourceMappingURL=util.js.map

    const setUpServiceWorker = async () => {
        if ('serviceWorker' in navigator) {
            try {
                console.log('registering sw...');
                const registration = await navigator.serviceWorker.register('/editor-sw.js');
                console.log('sw registered', registration);
                window.addEventListener('unload', async () => {
                    await registration.unregister();
                });
                console.log('waiting for sw active...');
                const isInstalling = new Promise((res) => {
                    registration.addEventListener('updatefound', () => {
                        res(registration.installing);
                    });
                });
                const serviceWorker = await isInstalling;
                console.log('sw installing!', serviceWorker);
                return serviceWorker;
            }
            catch (e) {
                console.error(e);
                return null;
            }
        }
        else {
            return null;
        }
    };
    const eventCaught = (target, eventType) => {
        return new Promise((res) => {
            const onEvent = (e) => {
                target.removeEventListener(eventType, onEvent);
                res(e);
            };
            target.addEventListener(eventType, onEvent);
        });
    };
    const onSwResponsesReady = (parentMessage, swPort) => {
        return async (e) => {
            if (e.data.type === MESSAGE_TYPES.RESPONSES_READY) {
                console.log('sw done populating map!');
                console.log('generating page...');
                // const page = generatePage(parentMessage);
                // const iframe = document.querySelector('#content') as HTMLIFrameElement;
                console.log('setting iframe contents...', navigator.serviceWorker.controller);
                // debugger;
                const iframe = document.createElement('iframe');
                iframe.src = '/modules';
                // iframe.srcdoc = page;
                document.body.appendChild(iframe);
                // document.write(page);
                await eventCaught(iframe, 'load');
                if (iframe.contentWindow) {
                    console.log('handshaking...');
                    const iframePort = await establishMessageChannelHandshake(iframe.contentWindow, '*');
                    console.log('listening for request from display');
                    iframePort.addEventListener('message', (e) => {
                        const data = e.data;
                        if (data.type === MESSAGE_TYPES.ENTRYPOINT_REQUEST) {
                            const epResponse = {
                                type: MESSAGE_TYPES.ENTRYPOINT_RESPONSE,
                                message: parentMessage.entrypoint
                            };
                            console.log('sending entrypoint');
                            iframePort.postMessage(epResponse);
                        }
                    });
                }
            }
        };
    };
    const onParentContentMessage = (swPort, sw) => {
        return (e) => {
            console.log('content message received!');
            const data = e.data;
            if (data.type === MESSAGE_TYPES.PROJECT_CONTENT) {
                const contentMessage = data;
                const message = contentMessage.message;
                console.log('waiting for sw to finish populating response map...');
                swPort.addEventListener('message', onSwResponsesReady(message, swPort));
                // TODO (emarquez): Implement babel transforms here
                swPort.postMessage(data);
            }
        };
    };
    const main = async () => {
        if (parent === window) {
            console.error('this is not in an iframe');
        }
        else {
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
            console.log('awaiting port from SW...');
            const swPort = await establishMessageChannelHandshake(sw, '');
            console.log('SW port established!');
            console.log('listening to for content messages...');
            parentPort.addEventListener('message', onParentContentMessage(swPort, sw));
            const awaitingContentMessage = {
                type: MESSAGE_TYPES.AWAITING_CONTENT
            };
            parentPort.postMessage(awaitingContentMessage);
        }
    };
    main();
    //# sourceMappingURL=index.js.map

}());
