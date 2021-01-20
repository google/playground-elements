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
  css,
  customElement,
  property,
  query,
  PropertyValues,
  internalProperty,
} from 'lit-element';
import {wrap, Remote, proxy} from 'comlink';

import {
  SampleFile,
  ServiceWorkerAPI,
  ProjectManifest,
  PlaygroundMessage,
  TypeScriptWorkerAPI,
  CONFIGURE_PROXY,
  CONNECT_PROJECT_TO_SW,
  ACKNOWLEDGE_SW_CONNECTION,
  ModuleImportMap,
} from './shared/worker-api.js';
import {getRandomString, endWithSlash} from './shared/util.js';

// Each <playground-project> has a unique session ID used to scope requests from
// the preview iframes.
const sessions = new Set<string>();
const generateUniqueSessionId = (): string => {
  let sessionId;
  do {
    sessionId = getRandomString();
  } while (sessions.has(sessionId));
  sessions.add(sessionId);
  return sessionId;
};

const typescriptWorkerScriptUrl = new URL(
  './playground-typescript-worker.js',
  import.meta.url
);

/**
 * Coordinates <playground-file-editor> and <playground-preview> elements.
 */
@customElement('playground-project')
export class PlaygroundProject extends LitElement {
  /**
   * A document-relative path to a project configuration file.
   */
  @property({attribute: 'project-src'})
  projectSrc?: string;

  /**
   * Base URL for script execution sandbox.
   *
   * It is highly advised to change this property to a URL on a separate origin
   * which has no privileges to perform sensitive actions or access sensitive
   * data. This is because this element will execute arbitrary JavaScript, and
   * does not have the ability to sanitize or sandbox it.
   *
   * This URL must host the following files from the playground-elements
   * package:
   *   1. playground-service-worker.js
   *   2. playground-service-worker-proxy.html
   *
   * Defaults to the directory containing the script that defines this element
   * on the same origin (typically something like
   * "/node_modules/playground-elements/").
   */
  @property({attribute: 'sandbox-base-url'})
  sandboxBaseUrl = new URL('.', import.meta.url).href;

  /**
   * The service worker scope to register on
   */
  // TODO: generate this?
  @property({attribute: 'sandbox-scope'})
  sandboxScope = 'playground-projects/';

  /**
   * A unique identifier for this instance so the service worker can keep an
   * independent cache of files for it.
   */
  private readonly _sessionId: string = generateUniqueSessionId();

  @internalProperty()
  private _files?: SampleFile[];

  @internalProperty()
  private _serviceWorkerAPI?: Remote<ServiceWorkerAPI>;
  private _typescriptWorkerAPI?: Remote<TypeScriptWorkerAPI>;
  private _compiledFilesPromise = Promise.resolve<
    Map<string, string> | undefined
  >(undefined);
  private _compiledFiles?: Map<string, string>;
  private _importMap?: ModuleImportMap;

  @query('slot')
  private _slot!: HTMLSlotElement;

  @query('iframe')
  private _iframe!: HTMLIFrameElement;

  private get _normalizedSandboxBaseUrl() {
    const url = new URL(this.sandboxBaseUrl, document.location.href);
    url.pathname = endWithSlash(url.pathname);
    return url;
  }

  get baseUrl() {
    // Make sure that we've connected to the Service Worker and loaded the
    // project files before generating the preview URL. This ensures that there
    // are files to load when the iframe navigates to the URL.
    if (this._serviceWorkerAPI === undefined || this._files === undefined) {
      return undefined;
    }
    // TODO (justinfagnani): lookup URL to show from project config
    const indexUrl = new URL(
      `${endWithSlash(this.sandboxScope)}${this._sessionId}/`,
      this._normalizedSandboxBaseUrl
    );
    return indexUrl.href;
  }

  private get _serviceWorkerProxyIframeUrl() {
    // We include the session ID as a query parameter so that the service worker
    // can figure out which proxy client goes with which session.
    return new URL(
      `playground-service-worker-proxy.html?playground-session-id=${this._sessionId}`,
      this._normalizedSandboxBaseUrl
    ).href;
  }

  private _filesSetExternally = false;

  /**
   * Get or set the array of project files.
   *
   * Files set through this property always take precedence over `projectSrc`
   * and slotted children.
   */
  get files(): SampleFile[] | undefined {
    return this._files;
  }

  set files(files: SampleFile[] | undefined) {
    if (!files) {
      return;
    }
    this._filesSetExternally = true;
    this._files = files;
    if (this._typescriptWorkerAPI) {
      this._compileProject();
    }
    this.requestUpdate();
  }

  static styles = css`
    iframe {
      display: none;
    }
  `;

  update(changedProperties: PropertyValues) {
    if (changedProperties.has('projectSrc')) {
      this._fetchProject();
    }
    if (changedProperties.has('_files')) {
      this.dispatchEvent(new CustomEvent('filesChanged'));
    }
    if (
      changedProperties.has('sandboxScope') ||
      changedProperties.has('_files') ||
      changedProperties.has('_serviceWorkerAPI') ||
      changedProperties.has('_sessionId')
    ) {
      this.dispatchEvent(new CustomEvent('urlChanged'));
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      <slot @slotchange=${this._slotChange}></slot>
      <iframe
        src=${this._serviceWorkerProxyIframeUrl}
        @load=${this._onServiceWorkerProxyIframeLoad}
      ></iframe>
    `;
  }

  private _slotChange(_e: Event) {
    if (this.projectSrc || this._filesSetExternally) {
      // Note that the slotchange event will fire even if the only child is
      // whitespace.
      return;
    }
    const files: SampleFile[] = [];
    let importMap: ModuleImportMap = {};
    for (const s of this._slot.assignedElements({flatten: true})) {
      const typeAttr = s.getAttribute('type');
      if (!typeAttr || !typeAttr.startsWith('sample/')) {
        continue;
      }
      const fileType = typeAttr.substring('sample/'.length);
      // TODO (justinfagnani): better entity unescaping
      const content = s.textContent!.trim().replace('&lt;', '<');

      if (fileType === 'importmap') {
        try {
          importMap = JSON.parse(content) as ModuleImportMap;
        } catch {
          console.warn('Invalid importmap JSON', s);
        }
      } else {
        const name = s.getAttribute('filename');
        if (!name) {
          continue;
        }
        const label = s.getAttribute('label') || undefined;
        const contentType = typeEnumToMimeType(fileType);
        files.push({
          name,
          label,
          content,
          contentType,
        });
      }
    }
    this._files = files;
    this._importMap = importMap;
    this._compileProject();
  }

  private async _fetchProject() {
    if (!this.projectSrc || this._filesSetExternally) {
      return;
    }
    const projectUrl = new URL(this.projectSrc, document.baseURI);
    const manifestFetched = await fetch(this.projectSrc);
    const manifest = (await manifestFetched.json()) as ProjectManifest;

    const filenames = manifest.files ? Object.keys(manifest.files) : [];
    const files = await Promise.all(
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
          label: manifest.files![filename].label,
          content: await response.text(),
          contentType,
        };
      })
    );
    if (!this._filesSetExternally) {
      // Note we check _filesSetExternally again here in case it was set while
      // we were fetching the project and its files.
      this._files = files;
      this._importMap = manifest.importMap;
      this._compileProject();
    }
  }

  firstUpdated() {
    const worker = new Worker(typescriptWorkerScriptUrl);
    this._typescriptWorkerAPI = wrap<TypeScriptWorkerAPI>(worker);
    if (this._files) {
      this._compileProject();
    }
  }

  private _onServiceWorkerProxyIframeLoad() {
    // This iframe exists to proxy messages between this project and the service
    // worker, because the service worker may be running on a different origin
    // for security.
    const iframeWindow = this._iframe.contentWindow;
    if (!iframeWindow) {
      throw new Error(
        'Unexpected internal error: ' +
          '<playground-project> service worker proxy iframe had no contentWindow'
      );
    }
    // This channel is persistent, and is only used to receieve new service
    // worker channel ports from the proxy iframe. Note we can get new service
    // worker ports at any time from the proxy, when the service worker updates.
    const {port1, port2} = new MessageChannel();
    port1.addEventListener(
      'message',
      (event: MessageEvent<PlaygroundMessage>) => {
        if (event.data.type === CONNECT_PROJECT_TO_SW) {
          this._onNewServiceWorkerPort(event.data.port);
        }
      }
    );
    port1.start();
    const configureMessage: PlaygroundMessage = {
      type: CONFIGURE_PROXY,
      url: 'playground-service-worker.js',
      scope: this.sandboxScope,
      port: port2,
    };
    // We could constrain targetOrigin to
    // `this._normalizedSandboxBaseUrl.origin`, but unclear if that provides any
    // security benefit, and would add the limitation that the sandboxBaseUrl
    // can't redirect to another origin.
    iframeWindow.postMessage(configureMessage, '*', [configureMessage.port]);
  }

  private _onNewServiceWorkerPort(port: MessagePort) {
    const onMessage = (e: MessageEvent<PlaygroundMessage>) => {
      if (e.data.type === ACKNOWLEDGE_SW_CONNECTION) {
        port.removeEventListener('message', onMessage);
        this._serviceWorkerAPI = wrap<ServiceWorkerAPI>(port);
        this._serviceWorkerAPI.setFileAPI(
          proxy({
            getFile: (name: string) => this._getFile(name),
          }),
          this._sessionId
        );
      }
    };
    port.addEventListener('message', onMessage);
    port.start();
  }

  private async _getFile(name: string): Promise<SampleFile | undefined> {
    await this._compiledFilesPromise;
    const compiledUrl = new URL(name, window.origin).href;
    const compiledContent = this._compiledFiles?.get(compiledUrl);
    if (compiledContent !== undefined) {
      return {
        name,
        label: this._files?.find((f) => f.name === name)?.label,
        content: compiledContent,
        contentType: 'application/javascript',
      };
    } else {
      return this._files?.find((f) => f.name === name);
    }
  }

  private async _compileProject() {
    if (this._files === undefined) {
      return;
    }
    this._compiledFilesPromise = (this._typescriptWorkerAPI!.compileProject(
      this._files,
      this._importMap
    ) as any) as Promise<Map<string, string>>;
    this._compiledFiles = undefined;
    this._compiledFiles = await this._compiledFilesPromise;
  }

  private _saveTimeoutId?: ReturnType<typeof setTimeout> = undefined;

  private _clearSaveTimeout() {
    if (this._saveTimeoutId !== undefined) {
      clearTimeout(this._saveTimeoutId);
      this._saveTimeoutId = undefined;
    }
  }

  saveDebounced() {
    this._clearSaveTimeout();
    // TODO(aomarks) Consider exposing a property for auto-save timeout, but it
    // should probably be on the editor or the preview, not the project.
    this._saveTimeoutId = setTimeout(() => {
      this.save();
    }, 500);
  }

  async save() {
    // Clear in case a save is explicitly requested while a timer is already
    // running.
    this._clearSaveTimeout();
    await this._compileProject();
    this.dispatchEvent(new CustomEvent('contentChanged'));
  }

  isValidNewFilename(name: string): boolean {
    return (
      !!name && !!this._files && !this._files.some((file) => file.name === name)
    );
  }

  addFile(name: string) {
    if (!this._files) {
      return;
    }
    if (!this.isValidNewFilename(name)) {
      return;
    }
    this._files = [
      ...this._files,
      {name, content: '', contentType: typeFromFilename(name)},
    ];
    this.save();
  }

  deleteFile(filename: string) {
    this._files = this._files?.filter((file) => file.name !== filename);
    this.save();
  }

  renameFile(oldName: string, newName: string) {
    if (!oldName || !this._files) {
      return;
    }
    if (!this.isValidNewFilename(newName)) {
      return;
    }
    const file = this._files.find((file) => file.name === oldName);
    if (!file) {
      return;
    }
    // TODO(aomarks) Check name is unique;
    file.name = newName;
    file.contentType = typeFromFilename(newName);
    this._files = [...this._files];
    this.save();
  }
}

const typeFromFilename = (filename: string) => {
  const idx = filename.lastIndexOf('.');
  if (idx === -1 || idx === filename.length - 1) {
    return undefined;
  }
  const extension = filename.slice(idx + 1);
  return typeEnumToMimeType(extension);
};

const typeEnumToMimeType = (type?: string) => {
  // TODO: infer type based on extension too
  if (type === undefined) {
    return;
  }
  switch (type) {
    // TypeScript
    case 'ts':
      return 'video/mp2t';
    case 'js':
      return 'application/javascript; charset=utf-8';
    case 'html':
      return 'text/html; charset=utf-8';
    case 'css':
      return 'text/css; charset=utf-8';
  }
  return undefined;
};

declare global {
  interface HTMLElementTagNameMap {
    'playground-project': PlaygroundProject;
  }
}
