import { endWithSlash } from './lib/util';
import { wrap } from 'comlink';
import { endpointFromClient } from './lib/comlink-utils';
import { ClientServerAPI } from './lib/types';
import { IFRAME_MODES } from './lib/constants';

const swScope = self as ServiceWorkerGlobalScope;

const getResponseFromClient = async (
  clientFilter: string,
  path: string
): Promise<Response> => {
  const clients = await swScope.clients.matchAll({
    includeUntrontrolled: true,
    type: 'window'
  });
  const matchedClient = clients.reduce((agg: Client | null, curr) => {
    if (agg) {
      return agg;
    }

    const url = curr.url;
    return url.includes(clientFilter) ? curr : null;
  }, null);

  if (!matchedClient) {
    return new Response('', { status: 404 });
  }

  const clientEp = await endpointFromClient(matchedClient);
  const remote = wrap<typeof ClientServerAPI>(clientEp);
  const resInit = await remote.getResponseInitFromFilename(path);
  return new Response(resInit.payload, resInit.init);
};

const onFetch = (e: FetchEvent) => {
  if (!e.request || !e.request.url || !e.respondWith) {
    return;
  }
  const url = new URL(e.request.url);
  const href = url.href;
  const scope = endWithSlash(swScope.registration.scope);

  if (href.startsWith(scope)) {
    // pathspec: ${scope}/${sessionId}/${IFRAME_MODES}/(dir/)*${filename}.${extension}
    const fullPathSansScope = href.substring(scope.length);
    // ${sessionId}/${IFRAME_MODES}/(dir/)*${filename}.${extension}
    const fullPathSansScopeParts = fullPathSansScope.split('/');
    const sessionId = fullPathSansScopeParts.shift();
    // ${IFRAME_MODES}/(dir/)*${filename}.${extension}
    const iframeMode = fullPathSansScopeParts.shift();
    // (dir/)*${filename}.${extension}
    const path = fullPathSansScopeParts.join('/');

    if (!sessionId) {
      return;
    }

    switch (iframeMode) {
      case IFRAME_MODES.MODULE_CONTROLLER:
        if (path.includes('index.html')) {
          e.respondWith(new Response(''));
        }
        break;
      case IFRAME_MODES.MODULES:
        e.respondWith(
          getResponseFromClient(
            `/${sessionId}/${IFRAME_MODES.MODULE_CONTROLLER}`,
            path
          )
        );
        break;
    }
  }
};

self.addEventListener('fetch', onFetch as EventListenerOrEventListenerObject);
