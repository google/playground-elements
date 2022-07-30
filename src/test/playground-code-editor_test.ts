/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import '../playground-code-editor.js';
import {PlaygroundCodeEditor} from '../playground-code-editor.js';
import {sendKeys} from '@web/test-runner-commands';

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
    let editor: PlaygroundCodeEditor;
    let editorInternals: {
      _codemirror: PlaygroundCodeEditor['_codemirror'];
    };

    setup(async () => {
      editor = document.createElement('playground-code-editor');
      // For correct history, CodeMirror needs to be initialized and attached to
      // the DOM.
      container.appendChild(editor);
      await raf();
      editorInternals = editor as unknown as typeof editorInternals;
    });

    teardown(() => {
      editor.remove();
    });

    test(`and doc instance cache won't drive editor value`, async () => {
      const DOCUMENT_KEY1 = {dockey: 1};
      const DOCUMENT_KEY2 = {dockey: 2};
      editor.value = 'document key 1';
      editor.documentKey = DOCUMENT_KEY1;
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'document key 1');
      editor.value = 'document key 2';
      editor.documentKey = DOCUMENT_KEY2;
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'document key 2');
      // If only the documentKey is changed, the current value is set on the
      // document cache. The `value` property drives the CodeMirror contents.
      editor.documentKey = DOCUMENT_KEY1;
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'document key 2');

      // Changing documentKey and unsetting the value should clear the editor.
      editor.value = undefined;
      editor.documentKey = DOCUMENT_KEY2;
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), '');

      // Unset the cache should result in a
      editor.documentKey = undefined;
      editor.value = 'value with no cache';
      await raf();
      assert.equal(
        editorInternals._codemirror!.getValue(),
        'value with no cache'
      );
    });

    test(`is cleared on unsetting documentKey`, async () => {
      const DOCUMENT_KEY1 = {dockey: 1};
      editor.value = 'no cache';
      await raf();
      editor.documentKey = DOCUMENT_KEY1;
      await raf();
      editor.value = 'update on cache';
      await raf();
      editor.documentKey = undefined;
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'update on cache');
      // No-op, because unsetting documentKey clears history.
      editorInternals._codemirror!.undo();
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'update on cache');
      await raf();
      editor.value = 'changed';
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'changed');
      editorInternals._codemirror!.undo();
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'update on cache');
    });

    test('is updated if value gets changed with doc cache', async () => {
      const DOCUMENT_KEY1 = {dockey: 1};
      const DOCUMENT_KEY2 = {dockey: 2};
      editor.value = 'document key 1';
      editor.documentKey = DOCUMENT_KEY1;
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'document key 1');
      editor.value = 'document key 2';
      editor.documentKey = DOCUMENT_KEY2;
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'document key 2');
      editor.documentKey = DOCUMENT_KEY1;
      editor.value = 'override document key 1';
      await raf();
      assert.equal(
        editorInternals._codemirror!.getValue(),
        'override document key 1'
      );
      editorInternals._codemirror?.undo();
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'document key 1');
    });

    test('is maintained without using documentKey', async () => {
      editor.value = 'foo';
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'foo');
      editor.value = 'bar';
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'bar');
      editorInternals._codemirror!.undo();
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'foo');
    });

    test('is maintained with a document key', async () => {
      const DOCUMENT_KEY1 = {};
      editor.documentKey = DOCUMENT_KEY1;
      editor.value = 'foo';
      await editor.updateComplete;
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
      editor.documentKey = DOCUMENT_KEY1;
      editor.value = 'foo';
      await editor.updateComplete;
      editor.value = 'potato';
      editor.documentKey = DOCUMENT_KEY2;
      await editor.updateComplete;
      assert.equal(editorInternals._codemirror!.getValue(), 'potato');
      editorInternals._codemirror!.undo();
      await raf();
      assert.equal(editorInternals._codemirror!.getValue(), 'potato');
    });

    test('can be rehydrated from a saved document instance', async () => {
      const DOCUMENT_KEY1 = {};
      const DOCUMENT_KEY2 = {};

      editor.documentKey = DOCUMENT_KEY1;
      editor.value = 'foo';

      await raf();
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
      assert.equal(editorInternals._codemirror!.getValue(), 'foo');
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

    test('jsx', async () =>
      assertHighlight('jsx', 'const foo = () => <p>foo</p>;', 'p', tagColor));

    test('tsx', async () =>
      assertHighlight(
        'tsx',
        'const x: () => unknown = () => <p>foo</p>;',
        'p',
        tagColor
      ));

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

  suite('comment toggle', () => {
    async function assertToggle(
      type: PlaygroundCodeEditor['type'],
      value: string,
      expect: string
    ) {
      const editor = document.createElement('playground-code-editor');
      editor.type = type;
      editor.value = value;
      container.appendChild(editor);
      await editor.updateComplete;
      const focusContainer =
        editor.shadowRoot!.querySelector<HTMLDivElement>('#focusContainer')!;

      editor.focus();
      await sendKeys({
        down: 'Control',
      });
      await sendKeys({
        press: 'Slash',
      });
      await sendKeys({
        up: 'Control',
      });

      assert.include(focusContainer.innerText, expect);

      await sendKeys({
        down: 'Control',
      });
      await sendKeys({
        press: 'Slash',
      });
      await sendKeys({
        up: 'Control',
      });

      assert.include(focusContainer.innerText, value);
    }

    test('ts', async () =>
      assertToggle('ts', 'const g = 3;', '// const g = 3;'));

    test('js', async () =>
      assertToggle('js', 'const g = 3;', '// const g = 3;'));

    test('html', async () =>
      assertToggle('html', '<p>foo</p>', '<!-- <p>foo</p> -->'));

    test('css', async () =>
      assertToggle('css', 'p { color: blue; }', '/* p { color: blue; } */'));

    test('ignored when readonly', async () => {
      const editor = document.createElement('playground-code-editor');
      editor.type = 'ts';
      editor.readonly = true;
      editor.value = 'const g = 3;';
      container.appendChild(editor);
      await editor.updateComplete;

      // TODO(aomarks) There's some flakiness here that requires a little pause.
      await raf();

      editor.focus();
      await sendKeys({
        down: 'Control',
      });
      await sendKeys({
        press: 'Slash',
      });
      await sendKeys({
        up: 'Control',
      });
      await raf();

      assert.include(
        // There isn't a focusContainer when the editor is in readonly mode.
        editor.shadowRoot!.querySelector<HTMLDivElement>('div')!.innerText,
        'const g = 3;'
      );
    });
  });
});
