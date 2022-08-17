/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css, PropertyValues, nothing} from 'lit';
import {customElement, query, property} from 'lit/decorators.js';

import './playground-project.js';
import './playground-tab-bar.js';
import './playground-file-editor.js';
import './playground-preview.js';
import {PlaygroundProject} from './playground-project.js';
import {ProjectManifest} from './shared/worker-api.js';
import {npmVersion, serviceWorkerHash} from './shared/version.js';

/**
 * A multi-file code editor component with live preview that works without a
 * server.
 *
 * <playground-ide> loads a project configuration file and the set of source
 * files it describes from the network. The source files can be edited locally.
 * To serve the locally edited files to the live preview, <playground-ide>
 * registers a service worker to serve files to the preview from the main UI
 * thread directly, without a network roundtrip.
 *
 * The project manifest is a JSON file with a "files" property. "files" is an
 * object with properties for each file. The key is the filename, relative to
 * the project manifest.
 *
 * Example project manifest:
 * ```json
 * {
 *   "files": {
 *     "./index.html": {},
 *     "./my-element.js": {},
 *   }
 * }
 * ```
 *
 * Files can also be given as <script> tag children of <playground-ide>. The
 * type attribute must start with "sample/" and then the type of the file, one
 * of: "js", "ts", "html", or "css". The <script> must also have a "filename"
 * attribute.
 *
 * Example inline files:
 * ```html
 * <playground-ide>
 *   <script type="sample/html" filename="index.html">
 *     <script type="module" src="index.js">&lt;script>
 *     <h1>Hello World</h1>
 *   </script>
 *   <script type="sample/js" filename="index.js">
 *     document.body.append('<h2>Hello from JS</h2>');
 *   </script>
 * </playground>
 * ```
 */
@customElement('playground-ide')
export class PlaygroundIde extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      height: 350px;
      min-width: 200px;
      border: var(--playground-border, solid 1px #ddd);
      /* The invisible resize bar has a high z-index so that it's above
      CodeMirror. But we don't want it also above other elements on the page.
      Force a new stacking context. */
      isolation: isolate;
    }

    #lhs {
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1;
      min-width: 100px;
      border-radius: inherit;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: var(--playground-border, solid 1px #ddd);
    }

    playground-tab-bar {
      flex-shrink: 0;
    }

    playground-file-editor {
      flex: 1;
      height: calc(100% - var(--playground-bar-height, 40px));
    }

    #rhs {
      height: 100%;
      width: max(100px, var(--playground-preview-width, 30%));
      position: relative;
      border-radius: inherit;
    }

    playground-preview {
      height: 100%;
      width: 100%;
      border-radius: inherit;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    slot {
      display: none;
    }

    #resizeBar {
      position: absolute;
      top: 0;
      left: -5px;
      width: 10px;
      height: 100%;
      z-index: 9;
      cursor: col-resize;
    }

    #resizeOverlay {
      display: none;
    }
    #resizeOverlay.resizing {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99999;
      cursor: col-resize;
    }
  `;

  /**
   * A document-relative path to a project configuration file.
   *
   * When both `projectSrc` and `files` are set, the one set most recently wins.
   * Slotted children win only if both `projectSrc` and `files` are undefined.
   */
  @property({attribute: 'project-src', hasChanged: () => false})
  get projectSrc(): string | undefined {
    // To minimize synchronization complexity, we delegate the `projectSrc` and
    // `files` getters/setters directly to our <playground-project>. The only
    // case we need to handle is properties set before upgrade or before we
    // first render the <playground-project>.
    //
    // Note we set `hasChanged: () => false` because we don't need to trigger
    // `update` when this property changes. (Why be a lit property at all?
    // Because we want [1] to respond to attribute changes, and [2] to inherit
    // property values set before upgrade).
    //
    // TODO(aomarks) Maybe a "delegate" decorator for this pattern?
    return this._project?.projectSrc ?? this._projectSrcSetBeforeRender;
  }

  set projectSrc(src: string | undefined) {
    const project = this._project;
    if (project) {
      project.projectSrc = src;
    } else {
      this._projectSrcSetBeforeRender = src;
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
    return this._project?.config ?? this._configSetBeforeRender;
  }
  set config(config: ProjectManifest | undefined) {
    const project = this._project;
    if (project) {
      project.config = config;
    } else {
      this._configSetBeforeRender = config;
    }
  }

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

  /**
   * Allow the user to add, remove, and rename files in the project's virtual
   * filesystem. Disabled by default.
   */
  @property({type: Boolean, attribute: 'editable-file-system'})
  editableFileSystem = false;

  /**
   * If true, display a left-hand-side gutter with line numbers. Default false
   * (hidden).
   */
  @property({type: Boolean, attribute: 'line-numbers'})
  lineNumbers = false;

  /**
   * If true, wrap for long lines. Default false
   */
  @property({type: Boolean, attribute: 'line-wrapping'})
  lineWrapping = false;

  /**
   * If true, allow the user to change the relative size of the LHS editor and
   * RHS preview by clicking and dragging in the space between them.
   */
  @property({type: Boolean})
  resizable = false;

  /**
   * How to handle `playground-hide` and `playground-fold` comments.
   *
   * See https://github.com/google/playground-elements#hiding--folding for
   * more details.
   *
   * Options:
   * - on: Hide and fold regions, and hide the special comments.
   * - off: Don't hide or fold regions, but still hide the special comments.
   * - off-visible: Don't hide or fold regions, and show the special comments as
   *   literal text.
   */
  @property()
  pragmas: 'on' | 'off' | 'off-visible' = 'on';

  /**
   * The HTML file used in the preview.
   */
  @property({attribute: 'html-file'})
  htmlFile = 'index.html';

  /**
   * If true, will disable code completions in the code-editor.
   */
  @property({type: Boolean, attribute: 'no-completions'})
  noCompletions = false;

  /**
   * Indicates whether the user has modified, added, or removed any project
   * files. Resets whenever a new project is loaded.
   */
  get modified(): boolean {
    return this._project?.modified ?? false;
  }

  @query('playground-project')
  private _project!: PlaygroundProject | null;

  @query('#resizeBar')
  private _resizeBar!: HTMLDivElement;

  @query('#rhs')
  private _rhs!: HTMLDivElement;

  private _configSetBeforeRender?: ProjectManifest;
  private _projectSrcSetBeforeRender?: string;

  override render() {
    const projectId = 'project';
    const editorId = 'editor';
    return html`
      <playground-project
        id=${projectId}
        .sandboxBaseUrl=${this.sandboxBaseUrl}
        .sandboxScope=${this.sandboxScope}
      >
        <slot></slot>
      </playground-project>

      <div id="lhs">
        <playground-tab-bar
          part="tab-bar"
          .project=${projectId}
          .editor=${editorId}
          .editableFileSystem=${this.editableFileSystem}
        >
        </playground-tab-bar>

        <playground-file-editor
          id=${editorId}
          part="editor"
          .lineNumbers=${this.lineNumbers}
          .lineWrapping=${this.lineWrapping}
          .project=${projectId}
          .pragmas=${this.pragmas}
          .noCompletions=${this.noCompletions}
        >
        </playground-file-editor>
      </div>

      <div id="rhs">
        ${this.resizable
          ? html`<div
              id="resizeBar"
              @pointerdown=${this._onResizeBarPointerdown}
            ></div>`
          : nothing}

        <playground-preview
          part="preview"
          exportparts="preview-toolbar,
                       preview-location,
                       preview-reload-button,
                       preview-loading-indicator,
                       diagnostic-tooltip,
                       dialog"
          .htmlFile=${this.htmlFile}
          .project=${projectId}
        ></playground-preview>
      </div>
    `;
  }

  override firstUpdated() {
    if (this._configSetBeforeRender) {
      this._project!.config = this._configSetBeforeRender;
      this._configSetBeforeRender = undefined;
    }
    if (this._projectSrcSetBeforeRender) {
      this._project!.projectSrc = this._projectSrcSetBeforeRender;
      this._projectSrcSetBeforeRender = undefined;
    }
  }

  override async update(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('resizable') && this.resizable === false) {
      // Note we set this property on the RHS element instead of the host so
      // that when "resizable" is toggled, we don't reset a host value that the
      // user might have set.
      this._rhs?.style.removeProperty('--playground-preview-width');
    }
    super.update(changedProperties);
  }

  private _onResizeBarPointerdown({pointerId}: PointerEvent) {
    const bar = this._resizeBar;
    bar.setPointerCapture(pointerId);

    const rhsStyle = this._rhs.style;
    const {left: hostLeft, right: hostRight} = this.getBoundingClientRect();
    const hostWidth = hostRight - hostLeft;
    const rhsMinWidth = 100;
    const rhsMaxWidth = hostWidth - 100;

    const onPointermove = (event: PointerEvent) => {
      const rhsWidth = Math.min(
        rhsMaxWidth,
        Math.max(rhsMinWidth, hostRight - event.clientX)
      );
      const percent = (rhsWidth / hostWidth) * 100;
      rhsStyle.setProperty('--playground-preview-width', `${percent}%`);
    };
    bar.addEventListener('pointermove', onPointermove);

    const onPointerup = () => {
      bar.releasePointerCapture(pointerId);
      bar.removeEventListener('pointermove', onPointermove);
      bar.removeEventListener('pointerup', onPointerup);
    };
    bar.addEventListener('pointerup', onPointerup);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-ide': PlaygroundIde;
  }
}
