/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css, PropertyValues, nothing} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import '@material/mwc-icon-button';
import {PlaygroundProject} from './playground-project.js';
import '@material/mwc-linear-progress';
import {PlaygroundConnectedElement} from './playground-connected-element.js';

/**
 * An HTML preview component consisting of an iframe and a floating reload
 * button.
 *
 * @fires reload - Fired when the user clicks the reload button
 */
@customElement('playground-preview')
export class PlaygroundPreview extends PlaygroundConnectedElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background: white;
      font-family: sans-serif;
      height: 350px;
    }

    #toolbar {
      flex: 0 0 var(--playground-bar-height, 40px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: var(--playground-border, solid 1px #ddd);
      font-size: 15px;
      color: var(--playground-preview-toolbar-foreground-color, #444);
      border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background: var(--playground-preview-toolbar-background, white);
    }

    #location {
      margin: 0 10px;
    }

    #reload-button {
      --mdc-icon-button-size: 30px;
      --mdc-icon-size: 18px;
    }

    #content {
      max-height: 100%;
      position: relative;
      flex: 1;
    }

    mwc-linear-progress {
      /* There is no way to directly specify the height of a linear progress
      bar, but zooming works well enough. It's 4px by default, and we want it to
      be 2px to match the tab bar indicator.*/
      zoom: 0.5;
      --mdc-linear-progress-buffer-color: transparent;
      position: absolute;
      top: -6px;
      width: 100%;
      --mdc-theme-primary: var(--playground-highlight-color, #6200ee);
    }

    iframe,
    slot {
      width: 100%;
      height: 100%;
    }

    iframe {
      border: none;
    }

    [hidden] {
      display: none;
    }
  `;

  /**
   * The string to display in the location bar.
   */
  @property()
  location = 'Result';

  @query('iframe')
  private _iframe!: HTMLIFrameElement;

  @query('slot')
  private _slot?: HTMLSlotElement;

  /**
   * Whether the iframe is currently loading.
   */
  @state()
  private _loading = true;

  /**
   * Whether to show the loading bar.
   */
  @state()
  private _showLoadingBar = false;

  /**
   * Whether the iframe has fired its "load" event at least once.
   */
  @state()
  private _loadedAtLeastOnce = false;

  update(changedProperties: PropertyValues) {
    if (changedProperties.has('_project')) {
      const oldProject = changedProperties.get('_project') as PlaygroundProject;
      if (oldProject) {
        oldProject.removeEventListener('urlChanged', this.reload);
        // To be more responsive, we start loading as soon as compilation
        // starts. This is safe because requests block on compilation finishing.
        oldProject.removeEventListener('compileStart', this.reload);
      }
      if (this._project) {
        this._project.addEventListener('urlChanged', this.reload);
        this._project.addEventListener('compileStart', this.reload);
      }
    }
    super.update(changedProperties);
  }

  private get _indexUrl() {
    const base = this._project?.baseUrl;
    if (!base) {
      return '';
    }
    const url = new URL('index.html', base);
    return url.toString();
  }

  render() {
    return html`
      <div id="toolbar" part="preview-toolbar">
        <span id="location" part="preview-location"> ${this.location}</span>
        <mwc-icon-button
          id="reload-button"
          label="Reload preview"
          part="preview-reload-button"
          ?disabled=${!this._indexUrl}
          @click=${this.reload}
        >
          <!-- Source: https://material.io/resources/icons/?icon=refresh&style=baseline -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentcolor"
            width="18px"
            height="18px"
          >
            <path
              d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            />
          </svg>
        </mwc-icon-button>
      </div>

      <div id="content">
        <mwc-linear-progress
          aria-hidden=${this._loading ? 'false' : 'true'}
          part="preview-loading-indicator"
          indeterminate
          ?closed=${!this._showLoadingBar}
        ></mwc-linear-progress>

        ${this._loadedAtLeastOnce ? nothing : html`<slot></slot>`}

        <iframe
          title="Project preview"
          @load=${this._onIframeLoad}
          ?hidden=${!this._loadedAtLeastOnce}
        ></iframe>
      </div>
    `;
  }

  updated() {
    // TODO(aomarks) If we instead use an `ifDefined(this._indexUrl)` binding in
    // the template, then the preview loads twice. I must be doing something
    // dumb, but this hacky way of synchronizing the src works correctly for
    // now. Figure out the more elegant solution.
    if (this._iframe?.src !== this._indexUrl) {
      this._iframe.src = this._indexUrl;
    }
  }

  reload = () => {
    if (!this._iframe) {
      return;
    }
    // Note we can't use contentWindow.location.reload() here, because the
    // IFrame might be on a different origin.
    this._iframe.src = '';
    this._iframe.src = this._indexUrl;
    this._loading = true;
    this._showLoadingBar = true;
  };

  async firstUpdated() {
    // Loading should be initially indicated only when we're not pre-rendering,
    // because in that case there should be no visible change once the actual
    // iframe loads, and the indicator is distracting.
    if (this._loading && !this._slotHasAnyVisibleChildren()) {
      this._showLoadingBar = true;
    }

    // The latest version of MWC forwards the aria-label attribute to the
    // progressbar role correctly
    // (https://github.com/material-components/material-components-web-components/pull/2264),
    // but until 0.21.0 is released we'll need to fix it up ourselves.
    const progress = this.shadowRoot!.querySelector('mwc-linear-progress')!;
    await progress.updateComplete;
    progress.shadowRoot
      ?.querySelector('[role=progressbar]')
      ?.setAttribute('aria-label', 'Preview is loading');
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

  private _onIframeLoad() {
    if (this._indexUrl) {
      // Check "src" because the iframe will fire a "load" for a blank page
      // before "src" is set.
      this._loading = false;
      this._loadedAtLeastOnce = true;
      this._showLoadingBar = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-preview': PlaygroundPreview;
  }
}
