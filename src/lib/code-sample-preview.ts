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
import '@material/mwc-linear-progress';

/**
 * An HTML preview component consisting of an iframe and a floating reload
 * button.
 *
 * @fires reload - Fired when the user clicks the reload button
 */
@customElement('code-sample-preview')
export class CodeSamplePreviewElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }

    #toolbar {
      flex: 0 0 35px;
      flex-direction: column;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      display: flex;
      font-size: 14px;
      color: #444;
    }

    #locationAndReloadButton {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      /* Center the location and reload button as though the
         linear-progress-indicator was not there. */
      margin-bottom: -4px;
    }

    #location {
      margin: 0 10px;
    }

    #reload-button {
      color: #444;
      --mdc-icon-button-size: 30px;
      --mdc-icon-size: 18px;
    }

    iframe,
    slot {
      width: 100%;
      flex: 1 0;
    }

    iframe {
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

  /**
   * The string to display in the location bar.
   */
  @property()
  location?: string;

  @query('iframe')
  private _iframe!: HTMLIFrameElement;

  @query('slot')
  private _slot?: HTMLSlotElement;

  /**
   * The project that this preview is associated with. Either the
   * `<code-sample-project>` node itself, or its `id` in the host scope.
   */
  @property()
  project: CodeSampleProjectElement | string | undefined = undefined;

  private _project: CodeSampleProjectElement | undefined = undefined;

  /**
   * Whether the iframe is currently loading.
   */
  @internalProperty()
  private _loading = true;

  /**
   * Whether to show the loading bar.
   */
  @internalProperty()
  private _showLoadingBar = false;

  /**
   * Whether the iframe has fired its "load" event at least once.
   */
  @internalProperty()
  private _loadedAtLeastOnce = false;

  async update(changedProperties: PropertyValues) {
    if (changedProperties.has('project')) {
      this._findProjectAndRegister();
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      <div id="toolbar" part="preview-toolbar">
        <div id="locationAndReloadButton">
          <span id="location">${this.location}</span>
          <mwc-icon-button
            id="reload-button"
            part="reload-button"
            icon="refresh"
            ?disabled=${!this.src}
            @click=${this._onReloadClick}
          ></mwc-icon-button>
        </div>
        <mwc-linear-progress
          indeterminate
          ?closed=${!this._showLoadingBar}
        ></mwc-linear-progress>
      </div>

      ${this._loadedAtLeastOnce ? nothing : html`<slot></slot>`}

      <iframe
        src=${ifDefined(this.src)}
        @load=${this._onIframeLoad}
        ?hidden=${!this._loadedAtLeastOnce}
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
    this._iframe.contentWindow?.location.reload();
    this._loading = true;
    this._startLoadingBar();
  }

  private _startLoadingBarTime = 0;
  private _stopLoadingBarTimerId?: ReturnType<typeof setTimeout>;

  private _startLoadingBar() {
    if (this._stopLoadingBarTimerId !== undefined) {
      clearTimeout(this._stopLoadingBarTimerId);
      this._stopLoadingBarTimerId = undefined;
    }
    if (this._showLoadingBar === false) {
      this._showLoadingBar = true;
      this._startLoadingBarTime = performance.now();
    }
  }

  private _stopLoadingBar() {
    if (this._showLoadingBar === false) {
      return;
    }
    // We want to ensure the loading indicator is visible for some minimum
    // amount of time, or else it might not display at all on a fast reload, or
    // might only display for a brief flash.
    const elapsed = performance.now() - this._startLoadingBarTime;
    const minimum = 500;
    const pending = Math.max(0, minimum - elapsed);
    this._stopLoadingBarTimerId = setTimeout(() => {
      this._showLoadingBar = false;
      this._stopLoadingBarTimerId = undefined;
    }, pending);
  }

  firstUpdated() {
    // Loading should be initially indicated only when we're not pre-rendering,
    // because in that case there should be no visible change once the actual
    // iframe loads, and the indicator is distracting.
    if (this._loading && !this._slotHasAnyVisibleChildren()) {
      this._startLoadingBar();
    }
  }

  private _slotHasAnyVisibleChildren() {
    const assigned = this._slot?.assignedNodes({flatten: true});
    if (!assigned) {
      return false;
    }
    for (const node of assigned) {
      if (node.nodeType === Node.COMMENT_NODE) {
        continue;
      }
      if (
        node.nodeType === Node.TEXT_NODE &&
        (node.textContent || '').trim() === ''
      ) {
        continue;
      }
      return true;
    }
    return false;
  }

  private _onReloadClick() {
    this._loading = true;
    this._startLoadingBar();
    this._project?.save();
  }

  private _onIframeLoad() {
    if (this.src) {
      // Check "src" because the iframe will fire a "load" for a blank page
      // before "src" is set.
      this._loading = false;
      this._loadedAtLeastOnce = true;
      this._stopLoadingBar();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'code-sample-preview': CodeSamplePreviewElement;
  }
}
