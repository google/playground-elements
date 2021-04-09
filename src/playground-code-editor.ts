/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  LitElement,
  customElement,
  css,
  property,
  query,
  internalProperty,
  PropertyValues,
  html,
} from 'lit-element';
import {nothing} from 'lit-html';
import {ifDefined} from 'lit-html/directives/if-defined.js';
import {CodeMirror} from './lib/codemirror.js';
import codemirrorStyles from './_codemirror/codemirror-styles.js';
import type {Diagnostic} from 'vscode-languageserver';

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
        position: relative;
      }

      #focusContainer {
        height: 100%;
        position: relative;
      }

      .CodeMirror {
        height: 100% !important;
        font-family: inherit !important;
        border-radius: inherit;
      }

      #keyboardHelpScrim {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        z-index: 999;
        pointer-events: none;
      }

      #keyboardHelp {
        background: #00000099;
        padding: 20px 80px;
        border-radius: 10px;
        color: white;
        font-family: sans-serif;
        font-size: 18px;
      }

      .CodeMirror-foldmarker {
        font-family: sans-serif;
      }
      .CodeMirror-foldmarker:hover {
        cursor: pointer;
        /* Pretty much any color from the theme is good enough. */
        color: var(--playground-code-keyword-color, #770088);
      }

      .diagnostic {
        position: relative;
      }

      .diagnostic::before {
        /* It would be nice to use "text-decoration: red wavy underline" here,
           but unfortunately it renders nothing at all for single characters.
           See https://bugs.chromium.org/p/chromium/issues/detail?id=668042. */
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==');
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }

      #tooltip {
        position: absolute;
        padding: 7px;
        z-index: 4;
      }

      #tooltip > div {
        background: var(--playground-code-background, #fff);
        color: var(--playground-code-default-color, #000);
        /* Kind of hacky... line number color tends to work out as a good
           default border, because it's usually visible on top of the
           background, but slightly muted. */
        border: 1px solid var(--playground-code-linenumber-color, #ccc);
        padding: 5px;
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
  type: 'js' | 'ts' | 'html' | 'css' | 'json' | undefined;

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
   * Diagnostics to display on the current file.
   */
  @property({attribute: false})
  diagnostics?: Array<Diagnostic>;

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

  @internalProperty()
  private _tooltipDiagnostic?: {
    diagnostic: Diagnostic;
    position: string;
  };

  @internalProperty()
  private _showKeyboardHelp = false;

  @query('#focusContainer')
  private _focusContainer?: HTMLDivElement;

  @query('.CodeMirror-code')
  private _codemirrorEditable?: HTMLDivElement;

  private _resizeObserver?: ResizeObserver;
  private _resizing = false;
  private _valueChangingFromOutside = false;
  private _ignoreValueChange = false;
  private _hideOrFoldRegionsActive = false;
  private _cmDom?: HTMLElement;
  private _diagnosticMarkers: Array<CodeMirror.TextMarker> = [];
  private _diagnosticsMouseoverListenerActive = false;

  update(changedProperties: PropertyValues) {
    const cm = this._codemirror;
    if (cm === undefined) {
      this._createView();
    } else {
      const changedTyped = changedProperties as TypedMap<
        Omit<PlaygroundCodeEditor, keyof LitElement | 'render' | 'update'>
      >;
      for (const prop of changedTyped.keys()) {
        switch (prop) {
          case 'value':
            this._valueChangingFromOutside = true;
            cm.setValue(this.value ?? '');
            this._valueChangingFromOutside = false;
            break;
          case 'lineNumbers':
            this._enableOrDisableAriaLineNumberObserver();
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
          case 'diagnostics':
            this._showDiagnostics();
            break;
          default:
            unreachable(prop);
        }
      }
    }
    super.update(changedProperties);
  }

  render() {
    if (this.readonly) {
      return this._cmDom;
    }
    return html`
      <div
        id="focusContainer"
        tabindex="0"
        @mousedown=${this._onMousedown}
        @focus=${this._onFocus}
        @blur=${this._onBlur}
        @keydown=${this._onKeyDown}
      >
        ${this._showKeyboardHelp
          ? html`<div id="keyboardHelpScrim">
              <p id="keyboardHelp">
                Press Enter to start editing<br />Press Escape to exit editor
              </p>
            </div>`
          : nothing}
        ${this._cmDom}
        <div
          id="tooltip"
          ?hidden=${!this._tooltipDiagnostic}
          style=${ifDefined(this._tooltipDiagnostic?.position)}
        >
          <div part="diagnostic-tooltip">
            ${this._tooltipDiagnostic?.diagnostic.message}
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    // CodeMirror uses JavaScript to control whether scrollbars are visible. It
    // does so automatically on interaction, but won't notice container size
    // changes. If the browser doesn't have ResizeObserver, scrollbars will
    // sometimes be missing, but typing in the editor will fix it.
    if (typeof ResizeObserver === 'function') {
      this._resizeObserver = new ResizeObserver(() => {
        if (this._resizing) {
          // Don't get in a resize loop.
          return;
        }
        this._resizing = true;
        this._codemirror?.refresh();
        this._resizing = false;
      });
      this._resizeObserver.observe(this);
    }
    super.connectedCallback();
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    super.disconnectedCallback();
  }

  private _createView() {
    const cm = CodeMirror(
      (dom) => {
        this._cmDom = dom;
        this._enableOrDisableAriaLineNumberObserver();
        this._resizing = true;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // It seems that some dynamic layouts confuse CodeMirror, causing it
            // to measure itself too soon, which then causes the position of
            // interactions to be interpreted incorrectly. Here we hackily force
            // a refresh after initial layout is usually done.
            this._codemirror?.refresh();
            this._resizing = false;
          });
        });
      },
      {
        value: this.value ?? '',
        lineNumbers: this.lineNumbers,
        mode: this._getLanguageMode(),
        readOnly: this.readonly,
        inputStyle: 'contenteditable',
        // Don't allow naturally tabbing into the editor, because it's a
        // tab-trap. Instead, the container is focusable, and Enter/Escape are
        // used to explicitly enter the editable area.
        tabindex: -1,
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
        this._showDiagnostics();
      } else {
        // Change event is only for user input.
        this.dispatchEvent(new Event('change'));
      }
    });
    this._codemirror = cm;
  }

  private _onMousedown() {
    // Directly focus editable region.
    this._codemirrorEditable?.focus();
  }

  private _onFocus() {
    // Outer container was focused, either by tabbing from outside, or by
    // pressing Escape.
    this._showKeyboardHelp = true;
  }

  private _onBlur() {
    // Outer container was unfocused, either by tabbing away from it, or by
    // pressing Enter.
    this._showKeyboardHelp = false;
  }

  private _onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.target === this._focusContainer) {
      this._codemirrorEditable?.focus();
      // Prevent typing a newline from this same event.
      event.preventDefault();
    } else if (event.key === 'Escape') {
      // Note there is no API for "select the next naturally focusable element",
      // so instead we just re-focus the outer container, from which point the
      // user can tab to move focus entirely elsewhere.
      this._focusContainer?.focus();
    }
  }

  private _ariaLineNumberObserver?: MutationObserver;

  /**
   * Prevent screen readers from voicing line numbers.
   *
   * When line numbers are active, watch for lines inserted into the DOM by
   * CodeMirror, and add the "aria-hidden" attribute to their line numbers.
   *
   * See https://github.com/codemirror/CodeMirror/issues/6578
   */
  private _enableOrDisableAriaLineNumberObserver() {
    if (this.lineNumbers && !this._ariaLineNumberObserver) {
      // Start observing newly added lines.
      const linesParent = this._cmDom?.querySelector('.CodeMirror-code');
      if (!linesParent) {
        console.error('Internal playground error: .CodeMirror-code missing');
        return;
      }
      this._ariaLineNumberObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            // Could be e.g. a text node. Cast so we can check for presence of
            // querySelector with optional chaining instead of a typeof test.
            (node as Partial<Element>)
              .querySelector?.('.CodeMirror-gutter-wrapper')
              ?.setAttribute('aria-hidden', 'true');
          }
        }
      });
      this._ariaLineNumberObserver.observe(linesParent, {childList: true});
    } else if (!this.lineNumbers && this._ariaLineNumberObserver) {
      // Line numbers are no longer rendering.
      this._ariaLineNumberObserver.disconnect();
      this._ariaLineNumberObserver = undefined;
    }
  }

  /**
   * Create hidden and folded regions for playground-hide and playground-fold
   * comments.
   */
  private async _applyHideAndFoldRegions() {
    const cm = this._codemirror;
    if (!cm) {
      return;
    }

    const value = cm.getValue();
    if (this._hideOrFoldRegionsActive) {
      // We need to reset any existing hide/fold regions. Hacky, but prodding
      // the value this way works. We need to defer to a microtask though,
      // because if we're already inside a CodeMirror change event callback
      // stack, then these setValue calls will queue up two async change events
      // that would fire later, and throw us for a loop. This way, the change
      // events fire synchronously, and we can use our loop guard property
      // correctly.
      await null;
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
      case 'json':
        // While the stock CodeMirror JavaScript mode has a restricted "json"
        // mode, the google-javascript mode does not (which we use because it
        // supports html-in-js highlighting). Adding the CodeMirror JavaScript
        // mode would add ~50KiB minified + brotli, so let's just put up with
        // the fact that you'll get highlighting for JS even though it's not
        // valid JSON.
        return 'google-javascript';
      case 'html':
        return 'google-html';
      case 'css':
        return 'css';
    }
    return null;
  }

  private _showDiagnostics() {
    const cm = this._codemirror;
    if (cm === undefined) {
      return;
    }
    cm.operation(() => {
      this._tooltipDiagnostic = undefined;
      while (this._diagnosticMarkers.length > 0) {
        this._diagnosticMarkers.pop()!.clear();
      }
      if (!this.diagnostics?.length) {
        if (this._diagnosticsMouseoverListenerActive) {
          this._cmDom?.removeEventListener(
            'mouseover',
            this._onMouseOverWithDiagnostics
          );
          this._diagnosticsMouseoverListenerActive = false;
        }
        return;
      }
      if (!this._diagnosticsMouseoverListenerActive) {
        this._cmDom?.addEventListener(
          'mouseover',
          this._onMouseOverWithDiagnostics
        );
        this._diagnosticsMouseoverListenerActive = true;
      }
      for (let i = 0; i < this.diagnostics.length; i++) {
        const diagnostic = this.diagnostics[i];
        this._diagnosticMarkers.push(
          cm.markText(
            {
              line: diagnostic.range.start.line,
              ch: diagnostic.range.start.character,
            },
            {
              line: diagnostic.range.end.line,
              ch: diagnostic.range.end.character,
            },
            {
              className: `diagnostic diagnostic-${i}`,
            }
          )
        );
      }
    });
  }

  // Using property assignment syntax so that it's already bound to `this` for
  // add/removeEventListener.
  private _onMouseOverWithDiagnostics = (event: MouseEvent) => {
    if (!this.diagnostics?.length) {
      return;
    }
    // Find the diagnostic. Note we could use cm.findMarksAt() with the pointer
    // coordinates (like the built-in linter plugin does), but since we've
    // encoded the diagnostic index into a class, we can just extract it
    // directly from the target.
    const idxMatch = (event.target as Element).className?.match(
      /diagnostic-(\d+)/
    );
    if (idxMatch === null) {
      this._tooltipDiagnostic = undefined;
      return;
    }
    const idx = Number(idxMatch[1]);
    const diagnostic = this.diagnostics[idx];
    if (diagnostic === this._tooltipDiagnostic?.diagnostic) {
      // Already showing the tooltip for this diagnostic.
      return;
    }

    // Position the tooltip relative to the squiggly code span. To maximize
    // available space, place it above/below and left/right depending on which
    // quadrant the span is in.
    let position = '';
    const hostRect = this.getBoundingClientRect();
    const spanRect = (event.target as Element).getBoundingClientRect();
    const hostCenterY = hostRect.y + hostRect.height / 2;
    if (spanRect.y < hostCenterY) {
      // Note the rects are viewport relative, so the extra subtractions here
      // are to convert to host-relative.
      position += `top:${spanRect.y + spanRect.height - hostRect.y}px;`;
    } else {
      position += `bottom:${hostRect.bottom - spanRect.y}px;`;
    }
    const hostCenterX = hostRect.x + hostRect.width / 2;
    if (spanRect.left < hostCenterX) {
      position += `left:${Math.max(0, spanRect.x - hostRect.x)}px`;
    } else {
      position += `right:${Math.max(0, hostRect.right - spanRect.right)}px`;
    }
    this._tooltipDiagnostic = {diagnostic, position};
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-code-editor': PlaygroundCodeEditor;
  }
}
