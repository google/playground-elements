import { html, render } from 'lit-html';
import { ProjectRecord } from 'lit-code-editor/src/types';

export const generatePage = (data: ProjectRecord): string => {
  const content = html`
    <script type="module">
      console.log('listenening for port to be sent to frame')
      window.addEventListener('message', (e) => {
        if (e.data === 'SW_PORT_TO_FRAME') {
          console.log('port received')
          const port = e.ports[0];
          port.start();
          console.log('asking for claim')
          port.addEventListener('message', e => {
            if (e.data === 'CLAIMED') {
              console.log('importing entrypoint...')
              import('${`./modules/${data.entrypoint.name}.js`}');
            }
          })
          port.postMessage('CLAIM_CLIENTS');
        }
      });

      //window.dispatchEvent(new CustomEvent('listening'));
    </script>
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
  `;
  const template = document.createElement('template');
  render(content, template.content);
  const rootElement = document.createElement(data.entrypoint.name);
  template.content.appendChild(rootElement);

  return template.innerHTML;
}