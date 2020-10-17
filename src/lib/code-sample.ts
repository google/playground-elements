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

import './code-sample-project.js';
import './code-sample-editor.js';
import './code-sample-preview.js';

/**
 * A multi-file code editor component with live preview that works without a
 * server.
 *
 * <code-sample> loads a project configuration file and the set of source files
 * it describes from the network. The source files can be edited locally. To
 * serve the locally edited files to the live preview, <code-sample> registers a
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
 * Files can also be given as <script> tag children of <code-sample>. The type
 * attribute must start with "sample/" and then the type of the file, one of:
 * "js", "ts", "html", or "css". The <script> must also have a "filename"
 * attribute.
 *
 * Example inline files:
 * ```html
 * <code-sample>
 *   <script type="sample/html" filename="index.html">
 *     <script type="module" src="index.js">&lt;script>
 *     <h1>Hello World</h1>
 *   </script>
 *   <script type="sample/js" filename="index.js">
 *     document.body.append('<h2>Hello from JS</h2>');
 *   </script>
 * </code-sample>
 * ```
 */
@customElement('code-sample')
export class CodeSampleElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      height: 350px;
      border: solid 1px #ddd;
    }

    code-sample-editor {
      width: 70%;
      height: 100%;
      border-right: solid 1px #ddd;
    }

    code-sample-preview {
      width: 30%;
      height: 100%;
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
  sandboxScope = 'code-sample-projects';

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

  render() {
    const projectId = 'project';
    return html`
      <code-sample-project
        id=${projectId}
        .projectSrc=${this.projectSrc}
        .sandboxScope=${this.sandboxScope}
      >
        <slot></slot>
      </code-sample-project>

      <code-sample-editor
        part="editor"
        exportparts="file-picker"
        .lineNumbers=${this.lineNumbers}
        .project=${projectId}
        .enableAddFile=${this.enableAddFile}
      >
      </code-sample-editor>

      <code-sample-preview
        part="preview"
        exportparts="preview-toolbar,
                     preview-location,
                     preview-reload-button,
                     preview-loading-indicator"
        location="Result"
        .project=${projectId}
      ></code-sample-preview>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'code-sample': CodeSampleElement;
  }
}
