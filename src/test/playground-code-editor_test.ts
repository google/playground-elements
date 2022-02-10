/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import '../playground-code-editor.js';
import {PlaygroundCodeEditor} from '../playground-code-editor.js';

const raf = async () => new Promise((r) => requestAnimationFrame(r));

suite('playground-code-editor', () => {
  let container: HTMLDivElement;

  setup(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  teardown(() => {
    container.remove();
  });

  test('is registered', () => {
    assert.instanceOf(
      document.createElement('playground-code-editor'),
      PlaygroundCodeEditor
    );
  });

  test('renders initial value', async () => {
    const editor = document.createElement('playground-code-editor');
    editor.value = 'foo';
    container.appendChild(editor);
    await editor.updateComplete;
    assert.include(editor.shadowRoot!.innerHTML, 'foo');
  });

  test('renders updated value', async () => {
    const editor = document.createElement('playground-code-editor');
    editor.value = 'foo';
    container.appendChild(editor);
    await editor.updateComplete;
    editor.value = 'bar';
    await editor.updateComplete;
    assert.include(editor.shadowRoot!.innerHTML, 'bar');
  });

  test('dispatches change event', async () => {
    const editor = document.createElement('playground-code-editor');
    editor.value = 'foo';
    container.appendChild(editor);
    await editor.updateComplete;
    await new Promise<void>((resolve) => {
      editor.addEventListener('change', () => resolve());
      const editorInternals = editor as unknown as {
        _codemirror: PlaygroundCodeEditor['_codemirror'];
      };
      editorInternals._codemirror!.setValue('bar');
    });
  });

  suite('history', () => {
    test('is maintained when value property is changed', async () => {
      const editor = document.createElement('playground-code-editor');
      editor.value = 'foo';
      container.appendChild(editor);
      await editor.updateComplete;
      const editorInternals = editor as unknown as {
        _codemirror: PlaygroundCodeEditor['_codemirror'];
      };
      assert.equal(editorInternals._codemirror!.getValue(), 'foo');
      editor.value = 'bar';
      await editor.updateComplete;
      assert.equal(editorInternals._codemirror!.getValue(), 'bar');
      editorInternals._codemirror!.undo();
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'foo');
    });

    test('is maintained with a document key', async () => {
      const DOCUMENT_KEY1 = {};
      const editor = document.createElement('playground-code-editor');
      editor.documentKey = DOCUMENT_KEY1;
      editor.value = 'foo';
      container.appendChild(editor);
      await editor.updateComplete;
      const editorInternals = editor as unknown as {
        _codemirror: PlaygroundCodeEditor['_codemirror'];
      };
      assert.equal(editorInternals._codemirror!.getValue(), 'foo');
      editor.value = 'bar';
      await editor.updateComplete;
      assert.equal(editorInternals._codemirror!.getValue(), 'bar');
      editorInternals._codemirror!.undo();
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'foo');
    });

    test('is associated to the documentKey property', async () => {
      const DOCUMENT_KEY1 = {};
      const DOCUMENT_KEY2 = {};
      const editor = document.createElement('playground-code-editor');
      editor.documentKey = DOCUMENT_KEY1;
      editor.value = 'foo';
      container.appendChild(editor);
      await editor.updateComplete;
      const editorInternals = editor as unknown as {
        _codemirror: PlaygroundCodeEditor['_codemirror'];
      };
      editor.value = 'potato';
      editor.documentKey = DOCUMENT_KEY2;
      await editor.updateComplete;
      assert.equal(editorInternals._codemirror!.getValue(), 'potato');
      editorInternals._codemirror!.undo();
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'potato');
    });

    // TODO: This test is broken. The CodeMirror document instance doesn't
    // preserve any history. Yet the playground-ide_test which tests file
    // swapping is robust and maintains history.
    test('can be rehydrated from a saved document instance', async () => {
      const DOCUMENT_KEY1 = {};
      const DOCUMENT_KEY2 = {};
      const editor = document.createElement('playground-code-editor');
      editor.documentKey = DOCUMENT_KEY1;
      editor.value = 'foo';
      container.appendChild(editor);
      await editor.updateComplete;
      const editorInternals = editor as unknown as {
        _codemirror: PlaygroundCodeEditor['_codemirror'];
      };
      editor.value = 'bar';
      await raf();
      editor.documentKey = DOCUMENT_KEY2;
      await raf();
      editor.value = 'potato';
      await raf();
      editor.documentKey = DOCUMENT_KEY1;
      editor.value = 'bar';
      await raf();

      assert.equal(editorInternals._codemirror!.getValue(), 'bar');
      editorInternals._codemirror!.undo();
      await raf();
      // TODO: Should be 'foo' if history was correctly preserved.
      assert.equal(editorInternals._codemirror!.getValue(), 'bar');
      // assert.equal(editorInternals._codemirror!.getValue(), 'foo');
    });
  });

  suite('syntax highlight', () => {
    /**
     * Traverse the given root node depth first, and return the first node whose
     * trimmed text content is exactly equal to the given text.
     */
    const findNodeWithText = (node: Node, text: string): Node | undefined => {
      if (node.textContent?.trim() === text) {
        return node;
      }
      for (const child of Array.from(node.childNodes)) {
        const r = findNodeWithText(child, text);
        if (r) {
          return r;
        }
      }
      return undefined;
    };

    const assertHighlight = async (
      type: PlaygroundCodeEditor['type'],
      value: string,
      text: string,
      color: string
    ) => {
      const editor = document.createElement('playground-code-editor');
      editor.type = type;
      editor.value = value;
      container.appendChild(editor);
      await editor.updateComplete;
      const element = findNodeWithText(editor.shadowRoot!, text);
      assert.isDefined(element);
      const style = window.getComputedStyle(element as HTMLElement);
      assert.equal(style.color, color);
    };

    const tagColor = 'rgb(17, 119, 0)';
    const typeColor = 'rgb(0, 136, 85)';
    const atomColor = 'rgb(34, 17, 153)';
    const keywordColor = 'rgb(119, 0, 136)';
    const stringColor = 'rgb(170, 17, 17)';

    test('html', async () =>
      assertHighlight('html', '<p>foo</p>', '<p>', tagColor));

    test('css', async () =>
      assertHighlight('css', 'p { color: blue; }', 'blue', keywordColor));

    test('js', async () =>
      assertHighlight('js', 'if (true) {}', 'true', atomColor));

    test('ts', async () =>
      assertHighlight('ts', 'const x: string;', 'string', typeColor));

    test('html-in-js', async () =>
      assertHighlight('js', 'html`<p>foo</p>`', '<p>', tagColor));

    test('html-in-ts', async () =>
      assertHighlight('ts', 'html`<p>foo</p>`', '<p>', tagColor));

    test('css-in-js', async () =>
      assertHighlight('js', 'css`p { color: blue; }`', 'blue', keywordColor));

    test('css-in-ts', async () =>
      assertHighlight('ts', 'css`p { color: blue; }`', 'blue', keywordColor));

    test('json', async () =>
      assertHighlight('json', '{"foo": 123}', '"foo"', stringColor));
  });
});
