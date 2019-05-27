import { LitElement, html, customElement, css, property, TemplateResult, query, queryAll } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { FileRecord, CodeEditorTextarea, Message, MESSAGE_TYPES, ProjectContent, ClearContents, AcceptableExtensions } from './types';
import { EMPTY_INDEX, ACCEPTABLE_EXTENSIONS } from './constants';
import { setUpServiceWorker, establishMessageChannelHandshake, endWithSlash, generateUniqueSessionId, clearSession, fetchProject, addFileRecordFromName } from './util';

import './code-sample-editor-layout';

@customElement('code-sample-editor')
export class CodeSampleEditor extends LitElement {
  @property({attribute: 'project-path', type: String})
  projectPath: string|null = null;

  @property({type: Boolean})
  private shouldRenderFrame = false;

  @query('#editorIframe')
  editorFrame?: HTMLIFrameElement;

  @property({attribute: 'sandbox-scope', type: String})
  sandboxScope = 'modules';

  @queryAll('code-sample-editor-layout textarea')
  editorTextareas!: NodeListOf<CodeEditorTextarea>;

  private lastProjectPath: string|null = null;
  private lastSandboxScope: string|null = null;
  private projectContentsReady: Promise<FileRecord[]> = Promise.resolve([EMPTY_INDEX]);
  private swSetup:Promise<[ServiceWorker | null, ServiceWorkerRegistration | null]> =
      Promise.resolve([null, null])
  private swPortEstablished:Promise<null|MessagePort> = Promise.resolve(null);
  private sessionId: string = generateUniqueSessionId();

  private setUpServiceWorker = ():boolean => {
    if (this.lastSandboxScope !== this.sandboxScope) {
      this.lastSandboxScope = this.sandboxScope;
      // remove previous event listener
      this.swPortEstablished.then(port => {
        if (!port) {
          return;
        }

        port.removeEventListener('message', this.onSwMessage);
        clearSession(this.sessionId, port);
      });

      this.swSetup = setUpServiceWorker(this.sandboxScope);


      this.swPortEstablished = this.swSetup
          .then((response) => {
        const sw = response[0];
        if (sw) {
          return establishMessageChannelHandshake(sw);
        } else {
          return Promise.resolve(null);
        }
      }).then(port => {
        if (!port) {
          return port;
        }
        port.addEventListener('message', this.onSwMessage);
        return port;
      })

      this.shouldRenderFrame = false;

      return true;
    }

    return false;
  }

  async disconnectedCallback() {
    super.disconnectedCallback();
    const swPort = await this.swPortEstablished;
    if (swPort) {
      swPort.removeEventListener('message', this.onSwMessage);
    }

    clearSession(this.sessionId, await this.swPortEstablished);
  }

  private onResponsesReady() {
    if (this.editorFrame) {
      this.editorFrame.contentWindow!.location.reload();
    } else {
      this.shouldRenderFrame = true;
    }
  }

  private async onResponsesCleared() {
    this.sendContentsToSw();
  }

  private onSwMessage = async (e: MessageEvent) => {
    const data: Message = e.data;

    switch (data.type) {
      case MESSAGE_TYPES.RESPONSES_READY:
        this.onResponsesReady();
        break;
      case MESSAGE_TYPES.RESPONSES_CLEARED:
        this.onResponsesCleared();
        break;
      default:
          console.error(`unknown message type ${data.type}`);
        break;
    }
  }

  private fetchProject (projectPath: string): Promise<FileRecord[]> {
    return fetchProject(projectPath);
  }

  private async generateEditorDom (projectFetched: Promise<FileRecord[]>): Promise<TemplateResult[]> {
    const fileRecords = await projectFetched;
    let firstEditor = true;
    const tabs: TemplateResult[] = fileRecords.map(fileRecord => {
      let classIdentifier = `link-${fileRecord.name}${fileRecord.extension}`;
      classIdentifier = classIdentifier.replace(/\./g, '_');
      classIdentifier = classIdentifier.replace(/\//g, '_');
      classIdentifier = classIdentifier.replace(/\\/g, '_');
      const tResult = html`
        <span
            slot="tab"
            class=${classIdentifier}
            ?selected=${firstEditor}>
          ${fileRecord.name}.${fileRecord.extension}
        </span>
        <textarea
            slot="editor"
            class=${classIdentifier}
            ?selected=${firstEditor}
            .value=${fileRecord.content}
            .name=${fileRecord.name}
            .extension=${fileRecord.extension}>
        </textarea>
      `;

      firstEditor = false;
      return tResult;
    });

    return tabs;
  }

  private getFileRecordsFromClient() {
    const textareas = this.editorTextareas;
    const fileRecords: FileRecord[] = Array.from(textareas).map(e => {
      const name = e.name;
      const extension = e.extension;
      const content = e.value;
      return {name, extension, content};
    });

    return fileRecords;
  }

  private async saveFiles (fileRecords: FileRecord[]) {
    this.projectContentsReady = Promise.resolve(fileRecords);

    const port = await this.swPortEstablished;
    if (!port) {
      return;
    }

    const contentsChangedMessage: Message = {
      type: MESSAGE_TYPES.CLEAR_CONTENTS,
      message: this.sessionId,
    }
    port.postMessage(contentsChangedMessage);
  }

  private onSave = (e: Event) => {
    const fileRecords = this.getFileRecordsFromClient();
    this.saveFiles(fileRecords);
  }

  private async sendContentsToSw() {
    const port = await this.swPortEstablished;
    if (!port) {
      return;
    }

    const content: FileRecord[] = await this.projectContentsReady;
    // TODO (emarquez): Implement babel transforms here

    const contentMessage: Message = {
      type: MESSAGE_TYPES.PROJECT_CONTENT,
      message: {
        records: content,
        sesionId: this.sessionId,
      }
    }
    port.postMessage(contentMessage);
  }

  private onCreateFile = async (e: CustomEvent) => {
    const rawFileName: string|undefined = e.detail;
    const oldFileRecords = this.getFileRecordsFromClient();
    const newFileRecords = addFileRecordFromName(rawFileName, oldFileRecords);
    if (newFileRecords) {
      await this.saveFiles(newFileRecords);
      this.requestUpdate();
    }
  }

  private async generateIframe() {
    if (!this.shouldRenderFrame) {
      return html``;
    } else {
      const [sw, registration] = await this.swSetup;
      if (!sw || !registration) {
        return html``;
      }

      const swScope = endWithSlash(registration.scope);
      return html`
        <iframe id="editorIframe" src="${swScope}${this.sessionId}/index.html">
        </iframe>
      `;
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 350px;
      }

      #wrapper {
        display: flex;
        width: 100%;
        height: 100%;
      }

      code-sample-editor-layout {
        width: 50%;
      }

      iframe {
        height: 100%;
        width: 50%;
      }
    `;
  }

  render() {
    const isNewSW = this.setUpServiceWorker();
    const isNewProject = this.projectPath && this.lastProjectPath !== this.projectPath;

    if (isNewProject) {
      this.lastProjectPath = this.projectPath;
      this.projectContentsReady = this.fetchProject(this.projectPath!);
    }

    if (isNewSW || isNewProject) {
      this.sendContentsToSw();
    }

    return html`
      <div id="wrapper">
        <code-sample-editor-layout
            @save=${this.onSave}
            @create-file=${this.onCreateFile}>
          ${until(this.generateEditorDom(this.projectContentsReady))}
        </code-sample-editor-layout>
        ${until(this.generateIframe())}
      </div>
    `;
  }
}