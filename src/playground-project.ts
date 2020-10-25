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
  ESTABLISH_HANDSHAKE,
  HANDSHAKE_RECEIVED,
  TypeScriptWorkerAPI,
} from '../shared/worker-api.js';
import {getRandomString, endWithSlash} from '../shared/util.js';
import {PlaygroundPreview} from './playground-preview.js';
import './playground-file-editor.js';
import {PlaygroundFileEditor} from './playground-file-editor.js';
import './playground-preview.js';

declare global {
  interface ImportMeta {
    url: string;
  }
}

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

const serviceWorkerScriptUrl = new URL('./service-worker.js', import.meta.url);
const typescriptWorkerScriptUrl = new URL(
  './typescript-worker.js',
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
   * The service worker scope to register on
   */
  // TODO: generate this?
  @property({attribute: 'sandbox-scope'})
  sandboxScope = 'playground-projects';

  // computed from this.sandboxScope
  _scopeUrl!: string;

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

  @query('slot')
  private _slot!: HTMLSlotElement;

  /** The editors that have registered themselves with this project. */
  private _editors = new Set<PlaygroundFileEditor>();

  /** The previews that have registered themselves with this project. */
  private _previews = new Set<PlaygroundPreview>();

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
      // Ensure scope is relative to this module and always ends in a slash
      this._scopeUrl = new URL(
        './' + endWithSlash(this.sandboxScope),
        import.meta.url
      ).href;
      this._startWorkers();
    }
    if (changedProperties.has('projectSrc')) {
      this._fetchProject();
    }
    if (changedProperties.has('_files')) {
      for (const editor of this._editors) {
        editor.files = this._files;
      }
    }
    if (changedProperties.has('_serviceWorkerAPI')) {
      const previewSrc = this._previewSrc;
      for (const preview of this._previews) {
        preview.src = previewSrc;
      }
    }
    super.update(changedProperties);
  }

  render() {
    return html`<slot @slotchange=${this._slotChange}></slot>`;
  }

  private _slotChange(_e: Event) {
    const elements = this._slot.assignedElements({flatten: true});
    const sampleScripts = elements.filter((e) =>
      e.matches('script[type^=sample][filename]')
    );
    // TODO (justinfagnani): detect both inline samples and a manifest
    // and give an warning.
    this._files = sampleScripts.map((s) => {
      const typeAttr = s.getAttribute('type');
      const fileType = typeAttr!.substring('sample/'.length);
      const name = s.getAttribute('filename')!;
      const label = s.getAttribute('label') || undefined;
      // TODO (justinfagnani): better entity unescaping
      const content = s.textContent!.trim().replace('&lt;', '<');
      const contentType = typeEnumToMimeType(fileType);
      return {
        name,
        label,
        content,
        contentType,
      };
    });
    this._compileProject();
  }

  _registerEditor(editor: PlaygroundFileEditor) {
    editor.files = this._files;
    this._editors.add(editor);
  }

  _unregisterEditor(editor: PlaygroundFileEditor) {
    this._editors.delete(editor);
  }

  _registerPreview(preview: PlaygroundPreview) {
    preview.src = this._previewSrc;
    this._previews.add(preview);
  }

  _unregisterPreview(preview: PlaygroundPreview) {
    this._previews.delete(preview);
  }

  private async _fetchProject() {
    if (!this.projectSrc) {
      return;
    }
    const projectUrl = new URL(this.projectSrc, document.baseURI);
    const manifestFetched = await fetch(this.projectSrc);
    const manifest = (await manifestFetched.json()) as ProjectManifest;

    const filenames = manifest.files ? Object.keys(manifest.files) : [];
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
          label: manifest.files![filename].label,
          content: await response.text(),
          contentType,
        };
      })
    );
    this._compileProject();
  }

  private async _startWorkers() {
    await Promise.all([
      this._startTypeScriptWorker(),
      this._installServiceWorker(),
    ]);
  }

  private async _startTypeScriptWorker() {
    if (this._typescriptWorkerAPI === undefined) {
      const worker = new Worker(typescriptWorkerScriptUrl);
      this._typescriptWorkerAPI = wrap<TypeScriptWorkerAPI>(worker);
    } else {
      console.debug('typescript-worker already started');
    }
  }

  private async _installServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      // TODO: show this in the UI
      console.warn('ServiceWorker support required for <playground-project>');
      return;
    }

    const registration = await navigator.serviceWorker.register(
      serviceWorkerScriptUrl.href,
      {scope: this._scopeUrl}
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
    return new Promise<void>((resolve) => {
      const {port1, port2} = new MessageChannel();

      const onMessage = (e: MessageEvent) => {
        if (e.data.initComlink === HANDSHAKE_RECEIVED) {
          port1.removeEventListener('message', onMessage);
          this._serviceWorkerAPI = wrap<ServiceWorkerAPI>(port1);
          this._serviceWorkerAPI.setFileAPI(
            proxy({
              getFile: (name: string) => this._getFile(name),
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
      this._files
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
    for (const preview of this._previews) {
      preview.reload();
    }
  }
}

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
