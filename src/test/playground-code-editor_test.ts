/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import '../playground-code-editor.js';
import {PlaygroundCodeEditor} from '../playground-code-editor.js';

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
      const editorInternals = (editor as unknown) as {
        _codemirror: PlaygroundCodeEditor['_codemirror'];
      };
      editorInternals._codemirror!.setValue('bar');
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
