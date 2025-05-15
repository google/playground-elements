/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, css, PropertyValues, html, nothing, render} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  EditorState,
  Extension,
  StateEffect,
  StateField,
  Range,
  Compartment,
  Transaction,
  Annotation,
} from '@codemirror/state';
import {
  EditorView,
  ViewUpdate,
  lineNumbers as cmLineNumbers,
  keymap,
  Decoration,
  DecorationSet,
  WidgetType,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
} from '@codemirror/view';
import {lit} from './cm-lang-lit.js';
import {html as cmHtml} from '@codemirror/lang-html';
import {css as cmCss} from '@codemirror/lang-css';
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  Completion,
  completionKeymap,
  CompletionContext,
  CompletionResult,
} from '@codemirror/autocomplete';
import {syntaxHighlighting} from '@codemirror/language';
import {
  history,
  defaultKeymap,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import {
  bracketMatching,
  foldGutter,
  foldKeymap,
  indentOnInput,
} from '@codemirror/language';
import {classHighlighter} from '@lezer/highlight';

import './internal/overlay.js';
import {Diagnostic} from 'vscode-languageserver-protocol';
import {
  EditorCompletion,
  EditorPosition,
  EditorToken,
} from './shared/worker-api.js';
import {highlightSelectionMatches, searchKeymap} from '@codemirror/search';
import {lintKeymap} from '@codemirror/lint';
import {styles as playgroundStyles} from './playground-styles.js';

// TODO(aomarks) Could we upstream this to lit-element? It adds much stricter
// types to the ChangedProperties type.
interface TypedMap<T> extends Map<keyof T, unknown> {
  get<K extends keyof T>(key: K): T[K];
  set<K extends keyof T>(key: K, value: T[K]): this;
  delete<K extends keyof T>(key: K): boolean;
  keys(): MapIterator<keyof T>;
  values(): MapIterator<T[keyof T]>;
  entries(): MapIterator<{[K in keyof T]: [K, T[K]]}[keyof T]>;
}

const unreachable = (n: never) => n;

/**
 * A basic text editor with syntax highlighting for HTML, CSS, and JavaScript.
 */
@customElement('playground-code-editor')
export class PlaygroundCodeEditor extends LitElement {
  static override styles = [
    css`
      :host {
        display: block;
      }

      #focusContainer {
        height: 100%;
        position: relative;
      }
      #focusContainer:focus {
        outline: none;
      }

      .cm-editor {
        height: 100% !important;
        border-radius: inherit;
      }

      .cm-foldMarker {
        font-family: sans-serif;
      }
      .cm-foldMarker:hover {
        cursor: pointer;
        /* Pretty much any color from the theme is good enough. */
        color: var(--playground-code-keyword-color, #770088);
      }

      #keyboardHelp {
        font-size: 18px;
        font-family: sans-serif;
        padding: 10px 20px;
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
        font-family: var(--playground-code-font-family, monospace);
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

      [contenteditable='true'] {
        outline: none;
      }
    `,
    playgroundStyles,
  ];

  protected _editorView?: EditorView;

  get cursorPosition(): EditorPosition {
    if (!this._editorView) {
      return {ch: 0, line: 0};
    }
    const pos = this._editorView.state.selection.main.head;
    const line = this._editorView.state.doc.lineAt(pos);
    return {
      ch: pos - line.from,
      line: line.number - 1,
    };
  }

  get cursorIndex(): number {
    if (!this._editorView) return 0;
    return this._editorView.state.selection.main.head;
  }

  get tokenUnderCursor(): EditorToken {
    if (!this._editorView) return {start: 0, end: 0, string: ''};

    const pos = this._editorView.state.selection.main.head;
    const line = this._editorView.state.doc.lineAt(pos);

    const wordRange = this._editorView.state.wordAt(pos);
    if (wordRange) {
      const start = wordRange.from - line.from;
      const end = wordRange.to - line.from;
      return {
        start,
        end,
        string: line.text.slice(start, end),
      };
    }

    return {
      start: 0,
      end: 0,
      string: '',
    };
  }

  // We store _value ourselves, rather than using a public reactive property, so
  // that we can set this value internally without triggering an update.
  private _value?: string;

  @property()
  get value() {
    return this._value;
  }

  set value(v: string | undefined) {
    const oldValue = this._value;
    this._value = v;
    this.requestUpdate('value', oldValue);
  }

  /**
   * Provide a `documentKey` to create a CodeMirror document instance which
   * isolates history and value changes per `documentKey`.
   *
   * Use to keep edit history separate between files while reusing the same
   * playground-code-editor instance.
   */
  @property({attribute: false})
  // eslint-disable-next-line @typescript-eslint/ban-types
  documentKey?: object;

  /**
   * WeakMap associating a `documentKey` with CodeMirror document state.
   * A WeakMap is used so that this component does not become the source of
   * memory leaks.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  private readonly _docCache = new WeakMap<object, EditorState>();

  /**
   * The type of the file being edited, as represented by its usual file
   * extension.
   */
  @property()
  type: 'js' | 'ts' | 'html' | 'css' | 'json' | 'jsx' | 'tsx' | undefined;

  /**
   * If true, display a left-hand-side gutter with line numbers. Default false
   * (hidden).
   */
  @property({type: Boolean, attribute: 'line-numbers', reflect: true})
  lineNumbers = false;

  /**
   * If true, wrap for long lines. Default false
   */
  @property({type: Boolean, attribute: 'line-wrapping', reflect: true})
  lineWrapping = false;

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

  /**
   * Diagnostics to display on the current file.
   */
  @property({attribute: false})
  diagnostics?: Array<Diagnostic>;

  @state()
  _completions?: EditorCompletion[];

  @state()
  _completionsOpen = false;

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

  @state()
  private _tooltipDiagnostic?: {
    diagnostic: Diagnostic;
    position: string;
  };

  @state()
  private _showKeyboardHelp = false;

  @query('#focusContainer')
  private _focusContainer?: HTMLDivElement;

  @query('.cm-content')
  private _editorContent?: HTMLDivElement;

  private _valueChangingFromOutside = false;
  private _diagnosticDecorations: DecorationSet = Decoration.none;
  private _diagnosticsMouseoverListenerActive = false;
  private _lastTransactions: Transaction[] = [];

  // Compartments for dynamic configuration
  private readonly _lineNumbersCompartment = new Compartment();
  private readonly _lineWrappingCompartment = new Compartment();
  private readonly _languageCompartment = new Compartment();
  private readonly _readOnlyCompartment = new Compartment();
  private readonly _autocompletionCompartment = new Compartment();

  autocompleteDelay = 1250;
  private _lastAutocompleteRequest = 0;

  // Create StateField for storing diagnostics decorations
  private readonly _diagnosticField = StateField.define<DecorationSet>({
    create: () => Decoration.none,
    update: () => {
      return this._diagnosticDecorations;
    },
    provide: (f) => EditorView.decorations.from(f),
  });

  override createRenderRoot() {
    const root = this.attachShadow({mode: 'open'});
    this._editorView?.setRoot(root);
    root.adoptedStyleSheets = [
      ...root.adoptedStyleSheets,
      ...PlaygroundCodeEditor.styles.map((s) => s.styleSheet!),
    ];
    return root;
  }

  override update(changedProperties: PropertyValues) {
    const changedTyped = changedProperties as TypedMap<
      Omit<
        PlaygroundCodeEditor,
        keyof LitElement | 'render' | 'update' | 'createRenderRoot'
      >
    >;

    const view = this._editorView;

    // Collect all CodeMirror state effects (configuration changes) to dispatch them together
    // in a single transaction at the end of the update cycle.
    const effects: StateEffect<unknown>[] = [];

    for (const prop of changedTyped.keys()) {
      switch (prop) {
        case 'documentKey': {
          const docKey = this.documentKey ?? {};
          let docState = this._docCache.get(docKey);
          const lastKey = changedProperties.get('documentKey');
          let needsHideAndFold = false;

          // If a documentKey was previously active, cache its EditorState.
          // This preserves the content and history when the user switches away
          // from it and switches back later.
          if (lastKey && this._editorView) {
            const lastState = this._editorView.state;
            this._docCache.set(lastKey, lastState);

            // Value differs, so that means we need to update the view to
            // reflect the new state's value.
            if (lastState.doc.toString() !== this.value) {
              view?.dispatch({
                changes: [
                  {
                    from: 0,
                    to: lastState.doc.length,
                    insert: this.value ?? '',
                  },
                ],
              });
            }
          }

          if (!docState) {
            // No cached EditorState exists for the new documentKey because it's
            // likely being loaded for the first time.
            docState = this._createEditorState(this.value ?? '');
            this._docCache.set(docKey, docState);
            needsHideAndFold = true;
          } else if (docState.doc.toString() !== this.value) {
            // A cached EditorState exists, but its content differs from the
            // value property. We need to sync the cached state with the new
            // value to preserve cmd+z history.
            const tempView = new EditorView({state: docState});
            tempView.dispatch({
              changes: [
                {
                  from: 0,
                  to: docState.doc.length,
                  insert: this.value ?? '',
                },
              ],
            });
            docState = tempView.state;
            this._docCache.set(docKey, docState);
            tempView.destroy();
          }

          this._valueChangingFromOutside = true;

          // Replace the entire view with the new editor state. Unlike CM5, CM6
          // is modular, and the history stays on the state object rather than
          // the editor / view.
          this._editorView?.setState(docState);

          // If a brand new document state was created, hiding and folding
          // regions must be reapplied to this new state.
          if (needsHideAndFold) {
            void this._applyHideAndFoldRegions();
          }

          this._valueChangingFromOutside = false;
          break;
        }
        case 'value':
          if (changedTyped.has('documentKey')) {
            // Handled in the `documentKey` case.
            break;
          }

          if (this.value !== view?.state.doc.toString()) {
            this._valueChangingFromOutside = true;

            // The 'value' property was changed externally and it differs from
            // the editor's current document content, so we need to update the
            // view model to match.
            view?.dispatch({
              // Mark as an input userEvent so that the user can undo / redo
              // this change
              userEvent: 'input',
              changes: [
                {
                  from: 0,
                  to: view.state.doc.length,
                  insert: this.value ?? '',
                },
              ],
            });

            this._valueChangingFromOutside = false;
          }
          break;
        case 'lineNumbers':
          effects.push(
            this._lineNumbersCompartment.reconfigure(
              this.lineNumbers ? cmLineNumbers() : []
            )
          );
          break;
        case 'lineWrapping':
          effects.push(
            this._lineWrappingCompartment.reconfigure(
              this.lineWrapping ? EditorView.lineWrapping : []
            )
          );
          break;
        case 'type': {
          const lang = this._getLanguageExtension();
          effects.push(this._languageCompartment.reconfigure(lang || []));
          break;
        }
        case 'readonly':
          effects.push(
            this._readOnlyCompartment.reconfigure(
              this.readonly ? EditorState.readOnly.of(true) : []
            )
          );
          break;
        case 'pragmas':
          void this._applyHideAndFoldRegions();
          break;
        case 'diagnostics':
          this._showDiagnostics();
          break;
        case 'cursorIndex': {
          const index = this.cursorIndex ?? 0;
          if (view && index >= 0 && index <= view.state.doc.length) {
            view.dispatch({
              selection: {anchor: index, head: index},
            });
          }
          break;
        }
        case 'cursorPosition': {
          const pos = this.cursorPosition ?? {ch: 0, line: 0};
          // Convert line/ch position to absolute position
          const line = Math.max(
            0,
            Math.min(pos.line, view!.state.doc.lines - 1)
          );
          const lineObj = view!.state.doc.line(line + 1);
          const ch = Math.max(0, Math.min(pos.ch, lineObj.length));
          const index = lineObj.from + ch;

          view?.dispatch({
            selection: {anchor: index, head: index},
          });
          break;
        }
        case 'noCompletions':
          effects.push(
            this._autocompletionCompartment.reconfigure(
              this.noCompletions ? [] : [this._getAutocompletions()]
            )
          );
          break;
        case '_completions':
          this._showCompletions();
          break;
        case 'tokenUnderCursor':
        case 'autocompleteDelay':
        case '_completionsOpen':
          // Ignored properties that do not require direct editor state updates
          // or are handled by other mechanisms (e.g., getters, internal state changes).
          break;
        default:
          unreachable(prop);
      }
    }

    // If any configuration changes (effects like line numbers, wrapping, language mode) were queued
    // during the property update loop, dispatch them to the CodeMirror editor now.
    // This applies all pending configuration updates in a single, batched operation,
    // which is generally more performant and ensures consistency.
    if (effects.length > 0) {
      view?.dispatch({effects});
    }

    super.update(changedProperties);
  }

  override render() {
    if (this.readonly) {
      return this._editorView?.dom;
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
          ? html`<playground-internal-overlay>
              <p id="keyboardHelp" part="dialog">
                Press <strong>Enter</strong> to start editing<br />
                Press <strong>Escape</strong> to exit editor
              </p>
            </playground-internal-overlay>`
          : nothing}
        ${this._editorView?.dom}
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

  override connectedCallback() {
    if (!this._editorView) {
      this._editorView = new EditorView({
        state: this._createEditorState(this.value ?? ''),
        root: this.shadowRoot ?? undefined,
      });
    }

    super.connectedCallback();
  }

  override disconnectedCallback() {
    this._editorView?.destroy();
    this._editorView = undefined;
    super.disconnectedCallback();
  }

  private _createEditorState(content: string): EditorState {
    const baseExtensions: Extension[] = [
      syntaxHighlighting(classHighlighter, {fallback: true}),
      highlightSpecialChars(),
      history(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
        indentWithTab,
      ]),
      this._diagnosticField,

      this._readOnlyCompartment.of(
        this.readonly ? EditorState.readOnly.of(true) : []
      ),

      this._lineNumbersCompartment.of(
        this.lineNumbers ? [cmLineNumbers(), foldGutter()] : []
      ),

      this._lineWrappingCompartment.of(
        this.lineWrapping ? EditorView.lineWrapping : []
      ),

      this._languageCompartment.of(
        (() => {
          return this._getLanguageExtension() || [];
        })()
      ),

      this._autocompletionCompartment.of(
        this.noCompletions ? [] : [this._getAutocompletions()]
      ),
    ];

    // Listen for changes
    baseExtensions.push(
      EditorView.updateListener.of((update: ViewUpdate) => {
        if (update.docChanged) {
          this._lastTransactions = [...update.transactions];
          this._value = update.state.doc.toString();

          const isUndoRedo = update.transactions.some(
            (tr) =>
              tr.annotation(Transaction.userEvent) === 'undo' ||
              tr.annotation(Transaction.userEvent) === 'redo'
          );

          // External changes are usually things like the editor switching which
          // file it is displaying.
          if (this._valueChangingFromOutside) {
            // Apply hide/fold regions when value changes from outside
            void this._applyHideAndFoldRegions();
            this._showDiagnostics();
          } else {
            if (isUndoRedo) {
              // Always reapply hide/fold regions after undo/redo
              void this._applyHideAndFoldRegions();
            }
            this.dispatchEvent(new Event('change'));
          }
        }
      })
    );

    return EditorState.create({
      doc: content,
      extensions: baseExtensions,
    });
  }

  private _getLanguageExtension(): Extension | null {
    switch (this.type) {
      case 'js':
        return lit();
      case 'jsx':
        return lit({jsx: true});
      case 'ts':
        return lit({typescript: true});
      case 'tsx':
        return lit({typescript: true, jsx: true});
      case 'html':
        return cmHtml();
      case 'css':
        return cmCss();
      case 'json':
        return lit();
      default:
        return null;
    }
  }

  private _currentFiletypeSupportsCompletion() {
    // Currently we are only supporting code completion for these. Change
    // this in a case that we start to support configuring completions for
    // other languages too.
    return ['ts', 'js', 'tsx', 'jsx'].includes(this.type as string);
  }

  override focus() {
    this._editorContent?.focus();
  }

  private _customCompletionSource = async (
    context: CompletionContext
  ): Promise<CompletionResult | null> => {
    if (this.noCompletions) {
      return null;
    }

    // Only show completions when explicitly requested or when there's
    // a token to complete
    const wordBefore = context.matchBefore(/\w*/);
    if (
      (!wordBefore || wordBefore.from === wordBefore.to) &&
      !context.explicit
    ) {
      return null;
    }

    const wasTextEvent = this._lastTransactions.some(
      (transaction) =>
        transaction.annotation(Transaction.userEvent) === 'input.type'
    );
    const now = Date.now();
    const wasRecent =
      now - this._lastAutocompleteRequest <= this.autocompleteDelay;

    if (now > this._lastAutocompleteRequest) {
      this._lastAutocompleteRequest = now;
    }

    const isRefinement =
      !context.explicit &&
      wasTextEvent &&
      (wordBefore?.text?.startsWith('.') ||
        (wasRecent && (wordBefore?.text?.length ?? 0) > 1));

    let resolve: (
      value: EditorCompletion[] | Promise<EditorCompletion[]>
    ) => void;

    const completionsPromise = new Promise<EditorCompletion[]>((res) => {
      resolve = res;
    });

    this.dispatchEvent(
      new CustomEvent('request-completions', {
        detail: {
          isRefinement,
          fileContent: this.value,
          tokenUnderCursor: this.tokenUnderCursor.string,
          cursorIndex: this.cursorIndex,
          provideCompletions: (completions: EditorCompletion[]) => {
            resolve(completions);
          },
        },
      })
    );

    const completions = await completionsPromise;

    if (context.aborted) {
      return null;
    }

    if (!completions || completions.length <= 0) {
      return null;
    }

    const optionsPromises = completions.map(async (comp, i) => {
      return {
        label: comp.displayText || comp.text,
        detail:
          comp.details !== undefined ? (await comp.details).text : undefined,
        apply: comp.text,
        boost: i === 0 ? 99 : undefined, // Boost first suggestion
      } satisfies Completion;
    });

    const options = await Promise.all(optionsPromises);

    return {
      from: wordBefore?.from ?? 0,
      options,
    };
  };

  private _getAutocompletions() {
    return autocompletion({
      // Only show completions when we explicitly support the language.
      // Otherwise, default to whatever Codemirror does for it by default.
      override: this._currentFiletypeSupportsCompletion()
        ? [this._customCompletionSource]
        : undefined,
    });
  }

  private _showCompletions() {
    if (
      !this._editorView ||
      !this._completions ||
      this._completions.length <= 0
    )
      return;
  }

  private _onMousedown() {
    // Directly focus editable region.
    this._editorContent?.focus();
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
      this._editorContent?.focus();
      // Prevent typing a newline from this same event.
      event.preventDefault();
    } else if (event.key === 'Escape') {
      // If the user has completions selection UI opened up, Escape's default action
      // is to close the completion UI instead of escaping the code editor instance.
      // Therefore we only focus on the focusContainer in situations where the completions
      // UI is not open.
      if (!this._completionsOpen) {
        // Note there is no API for "select the next naturally focusable element",
        // so instead we just re-focus the outer container, from which point the
        // user can tab to move focus entirely elsewhere.
        this._focusContainer?.focus();
      }
    }
  }

  private async _applyHideAndFoldRegions() {
    if (!this._editorView) {
      return;
    }

    if (this.pragmas === 'off-visible') {
      return;
    }

    const pattern = this._maskPatternForLang();
    if (pattern === undefined) {
      return;
    }

    // CM6 decorations can be used for the '...' of hide/fold regions because
    // they are designed to modify the appearance of what is rendered in the
    // editor, so we also use it to simply hide the hide comments as well.
    const decorations: Range<Decoration>[] = [];
    const text = this._editorView.state.doc.toString();
    // Annotations in CM6 are used for attaching metadata, in this case the
    // fold ID, to dispatched actions.
    const unfoldAnnotation = Annotation.define<number>();

    for (const match of text.matchAll(pattern)) {
      const [, opener, kind, content, closer] = match;
      const openerStart = match.index ?? 0;
      const foldId = openerStart; // Use the start position as the UID for the fold

      const openerEnd = openerStart + opener.length;

      // Hide opening comment
      decorations.push(Decoration.replace({}).range(openerStart, openerEnd));

      const contentStart = openerEnd;
      let contentEnd;

      if (content && closer) {
        contentEnd = contentStart + content.length;
        const closerStart = contentEnd;
        const closerEnd = contentEnd + closer.length;

        // Hide closing comment
        decorations.push(Decoration.replace({}).range(closerStart, closerEnd));
      } else {
        // No matching end comment. Include the entire rest of the file.
        contentEnd = text.length;
      }

      const view = this._editorView!;

      if (this.pragmas === 'on') {
        if (kind === 'fold') {
          // Add fold widget and extract the content after the fold for display
          const lines = content?.split('\n') || [];
          const lastLine =
            lines.length > 0 ? lines[lines.length - 1].trim() : '';

          // Make sure we're showing the actual content, not just ellipses
          const displayText = `…${lastLine}`;

          // Create a widget that shows the folded "..." content
          const widget = new (class extends WidgetType {
            toDOM() {
              const wrapper = document.createElement('div');
              const span = html`<span
                class="cm-foldMarker"
                @click=${() =>
                  view.dispatch({
                    annotations: unfoldAnnotation.of(foldId),
                  })}
                >${displayText}</span
              >`;
              render(span, wrapper);
              return wrapper.children[0] as HTMLElement;
            }
          })();

          decorations.push(
            Decoration.replace({
              widget: widget,
              kind: 'fold',
              foldId,
            }).range(contentStart, contentEnd)
          );
        } else if (kind === 'hide') {
          // Hide content
          decorations.push(
            Decoration.replace({kind: 'hide'}).range(contentStart, contentEnd)
          );
        }
      }
    }

    // Add the extension to the editor
    const hideAndFoldField = StateField.define<DecorationSet>({
      create: () => Decoration.set(decorations, true),
      update: (decoration, transaction) => {
        // Check if the the user wants to unfold because they clicked the '...'
        const foldIdToRemove = transaction.annotation(unfoldAnnotation);

        if (foldIdToRemove !== undefined) {
          // Only remove the specific fold decoration with matching ID
          const newDecorations: Range<Decoration>[] = [];
          decoration.between(0, Infinity, (from, to, value) => {
            if (
              !(
                value.spec.kind === 'fold' &&
                value.spec.foldId === foldIdToRemove
              )
            ) {
              newDecorations.push(value.range(from, to));
            }
          });
          return Decoration.set(newDecorations);
        }

        return decoration.map(transaction.changes);
      },
      provide: (field) => EditorView.decorations.from(field),
    });

    this._editorView.dispatch({
      effects: StateEffect.appendConfig.of(hideAndFoldField),
    });
  }

  private _maskPatternForLang(): RegExp | undefined {
    switch (this.type) {
      case 'js':
      case 'ts':
      case 'css':
      case 'jsx':
      case 'tsx':
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

  private _showDiagnostics() {
    if (!this._editorView) {
      return;
    }

    this._tooltipDiagnostic = undefined;

    if (!this.diagnostics?.length) {
      if (this._diagnosticsMouseoverListenerActive) {
        this._editorView?.dom.removeEventListener(
          'mouseover',
          this._onMouseOverWithDiagnostics
        );
        this._diagnosticsMouseoverListenerActive = false;
      }

      // Clear diagnostic decorations
      this._diagnosticDecorations = Decoration.none;
      this._editorView.dispatch({
        effects: StateEffect.appendConfig.of([this._diagnosticField]),
      });

      return;
    }

    if (!this._diagnosticsMouseoverListenerActive) {
      this._editorView?.dom.addEventListener(
        'mouseover',
        this._onMouseOverWithDiagnostics
      );
      this._diagnosticsMouseoverListenerActive = true;
    }

    // Create decorations for each diagnostic
    const decorations: Range<Decoration>[] = [];

    for (let i = 0; i < this.diagnostics.length; i++) {
      const diagnostic = this.diagnostics[i];

      // Create a decoration that adds a CSS class to the range
      const decoration = Decoration.mark({
        class: `diagnostic diagnostic-${i}`,
      });

      // Convert line/character positions to absolute positions
      const startLine = this._editorView.state.doc.line(
        diagnostic.range.start.line + 1
      );
      const endLine = this._editorView.state.doc.line(
        diagnostic.range.end.line + 1
      );

      const startPos = startLine.from + diagnostic.range.start.character;
      let endPos = endLine.from + diagnostic.range.end.character;

      // CM6 will throw if decorations don't have a valid range
      if (endPos - startPos <= 0) {
        endPos = startPos + 1;
      }

      decorations.push(decoration.range(startPos, endPos));
    }

    // Set the diagnostic decorations
    this._diagnosticDecorations = Decoration.set(decorations, true);

    // Apply the decorations to the editor
    this._editorView.dispatch({
      effects: StateEffect.appendConfig.of([this._diagnosticField]),
    });
  }

  // Using property assignment syntax so that it's already bound to `this` for
  // add/removeEventListener.
  private _onMouseOverWithDiagnostics = (event: MouseEvent) => {
    if (!this.diagnostics?.length) {
      return;
    }
    // Find the diagnostic by extracting the diagnostic index from the class name
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
