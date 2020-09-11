/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
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
  customElement,
  css,
  html,
  property,
  PropertyValues,
  internalProperty,
} from 'lit-element';
import {
  EditorView,
  keymap,
  highlightSpecialChars,
  multipleSelections,
} from '@codemirror/next/view';
import {EditorState, Transaction} from '@codemirror/next/state';
import {history, historyKeymap} from '@codemirror/next/history';
import {defaultKeymap} from '@codemirror/next/commands';
import {lineNumbers} from '@codemirror/next/gutter';
import {closeBrackets} from '@codemirror/next/closebrackets';
import {searchKeymap} from '@codemirror/next/search';
import {commentKeymap} from '@codemirror/next/comment';

// TODO(justinfagnani): devise a way to load languages outside of the element,
// possible into a shared registry keyed by name, so they can be selected with
// an attribute.
import {html as htmlLang} from '@codemirror/next/lang-html';
import {css as cssLang} from '@codemirror/next/lang-css';
import {javascript as javascriptLang} from '@codemirror/next/lang-javascript';
import {defaultHighlighter} from '@codemirror/next/highlight';

/**
 * A basic text editor with syntax highlighting for HTML, CSS, and JavaScript.
 */
@customElement('codemirror-editor')
export class CodeMirrorEditorElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      overflow: hidden;
      box-sizing: border-box;
    }

    .cm-wrap {
      height: 100%;
    }
  `;

  @internalProperty()
  private _editorView!: EditorView;

  // We store _value ourselves, rather than using a public reactive property, so
  // that we can set this value internally without triggering an update.
  private _value?: string;

  get value() {
    return this._value;
  }

  set value(v: string | undefined) {
    const oldValue = this._value;
    this._value = v;
    this.requestUpdate('value', oldValue);
  }

  /**
   * The type of the file being edited, as represented by its usual file
   * extension.
   */
  @property()
  type: 'js' | 'html' | 'css' | undefined;

  render() {
    return html`${this._editorView?.dom}`;
  }

  update(changedProperties: PropertyValues) {
    if (changedProperties.has('value') || changedProperties.has('src')) {
      this._createView();
    }
    super.update(changedProperties);
  }

  private _createView() {
    // This is called every time the value property is set externally, so that
    // we set up a fresh document with new state.
    const view = new EditorView({
      dispatch: (t: Transaction) => {
        view.update([t]);
        if (t.docChanged) {
          this._value = t.state.doc.toString();
          this.dispatchEvent(new Event('change'));
        }
        this.requestUpdate();
      },
      state: EditorState.create({
        doc: this.value,
        extensions: [
          lineNumbers(),
          highlightSpecialChars(),
          history(),
          multipleSelections(),
          ...this._getLanguagePlugins(),
          defaultHighlighter,
          closeBrackets(),
          keymap([
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...commentKeymap,
          ]),
        ],
      }),
      root: this.shadowRoot!,
    });
    this._editorView = view;
    this.requestUpdate();
  }

  private _getLanguagePlugins() {
    switch (this.type) {
      case 'js':
        return [javascriptLang()];
      case 'html':
        return [htmlLang()];
      case 'css':
        [cssLang()];
    }
    return [];
  }
}
