import { LitElement, html, customElement, css, property, TemplateResult, query, queryAll } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { FileRecord, CodeEditorTextarea, ClientServerAPI, ServiceWorkerRecord } from './types';
import { EMPTY_INDEX, IFRAME_MODES } from './constants';
import { endWithSlash, generateUniqueSessionId, fetchProject, addFileRecordFromName, setUpServiceWorker, responseInitFromExtension, setIframeContents, reloadIframeInIframe } from './util';

import './code-sample-editor-layout';
import { exposeOnSwIframeWindow } from './comlink-utils';

const generateDocumentAPI = (instance: CodeSampleEditor) => {
  return class CodeSampleEditorRemote extends ClientServerAPI {
    static async getResponseInitFromFilename(path: string): Promise<{payload: string, init: ResponseInit}> {
      const pathParts = path.split('.');
      const extensionRaw = pathParts.pop() || '';
      const extension = extensionRaw.toLocaleLowerCase();
      const fileName = pathParts.join('.');
      if (extension) {
        const init = responseInitFromExtension(extension);
        const payload = instance.getValueFromNameAndExtension(fileName, extension);

        return {payload, init};
      }

      return {payload: '', init: {status: 404}}
    }
  }
}

@customElement('code-sample-editor')
export class CodeSampleEditor extends LitElement {
  @property({attribute: 'project-path', type: String})
  projectPath?: string;

  @property({attribute: 'sandbox-scope', type: String})
  sandboxScope = '__code-sample-editor__';

  @query('#editorIframe')
  editorFrame?: HTMLIFrameElement;

  @queryAll('code-sample-editor-layout textarea')
  editorTextareas!: NodeListOf<CodeEditorTextarea>;

  private lastProjectPath?: string;
  private lastSandboxScope: string|null = null;
  private projectContentsReady: Promise<FileRecord[]> = Promise.resolve([EMPTY_INDEX]);
  private sw:Promise<null|ServiceWorkerRecord> = Promise.resolve(null);
  private sessionId: string = generateUniqueSessionId();

  private setupServiceWorker = (
      currentSw: Promise<null|ServiceWorkerRecord>,
      scope:string): Promise<null|ServiceWorkerRecord> => {
    return currentSw.then(async (_: any) => await setUpServiceWorker(scope));
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

  private getFileRecordsFromTextareas(textareas: NodeListOf<CodeEditorTextarea>) {
    const fileRecords: FileRecord[] = Array.from(textareas).map(e => {
      const name = e.name;
      const extension = e.extension;
      const content = e.value;
      return {name, extension, content};
    });

    return fileRecords;
  }

  private onSave () {
    reloadIframeInIframe(this.editorFrame);
  }

  private async onCreateFile (e: CustomEvent) {
    const rawFileName: string|undefined = e.detail;
    const oldFileRecords = this.getFileRecordsFromTextareas(this.editorTextareas);
    const newFileRecords = addFileRecordFromName(rawFileName, oldFileRecords);

    if (newFileRecords) {
      this.projectContentsReady = Promise.resolve(newFileRecords);
      reloadIframeInIframe(this.editorFrame);
      this.requestUpdate();
    }
  }

  private async onIframeLoad() {
    const sw = await this.sw;
    if (!this.editorFrame || !this.editorFrame.contentWindow || !sw) {
      return;
    }
    const iframeWin = this.editorFrame.contentWindow;
    exposeOnSwIframeWindow(generateDocumentAPI(this), iframeWin);
    const contentTransformer = (fileContents: string) => {
      const scope = endWithSlash(sw.scope);
      return fileContents.replace(
        '__INSERT_SRC__',
        `${scope}${this.sessionId}/${IFRAME_MODES.MODULES}/index.html`);
    };
    setIframeContents(
        iframeWin,
        `${import.meta.url}/../../controller/index.html`,
        contentTransformer);
  }

  private async generateIframe(uiReady: Promise<any>, swReady: Promise<null|ServiceWorkerRecord>) {
    await uiReady;
    const sw = await swReady;
    if (!sw) {
      return html``;
    }

    const swScope = endWithSlash(sw.scope);

    return html`
      <iframe
          id="editorIframe"
          src="${swScope}${this.sessionId}/${IFRAME_MODES.MODULE_CONTROLLER}/index.html"
          @load=${this.onIframeLoad}>
      </iframe>
    `;
  }

  getValueFromNameAndExtension(fileName: string, extension: string) {
    const textarea = Array.from(this.editorTextareas)
        .reduce((agg: null|CodeEditorTextarea, curr) => {
      const textareaName = curr.name;
      const textareaExtension = curr.extension;
      if (textareaName === fileName && textareaExtension === extension) {
        return curr;
      }

      return agg;
    }, null);

    return textarea ? textarea.value : '';
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
    if (this.lastSandboxScope !== this.sandboxScope) {
      this.lastSandboxScope = this.sandboxScope;
      this.sw = this.setupServiceWorker(this.sw, this.sandboxScope);
    }

    if (this.projectPath && this.lastProjectPath !== this.projectPath) {
      this.lastProjectPath = this.projectPath;
      this.projectContentsReady = fetchProject(this.projectPath);
    }

    let uiReady = this.generateEditorDom(this.projectContentsReady);

return html`
      <div id="wrapper">
        <code-sample-editor-layout
            @save=${this.onSave}
            @create-file=${this.onCreateFile}>
          ${until(uiReady)}
        </code-sample-editor-layout>
        ${until(this.generateIframe(uiReady, this.sw))}
      </div>
    `;
  }
}