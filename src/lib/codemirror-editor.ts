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
  property,
  PropertyValues,
} from 'lit-element';

// TODO(aomarks) We use CodeMirror v5 instead of v6 only because we want support
// for nested highlighting of HTML and CSS inside JS/TS. Upgrade back to v6 once
// support is available. See
// https://github.com/lezer-parser/javascript/issues/3. This module sets a
// `CodeMirror` global.
import '../_codemirror/codemirror-bundle.js';
import codemirrorStyles from '../_codemirror/codemirror-styles.js';

// TODO(aomarks) @types/codemirror exists, but installing it and referencing
// global `CodeMirror` errors with:
//
//  'CodeMirror' refers to a UMD global, but the current file is a module.
//  Consider adding an import instead
//
// Maybe there's a way to get this working. See
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/codemirror/index.d.ts
declare function CodeMirror(
  callback: (host: HTMLElement) => void,
  options?: {
    value?: string;
    mode?: string | null;
    lineNumbers?: boolean;
  }
): {
  getValue(): string;
  setValue(content: string): void;
  setSize(width?: string | number, height?: string | number): void;
  on(eventName: 'change', handler: () => void): void;
};

declare global {
  // TODO(aomarks) Remove when
  // https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/908 lands.
  class ResizeObserver {
    constructor(callback: () => void);
    observe(target: Element): void;
    disconnect(): void;
  }
}

/**
 * A basic text editor with syntax highlighting for HTML, CSS, and JavaScript.
 */
@customElement('codemirror-editor')
export class CodeMirrorEditorElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .CodeMirror {
        height: 100% !important;
      }
    `,
    codemirrorStyles,
  ];

  // Used by tests.
  protected _codemirror?: ReturnType<typeof CodeMirror>;

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
  type: 'js' | 'ts' | 'html' | 'css' | undefined;

  /**
   * If true, display a left-hand-side gutter with line numbers. Default false
   * (hidden).
   */
  @property({type: Boolean, attribute: 'line-numbers'})
  lineNumbers = false;

  private _resizeObserver?: ResizeObserver;

  update(changedProperties: PropertyValues) {
    if (changedProperties.has('value') || changedProperties.has('type')) {
      this._createView();
    }
    super.update(changedProperties);
  }

  connectedCallback() {
    // CodeMirror uses JavaScript to control whether scrollbars are visible. It
    // does so automatically on interaction, but won't notice container size
    // changes. If the browser doesn't have ResizeObserver, scrollbars will
    // sometimes be missing, but typing in the editor will fix it.
    if (typeof ResizeObserver === 'function') {
      this._resizeObserver = new ResizeObserver(() => {
        this._codemirror?.setSize();
      });
      this._resizeObserver.observe(this);
    }
    super.connectedCallback();
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  private _createView() {
    const cm = CodeMirror(
      (dom) => {
        this.shadowRoot!.innerHTML = '';
        this.shadowRoot!.appendChild(dom);
      },
      {
        value: this.value,
        lineNumbers: this.lineNumbers,
        mode: this._getLanguageMode(),
      }
    );
    cm.on('change', () => {
      this._value = cm.getValue();
      this.dispatchEvent(new Event('change'));
    });
    this._codemirror = cm;
  }

  private _getLanguageMode() {
    switch (this.type) {
      case 'ts':
        return 'google-typescript';
      case 'js':
        return 'google-javascript';
      case 'html':
        return 'google-html';
      case 'css':
        return 'css';
    }
    return null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'codemirror-editor': CodeMirrorEditorElement;
  }
}
