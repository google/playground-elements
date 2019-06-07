import { LitElement, html, customElement, css, property, TemplateResult, query, queryAll } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { FileRecord, CodeEditorTextarea } from './types';
import { EMPTY_INDEX } from './constants';
import { endWithSlash, generateUniqueSessionId, fetchProject, addFileRecordFromName, setUpServiceWorker } from './util';
import * as Comlink from 'comlink';

import './code-sample-editor-layout';
import { SwControllerAPI } from '../sw';

@customElement('code-sample-editor')
export class CodeSampleEditor extends LitElement {
  @property({attribute: 'project-path', type: String})
  projectPath?: string;

  @property({attribute: 'sandbox-scope', type: String})
  sandboxScope = 'modules';

  @query('#editorIframe')
  editorFrame?: HTMLIFrameElement;


  @queryAll('code-sample-editor-layout textarea')
  editorTextareas!: NodeListOf<CodeEditorTextarea>;

  private shouldRenderFrame = false;
  private lastProjectPath?: string;
  private lastSandboxScope: string|null = null;
  private projectContentsReady: Promise<FileRecord[]> = Promise.resolve([EMPTY_INDEX]);
  private remoteSw:Promise<null|Comlink.Remote<SwControllerAPI>> = Promise.resolve(null);
  private sessionId: string = generateUniqueSessionId();

  private connectToServiceWorker = ():boolean => {
    if (this.lastSandboxScope !== this.sandboxScope) {
      this.lastSandboxScope = this.sandboxScope;

      this.remoteSw = this.remoteSw.then(sw => {
        if (sw) {
          return sw.clearContents(this.sessionId);
        }

        return;
      }).then(async _ => {
        return await setUpServiceWorker(this.sandboxScope);
      });

      this.shouldRenderFrame = false;
      return true;
    }

    return false;
  }

  async disconnectedCallback() {
    super.disconnectedCallback();
    const sw = await this.remoteSw;
    if (sw) {
      sw.clearContents(this.sessionId);
    }
  }

  private onResponsesReady() {
    if (this.editorFrame) {
      this.editorFrame.contentWindow!.location.reload();
    } else {
      this.shouldRenderFrame = true;
      this.requestUpdate();
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

    const sw = await this.remoteSw;
    if (!sw) {
      return;
    }

    await sw.clearContents(this.sessionId);
    this.sendContentsToSw();
  }

  private onSave (e: Event) {
    const fileRecords = this.getFileRecordsFromClient();
    this.saveFiles(fileRecords);
  }

  private async sendContentsToSw() {
    const sw = await this.remoteSw;
    if (!sw) {
      return;
    }

    const content: FileRecord[] = await this.projectContentsReady;
    // TODO (emarquez): Implement babel transforms here

    await sw.setProjectContent(content, this.sessionId)
    this.onResponsesReady();
  }

  private async onCreateFile (e: CustomEvent) {
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
      const sw = await this.remoteSw;
      if (!sw) {
        return html``;
      }

      const swScope = endWithSlash(await sw.scope);
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
    const isNewSW = this.connectToServiceWorker();
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