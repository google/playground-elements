/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css, PropertyValues} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {wrap, Remote, proxy} from 'comlink';

import {
  SampleFile,
  ServiceWorkerAPI,
  ProjectManifest,
  PlaygroundMessage,
  WorkerAPI,
  CONFIGURE_PROXY,
  CONNECT_PROJECT_TO_SW,
  ACKNOWLEDGE_SW_CONNECTION,
  ModuleImportMap,
  HttpError,
  UPDATE_SERVICE_WORKER,
  CodeEditorChangeData,
  CompletionInfoWithDetails,
} from './shared/worker-api.js';
import {
  getRandomString,
  endWithSlash,
  forceSkypackRawMode,
} from './shared/util.js';
import {
  completionEntriesAsEditorCompletions,
  populateCompletionInfoWithDetailGetters,
  sortCompletionItems,
} from './shared/completion-utils.js';
import {npmVersion, serviceWorkerHash} from './shared/version.js';
import {Deferred} from './shared/deferred.js';
import {PlaygroundBuild} from './internal/build.js';

import {Diagnostic} from 'vscode-languageserver-protocol';

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

declare global {
  interface HTMLElementEventMap {
    filesChanged: FilesChangedEvent;
  }
}

export class FilesChangedEvent extends Event {
  projectLoaded: boolean;
  constructor(projectLoaded = false) {
    super('filesChanged');
    this.projectLoaded = projectLoaded;
  }
}

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
   * Get or set the project config.
   *
   * When both `projectSrc` and `config` are set, the one set most recently
   * wins. Slotted children win only if both `projectSrc` and `config` are
   * undefined.
   */
  @property({attribute: false, hasChanged: () => false})
  get config(): ProjectManifest | undefined {
    // Note this is declared a @property only to capture properties set before
    // upgrade. Attribute reflection and update lifecycle disabled because they
    // are not needed in this case.
    return {
      files: Object.fromEntries(
        (this._files ?? []).map((file) => [
          file.name,
          {
            ...file,
            name: undefined,
          },
        ])
      ),
      importMap: this._validImportMap,
    };
  }
  set config(config: ProjectManifest | undefined) {
    if (config) {
      this._source = {type: 'direct', config};
    } else if (this._source.type === 'direct') {
      this._source = {type: 'none'};
    }
  }

  get files(): SampleFile[] | undefined {
    return this._files;
  }

  /**
   * This property is used to settle which of the multiple ways a project can be
   * specified was set most recently.
   */
  @state()
  private _source:
    | {
        type: 'none';
      }
    | {
        type: 'direct';
        config: ProjectManifest;
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
  sandboxBaseUrl = `https://unpkg.com/playground-elements@${npmVersion}/`;

  /**
   * The service worker scope to register on
   */
  // TODO: generate this?
  @property({attribute: 'sandbox-scope'})
  sandboxScope = `__playground_swfs_${serviceWorkerHash}/`;

  private _build?: PlaygroundBuild;

  /**
   * Map from filename to array of Language Server Protocol diagnostics
   * resulting from the latest compilation.
   */
  get diagnostics(): Map<string, Diagnostic[]> | undefined {
    return this._build?.diagnostics;
  }

  private _completionInfo?: CompletionInfoWithDetails;

  /**
   * A pristine copy of the original project files, used for the `modified`
   * getter.
   */
  private _pristineFiles?: SampleFile[];

  /**
   * Cached value for the `modified` getter. When undefined, the modified state
   * is unknown and must be computed.
   */
  private _modified: boolean | undefined = false;

  /**
   * Indicates whether the user has modified, added, or removed any project
   * files. Resets whenever a new project is loaded.
   */
  get modified(): boolean {
    if (this._modified === undefined) {
      if (this._files === undefined && this._pristineFiles === undefined) {
        this._modified = false;
      } else if (
        this._files === undefined ||
        this._pristineFiles === undefined
      ) {
        this._modified = true;
      } else {
        this._modified = !playgroundFilesDeepEqual(
          this._files,
          this._pristineFiles
        );
      }
    }
    return this._modified;
  }

  /**
   * A unique identifier for this instance so the service worker can keep an
   * independent cache of files for it.
   */
  private readonly _sessionId: string = generateUniqueSessionId();

  /**
   * The active project files.
   */
  private _files?: SampleFile[];

  @state()
  private _serviceWorkerAPI?: Remote<ServiceWorkerAPI>;

  private _deferredTypeScriptWorkerApi = new Deferred<Remote<WorkerAPI>>();

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
  private _serviceWorkerProxyIframe!: HTMLIFrameElement;

  private get _normalizedSandboxBaseUrl() {
    const url = new URL(this.sandboxBaseUrl, import.meta.url);
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

  static override styles = css`
    iframe {
      display: none;
    }
  `;

  override async update(changedProperties: PropertyValues) {
    if (changedProperties.has('_source')) {
      /* eslint-disable @typescript-eslint/no-floating-promises */
      this._loadProjectFromSource();
      /* eslint-enable @typescript-eslint/no-floating-promises */
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
        {
          const {files, importMap} = await expandProjectConfig(
            source.config,
            document.baseURI
          );
          // Note the source could have changed while fetching, hence the
          // double-check here.
          if (source !== this._source) {
            return;
          }
          this._files = files;
          this._importMap = importMap;
        }
        break;
      case 'slot':
        this._files = source.files;
        this._importMap = source.importMap;
        break;
      case 'url':
        {
          const {files, importMap} = await fetchProjectConfig(
            new URL(source.url, document.baseURI).href
          );
          // Note the source could have changed while fetching, hence the
          // double-check here.
          if (source !== this._source) {
            return;
          }
          this._files = files;
          this._importMap = importMap;
        }
        break;
      default: // Exhaustive check.
        source as void;
        break;
    }
    this._pristineFiles =
      this._files && (JSON.parse(JSON.stringify(this._files)) as SampleFile[]);
    this._modified = false;
    this.dispatchEvent(new FilesChangedEvent(true));
    /* eslint-disable @typescript-eslint/no-floating-promises */
    this.save();
    /* eslint-enable @typescript-eslint/no-floating-promises */
  }

  override render() {
    return html`
      <slot @slotchange=${this._slotChange}></slot>
      <iframe
        src=${this._serviceWorkerProxyIframeUrl}
        @load=${this._onServiceWorkerProxyIframeLoad}
      ></iframe>
    `;
  }

  private _slotChange() {
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
      let content = s.textContent ?? '';
      if (fileType === 'html') {
        // Replace usages of `&lt;/script>` with `</script>`. Match against
        // `&lt;/` so that other usages of &lt; aren't replaced.
        content = content.replace(/&lt;\//g, '</');
      }
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
        const selected = s.hasAttribute('selected');
        const contentType = typeEnumToMimeType(fileType);
        files.push({
          name,
          label,
          hidden: s.hasAttribute('hidden'),
          content,
          contentType,
          selected,
        });
      }
    }
    if (files.length > 0 || importMap !== undefined) {
      this._source = {type: 'slot', files, importMap: importMap ?? {}};
    }
  }

  override async firstUpdated() {
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
    this._deferredTypeScriptWorkerApi.resolve(wrap<WorkerAPI>(worker));
  }

  private _onServiceWorkerProxyIframeLoad() {
    // This channel is persistent, and is only used to receive new service
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
    this._postMessageToServiceWorkerProxyIframe(
      {
        type: CONFIGURE_PROXY,
        scope: this.sandboxScope,
        port: port2,
      },
      [port2]
    );
  }

  private _onNewServiceWorkerPort(port: MessagePort) {
    const onMessage = (e: MessageEvent<PlaygroundMessage>) => {
      if (e.data.type === ACKNOWLEDGE_SW_CONNECTION) {
        port.removeEventListener('message', onMessage);
        if (e.data.version === serviceWorkerHash) {
          this._serviceWorkerAPI = wrap<ServiceWorkerAPI>(port);
          /* eslint-disable @typescript-eslint/no-floating-promises */
          this._serviceWorkerAPI.setFileAPI(
            proxy({
              getFile: (name: string) => this._getFile(name),
            }),
            this._sessionId
          );
          /* eslint-enable @typescript-eslint/no-floating-promises */
        } else {
          // Version mismatch. Request the service worker be updated
          // immediately. We'll get back here again after it updates via a
          // CONNECT_PROJECT_TO_SW message from the proxy.
          console.info(
            `Playground service worker is outdated. ` +
              `Want ${serviceWorkerHash} but got ${e.data.version}. ` +
              `Waiting for update.`
          );
          this._postMessageToServiceWorkerProxyIframe({
            type: UPDATE_SERVICE_WORKER,
          });
        }
      }
    };
    port.addEventListener('message', onMessage);
    port.start();
  }

  private _postMessageToServiceWorkerProxyIframe(
    message: PlaygroundMessage,
    transfer?: Transferable[]
  ) {
    // This iframe exists to proxy messages between this project and the service
    // worker, because the service worker may be running on a different origin
    // for security.
    const iframeWindow = this._serviceWorkerProxyIframe.contentWindow;
    if (!iframeWindow) {
      throw new Error(
        'Unexpected internal error: ' +
          '<playground-project> service worker proxy iframe had no contentWindow'
      );
    }
    // We could constrain targetOrigin to
    // `this._normalizedSandboxBaseUrl.origin`, but unclear if that provides any
    // security benefit, and would add the limitation that the sandboxBaseUrl
    // can't redirect to another origin.
    iframeWindow.postMessage(message, '*', transfer);
  }

  private async _getFile(name: string): Promise<SampleFile | HttpError> {
    if (this._build === undefined) {
      return {
        status: /* Service Unavailable */ 503,
        body: 'Playground build not started',
      };
    }
    return this._build.getFile(name);
  }

  /**
   * Build this project immediately, cancelling any previous build.
   */
  async save() {
    this._build?.cancel();
    const build = new PlaygroundBuild(() => {
      this.dispatchEvent(new CustomEvent('diagnosticsChanged'));
    });
    this._build = build;
    this.dispatchEvent(new CustomEvent('compileStart'));
    const workerApi = await this._deferredTypeScriptWorkerApi.promise;
    if (build.state() !== 'active') {
      return;
    }
    /* eslint-disable @typescript-eslint/no-floating-promises */
    workerApi.compileProject(
      this._files ?? [],
      {importMap: this._importMap},
      proxy((result) => build.onOutput(result))
    );
    /* eslint-enable @typescript-eslint/no-floating-promises */
    await build.stateChange;
    if (build.state() !== 'done') {
      return;
    }
    this.dispatchEvent(new CustomEvent('compileDone'));
  }

  async getCompletions(changeData: CodeEditorChangeData) {
    const tokenUnderCursorAsString = changeData.tokenUnderCursor.trim();
    // If the user is starting a new word, we need to fetch relevant completion items
    // from the TypeScript Language Service. If we are however building on top of
    // a already fetched completions list, by narrowing keyword matches, we can
    // just work with what we have fetched earlier.
    if (!changeData.isRefinement) {
      const workerApi = await this._deferredTypeScriptWorkerApi.promise;
      const completionInfo = await workerApi.getCompletions(
        changeData.fileName,
        changeData.fileContent,
        tokenUnderCursorAsString,
        changeData.cursorIndex,
        {importMap: this._importMap}
      );
      if (completionInfo) {
        const getCompletionDetailsFunction =
          this._getCompletionDetails.bind(this);
        // We pre-generate the getter for each completion item's details, so that
        // if neeeded, they can fetch their details themselves.
        this._completionInfo = populateCompletionInfoWithDetailGetters(
          completionInfo,
          changeData.fileName,
          changeData.cursorIndex,
          getCompletionDetailsFunction
        );
      }
    }

    const skipFuzzySearch =
      changeData.tokenUnderCursor === '.' || changeData.tokenUnderCursor === '';
    // In the case that the search word is a period or empty, we don't really
    // have any material to fuzzy find with, so we don't have need
    // for running the search results through a fuzzy search.
    // For this case, we just return the entries as completion items as is.
    let completions = [];
    if (skipFuzzySearch) {
      completions = completionEntriesAsEditorCompletions(
        this._completionInfo?.entries,
        changeData.tokenUnderCursor
      );
    } else {
      completions = sortCompletionItems(
        this._completionInfo?.entries,
        tokenUnderCursorAsString
      );
    }
    // We want to pre-fetch the first completion item, if it's present
    // so that when the data gets to the code-editor, the detail hopefully
    // is already loaded.
    //
    // Note invoking this getter actually triggers the fetch.
    void completions[0]?.details;
    return completions;
  }

  private async _getCompletionDetails(
    filename: string,
    cursorIndex: number,
    completionWord: string
  ) {
    const workerApi = await this._deferredTypeScriptWorkerApi.promise;
    const completionItemDetails = await workerApi.getCompletionItemDetails(
      filename,
      cursorIndex,
      {importMap: this._importMap},
      completionWord
    );

    return completionItemDetails;
  }

  private lastSave = Promise.resolve();
  private savePending = false;
  /**
   * A simple debouncer that aims for maximal responsiveness when compiles are fast.
   *
   * There is no meaning to when the returned promise resolves.
   */
  async saveDebounced() {
    if (this.savePending) {
      return;
    }
    this.savePending = true;
    await this.lastSave;
    this.savePending = false;
    this.lastSave = this.save();
  }

  isValidNewFilename(name: string): boolean {
    if (!name) {
      return false;
    }
    const existing = this._files?.find((file) => file.name === name);
    if (existing !== undefined) {
      return existing.hidden === true;
    }
    return true;
  }

  editFile(file: SampleFile, newContent: string) {
    // Note this method takes the file object itself rather than the name like
    // add/delete/rename, because edits happen at high frequency so we don't
    // want to be doing any searches.
    file.content = newContent;
    this._modified = undefined;
    /* eslint-disable @typescript-eslint/no-floating-promises */
    this.saveDebounced();
    /* eslint-enable @typescript-eslint/no-floating-promises */
  }

  addFile(name: string) {
    if (!this._files || !this.isValidNewFilename(name)) {
      return;
    }
    const existing = this._files?.find((file) => file.name === name);
    if (existing?.hidden === true) {
      // If a file already exists but is hidden, then we allow the user to
      // "create" it, which is actually unhiding it.
      existing.hidden = false;
    } else {
      this._files.push({
        name,
        content: '',
        contentType: typeFromFilename(name),
      });
    }
    this._modified = undefined;
    this.requestUpdate();
    this.dispatchEvent(new FilesChangedEvent());
    /* eslint-disable @typescript-eslint/no-floating-promises */
    this.save();
    /* eslint-enable @typescript-eslint/no-floating-promises */
  }

  deleteFile(filename: string) {
    if (!this._files) {
      return;
    }
    const idx = this._files.findIndex((file) => file.name === filename);
    if (idx < 0) {
      return;
    }
    this._files = [...this._files.slice(0, idx), ...this._files.slice(idx + 1)];
    this._modified = undefined;
    this.dispatchEvent(new FilesChangedEvent());
    /* eslint-disable @typescript-eslint/no-floating-promises */
    this.save();
    /* eslint-enable @typescript-eslint/no-floating-promises */
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
    this._modified = undefined;
    this.dispatchEvent(new FilesChangedEvent());
    /* eslint-disable @typescript-eslint/no-floating-promises */
    this.save();
    /* eslint-enable @typescript-eslint/no-floating-promises */
  }
}

/**
 * Fetches and expands the given JSON project config URL.
 */
const fetchProjectConfig = async (
  url: string,
  alreadyFetchedFilenames = new Set<string>(),
  alreadyFetchedConfigUrls = new Set<string>()
): Promise<{files: Array<SampleFile>; importMap: ModuleImportMap}> => {
  if (alreadyFetchedConfigUrls.has(url)) {
    throw new Error(
      `Circular project config extends: ${[
        ...alreadyFetchedConfigUrls.values(),
        url,
      ].join(' extends ')}`
    );
  }
  alreadyFetchedConfigUrls.add(url);
  const resp = await fetch(url);
  if (resp.status !== 200) {
    throw new Error(
      `Error ${
        resp.status
      } fetching project config from ${url}: ${await resp.text()}`
    );
  }
  let config: Partial<ProjectManifest>;
  try {
    config = await resp.json();
  } catch (e) {
    throw new Error(
      `Error parsing project config JSON from ${url}: ${(e as Error).message}`
    );
  }
  return await expandProjectConfig(
    config,
    url,
    alreadyFetchedFilenames,
    alreadyFetchedConfigUrls
  );
};

/**
 * Expands a partial project config by following its `extends` property, and
 * fetching the content for all files.
 */
const expandProjectConfig = async (
  config: ProjectManifest,
  baseUrl: string,
  alreadyFetchedFilenames = new Set<string>(),
  alreadyFetchedConfigUrls = new Set<string>()
): Promise<{files: Array<SampleFile>; importMap: ModuleImportMap}> => {
  const filePromises: Array<Promise<SampleFile>> = [];
  for (const [filename, info] of Object.entries(config.files ?? {})) {
    // A higher precedence config is already handling this file.
    if (alreadyFetchedFilenames.has(filename)) {
      continue;
    }
    alreadyFetchedFilenames.add(filename);
    if (info.content === undefined) {
      filePromises.push(
        (async () => {
          const resp = await fetch(new URL(filename, baseUrl).href);

          return {
            ...info,
            name: filename,
            content: await resp.text(),
            contentType:
              resp.headers.get('Content-Type')?.toLowerCase() ?? 'text/plain',
          };
        })()
      );
    } else {
      filePromises.push(
        Promise.resolve({
          ...info,
          name: filename,
          content: info.content ?? '',
          contentType: typeFromFilename(filename) ?? 'text/plain',
        })
      );
    }
  }

  // Start extends config fetch before we block on file fetches.
  const extendsConfigPromise = config.extends
    ? fetchProjectConfig(
        new URL(config.extends, baseUrl).href,
        alreadyFetchedFilenames,
        alreadyFetchedConfigUrls
      )
    : undefined;

  const files = await Promise.all(filePromises);
  const importMap = config.importMap ?? {};

  if (extendsConfigPromise) {
    const extendsConfig = await extendsConfigPromise;
    // Parent files go after our own.
    files.push(...extendsConfig.files);
    importMap.imports = {
      ...extendsConfig.importMap?.imports,
      // Our imports take precedence over our parents.
      ...importMap.imports,
    };
  }

  return {files, importMap};
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
    case 'jsx':
      return 'text/jsx; charset=utf-8';
    case 'tsx':
      return 'text/typescript-jsx; charset=utf-8';
    case 'html':
      return 'text/html; charset=utf-8';
    case 'css':
      return 'text/css; charset=utf-8';
    // taken from MDN's common MIME types
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    case 'svg':
      return 'image/svg+xml';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'jpeg':
    case 'jpg':
      return 'image/jpeg';
    case 'ico':
      return 'image/vnd.microsoft.icon';
    case 'webp':
      return 'image/webp';
    case 'webm':
      return 'video/webm';
    case 'mid':
    case 'midi':
      return 'audio/midi';
    case 'mp3':
      return 'audio/mpeg';
    case 'weba':
      return 'audio/webm';
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

/**
 * Test whether two lists of Playground files are deeply equal.
 */
const playgroundFilesDeepEqual = (
  filesA: SampleFile[],
  filesB: SampleFile[]
): boolean => {
  if (filesA.length !== filesB.length) {
    return false;
  }
  for (let i = 0; i < filesA.length; i++) {
    const fileA = filesA[i];
    const fileB = filesB[i];
    if (
      fileA.name !== fileB.name ||
      fileA.contentType !== fileB.contentType ||
      fileA.hidden !== fileB.hidden ||
      fileA.label !== fileB.label
    ) {
      return false;
    }
  }
  for (let i = 0; i < filesA.length; i++) {
    const fileA = filesA[i];
    const fileB = filesB[i];
    if (fileA.content !== fileB.content) {
      return false;
    }
  }
  return true;
};
