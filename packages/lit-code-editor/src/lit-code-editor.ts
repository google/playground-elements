import { LitElement, html, customElement, css, property } from 'lit-element';
import { FileRecord } from './types';
import { establishMessageChannelHandshake } from '@polymer/lit-code-editor-server/client/src/util.js'
import { ProjectContent, MESSAGE_TYPES, Message } from '@polymer/lit-code-editor-server/client/src/types.js'

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
    const file1 = await fetch('../templates/index.html');
    const file1Cont = await file1.text();
    const file2 = await fetch('../templates/my-element.js');
    const file2Cont = await file2.text();
    const file3 = await fetch('../templates/my-second-element.js');
    const file3Cont = await file3.text();
    console.log('content fetched!', file1Cont);
    const content: FileRecord[] = [
      {
        name: 'index',
        extension: 'html',
        content: file1Cont
      },
      {
        name: 'my-element',
        extension: 'js',
        content: file2Cont
      },
      {
        name: 'my-second-element',
        extension: 'js',
        content: file3Cont
      },
    ]

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