/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {
  LitElement,
  html,
  customElement,
  css,
  property,
  query,
  PropertyValues,
  internalProperty,
} from 'lit-element';
import { wrap, Remote, proxy } from 'comlink';
import '@material/mwc-tab-bar';
import { TabBar } from '@material/mwc-tab-bar';
import '@material/mwc-tab';
import '@material/mwc-button';
import '@material/mwc-icon-button';

import {
  SampleFile,
  ServiceWorkerAPI,
  ProjectManifest,
  ESTABLISH_HANDSHAKE,
  HANDSHAKE_RECEIVED,
} from '../shared/worker-api.js';
import { getRandomString } from '../shared/util.js';
import { CodeSampleEditorPreviewElement } from './code-sample-editor-preview.js';
import './code-sample-editor-preview.js';
import { nothing } from 'lit-html';

declare global {
  interface ImportMeta {
    url: string;
  }
}

// Each <code-sample-editor> has a unique session ID used to scope requests
// from the preview iframes.
const sessions = new Set<string>();
const generateUniqueSessionId = (): string => {
  let sessionId;
  do {
    sessionId = getRandomString();
  } while (sessions.has(sessionId));
  sessions.add(sessionId);
  return sessionId;
};

const serviceWorkerScriptUrl = new URL(
  '../../service-worker.js',
  import.meta.url
);

/**
 * A multi-file code editor component with live preview that works without a
 * server.
 *
 * <code-sample-editor> loads a project configuration file and the set of source
 * files it describes from the network. The source files can be edited locally.
 * To serve the locally edited files to the live preview, <code-sample-editor>
 * registers a service worker to serve files to the preview from the main UI
 * thread directly, without a network roundtrip.
 *
 * The project manifest is a JSON file with a "files" property. "files" is an
 * object with properties for each file. The key is the filename, relative to
 * the project manifest.
 *
 * Eample project manifest:
 * ```json
 * {
 *   "files": {
 *     "./index.html": {},
 *     "./my-element.js": {},
 *   }
 * }
 * ```
 */
@customElement('code-sample-editor')
export class CodeSampleEditor extends LitElement {
  static styles = css`
    :host {
      display: flex;
      height: 350px;
      border: solid 1px #ddd;
    }

    * {
      box-sizing: border-box;
    }

    #editor {
      display: flex;
      flex-direction: column;
      flex: 0 0 50%;
      border-right: solid 1px #ddd;
    }

    #editor > mwc-tab-bar {
      --mdc-tab-height: 35px;
      --mdc-typography-button-text-transform: none;
      --mdc-typography-button-font-weight: normal;
      --mdc-typography-button-font-size: 0.75rem;
      --mdc-typography-button-letter-spacing: normal;
      --mdc-icon-button-size: 36px;
      --mdc-icon-size: 18px;
      color: #444;
      border-bottom: 1px solid #ddd;
      flex: 0 0 36px;
    }

    #editor mwc-tab {
      flex: 0;
    }

    #editor > textarea {
      flex: 1;
    }

    code-sample-editor-preview {
      flex: 0 0 50%;
      height: 100%;
    }
  `;

  /**
   * A document-relative path to a project configuration file.
   */
  @property({ attribute: 'project-src' })
  projectSrc?: string;

  /**
   * The service worker scope to register on
   */
  // TODO: generate this?
  @property({ attribute: 'sandbox-scope' })
  sandboxScope = 'code-sample-editor-projects';

  // computed from this.sandboxScope
  _scopeUrl!: string;

  @property({ type: Boolean })
  enableAddFile = false;

  @query('code-sample-editor-preview')
  private _preview!: CodeSampleEditorPreviewElement;

  @query('mwc-tab-bar')
  private _tabBar!: TabBar;

  @query('textarea')
  private _editor!: HTMLTextAreaElement;

  /**
   * A unique identifier for this instance so the service worker can keep an
   * independent cache of files for it.
   */
  private readonly _sessionId: string = generateUniqueSessionId();

  @internalProperty()
  private _files?: SampleFile[];

  // TODO: make a public property/method to select a file
  @property({ attribute: false })
  private _currentFileIndex?: number;

  private get _currentFile() {
    return this._currentFileIndex === undefined
      ? undefined
      : this._files?.[this._currentFileIndex];
  }

  @internalProperty()
  private _serviceWorkerAPI?: Remote<ServiceWorkerAPI>;

  private get _previewSrc() {
    // Make sure that we've connected to the Service Worker and loaded the
    // project files before generating the preview URL. This ensures that there
    // are files to load when the iframe navigates to the URL.
    if (this._serviceWorkerAPI === undefined || this._files === undefined) {
      return undefined;
    }
    // TODO (justinfagnani): lookup URL to show from project config
    const indexUrl = new URL(`./${this._sessionId}/index.html`, this._scopeUrl);
    return indexUrl.href;
  }

  update(changedProperties: PropertyValues) {
    if (changedProperties.has('sandboxScope')) {
      this._scopeUrl = new URL(`./${this.sandboxScope}/`, import.meta.url).href;
      this._startWorkders();
    }
    if (changedProperties.has('projectSrc')) {
      this._fetchProject();
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      <div id="editor">
        <mwc-tab-bar
          .activeIndex=${this._currentFileIndex || 0}
          @MDCTabBar:activated=${this._tabActivated}
        >
          ${this._files?.map((file) => {
      const label = file.name.substring(file.name.lastIndexOf('/') + 1);
      return html`<mwc-tab label=${label}></mwc-tab>`;
    })}
          ${this.enableAddFile
        ? html`<mwc-icon-button icon="add"></mwc-icon-button>`
        : nothing}
        </mwc-tab-bar>
        <textarea
          .value=${(this._currentFile && this._currentFile.content) || ''}
          @change=${this._onEdit}
        ></textarea>
      </div>
      <code-sample-editor-preview
        .src="${this._previewSrc}"
        location="index.html"
        @reload=${this._onSave}
      >
      </code-sample-editor-preview>
    `;
  }

  private _tabActivated(e: CustomEvent<{ index: number }>) {
    this._currentFileIndex = e.detail.index;
  }

  private async _fetchProject() {
    if (!this.projectSrc) {
      return;
    }
    const projectUrl = new URL(this.projectSrc, document.baseURI);
    const manifestFetched = await fetch(this.projectSrc);
    const manifest = (await manifestFetched.json()) as ProjectManifest;

    const filenames = Object.keys(manifest.files || []);
    this._files = await Promise.all(
      filenames.map(async (filename) => {
        const fileUrl = new URL(filename, projectUrl);
        const response = await fetch(fileUrl.href);
        if (response.status === 404) {
          throw new Error(`Could not find file ${filename}`);
        }

        // Remember the mime type so that the service worker can set it
        const contentType = response.headers.get('Content-Type') || undefined;
        return {
          name: filename,
          content: await response.text(),
          contentType,
        };
      })
    );
    // TODO (justinfagnani): compile project here
    this._currentFileIndex = 0;
    // TODO(justinfagnani): whyyyy?
    await this._tabBar.updateComplete;
    this._tabBar.activeIndex = -1;
    this._tabBar.activeIndex = 0;
  }

  private async _startWorkders() {
    await Promise.all([
      // TODO (justinfagnani): this._startTypeScriptWorker(),
      this._installServiceWorker(),
    ]);
  }

  private async _installServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      // TODO: show this in the UI
      console.warn('ServiceWorker support required for <code-sample-editor>');
      return;
    }

    const registration = await navigator.serviceWorker.register(
      serviceWorkerScriptUrl.href,
      { scope: this._scopeUrl }
    );

    registration.addEventListener('updatefound', () => {
      // We can get a new service worker at any time, so we need to listen for
      // updates and connect to new workers on demand.
      const newWorker = registration.installing;
      if (newWorker) {
        this._connectServiceWorker(newWorker);
      }
    });

    if (registration.active) {
      this._connectServiceWorker(registration.active);
    } else {
      console.warn('unhandled service worker registration state', registration);
    }
  }

  private async _connectServiceWorker(worker: ServiceWorker) {
    return new Promise((resolve) => {
      const { port1, port2 } = new MessageChannel();

      const onMessage = (e: MessageEvent) => {
        if (e.data.initComlink === HANDSHAKE_RECEIVED) {
          port1.removeEventListener('message', onMessage);
          this._serviceWorkerAPI = wrap<ServiceWorkerAPI>(port1);
          this._serviceWorkerAPI.setFileAPI(
            proxy({
              getFile: async (
                name: string
              ): Promise<SampleFile | undefined> => {
                // TODO (justinfagnani): compile files here
                return this._files?.find((f) => f.name === name);
              },
            }),
            this._sessionId
          );
          resolve();
        }
      };

      port1.addEventListener('message', onMessage);
      port1.start();
      worker.postMessage(
        {
          initComlink: ESTABLISH_HANDSHAKE,
          port: port2,
        },
        [port2]
      );
      // TODO: timeout
    });
  }

  private _onEdit() {
    const value = this._editor.value;
    if (this._currentFile) {
      this._currentFile.content = value!;
      // TODO (justinfagnani): send change to worker
    }
  }

  private async _onSave() {
    // TODO (justinfagnani): await this._compileProject();
    this._preview.reload();
  }
}
