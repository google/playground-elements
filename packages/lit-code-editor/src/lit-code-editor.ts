import { LitElement, html, customElement, css, property } from "lit-element";
import { ProjectRecord } from "./types";
import { establishMessageChannelHandshake } from "lit-code-editor-server/client/lib/util"
import { ProjectContent, MESSAGE_TYPES, Message } from "lit-code-editor-server/client/lib/types"

@customElement('lit-code-editor')
class LitCodeEditor extends LitElement {
  @property({type: String})
  serverOrigin = '';

  static get styles() {
    return css`
      iframe {
        display: block;
        height: 90vh;
        width: 100%;
      }
    `;
  }

  private async sendContentToFrame(framePort: MessagePort) {
    console.log('fetching content...');
    const myElementContents = `import { LitElement, html } from 'https://unpkg.com/lit-element?module';
    let MyElement = class MyElement extends LitElement {
        render() {
            return html \`
          <div>This is from my-element</div>
        \`;
        }
    };
    console.log('this is running!')
    customElements.define('my-element', MyElement);`
    console.log('content fetched!', myElementContents);
    const content: ProjectRecord = {
      entrypoint: {
        name: 'my-element',
        extension: 'js',
        content: myElementContents
      },
      files: []
    }

    const contentMessage: ProjectContent = {
      type: MESSAGE_TYPES.PROJECT_CONTENT,
      message: content,
    }

    console.log('sending contents to frame...')
    framePort.postMessage(contentMessage);
  }

  private frameReady(frame: MessagePort): Promise<void> {
    return new Promise((res) => {
      const onMessage = (e: MessageEvent) => {
        const data:Message = e.data;
        if (data.type === MESSAGE_TYPES.AWAITING_CONTENT) {
          frame.removeEventListener('message', onMessage)
          res();
        }
      }

      frame.addEventListener('message', onMessage);
    });
  }

  async onIframeLoad() {
    console.log('iframe loaded!')
    const displayFrame = this.shadowRoot!.querySelector('#displayFrame') as HTMLIFrameElement;
    if (!displayFrame.contentWindow) {
      return;
    }

    console.log('establishing frame message channel...')
    const framePort = await establishMessageChannelHandshake(displayFrame.contentWindow, this.serverOrigin);
    console.log('connection with frame is established!')
    await this.frameReady(framePort);
    this.sendContentToFrame(framePort);
  }

  render() {
    if (!this.serverOrigin) {
      console.error('serverOrigin must be defined on lit-code-editor');
      return html``;
    }

    const displayFrame = html`
      <iframe
          id="displayFrame"
          src=${this.serverOrigin}
          @load=${this.onIframeLoad}>
      </iframe>`;

    return html`
      <iframe
          id="displayFrame"
          src=${this.serverOrigin}
          @load=${this.onIframeLoad}>
      </iframe>`;
  }
}