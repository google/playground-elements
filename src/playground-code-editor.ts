/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, customElement, css, property} from 'lit-element';

// TODO(aomarks) We use CodeMirror v5 instead of v6 only because we want support
// for nested highlighting of HTML and CSS inside JS/TS. Upgrade back to v6 once
// support is available. See
// https://github.com/lezer-parser/javascript/issues/3. This module sets a
// `CodeMirror` global.
import './_codemirror/codemirror-bundle.js';
import codemirrorStyles from './_codemirror/codemirror-styles.js';

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
  options?: CodeMirrorConfiguration
): {
  getValue(): string;
  setValue(content: string): void;
  setSize(width?: string | number, height?: string | number): void;
  refresh(): void;
  setOption<K extends keyof CodeMirrorConfiguration>(
    option: K,
    value: CodeMirrorConfiguration[K]
  ): void;
  on(eventName: 'change', handler: () => void): void;
  getDoc(): CodeMirrorDoc;
  foldCode(pos: number | CodeMirrorPos, options: CodeMirrorFoldOptions): void;
};

interface CodeMirrorDoc {
  posFromIndex(index: number): CodeMirrorPos;
  markText(
    from: CodeMirrorPos,
    to: CodeMirrorPos,
    options?: CodeMirrorTextMarkerOptions
  ): void;
}

interface CodeMirrorPos {
  ch: number;
  line: number;
}

interface CodeMirrorConfiguration {
  value?: string;
  mode?: string | null;
  lineNumbers?: boolean;
  readOnly?: boolean | 'nocursor';
}

interface CodeMirrorTextMarkerOptions {
  collapsed?: boolean;
  className?: string;
}

interface CodeMirrorFoldOptions {
  rangeFinder?: () => void;
  widget?: string | Element;
}

// TODO(aomarks) Could we upstream this to lit-element? It adds much stricter
// types to the ChangedProperties type.
interface TypedMap<T> extends Map<keyof T, unknown> {
  get<K extends keyof T>(key: K): T[K];
  set<K extends keyof T>(key: K, value: T[K]): this;
  delete<K extends keyof T>(key: K): boolean;
  keys(): IterableIterator<keyof T>;
  values(): IterableIterator<T[keyof T]>;
  entries(): IterableIterator<{[K in keyof T]: [K, T[K]]}[keyof T]>;
}

const unreachable = (n: never) => n;

/**
 * A basic text editor with syntax highlighting for HTML, CSS, and JavaScript.
 */
@customElement('playground-code-editor')
export class PlaygroundCodeEditor extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-family: var(--playground-code-font-family, monospace);
        font-size: var(--playground-code-font-size, unset);
        /* CodeMirror uses z-indexes up to 6 to e.g. place scrollbars above the
        code area. However, this can create undesirable stacking effects with
        the rest of the page. Force a new stacking context. */
        isolation: isolate;
      }

      .CodeMirror {
        height: 100% !important;
        font-family: inherit !important;
        border-radius: inherit;
      }

      .CodeMirror-foldmarker {
        font-family: sans-serif;
      }
      .CodeMirror-foldmarker:hover {
        cursor: pointer;
        /* Pretty much any color from the theme is good enough. */
        color: var(--playground-code-keyword-color, #770088);
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
  @property({type: Boolean, attribute: 'line-numbers', reflect: true})
  lineNumbers = false;

  /**
   * If true, this editor is not editable.
   */
  @property({type: Boolean, reflect: true})
  readonly = false;

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

  private _resizeObserver?: ResizeObserver;
  private _valueChangingFromOutside = false;
  private _ignoreValueChange = false;
  private _hideOrFoldRegionsActive = false;

  update(
    changedProperties: TypedMap<
      Omit<PlaygroundCodeEditor, keyof LitElement | 'update'>
    >
  ) {
    const cm = this._codemirror;
    if (cm === undefined) {
      this._createView();
    } else {
      for (const prop of changedProperties.keys()) {
        switch (prop) {
          case 'value':
            this._valueChangingFromOutside = true;
            cm.setValue(this.value ?? '');
            this._valueChangingFromOutside = false;
            break;
          case 'lineNumbers':
            cm.setOption('lineNumbers', this.lineNumbers);
            break;
          case 'type':
            cm.setOption('mode', this._getLanguageMode());
            break;
          case 'readonly':
            cm.setOption('readOnly', this.readonly);
            break;
          case 'pragmas':
            this._applyHideAndFoldRegions();
            break;
          default:
            unreachable(prop);
        }
      }
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
        this._codemirror?.refresh();
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
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // It seems that some dynamic layouts confuse CodeMirror, causing it
            // to measure itself too soon, which then causes the position of
            // interactions to be interpreted incorrectly. Here we hackily force
            // a refresh after initial layout is usually done.
            this._codemirror?.refresh();
          });
        });
      },
      {
        value: this.value ?? '',
        lineNumbers: this.lineNumbers,
        mode: this._getLanguageMode(),
        readOnly: this.readonly,
      }
    );
    cm.on('change', () => {
      if (this._ignoreValueChange) {
        return;
      }
      this._value = cm.getValue();

      // External changes are usually things like the editor switching which
      // file it is displaying.
      if (this._valueChangingFromOutside) {
        // Users can't change hide/fold regions.
        this._applyHideAndFoldRegions();
      } else {
        // Change event is only for user input.
        this.dispatchEvent(new Event('change'));
      }
    });
    this._codemirror = cm;
  }

  /**
   * Create hidden and folded regions for playground-hide and playground-fold
   * comments.
   */
  private _applyHideAndFoldRegions() {
    const cm = this._codemirror;
    if (!cm) {
      return;
    }

    const value = cm.getValue();
    if (this._hideOrFoldRegionsActive) {
      // We need to reset any existing hide/fold regions. Hacky, but prodding
      // the value this way works.
      this._ignoreValueChange = true;
      cm.setValue('');
      cm.setValue(value);
      this._ignoreValueChange = false;
    }
    this._hideOrFoldRegionsActive = false;

    if (this.pragmas === 'off-visible') {
      return;
    }
    const pattern = this._maskPatternForLang();
    if (pattern === undefined) {
      return;
    }

    const doc = cm.getDoc();

    const fold = (fromIdx: number, toIdx: number) => {
      cm.foldCode(/* ignored by our rangeFinder */ 0, {
        widget: '…',
        rangeFinder: () => ({
          from: doc.posFromIndex(fromIdx),
          to: doc.posFromIndex(toIdx),
        }),
      });
      this._hideOrFoldRegionsActive = true;
    };

    const hide = (fromIdx: number, toIdx: number) => {
      doc.markText(doc.posFromIndex(fromIdx), doc.posFromIndex(toIdx), {
        collapsed: true,
      });
      this._hideOrFoldRegionsActive = true;
    };

    for (const match of value.matchAll(pattern)) {
      const [, opener, kind, content, closer] = match;
      const openerStart = match.index;
      if (openerStart === undefined) {
        continue;
      }

      const openerEnd = openerStart + opener.length;
      hide(openerStart, openerEnd);

      const contentStart = openerEnd;
      let contentEnd;
      if (content && closer) {
        contentEnd = contentStart + content.length;
        const closerStart = contentEnd;
        const closerEnd = contentEnd + closer.length;
        hide(closerStart, closerEnd);
      } else {
        // No matching end comment. Include the entire rest of the file.
        contentEnd = value.length;
      }

      if (this.pragmas === 'on') {
        if (kind === 'fold') {
          fold(contentStart, contentEnd);
        } else if (kind === 'hide') {
          hide(contentStart, contentEnd);
        }
      }
    }
  }

  private _maskPatternForLang(): RegExp | undefined {
    switch (this.type) {
      case 'js':
      case 'ts':
      case 'css':
        // We consume all leading whitespace and one trailing newline for each
        // start/end comment. This lets us put start/end comments on their own
        // line and indent them like the surrounding without affecting the
        // selected region.
        return /( *\/\* *playground-(?<kind>hide|fold) *\*\/\n?)(?:(.*?)( *\/\* *playground-\k<kind>-end *\*\/\n?))?/gs;
      case 'html':
        return /( *<!-- *playground-(?<kind>hide|fold) *-->\n?)(?:(.*?)( *<!-- *playground-\k<kind>-end *-->\n?))?/gs;
      default:
        return undefined;
    }
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
    'playground-code-editor': PlaygroundCodeEditor;
  }
}
