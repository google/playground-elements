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
  customElement,
  LitElement,
  html,
  css,
  property,
  query,
  PropertyValues,
} from 'lit-element';
import {ifDefined} from 'lit-html/directives/if-defined.js';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import {CodeSampleProjectElement} from './code-sample-project.js';

/**
 * An HTML preview component consisting of a wrapper around an iframe, and
 * a simple toolbar with a reload button and a label showing the currently
 * displayed HTML file.
 *
 * @fires reload - Fired when the user clicks the reload button
 */
@customElement('code-sample-preview')
export class CodeSamplePreviewElement extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: flex;
      flex-direction: column;
      width: 400px;
    }

    #toolbar {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex: 0 0 36px;
      color: #444;
      background: #f0f0f0;
      border-bottom: 1px solid #ddd;
      padding: 0 4px;
      --mdc-typography-button-font-size: 0.75rem;
      font-size: var(--mdc-typography-button-font-size, 0.75rem);
    }

    #toolbar mwc-icon-button {
      cursor: default !important;
      --mdc-icon-button-size: 32px;
      --mdc-icon-size: 20px;
    }

    #location {
      height: 24px;
      line-height: 18px;
      padding: 4px;
      font-family: var(
        --mdc-typography-button-font-family,
        var(--mdc-typography-font-family, Roboto, sans-serif)
      );
    }

    iframe {
      flex: 1;
      width: 100%;
      border: none;
    }
  `;

  /**
   * The URL of the document to load.
   */
  @property()
  src: string | undefined;

  /**
   * The string to display in the location bar.
   */
  @property()
  location?: string;

  @query('iframe')
  private _iframe!: HTMLIFrameElement;

  /**
   * The project that this preview is associated with. Either the
   * `<code-sample-project>` node itself, or its `id` in the host scope.
   */
  @property()
  project: CodeSampleProjectElement | string | undefined = undefined;

  private _project: CodeSampleProjectElement | undefined = undefined;

  async update(changedProperties: PropertyValues) {
    if (changedProperties.has('project')) {
      this._findProjectAndRegister();
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      <div id="toolbar">
        <mwc-icon-button
          icon="refresh"
          @click=${this._onReloadClick}
        ></mwc-icon-button>
        <div id="location">${this.location}</div>
      </div>
      <iframe src="${ifDefined(this.src)}"></iframe>
    `;
  }

  private _findProjectAndRegister() {
    const prevProject = this._project;
    if (this.project instanceof HTMLElement) {
      this._project = this.project;
    } else if (typeof this.project === 'string') {
      this._project =
        (((this.getRootNode() as unknown) as
          | Document
          | ShadowRoot).getElementById(
          this.project
        ) as CodeSampleProjectElement | null) || undefined;
    } else {
      this._project = undefined;
    }
    if (prevProject !== this._project) {
      if (prevProject) {
        prevProject._unregisterPreview(this);
      }
      if (this._project) {
        this._project._registerPreview(this);
      }
    }
  }

  reload() {
    const iframe = this._iframe;
    iframe.contentWindow?.location.reload();
  }

  private _onReloadClick() {
    this._project?.save();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'code-sample-preview': CodeSamplePreviewElement;
  }
}
