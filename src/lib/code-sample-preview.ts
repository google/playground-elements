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
import {IconButton} from '@material/mwc-icon-button';
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
    :host {
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
      width: 100%;
      height: 100%;
    }

    iframe {
      border: none;
    }

    [hidden] {
      display: none;
    }

    .spinning {
      animation: spin 0.5s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  /**
   * The URL of the document to load.
   */
  @property()
  src: string | undefined;

  @query('iframe')
  private _iframe!: HTMLIFrameElement;

  @query('slot')
  private _slot?: HTMLSlotElement;

  @query('#reload-button')
  private _reloadButton!: IconButton;

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
      <mwc-icon-button
        id="reload-button"
        part="reload-button"
        icon="refresh"
        ?disabled=${!this.src}
        @click=${this._onReloadClick}
        @animationiteration=${this._pokeReloadSpinAnimation}
      ></mwc-icon-button>

      ${this._loadedAtLeastOnce ? nothing : html`<slot></slot>`}

      <iframe
        src=${ifDefined(this.src)}
        @load=${this._onIframeLoad}
        ?hidden=${!this._loadedAtLeastOnce}
      ></iframe>
    `;
  }

  /**
   * We manage the spinning animation manually (instead of with a property and
   * template binding) because we want every rotation to complete fully, instead
   * of snapping awkwardly back to its initial progression on load.
   */
  private _pokeReloadSpinAnimation() {
    const classList = this._reloadButton.classList;
    if (this._loading) {
      classList.add('spinning');
    } else {
      classList.remove('spinning');
    }
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
    this._pokeReloadSpinAnimation();
  }

  firstUpdated() {
    // Loading should be initially indicated only when we're not pre-rendering,
    // because in that case there should be no visible change once the actual
    // iframe loads, and the indicator is distracting.
    if (!this._slotHasAnyVisibleChildren()) {
      this._pokeReloadSpinAnimation();
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
    this._pokeReloadSpinAnimation();
    this._project?.save();
  }

  private _onIframeLoad() {
    if (this.src) {
      // Check "src" because the iframe will fire a "load" for a blank page
      // before "src" is set.
      this._loading = false;
      this._loadedAtLeastOnce = true;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'code-sample-preview': CodeSamplePreviewElement;
  }
}
