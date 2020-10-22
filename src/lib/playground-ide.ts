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

import {LitElement, html, customElement, css, property} from 'lit-element';

import './playground-project.js';
import './playground-file-editor.js';
import './playground-preview.js';

/**
 * A multi-file code editor component with live preview that works without a
 * server.
 *
 * <playground> loads a project configuration file and the set of source files
 * it describes from the network. The source files can be edited locally. To
 * serve the locally edited files to the live preview, <playground> registers a
 * service worker to serve files to the preview from the main UI thread
 * directly, without a network roundtrip.
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
 *
 * Files can also be given as <script> tag children of <playground>. The type
 * attribute must start with "sample/" and then the type of the file, one of:
 * "js", "ts", "html", or "css". The <script> must also have a "filename"
 * attribute.
 *
 * Example inline files:
 * ```html
 * <playground>
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
  static styles = css`
    :host {
      display: flex;
      height: 350px;
      min-width: 300px;
      border: var(--playground-border, solid 1px #ddd);
    }

    playground-file-editor {
      height: 100%;
      width: 70%;
      overflow: hidden;
      border-radius: inherit;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: var(--playground-border, solid 1px #ddd);
    }

    playground-preview {
      height: 100%;
      width: 30%;
      border-radius: inherit;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    slot {
      display: none;
    }
  `;

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

  /**
   * Whether to show the "Add File" button on the UI that allows
   * users to add a new blank file to the project.
   */
  @property({type: Boolean})
  enableAddFile = false;

  /**
   * If true, display a left-hand-side gutter with line numbers. Default false
   * (hidden).
   */
  @property({type: Boolean, attribute: 'line-numbers'})
  lineNumbers = false;

  /**
   * The CodeMirror theme to load.
   */
  @property()
  theme = 'default';

  render() {
    const projectId = 'project';
    return html`
      <playground-project
        id=${projectId}
        .projectSrc=${this.projectSrc}
        .sandboxScope=${this.sandboxScope}
      >
        <slot></slot>
      </playground-project>

      <playground-file-editor
        part="editor"
        exportparts="file-picker"
        .theme=${this.theme}
        .lineNumbers=${this.lineNumbers}
        .project=${projectId}
        .enableAddFile=${this.enableAddFile}
      >
      </playground-file-editor>

      <playground-preview
        part="preview"
        exportparts="preview-toolbar,
                     preview-location,
                     preview-reload-button,
                     preview-loading-indicator"
        location="Result"
        .project=${projectId}
      ></playground-preview>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-ide': PlaygroundIde;
  }
}
