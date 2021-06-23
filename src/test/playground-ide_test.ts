/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import '../playground-ide.js';
import {PlaygroundIde} from '../playground-ide.js';
import {html, render} from 'lit-html';
import {UpdatingElement} from 'lit-element';
import {PlaygroundCodeEditor} from '../playground-code-editor.js';
import {PlaygroundProject} from '../playground-project.js';

suite('playground-ide', () => {
  let container: HTMLDivElement;
  let testRunning: boolean;

  setup(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    testRunning = true;
  });

  teardown(() => {
    container.remove();
    testRunning = false;
  });

  test('is registered', () => {
    assert.instanceOf(document.createElement('playground-ide'), PlaygroundIde);
  });

  const raf = async () => new Promise((r) => requestAnimationFrame(r));

  const pierce = async (...selectors: string[]) => {
    let node = document.body;
    for (const selector of selectors) {
      const result = (node.shadowRoot ?? node).querySelector(selector);
      assert.instanceOf(result, HTMLElement);
      if ((result as UpdatingElement).updateComplete) {
        await (result as UpdatingElement).updateComplete;
      }
      node = result as HTMLElement;
    }
    return node;
  };

  const assertPreviewContains = async (text: string) => {
    const iframe = (await pierce(
      'playground-ide',
      'playground-preview',
      'iframe'
    )) as HTMLIFrameElement;
    await new Promise<void>((resolve) => {
      const listener = () => {
        iframe.removeEventListener('load', listener);
        resolve();
      };
      iframe.addEventListener('load', listener);
    });
    // TODO(aomarks) Chromium and Webkit both fire iframe "load" after the
    // contentDocument has actually loaded, but Firefox fires it before. Why is
    // that? If not for that, we wouldn't need to poll here.
    await new Promise<void>((resolve) => {
      const check = () => {
        if (iframe.contentDocument?.body?.textContent?.includes(text)) {
          resolve();
        } else if (testRunning) {
          setTimeout(check, 10);
        }
      };
      check();
    });
  };

  test('renders HTML', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/html" filename="index.html">
            <p>Hello HTML</p>
            <script>console.log('hello');&lt;/script>
          </script>
        </playground-ide>
      `,
      container
    );
    await assertPreviewContains('Hello HTML');
  });

  test('renders JS', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/html" filename="index.html">
            <body>
              <script src="hello.js">&lt;/script>
            </body>
          </script>
          <script type="sample/js" filename="hello.js">
            document.body.textContent = 'Hello JS';
          </script>
        </playground-ide>
      `,
      container
    );
    await assertPreviewContains('Hello JS');
  });

  test('renders TS', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/html" filename="index.html">
            <body>
              <script src="hello.js">&lt;/script>
            </body>
          </script>
          <script type="sample/ts" filename="hello.ts">
            const hello: string = "Hello TS";
            document.body.textContent = hello;
          </script>
        </playground-ide>
      `,
      container
    );
    await assertPreviewContains('Hello TS');
  });

  test('re-renders HTML', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/html" filename="index.html">
            <body>
              <p>Hello HTML 1</p>
            </body>
          </script>
        </playground-ide>
      `,
      container
    );
    await assertPreviewContains('Hello HTML 1');

    const codemirror = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    const codemirrorInternals = codemirror as unknown as {
      _codemirror: PlaygroundCodeEditor['_codemirror'];
    };
    codemirrorInternals._codemirror!.setValue('Hello HTML 2');
    const project = (await pierce(
      'playground-ide',
      'playground-project'
    )) as PlaygroundProject;
    // Note we shouldn't await the save(), because assertPreviewContains waits
    // for an iframe load event, and we can legitimately get an iframe load
    // before the full compile is done since we serve each asset as soon as it
    // is ready.
    project.save();
    await assertPreviewContains('Hello HTML 2');
  });

  test('hidden file is not displayed in tab bar', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/html" filename="index.html" hidden>
            <body>
              <script src="hello.js">&lt;/script>
            </body>
          </script>
          <script type="sample/js" filename="hello.js">
            document.body.textContent = 'Hello JS';
          </script>
        </playground-ide>
      `,
      container
    );
    await assertPreviewContains('Hello JS');
    const tabBar = await pierce('playground-ide', 'playground-tab-bar');
    const tabs = tabBar.shadowRoot?.querySelectorAll('playground-internal-tab');
    assert.equal(tabs?.length, 1);
  });

  test('file label is displayed in tab bar', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/html" filename="index.html" label="HTML">
            <body>
              <script src="hello.js">&lt;/script>
            </body>
          </script>
          <script type="sample/js" filename="hello.js" label="JS">
            document.body.textContent = 'Hello JS';
          </script>
        </playground-ide>
      `,
      container
    );
    await assertPreviewContains('Hello JS');
    const tabBar = await pierce('playground-ide', 'playground-tab-bar');
    const tabs = tabBar.shadowRoot?.querySelectorAll('playground-internal-tab');
    const texts = Array.from(tabs ?? []).map((tab) => tab.textContent?.trim());
    assert.deepEqual(texts, ['HTML', 'JS']);
  });

  test('reads files from config property', async () => {
    const ide = document.createElement('playground-ide')!;
    ide.sandboxBaseUrl = '/';
    container.appendChild(ide);
    ide.config = {
      files: {
        'index.html': {
          content: 'Hello HTML',
        },
      },
    };
    await assertPreviewContains('Hello HTML');
  });

  test('a11y: is contenteditable', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.config = {
      files: {
        'index.html': {
          content: 'Foo',
        },
      },
    };
    container.appendChild(ide);
    await assertPreviewContains('Foo');

    const cmCode = await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor',
      '.CodeMirror-code'
    );

    assert.equal(cmCode.getAttribute('contenteditable'), 'true');
  });

  test('a11y: line numbers get aria-hidden attribute', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.lineNumbers = true;
    ide.config = {
      files: {
        'index.html': {
          content: 'Foo\nBar',
        },
      },
    };
    container.appendChild(ide);
    await assertPreviewContains('Foo\nBar');

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;

    const queryHiddenLineNumbers = () =>
      [
        ...editor.shadowRoot!.querySelectorAll('.CodeMirror-gutter-wrapper'),
      ].filter((gutter) => gutter.getAttribute('aria-hidden') === 'true');

    // Initial render with line-numbers enabled.
    assert.equal(queryHiddenLineNumbers().length, 2);

    // Disable line numbers.
    ide.lineNumbers = false;
    await raf();
    assert.equal(queryHiddenLineNumbers().length, 0);

    // Re-enable line numbers.
    ide.lineNumbers = true;
    await raf();
    assert.equal(queryHiddenLineNumbers().length, 2);

    // Add a line.
    const editorInternals = editor as unknown as {
      _codemirror: PlaygroundCodeEditor['_codemirror'];
    };
    editorInternals._codemirror!.setValue(editor.value + '\nBaz');
    await raf();
    assert.equal(queryHiddenLineNumbers().length, 3);
  });

  test('a11y: focusing shows keyboard prompt', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.config = {
      files: {
        'index.html': {
          content: 'Foo',
        },
      },
    };
    container.appendChild(ide);
    await assertPreviewContains('Foo');

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    const focusContainer = editor.shadowRoot!.querySelector(
      '#focusContainer'
    ) as HTMLElement;
    const editableRegion = editor.shadowRoot!.querySelector(
      '.CodeMirror-code'
    ) as HTMLElement;
    const keyboardHelp = 'Press Enter';

    // Not focused initially
    assert.notInclude(focusContainer.textContent, keyboardHelp);

    // When the inner container is focused, show the keyboard prompt
    focusContainer.focus();
    await raf();
    assert.isTrue(focusContainer.matches(':focus'));
    assert.include(focusContainer.textContent, keyboardHelp);

    // Press Enter to start editing
    focusContainer.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    await raf();
    assert.isTrue(editableRegion.matches(':focus'));
    assert.notInclude(focusContainer.textContent, keyboardHelp);

    // Press Escape to stop editing
    editableRegion.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})
    );
    await raf();
    assert.isTrue(focusContainer.matches(':focus'));
    assert.include(focusContainer.textContent, keyboardHelp);

    // Focus something else entirely
    focusContainer.blur();
    await raf();
    assert.isFalse(focusContainer.matches(':focus'));
    assert.isFalse(editableRegion.matches(':focus'));
    assert.notInclude(focusContainer.textContent, keyboardHelp);
  });
});
