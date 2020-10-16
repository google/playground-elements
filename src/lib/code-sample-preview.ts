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
  internalProperty,
} from 'lit-element';
import {ifDefined} from 'lit-html/directives/if-defined.js';
import {nothing} from 'lit-html';
import '@material/mwc-icon-button';
import {CodeSampleProjectElement} from './code-sample-project.js';

/**
 * An HTML preview component consisting of an iframe and a floating reload
 * button.
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
      position: relative;
    }

    #reload-button {
      position: absolute;
      top: 0;
      right: 0;
      color: #444;
    }

    iframe,
    slot {
      flex: 1;
      width: 100%;
      border: none;
    }

    [hidden] {
      display: none;
    }
  `;

  /**
   * The URL of the document to load.
   */
  @property()
  src: string | undefined;

  @query('iframe')
  private _iframe!: HTMLIFrameElement;

  /**
   * The project that this preview is associated with. Either the
   * `<code-sample-project>` node itself, or its `id` in the host scope.
   */
  @property()
  project: CodeSampleProjectElement | string | undefined = undefined;

  private _project: CodeSampleProjectElement | undefined = undefined;

  /**
   * Whether the iframe has fired its "load" event at least once.
   */
  @internalProperty()
  private _iframeLoaded = false;

  async update(changedProperties: PropertyValues) {
    if (changedProperties.has('project')) {
      this._findProjectAndRegister();
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      <mwc-icon-button
        id="reload-button"
        part="reload-button"
        icon="refresh"
        @click=${this._onReloadClick}
      ></mwc-icon-button>
      ${this._iframeLoaded ? nothing : html`<slot></slot>`}
      <iframe
        src=${ifDefined(this.src)}
        @load=${this._onIframeLoad}
        ?hidden=${!this._iframeLoaded}
      ></iframe>
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

  private _onIframeLoad() {
    if (this.src) {
      // Check "src" because the iframe will fire a "load" for a blank page
      // before "src" is set.
      this._iframeLoaded = true;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'code-sample-preview': CodeSamplePreviewElement;
  }
}
