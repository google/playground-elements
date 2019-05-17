import { LitElement, html, customElement, css, property, TemplateResult } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { FileRecord, ProjectManifest, AcceptableExtensions } from './types';
import { establishMessageChannelHandshake } from '@polymer/lit-code-editor-server/client/src/util.js'
import { ProjectContent, MESSAGE_TYPES, Message } from '@polymer/lit-code-editor-server/client/src/types.js'
import { EMPTY_INDEX, ACCEPTABLE_EXTENSIONS } from './constants';
import "./lit-code-editor-area";

@customElement('lit-code-editor')
class LitCodeEditor extends LitElement {
  @property({attribute: 'server-origin', type: String})
  serverOrigin = '';

  @property({attribute: 'project-path', type: String})
  projectPath: string|null = null;

  private lastProjectPath: string|null = null;
  private projectFetched: Promise<FileRecord[]> = Promise.resolve([EMPTY_INDEX]);

  static get styles() {
    return css`
      #wrapper {
        display: flex;
        width: 100%;
        height: 100%;
      }

      lit-code-editor-area {
        width: 50%;
      }

      iframe {
        height: 100%;
        width: 50%;
      }
    `;
  }

  private async sendContentToFrame(framePort: MessagePort) {
    const content: FileRecord[] = await this.projectFetched;

    const contentMessage: ProjectContent = {
      type: MESSAGE_TYPES.PROJECT_CONTENT,
      message: content,
    }

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
    const displayFrame = this.shadowRoot!.querySelector('#displayFrame') as HTMLIFrameElement;
    if (!displayFrame.contentWindow) {
      return;
    }

    const framePort = await establishMessageChannelHandshake(displayFrame.contentWindow, this.serverOrigin);
    await this.frameReady(framePort);
    this.sendContentToFrame(framePort);
  }

  private fetchProject = async (projectPath: string): Promise<FileRecord[]> => {
    try {
      const endsWithSlash = projectPath[projectPath.length - 1] === '/';
      const projectDir = endsWithSlash ? projectPath : `${projectPath}/`;
      const manifestPath = `${projectDir}code-sample-editor.json`;
      const manifestFetched = await fetch(manifestPath);
      const manifest = (await manifestFetched.json()) as ProjectManifest;

      const filenames = Object.keys(manifest.files || []);
      if (filenames.length) {
        const filesFetched: Promise<string>[] = [];
        const fileMetadata: {name: string, extension: AcceptableExtensions}[] = [];

        for (const filename of filenames) {
          const [name, extensionRaw] = filename.split('.');
          if (name && extensionRaw) {
            if (extensionRaw && ACCEPTABLE_EXTENSIONS.includes(extensionRaw)) {
              const extension = extensionRaw as AcceptableExtensions;
              fileMetadata.push({name, extension});
              const fileFetched = fetch(`${projectDir}${name}.${extension}`)
              .then((response) => {
                if (response.status === 404) {
                  throw new Error(`Could not find file ` +
                      `${projectDir}${name}.${extension}`);
                }
                return response.text();
              });
              filesFetched.push(fileFetched);

            } else {
              console.error(`Unsupported file extension ${extensionRaw} in ` +
                  `file ${filename} in ${manifestPath}`);
              continue;
            }
          } else {
            console.error(`could not parse file name or file extension from ` +
                `${filename} in ${manifestPath}`);
            continue;
          }
        }

        const fileContents = await Promise.all(filesFetched);
        const fileRecords: FileRecord[] = [];

        if (fileContents.length !== fileMetadata.length) {
          throw new Error('There was an error fetching the project files');
        }

        for (let i=0; i < fileContents.length; i++) {
          const fileContent = fileContents[i];
          const metadata = fileMetadata[i];
          const fileRecord: FileRecord = {
            name: metadata.name,
            extension: metadata.extension,
            content: fileContent
          }

          fileRecords.push(fileRecord);
        }

        if (fileRecords.length) {
          return fileRecords;
        }

      } else {
        console.error(`No files defined manifest at ${manifestPath}`);
      }

      return [EMPTY_INDEX];
    } catch (e) {
      console.error(e);
      return [EMPTY_INDEX];
    }
  }

  private generateEditorDom = async (projectFetched: Promise<FileRecord[]>): Promise<TemplateResult[]> => {
    const fileRecords = await projectFetched;
    const tabs: TemplateResult[] = fileRecords.map(fileRecord => {
      return html`
        <span slot="tab">${fileRecord.name}.${fileRecord.extension}</span>
        <textarea slot="editor" .value=${fileRecord.content}></textarea>
      `;
    });

    return tabs;
  }

  render() {
    if (!this.serverOrigin) {
      console.error('serverOrigin must be defined on lit-code-editor');
      return html``;
    }

    if (this.projectPath && this.lastProjectPath !== this.projectPath) {
      this.lastProjectPath = this.projectPath;
      this.projectFetched = this.fetchProject(this.projectPath);
    }

    return html`
      <div id="wrapper">
        <lit-code-editor-area>
          ${until(this.generateEditorDom(this.projectFetched))}
        </lit-code-editor-area>
        <iframe
            id="displayFrame"
            src=${this.serverOrigin}
            @load=${this.onIframeLoad}>
        </iframe>
      </div>
    `;
  }
}