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

// TODO(aomarks) Provide an API for loading these themes dynamically. We can
// include a bunch of standard themes, but we don't want them to all be included
// here if they aren't being used.
import codemirrorStyles from '../_codemirror/codemirror-styles.js';
import monokaiTheme from '../_codemirror/themes/monokai.css.js';
import ambienceTheme from '../_codemirror/themes/ambiance.css.js';
import ayuMirageTheme from '../_codemirror/themes/ayu-mirage.css.js';

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
    theme?: string;
    readOnly?: boolean | 'nocursor';
  }
): {
  getValue(): string;
  setValue(content: string): void;
  setSize(width?: string | number, height?: string | number): void;
  on(eventName: 'change', handler: () => void): void;
};

/**
 * A basic text editor with syntax highlighting for HTML, CSS, and JavaScript.
 */
@customElement('codemirror-editor')
export class CodeMirrorEditorElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-family: var(--playground-code-font-family, monospace);
        font-size: var(--playground-code-font-size, unset);
        border-radius: var(--playground-border-radius, unset);
      }

      :host(:not([probing-codemirror-theme])) {
        background-color: var(
          --playground-editor-background-color,
          var(--playground-editor-theme-background-color)
        );
      }

      :host(:not([probing-codemirror-theme])) .CodeMirror {
        background-color: inherit !important;
      }

      .CodeMirror {
        height: 100% !important;
        font-family: inherit !important;
        border-radius: inherit;
      }

      .CodeMirror-scroll {
        padding-left: 5px;
      }
    `,
    codemirrorStyles,
    monokaiTheme,
    ambienceTheme,
    ayuMirageTheme,
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
  @property({type: Boolean, attribute: 'line-numbers', reflect: true})
  lineNumbers = false;

  /**
   * If true, this editor is not editable.
   */
  @property({type: Boolean, reflect: true})
  readonly = false;

  /**
   * The CodeMirror theme to load.
   */
  @property()
  theme = 'default';

  private _resizeObserver?: ResizeObserver;

  update(changedProperties: PropertyValues) {
    if (
      changedProperties.has('value') ||
      changedProperties.has('type') ||
      changedProperties.has('lineNumbers') ||
      changedProperties.has('theme') ||
      changedProperties.has('readonly')
    ) {
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
        this._setBackgroundColor(dom);
      },
      {
        value: this.value,
        lineNumbers: this.lineNumbers,
        mode: this._getLanguageMode(),
        theme: this.theme,
        readOnly: this.readonly,
      }
    );
    cm.on('change', () => {
      this._value = cm.getValue();
      this.dispatchEvent(new Event('change'));
    });
    this._codemirror = cm;
  }

  private _setBackgroundColor(codeMirrorRootElement: HTMLElement) {
    this.setAttribute('probing-codemirror-theme', '');
    requestAnimationFrame(() => {
      const themeBgColor = window.getComputedStyle(codeMirrorRootElement)
        .backgroundColor;
      this.style.setProperty(
        '--playground-editor-theme-background-color',
        themeBgColor
      );
      this.removeAttribute('probing-codemirror-theme');
    });
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
