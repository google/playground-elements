/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
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
import {
  getRandomString,
  endWithSlash,
  forceSkypackRawMode,
} from './shared/util.js';
import {Deferred} from './shared/deferred.js';

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

/**
 * Coordinates <playground-file-editor> and <playground-preview> elements.
 */
@customElement('playground-project')
export class PlaygroundProject extends LitElement {
  /**
   * A document-relative path to a project configuration file.
   *
   * When both `projectSrc` and `files` are set, the one set most recently wins.
   * Slotted children win only if both `projectSrc` and `files` are undefined
   */
  @property({attribute: 'project-src', hasChanged: () => false})
  get projectSrc(): string | undefined {
    if (this._source.type === 'url') {
      return this._source.url;
    }
    return undefined;
  }

  set projectSrc(url: string | undefined) {
    if (url) {
      if (this._source.type !== 'url' || this._source.url !== url) {
        this._source = {type: 'url', url};
      }
    } else if (this._source.type === 'url') {
      this._source = {type: 'none'};
    }
  }

  /**
   * Get or set the array of project files.
   *
   * When both `projectSrc` and `files` are set, the one set most recently wins.
   * Slotted children win only if both `projectSrc` and `files` are undefined
   */
  @property({attribute: false, hasChanged: () => false})
  get files(): SampleFile[] | undefined {
    return this._files;
  }

  set files(files: SampleFile[] | undefined) {
    if (files) {
      for (const file of files) {
        if (!file.contentType) {
          file.contentType = typeFromFilename(file.name);
        }
      }
      this._source = {type: 'direct', files};
    } else if (this._source.type === 'direct') {
      this._source = {type: 'none'};
    }
  }

  /**
   * This property is used to settle which of the multiple ways a project can be
   * specified was set most recently.
   */
  @internalProperty()
  private _source:
    | {
        type: 'none';
      }
    | {
        type: 'direct';
        files: SampleFile[];
      }
    | {
        type: 'url';
        url: string;
      }
    | {
        type: 'slot';
        files: SampleFile[];
        importMap: ModuleImportMap;
      } = {type: 'none'};

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
  sandboxBaseUrl = forceSkypackRawMode(new URL('.', import.meta.url)).href;

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

  private _files?: SampleFile[];

  @internalProperty()
  private _serviceWorkerAPI?: Remote<ServiceWorkerAPI>;

  private _deferredTypeScriptWorkerApi = new Deferred<
    Remote<TypeScriptWorkerAPI>
  >();

  private _compiledFilesPromise = Promise.resolve<
    Map<string, string> | undefined
  >(undefined);
  private _compiledFiles?: Map<string, string>;

  private _validImportMap: ModuleImportMap = {};

  private set _importMap(importMap: ModuleImportMap) {
    const errors = validateImportMap(importMap);
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(error);
      }
      this._validImportMap = {};
    } else {
      this._validImportMap = importMap;
    }
  }

  private get _importMap(): ModuleImportMap {
    return this._validImportMap;
  }

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
    // can figure out which proxy client goes with which session. We use an
    // #anchor instead of a ?queryParam because unpkg.com strips all
    // ?queryParams.
    return new URL(
      `playground-service-worker-proxy.html#playground-session-id=${this._sessionId}`,
      this._normalizedSandboxBaseUrl
    ).href;
  }

  static styles = css`
    iframe {
      display: none;
    }
  `;

  async update(changedProperties: PropertyValues) {
    if (changedProperties.has('_source')) {
      this._loadProjectFromSource();
    }
    if (
      changedProperties.has('sandboxScope') ||
      changedProperties.has('sandboxBaseUrl') ||
      changedProperties.has('_serviceWorkerAPI')
    ) {
      this.dispatchEvent(new CustomEvent('urlChanged'));
    }
    super.update(changedProperties);
  }

  private async _loadProjectFromSource() {
    const source = this._source;
    switch (source.type) {
      case 'none':
        this._files = undefined;
        this._importMap = {};
        break;
      case 'direct':
        this._files = source.files;
        this._importMap = {};
        break;
      case 'slot':
        this._files = source.files;
        this._importMap = source.importMap;
        break;
      case 'url':
        const {files, importMap} = await fetchProject(source.url);
        // Note the source could have changed while fetching, hence the
        // double-check here.
        if (source !== this._source) {
          return;
        }
        this._files = files;
        this._importMap = importMap;
        break;
      default:
        source as void; // Exhaustive check.
        break;
    }
    this.dispatchEvent(new CustomEvent('filesChanged'));
    this.save();
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
    const {type} = this._source;
    if (type !== 'none' && type !== 'slot') {
      // It's a little tricky to do "most recent wins" with slots, because the
      // slotchange event will always fire after the first render, giving the
      // illusion that it was set after the other methods. We could do some
      // extra book-keeping to make this work, but it doesn't seem worth the
      // complexity, because it should be very rare to [1] set a `projectSrc` or
      // `files`, and then [2] slot some new children.
      return;
    }
    const files: SampleFile[] = [];
    let importMap: ModuleImportMap | undefined = undefined;
    for (const s of this._slot.assignedElements({flatten: true})) {
      const typeAttr = s.getAttribute('type');
      if (!typeAttr?.startsWith('sample/')) {
        continue;
      }
      const fileType = typeAttr.substring('sample/'.length);
      // TODO (justinfagnani): better entity unescaping
      let content = s.textContent!.replace('&lt;', '<');
      if (!s.hasAttribute('preserve-whitespace')) {
        content = outdent(content);
      }

      if (fileType === 'importmap') {
        try {
          importMap = JSON.parse(content) as ModuleImportMap;
        } catch {
          console.error('Invalid import map JSON', s);
        }
      } else {
        const name = s.getAttribute('filename');
        if (!name) {
          continue;
        }
        // Note "" is an invalid label.
        const label = s.getAttribute('label') || undefined;
        const contentType = typeEnumToMimeType(fileType);
        files.push({
          name,
          label,
          hidden: s.hasAttribute('hidden'),
          content,
          contentType,
        });
      }
    }
    if (files.length > 0 || importMap !== undefined) {
      this._source = {type: 'slot', files, importMap: importMap ?? {}};
    }
  }

  async firstUpdated() {
    const typescriptWorkerScriptUrl = forceSkypackRawMode(
      new URL('./playground-typescript-worker.js', import.meta.url)
    );
    let worker: Worker;
    if (typescriptWorkerScriptUrl.origin === window.location.origin) {
      // Easy case.
      worker = new Worker(typescriptWorkerScriptUrl);
    } else {
      // If the worker script is different-origin, we need to fetch it ourselves
      // and create a blob URL.
      const resp = await fetch(typescriptWorkerScriptUrl.href);
      const text = await resp.text();
      const blobUrl = URL.createObjectURL(
        new Blob([text], {type: 'application/javascript'})
      );
      worker = new Worker(blobUrl);
      URL.revokeObjectURL(blobUrl);
    }
    this._deferredTypeScriptWorkerApi.resolve(
      wrap<TypeScriptWorkerAPI>(worker)
    );
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

  async save() {
    // Clear in case a save is explicitly requested while a timer is already
    // running.
    this._clearSaveTimeout();
    this._compiledFiles = undefined;
    this.dispatchEvent(new CustomEvent('compileStart'));
    if (this._files !== undefined) {
      const workerApi = await this._deferredTypeScriptWorkerApi.promise;
      this._compiledFilesPromise = (workerApi.compileProject(
        this._files,
        this._importMap
      ) as any) as Promise<Map<string, string>>;
      this._compiledFiles = await this._compiledFilesPromise;
    } else {
      this._compiledFilesPromise = Promise.resolve(undefined);
    }
    this.dispatchEvent(new CustomEvent('compileDone'));
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
    }, 300);
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
    this.dispatchEvent(new CustomEvent('filesChanged'));
    this.save();
  }

  deleteFile(filename: string) {
    this._files = this._files?.filter((file) => file.name !== filename);
    this.dispatchEvent(new CustomEvent('filesChanged'));
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
    this.dispatchEvent(new CustomEvent('filesChanged'));
    this.save();
  }
}

const fetchProject = async (url: string) => {
  const projectUrl = new URL(url, document.baseURI);
  const manifestFetched = await fetch(url);
  const manifest = (await manifestFetched.json()) as ProjectManifest;

  const files = await Promise.all(
    Object.entries(manifest.files ?? {}).map(
      async ([name, {content, contentType, label, hidden}]) => {
        if (content === undefined) {
          const fileUrl = new URL(name, projectUrl);
          const response = await fetch(fileUrl.href);
          if (response.status === 404) {
            throw new Error(`Could not find file ${name}`);
          }
          content = await response.text();
          if (!contentType) {
            contentType = response.headers.get('Content-Type') ?? undefined;
          }
        }
        if (!contentType) {
          contentType = typeFromFilename(name) ?? 'text/plain';
        }
        return {
          name,
          label,
          hidden,
          content,
          contentType,
        };
      }
    )
  );
  return {files, importMap: manifest.importMap ?? {}};
};

const typeFromFilename = (filename: string) => {
  const idx = filename.lastIndexOf('.');
  if (idx === -1 || idx === filename.length - 1) {
    return undefined;
  }
  const extension = filename.slice(idx + 1);
  return typeEnumToMimeType(extension);
};

const typeEnumToMimeType = (type?: string) => {
  if (type === undefined) {
    return;
  }
  switch (type) {
    // TypeScript
    case 'ts':
      return 'video/mp2t';
    case 'js':
      return 'application/javascript; charset=utf-8';
    case 'json':
      return 'application/json; charset=utf-8';
    case 'html':
      return 'text/html; charset=utf-8';
    case 'css':
      return 'text/css; charset=utf-8';
  }
  return undefined;
};

/**
 * Validate an import map configuration (https://wicg.github.io/import-maps/).
 * Returns an array of errors. If empty, the import map is valid.
 */
const validateImportMap = (importMap: unknown): string[] => {
  const errors = [];

  if (typeof importMap !== 'object' || importMap === null) {
    errors.push(
      `Import map is invalid because it must be an object,` +
        ` but it was ${importMap === null ? 'null' : typeof importMap}.`
    );
    return errors;
  }

  const invalidKeys = Object.keys(importMap).filter((key) => key !== 'imports');
  if (invalidKeys.length > 0) {
    errors.push(
      `Invalid import map properties: ${[...invalidKeys].join(', ')}.` +
        ` Only "imports" are currently supported.`
    );
  }
  const imports = (importMap as {imports: unknown}).imports;
  if (imports === undefined) {
    return errors;
  }

  if (typeof imports !== 'object' || imports === null) {
    errors.push(
      `Import map "imports" property is invalid` +
        ` because it must be an object,` +
        ` but it was ${imports === null ? 'null' : typeof imports}.`
    );
    return errors;
  }

  for (const [specifierKey, resolutionResult] of Object.entries(imports)) {
    if (typeof resolutionResult !== 'string') {
      errors.push(
        `Import map key "${specifierKey}" is invalid because` +
          ` address must be a string, but was` +
          ` ${resolutionResult === null ? 'null' : typeof resolutionResult}`
      );
      continue;
    }
    if (specifierKey.endsWith('/') && !resolutionResult.endsWith('/')) {
      errors.push(
        `Import map key "${specifierKey}" is invalid because` +
          ` address "${resolutionResult}" must end in a forward-slash.`
      );
    }
    try {
      new URL(resolutionResult);
    } catch {
      errors.push(
        `Import map key "${specifierKey}" is invalid because` +
          ` address "${resolutionResult}" is not a valid URL.`
      );
    }
  }

  return errors;
};

declare global {
  interface HTMLElementTagNameMap {
    'playground-project': PlaygroundProject;
  }
}

/**
 * Trim shared leading whitespace from all lines, and remove empty
 * leading/trailing lines.
 */
const outdent = (str: string): string => {
  // Remove leading/trailing empty lines (we don't use trim() because we don't
  // want to remove leading whitespace on the first content line).
  str = str.replace(/(^[\n\s]*\n)|(\n[\n\s]*$)/g, '');
  let shortestIndent;
  for (const line of str.split(/\n/g)) {
    const indent = line.match(/^\s*/)![0].length;
    if (shortestIndent === undefined || indent < shortestIndent) {
      shortestIndent = indent;
    }
  }
  return str.replace(RegExp(`^\\s{${shortestIndent ?? 0}}`, 'gm'), '');
};
