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
  html,
  customElement,
  css,
  property,
  query,
  PropertyValues,
} from 'lit-element';
import {live} from 'lit-html/directives/live.js';

import '@material/mwc-icon-button';

import './playground-code-editor.js';
import {PlaygroundProject} from './playground-project.js';
import {PlaygroundCodeEditor} from './playground-code-editor.js';
import {PlaygroundConnectedElement} from './playground-connected-element.js';

/**
 * A text editor associated with a <playground-project>.
 */
@customElement('playground-file-editor')
export class PlaygroundFileEditor extends PlaygroundConnectedElement {
  static styles = css`
    :host {
      display: block;
      /* Prevents scrollbars from changing container size and shifting layout
      slightly. */
      box-sizing: border-box;
      height: 350px;
    }

    slot {
      height: 100%;
      display: block;
      background: var(--playground-code-background, unset);
    }

    playground-code-editor {
      height: 100%;
      border-radius: inherit;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  `;

  @query('playground-code-editor')
  private _editor!: PlaygroundCodeEditor;

  /**
   * The name of the project file that is currently being displayed.
   */
  @property()
  filename?: string;

  /**
   * If true, display a left-hand-side gutter with line numbers. Default false
   * (hidden).
   */
  @property({type: Boolean, attribute: 'line-numbers'})
  lineNumbers = false;

  /**
   * How to handle `playground-hide` and `playground-fold` comments.
   *
   * See https://github.com/PolymerLabs/playground-elements#hiding--folding for
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

  private get _files() {
    return this._project?.files ?? [];
  }

  private get _currentFile() {
    return this.filename
      ? this._files.find((file) => file.name === this.filename)
      : undefined;
  }

  async update(changedProperties: PropertyValues) {
    if (changedProperties.has('_project')) {
      const oldProject = changedProperties.get('_project') as PlaygroundProject;
      if (oldProject) {
        oldProject.removeEventListener(
          'filesChanged',
          this._onProjectFilesChanged
        );
      }
      if (this._project) {
        this._project.addEventListener(
          'filesChanged',
          this._onProjectFilesChanged
        );
      }
      this._onProjectFilesChanged();
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      ${this._files
        ? html`
            <playground-code-editor
              .value=${
                // We need live() because the lit's dirty-checking value for
                // content is not updated by user edits.
                live(this._currentFile?.content ?? '')
              }
              .type=${this._currentFile
                ? mimeTypeToTypeEnum(this._currentFile.contentType)
                : undefined}
              .lineNumbers=${this.lineNumbers}
              .readonly=${!this._currentFile}
              .pragmas=${this.pragmas}
              @change=${this._onEdit}
            >
            </playground-code-editor>
          `
        : html`<slot></slot>`}
    `;
  }

  private _onProjectFilesChanged = () => {
    this.filename ??= this._files[0]?.name;
    this.requestUpdate();
  };

  private _onEdit() {
    const value = this._editor.value;
    if (this._currentFile) {
      this._currentFile.content = value!;
      this._project?.saveDebounced();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-file-editor': PlaygroundFileEditor;
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
