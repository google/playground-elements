/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css, PropertyValues} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {live} from 'lit/directives/live.js';

import './playground-code-editor.js';
import {PlaygroundConnectedElement} from './playground-connected-element.js';

import {PlaygroundProject} from './playground-project.js';
import {PlaygroundCodeEditor} from './playground-code-editor.js';
import {CodeEditorChangeData} from './shared/worker-api.js';

/**
 * A text editor associated with a <playground-project>.
 */
@customElement('playground-file-editor')
export class PlaygroundFileEditor extends PlaygroundConnectedElement {
  static override styles = css`
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
   * If true, wrap for long lines. Default false
   */
  @property({type: Boolean, attribute: 'line-wrapping'})
  lineWrapping = false;

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
   * If true, this editor is not editable.
   */
  @property({type: Boolean, reflect: true})
  readonly = false;

  /**
   * If true, will disable code completions in the code-editor.
   */
  @property({type: Boolean, attribute: 'no-completions'})
  noCompletions = false;

  private get _files() {
    return this._project?.files ?? [];
  }

  private get _currentFile() {
    return this.filename
      ? this._files.find((file) => file.name === this.filename)
      : undefined;
  }

  override async update(changedProperties: PropertyValues) {
    if (changedProperties.has('_project')) {
      const oldProject = changedProperties.get('_project') as PlaygroundProject;
      if (oldProject) {
        oldProject.removeEventListener(
          'filesChanged',
          this._onProjectFilesChanged
        );
        oldProject.removeEventListener('compileDone', this._onCompileDone);
        oldProject.removeEventListener(
          'diagnosticsChanged',
          this._onDiagnosticsChanged
        );
      }
      if (this._project) {
        this._project.addEventListener(
          'filesChanged',
          this._onProjectFilesChanged
        );
        this._project.addEventListener('compileDone', this._onCompileDone);
        this._project.addEventListener(
          'diagnosticsChanged',
          this._onDiagnosticsChanged
        );
      }
      this._onProjectFilesChanged();
    }
    super.update(changedProperties);
  }

  override render() {
    return html`
      ${this._files
        ? html`
            <playground-code-editor
              exportparts="diagnostic-tooltip, dialog"
              .value=${
                // We need live() because the lit's dirty-checking value for
                // content is not updated by user edits.
                live(this._currentFile?.content ?? '')
              }
              .documentKey=${this._currentFile}
              .type=${this._currentFile
                ? mimeTypeToTypeEnum(this._currentFile.contentType)
                : undefined}
              .lineNumbers=${this.lineNumbers}
              .lineWrapping=${this.lineWrapping}
              .readonly=${this.readonly || !this._currentFile}
              .pragmas=${this.pragmas}
              .diagnostics=${this._project?.diagnostics?.get(
                this._currentFile?.name ?? ''
              )}
              .noCompletions=${this.noCompletions}
              @change=${this._onEdit}
              @request-completions=${this._onRequestCompletions}
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

  private _onCompileDone = () => {
    // Propagate diagnostics.
    this.requestUpdate();
  };

  private _onDiagnosticsChanged = () => {
    // Propagate diagnostics.
    this.requestUpdate();
  };

  private _onEdit() {
    if (
      this._project === undefined ||
      this._currentFile === undefined ||
      this._editor.value === undefined
    ) {
      return;
    }
    this._project.editFile(this._currentFile, this._editor.value);
  }

  private async _onRequestCompletions(e: CustomEvent) {
    const codeEditorChangeData = e.detail as CodeEditorChangeData;
    codeEditorChangeData.fileName = this.filename ?? '';
    const completions = await this._project?.getCompletions(
      codeEditorChangeData
    );
    if (completions) {
      codeEditorChangeData.provideCompletions(completions);
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
    case 'text/jsx':
      return 'jsx';
    case 'text/typescript-jsx':
      return 'tsx';
    case 'application/json':
      return 'json';
    case 'text/html':
      return 'html';
    case 'text/css':
      return 'css';
  }
  return undefined;
};
