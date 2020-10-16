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
  css,
  property,
  internalProperty,
  query,
  PropertyValues,
} from 'lit-element';
import '@material/mwc-tab-bar';
import {TabBar} from '@material/mwc-tab-bar';
import '@material/mwc-tab';
import {SampleFile} from '../shared/worker-api.js';
import {CodeSampleProjectElement} from './code-sample-project';
import './codemirror-editor.js';
import {CodeMirrorEditorElement} from './codemirror-editor.js';
import {nothing} from 'lit-html';

// Hack to workaround Safari crashing and reloading the entire browser tab
// whenever an <mwc-tab> is clicked to switch files, because of a bug relating
// to delegatesFocus and shadow roots.
//
// https://bugs.webkit.org/show_bug.cgi?id=215732
// https://github.com/material-components/material-components-web-components/issues/1720
import {Tab} from '@material/mwc-tab';
((Tab.prototype as unknown) as {
  createRenderRoot: Tab['createRenderRoot'];
  attachShadow: Tab['attachShadow'];
}).createRenderRoot = function () {
  return this.attachShadow({mode: 'open', delegatesFocus: false});
};

/**
 * A text editor associated with a <code-sample-project>.
 */
@customElement('code-sample-editor')
export class CodeSampleEditor extends LitElement {
  static styles = css`
    mwc-tab-bar {
      --mdc-tab-height: 35px;
      --mdc-typography-button-text-transform: none;
      --mdc-typography-button-font-weight: normal;
      --mdc-typography-button-font-size: 0.75rem;
      --mdc-typography-button-letter-spacing: normal;
      --mdc-icon-button-size: 36px;
      --mdc-icon-size: 18px;
      color: #444;
      border-bottom: 1px solid #ddd;
      flex: 0 0 36px;
    }
    mwc-tab {
      flex: 0;
    }
  `;

  /**
   * Whether to show the "Add File" button on the UI that allows
   * users to add a new blank file to the project.
   */
  @property({type: Boolean})
  enableAddFile = false;

  @query('mwc-tab-bar')
  private _tabBar!: TabBar;

  @query('codemirror-editor')
  private _editor!: CodeMirrorEditorElement;

  @property({attribute: false})
  files?: SampleFile[];

  /**
   * The name of the project file that is currently being displayed. Set when
   * changing tabs. Does not reflect to attribute.
   */
  @property()
  filename?: string;

  /**
   * If true, don't display the top file-picker. Default: false (visible).
   */
  @property({type: Boolean, attribute: 'no-file-picker'})
  noFilePicker = false;

  /**
   * If true, display a left-hand-side gutter with line numbers. Default false
   * (hidden).
   */
  @property({type: Boolean, attribute: 'line-numbers'})
  lineNumbers = false;

  @internalProperty()
  private _currentFileIndex?: number;

  private get _currentFile() {
    return this._currentFileIndex === undefined
      ? undefined
      : this.files?.[this._currentFileIndex];
  }

  /**
   * The project that this editor is associated with. Either the
   * `<code-sample-project>` node itself, or its `id` in the host scope.
   */
  @property()
  project: CodeSampleProjectElement | string | undefined = undefined;

  private _project: CodeSampleProjectElement | undefined = undefined;

  /*
   * The type of the file being edited, as represented by its usual file
   * extension.
   */
  @property()
  type: 'js' | 'ts' | 'html' | 'css' | undefined;

  async update(changedProperties: PropertyValues) {
    if (changedProperties.has('project')) {
      this._findProjectAndRegister();
    }
    if (changedProperties.has('files') || changedProperties.has('filename')) {
      this._currentFileIndex =
        this.files && this.filename
          ? this.files.map((f) => f.name).indexOf(this.filename)
          : 0;
      // TODO(justinfagnani): whyyyy?
      if (this._tabBar) {
        await this._tabBar.updateComplete;
        this._tabBar.activeIndex = -1;
        this._tabBar.activeIndex = this._currentFileIndex;
      }
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      ${this.noFilePicker
        ? nothing
        : html` <mwc-tab-bar
            .activeIndex=${this._currentFileIndex ?? 0}
            @MDCTabBar:activated=${this._tabActivated}
          >
            ${this.files?.map((file) => {
              const label =
                file.label ||
                file.name.substring(file.name.lastIndexOf('/') + 1);
              return html`<mwc-tab label=${label}></mwc-tab>`;
            })}
            ${this.enableAddFile
              ? html`<mwc-icon-button icon="add"></mwc-icon-button>`
              : nothing}
          </mwc-tab-bar>`}
      ${this._currentFile
        ? html`
            <codemirror-editor
              .value=${this._currentFile.content}
              .type=${this._currentFile
                ? mimeTypeToTypeEnum(this._currentFile.contentType)
                : undefined}
              .lineNumbers=${this.lineNumbers}
              @change=${this._onEdit}
            >
            </codemirror-editor>
          `
        : html`<slot></slot>`}
    `;
  }

  private _tabActivated(e: CustomEvent<{index: number}>) {
    this._currentFileIndex = e.detail.index;
    this.filename = this.files?.[this._currentFileIndex].name;
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
        prevProject._unregisterEditor(this);
      }
      if (this._project) {
        this._project._registerEditor(this);
      }
    }
  }

  private _onEdit() {
    const value = this._editor.value;
    if (this._currentFile) {
      this._currentFile.content = value!;
      // TODO: send to worker?
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'code-sample-editor': CodeSampleEditor;
  }
}

const mimeTypeToTypeEnum = (mimeType?: string) => {
  // TODO: infer type based on extension too
  if (mimeType === undefined) {
    return;
  }
  const encodingSepIndex = mimeType.indexOf(';');
  if (encodingSepIndex !== -1) {
    mimeType = mimeType.substring(0, encodingSepIndex);
  }
  switch (mimeType) {
    // TypeScript: this is the mime-type returned by servers
    // .ts files aren't usually served to browsers, so they don't yet
    // have their own mime-type.
    case 'video/mp2t':
      return 'ts';
    case 'text/javascript':
    case 'application/javascript':
      return 'js';
    case 'text/html':
      return 'html';
    case 'text/css':
      return 'css';
  }
  return undefined;
};
