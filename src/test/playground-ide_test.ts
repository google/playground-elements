/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {html, render} from 'lit';
import {PlaygroundIde} from '../playground-ide.js';
import '../playground-ide.js';

import type {ReactiveElement} from '@lit/reactive-element';
import type {PlaygroundCodeEditor} from '../playground-code-editor.js';
import type {PlaygroundProject} from '../playground-project.js';

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
      if ((result as ReactiveElement).updateComplete) {
        await (result as ReactiveElement).updateComplete;
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

  test('ignores query params when serving files', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.config = {
      files: {
        'index.html': {
          content: '<script>location.assign("./foo.html?xyz");</script>',
        },
        'foo.html': {
          content: 'foo.html loaded',
        },
      },
    };
    container.appendChild(ide);
    await assertPreviewContains('foo.html loaded');
  });

  test('create new files', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.config = {
      files: {
        'index.html': {
          content: 'Hello',
        },
        'package.json': {
          content: '{"dependencies":{}}',
          hidden: true,
        },
      },
    };
    container.appendChild(ide);
    const project = (await pierce(
      'playground-ide',
      'playground-project'
    )) as PlaygroundProject;
    // Need to defer another microtask for the config to initialize.
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Already exists.
    assert.isFalse(project.isValidNewFilename('index.html'));

    // Does not exist.
    assert.isTrue(project.isValidNewFilename('newfile.ts'));
    project.addFile('newfile.ts');
    assert.isFalse(project.isValidNewFilename('newfile.ts'));

    // Exists but is hidden. Creating it unhides it and reveals the existing
    // content.
    assert.isTrue(project.isValidNewFilename('package.json'));
    project.addFile('package.json');
    assert.isFalse(project.isValidNewFilename('package.json'));
    const packageJson = project.files?.find(
      (file) => file.name === 'package.json'
    );
    assert.isFalse(packageJson?.hidden);
    assert.equal(packageJson?.content, '{"dependencies":{}}');
  });

  test('modified property', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.config = {
      files: {
        'index.html': {
          content: 'Old content',
        },
      },
    };
    container.appendChild(ide);

    const project = (await pierce(
      'playground-ide',
      'playground-project'
    )) as PlaygroundProject;

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;

    const editorInternals = editor as unknown as {
      _codemirror: PlaygroundCodeEditor['_codemirror'];
    };

    // Need to defer another microtask for the config to initialize.
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Note the double checks are here to add coverage for cached states.
    assert.isFalse(ide.modified);
    assert.isFalse(ide.modified);

    project.addFile('potato.html');
    assert.isTrue(ide.modified);
    assert.isTrue(ide.modified);

    project.deleteFile('potato.html');
    assert.isFalse(ide.modified);
    assert.isFalse(ide.modified);

    project.renameFile('index.html', 'potato.html');
    assert.isTrue(ide.modified);
    assert.isTrue(ide.modified);

    project.renameFile('potato.html', 'index.html');
    assert.isFalse(ide.modified);
    assert.isFalse(ide.modified);

    editorInternals._codemirror!.setValue('New content');
    assert.isTrue(ide.modified);
    assert.isTrue(ide.modified);

    editorInternals._codemirror!.setValue('Old content');
    assert.isFalse(ide.modified);
    assert.isFalse(ide.modified);

    project.addFile('potato.html');
    assert.isTrue(ide.modified);
    assert.isTrue(ide.modified);

    ide.config = {
      files: {
        'index.html': {
          content: 'Different content',
        },
      },
    };
    await new Promise((resolve) => requestAnimationFrame(resolve));
    assert.isFalse(ide.modified);
    assert.isFalse(ide.modified);
  });
});
