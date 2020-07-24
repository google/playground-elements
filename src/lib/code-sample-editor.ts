import {
  LitElement,
  html,
  customElement,
  css,
  property,
  TemplateResult,
  query,
  queryAll,
} from 'lit-element';
import {until} from 'lit-html/directives/until.js';
import {FileRecord, RemoteSw} from '../shared/types.js';
import {EMPTY_INDEX} from '../shared/constants.js';
import {
  endWithSlash,
  fetchProject,
  addFileRecordFromName,
  clearSwContentsAndSave,
} from '../shared/util.js';
import {
  generateUniqueSessionId,
  getFileRecordsFromTextareas,
  reloadIframe,
  connectToServiceWorker,
  CodeSampleEditorTextarea,
} from './util.js';
import './code-sample-editor-layout.js';

@customElement('code-sample-editor')
export class CodeSampleEditor extends LitElement {
  @property({attribute: 'project-path', type: String})
  projectPath?: string;

  @property({attribute: 'sandbox-scope', type: String})
  sandboxScope = 'modules';

  @query('#editorIframe')
  editorFrame?: HTMLIFrameElement;

  @queryAll('code-sample-editor-layout textarea')
  editorTextareas!: NodeListOf<CodeSampleEditorTextarea>;

  private lastProjectPath?: string;
  private lastSandboxScope: string | null = null;
  private projectContentsReady: Promise<FileRecord[]> = Promise.resolve([
    EMPTY_INDEX,
  ]);
  private remoteSw: RemoteSw = Promise.resolve(null);
  private sessionId: string = generateUniqueSessionId();

  async disconnectedCallback() {
    super.disconnectedCallback();
    const sw = await this.remoteSw;
    if (sw) {
      sw.clearContents(this.sessionId);
    }
  }

  private async generateEditorDom(
    projectFetched: Promise<FileRecord[]>
  ): Promise<TemplateResult[]> {
    const fileRecords = await projectFetched;
    let firstEditor = true;
    let index = 0;

    const tabs: TemplateResult[] = fileRecords.map((fileRecord) => {
      const tResult = html`
        <span
          slot="tab"
          class=${'link-' + index.toString()}
          ?selected=${firstEditor}
        >
          ${fileRecord.name}.${fileRecord.extension}
        </span>
        <textarea
          slot="editor"
          class=${'link-' + index.toString()}
          ?selected=${firstEditor}
          .value=${fileRecord.content}
          .name=${fileRecord.name}
          .extension=${fileRecord.extension}
        >
        </textarea>
      `;

      firstEditor = false;
      index++;
      return tResult;
    });

    return tabs;
  }

  private onSave() {
    const fileRecords = getFileRecordsFromTextareas(this.editorTextareas);
    this.projectContentsReady = clearSwContentsAndSave(
      fileRecords,
      this.remoteSw,
      this.sessionId
    );
    reloadIframe(this.editorFrame!);
  }

  private async onCreateFile(e: CustomEvent) {
    const rawFileName: string | undefined = e.detail;
    const oldFileRecords = getFileRecordsFromTextareas(this.editorTextareas);
    const newFileRecords = addFileRecordFromName(rawFileName, oldFileRecords);
    if (newFileRecords) {
      this.projectContentsReady = clearSwContentsAndSave(
        newFileRecords,
        this.remoteSw,
        this.sessionId
      );
      this.requestUpdate();
    }
  }

  private async generateIframe(
    uiReady: Promise<any>,
    remoteSw: RemoteSw,
    sessionId: string
  ) {
    const [sw] = await Promise.all([remoteSw, uiReady]);
    if (!sw) {
      return html``;
    }

    const swScope = endWithSlash(await sw.scope);
    return html`
      <iframe id="editorIframe" src="${swScope}${sessionId}/index.html">
      </iframe>
    `;
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
    const isNewScope = this.lastSandboxScope !== this.sandboxScope;

    if (isNewScope) {
      this.lastSandboxScope = this.sandboxScope;
      this.remoteSw = connectToServiceWorker(
        this.remoteSw,
        this.sessionId,
        this.sandboxScope
      );
    }

    const isNewProject =
      this.projectPath && this.lastProjectPath !== this.projectPath;

    if (isNewProject) {
      this.lastProjectPath = this.projectPath;
      this.projectContentsReady = fetchProject(this.projectPath!);
    }

    if (isNewScope || isNewProject) {
      this.projectContentsReady = clearSwContentsAndSave(
        this.projectContentsReady,
        this.remoteSw,
        this.sessionId
      );
    }

    const uiReady = this.projectContentsReady;

    return html`
      <div id="wrapper">
        <code-sample-editor-layout
          @save=${this.onSave}
          @create-file=${this.onCreateFile}
        >
          ${until(this.generateEditorDom(this.projectContentsReady))}
        </code-sample-editor-layout>
        ${until(this.generateIframe(uiReady, this.remoteSw, this.sessionId))}
      </div>
    `;
  }
}
