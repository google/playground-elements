/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {html, render} from 'lit';
import {PlaygroundIde} from '../playground-ide.js';
import '../playground-ide.js';
import {sendKeys, executeServerCommand} from '@web/test-runner-commands';

import {ReactiveElement} from '@lit/reactive-element';
import {PlaygroundCodeEditor} from '../playground-code-editor.js';
import {PlaygroundProject} from '../playground-project.js';
import {PlaygroundFileEditor} from '../playground-file-editor.js';
import {PlaygroundPreview} from '../playground-preview.js';

// There is browser variability with zero width spaces. This helper keeps tests
// consistent.
function innerTextWithoutSpaces(el?: HTMLElement | null): string {
  return el?.innerText.replace(/[\u200B\s]/g, '') ?? '';
}
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
      assert.instanceOf(result, Element);
      if ((result as ReactiveElement).updateComplete) {
        await (result as ReactiveElement).updateComplete;
      }
      node = result as HTMLElement;
    }
    return node;
  };

  // TODO(aomarks) Use sendKeys instead
  // https://modern-web.dev/docs/test-runner/commands/#send-keys
  const updateCurrentFile = async (
    editor: PlaygroundCodeEditor,
    newValue: string
  ) => {
    const codemirror = (
      editor as unknown as {
        _codemirror: PlaygroundCodeEditor['_codemirror'];
      }
    )._codemirror;
    codemirror!.setValue(newValue);
  };

  const waitForIframeLoad = (iframe: HTMLElement) =>
    new Promise<void>((resolve) => {
      iframe.addEventListener('load', () => resolve(), {once: true});
    });

  const assertPreviewContains = async (text: string) => {
    const iframe = (await pierce(
      'playground-ide',
      'playground-preview',
      'iframe'
    )) as HTMLIFrameElement;
    await waitForIframeLoad(iframe);
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

  const assertTabSelected = async (filename: string) => {
    await new Promise((r) => setTimeout(r));
    const tabBar = await pierce('playground-ide', 'playground-tab-bar');
    while (testRunning) {
      const selectedTab = tabBar.shadowRoot!.querySelector(
        'playground-internal-tab[active]'
      );
      if (selectedTab) {
        assert.include(
          selectedTab.textContent?.trim(),
          filename,
          `Selected tab did not contain '${filename}')`
        );
        break;
      }
      await new Promise((r) => setTimeout(r, 10));
    }
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

  test('handles multiple script tags', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/html" filename="index.html">
            <script>console.log('hello');&lt;/script>
            <script>console.log('potato');&lt;/script>
          </script>
        </playground-ide>
      `,
      container
    );

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    const editorInternals = editor as unknown as {
      _codemirror: PlaygroundCodeEditor['_codemirror'];
    };
    // Wait for the editor to instantiate.
    await raf();

    assert.include(
      editorInternals._codemirror?.getValue(),
      `<script>console.log('hello');</script>`
    );
    assert.include(
      editorInternals._codemirror?.getValue(),
      `<script>console.log('potato');</script>`
    );
  });

  test('renders JS', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/html" filename="index.html">
            <body>
              <script type="module" src="hello.js">&lt;/script>
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
              <script type="module" src="hello.js">&lt;/script>
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

  test('renders JSX', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.config = {
      files: {
        'index.html': {
          content: `
            <head>
              <script type="module" src="hello-react.js"></script>
            </head>
            <body></body>
          `,
        },
        'hello-react.jsx': {
          content: `
            import { React, ReactDOM } from "./mock-react.js";

            const container = document.querySelector('body');
            const root = ReactDOM.createRoot(container);
            root.render(<>hello react jsx!</>);
          `,
        },
        // `mock-react.js` avoids pulling `react` and `react-dom` from unpkg.
        // It expresses the a minimum subset required of the React API to append
        // a `TextNode` to the `body` of the playground html document.
        //
        // If more in depth integration tests are required, preact would be a
        // more robust alternative.
        'mock-react.js': {
          content: `
            class React {
              static Fragment = 'fragment';
              static createElement(
                  tag,
                  props,
                  children,
              ) {
                return document.createTextNode(children);
              }
            }

            class ReactRoot {
              root;
              constructor(root) {
                this.root = root;
              }
              render(children) {
                this.root.appendChild(children);
              }
            }

            class ReactDOM {
              static createRoot(root) {
                return new ReactRoot(root);
              }
            }

            export {React, ReactDOM};
          `,
        },
      },
    };
    container.appendChild(ide);
    await assertPreviewContains('hello react jsx!');
  });

  test('renders TSX', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.config = {
      files: {
        'index.html': {
          content: `
            <head>
              <script type="module" src="hello-react.js"></script>
            </head>
            <body></body>
          `,
        },
        'hello-react.tsx': {
          content: `
            import { React, ReactDOM } from "./mock-react.js";

            const container = document.querySelector('body');
            const root = ReactDOM.createRoot(container!);
            root.render(<>hello react tsx!</>);
          `,
        },
        // `mock-react.ts` avoids pulling `react` and `react-dom` from unpkg.
        // It expresses the a minimum subset required of the React API to append
        // a `TextNode` to the `body` of the playground html document.
        //
        // If more in depth integration tests are required, preact would be a
        // more robust alternative.
        'mock-react.ts': {
          content: `
            class React {
              static Fragment = 'fragment';
              static createElement(
                  tag: unknown,
                  props: unknown,
                  children: string,
              ) {
                return document.createTextNode(children);
              }
            }

            class ReactRoot {
              root: HTMLElement;
              constructor(root: HTMLElement) {
                this.root = root;
              }
              render(children: Element) {
                this.root.appendChild(children);
              }
            }

            class ReactDOM {
              static createRoot(root: HTMLElement): ReactRoot {
                return new ReactRoot(root);
              }
            }

            export {React, ReactDOM};
          `,
        },
      },
    };
    container.appendChild(ide);
    await assertPreviewContains('hello react tsx!');
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

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    updateCurrentFile(editor, 'Hello HTML 2');
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
              <script type="module" src="hello.js">&lt;/script>
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
              <script type="module" src="hello.js">&lt;/script>
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

  test('line wrapping enabled', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.lineWrapping = true;
    ide.config = {
      files: {
        'index.html': {
          content: 'Foo\n    Bar that has an indent',
        },
      },
    };
    container.appendChild(ide);
    await assertPreviewContains('Foo\n    Bar that has an indent');

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;

    const codemirrorContainer = editor.shadowRoot!.querySelector(
      '.CodeMirror'
    ) as HTMLElement;
    const codeMirrorLongLine = editor.shadowRoot!.querySelectorAll(
      '.CodeMirror-line'
    )[1] as HTMLElement;

    assert.include(
      Array.from(codemirrorContainer?.classList),
      'CodeMirror-wrap'
    );

    assert.include(codeMirrorLongLine.style.paddingLeft, '4px');
    assert.include(codeMirrorLongLine.style.paddingLeft, '4ch');
    assert.equal(codeMirrorLongLine.style.textIndent, '-4ch');
  });

  test('line wrapping enabled with line numbers', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.lineWrapping = true;
    ide.lineNumbers = true;
    ide.config = {
      files: {
        'index.html': {
          content: 'Foo\n    Bar that has an indent',
        },
      },
    };
    container.appendChild(ide);
    await assertPreviewContains('Foo\n    Bar that has an indent');

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;

    const codemirrorContainer = editor.shadowRoot!.querySelector(
      '.CodeMirror'
    ) as HTMLElement;
    const codeMirrorLongLine = editor.shadowRoot!.querySelectorAll(
      '.CodeMirror-line'
    )[1] as HTMLElement;

    assert.include(
      Array.from(codemirrorContainer?.classList),
      'CodeMirror-wrap'
    );

    assert.include(codeMirrorLongLine.style.paddingLeft, '0.7em');
    assert.include(codeMirrorLongLine.style.paddingLeft, '4ch');
    assert.equal(codeMirrorLongLine.style.textIndent, '-4ch');
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

  test('returns the correct cursor position and index', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.config = {
      files: {
        'index.js': {
          content: '',
        },
      },
    };
    container.appendChild(ide);

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;

    const codeToAdd = `console.log("Foo");
    console.log("bar");`;

    await new Promise((resolve) => window.requestAnimationFrame(resolve));

    editor.focus();
    await sendKeys({
      type: codeToAdd,
    });

    assert.equal(editor.value, codeToAdd);
    assert.equal(editor.cursorIndex, codeToAdd.length);
    const cursorPosition = editor.cursorPosition;
    assert.equal(cursorPosition.line, 1);
    assert.equal(cursorPosition.ch, 23);
  });

  test('returns the token under cursor', async () => {
    const ide = document.createElement('playground-ide');
    ide.sandboxBaseUrl = '/';
    ide.config = {
      files: {
        'index.js': {
          content: 'console.log("Foo")',
        },
      },
    };
    container.appendChild(ide);

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;

    await new Promise((resolve) => window.requestAnimationFrame(resolve));

    editor.focus();

    await sendKeys({
      press: 'ArrowRight',
    });

    const tokenUnderCursor = editor.tokenUnderCursor;

    assert.equal(tokenUnderCursor.start, 0);
    assert.equal(tokenUnderCursor.end, 7);
    assert.equal(tokenUnderCursor.string, 'console');
  });

  // TODO(aomarks) This test fails in Firefox.
  (navigator.userAgent.includes('Firefox') ? test.skip : test)(
    'reloading preview does not modify history',
    async () => {
      const historyLengthBefore = window.history.length;

      // NOTE: For some reason, the parent window's history only seems to be
      // affected when the iframe origin is different.
      const separateOrigin = (await executeServerCommand(
        'separate-origin'
      )) as string;

      render(
        html`
          <playground-ide sandbox-base-url="${separateOrigin}">
            <script type="sample/html" filename="index.html">
              <body>
                <p>Hello HTML 1</p>
              </body>
            </script>
          </playground-ide>
        `,
        container
      );
      const iframe = (await pierce(
        'playground-ide',
        'playground-preview',
        'iframe'
      )) as HTMLIFrameElement;
      await waitForIframeLoad(iframe);

      const editor = (await pierce(
        'playground-ide',
        'playground-file-editor',
        'playground-code-editor'
      )) as PlaygroundCodeEditor;
      updateCurrentFile(editor, 'Hello HTML 2');

      const project = (await pierce(
        'playground-ide',
        'playground-project'
      )) as PlaygroundProject;
      project.save();
      await waitForIframeLoad(iframe);

      const historyLengthAfter = window.history.length;
      assert.equal(historyLengthAfter, historyLengthBefore);
    }
  );

  test('reloading preview does not create a new iframe element', async () => {
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

    const preview = (await pierce(
      'playground-ide',
      'playground-preview'
    )) as PlaygroundPreview;

    const iframe = preview.iframe!;

    await waitForIframeLoad(iframe);

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    updateCurrentFile(editor, 'Hello HTML 2');

    const project = (await pierce(
      'playground-ide',
      'playground-project'
    )) as PlaygroundProject;

    await Promise.all([waitForIframeLoad(iframe), project.save()]);

    const newIframe = (await pierce(
      'playground-ide',
      'playground-preview',
      'iframe'
    )) as HTMLIFrameElement;

    assert.equal(newIframe, iframe);
  });

  test('delete file using menu', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/" editable-file-system>
          <script type="sample/html" filename="index.html">
            <body>
              <p>Hello HTML</p>
            </body>
          </script>
        </playground-ide>
      `,
      container
    );
    await assertPreviewContains('Hello HTML');

    const project = (await pierce(
      'playground-ide',
      'playground-project'
    )) as PlaygroundProject;
    assert.lengthOf(project.files ?? [], 1);

    // Between MWC v0.25.1 and v0.25.2, when clicking on an <mwc-icon-button>,
    // the target changed from the <mwc-icon-button> to its internal <svg>.
    const menuButtonSvg = await pierce(
      'playground-ide',
      'playground-tab-bar',
      '.menu-button > svg'
    );
    menuButtonSvg.dispatchEvent(new Event('click', {bubbles: true}));

    const deleteButton = await pierce(
      'playground-ide',
      'playground-tab-bar',
      'playground-file-system-controls',
      '#deleteButton'
    );
    deleteButton.click();

    assert.lengthOf(project.files ?? [], 0);
  });

  test('uses custom htmlFile property', async () => {
    const ide = document.createElement('playground-ide')!;
    ide.sandboxBaseUrl = '/';
    ide.htmlFile = 'src/index.html';
    container.appendChild(ide);
    ide.config = {
      files: {
        'src/index.html': {
          content: 'Hello HTML',
        },
        'other.html': {
          content: 'Other HTML',
        },
      },
    };
    await assertPreviewContains('Hello HTML');

    // test that the preview updates when the htmlFile property changes
    ide.htmlFile = 'other.html';
    await assertPreviewContains('Other HTML');
  });

  test('undo/redo changes to a file', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/js" filename="hello.js">
            document.body.textContent = 'Hello JS';
          </script>
          <script type="sample/html" filename="index.html">
            <body>
              <script type="module" src="hello.js">&lt;/script>
            </body>
          </script>
        </playground-ide>
      `,
      container
    );
    const codemirror = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    const codemirrorInternals = codemirror as unknown as {
      _codemirror: PlaygroundCodeEditor['_codemirror'];
    };
    await assertPreviewContains('Hello JS');
    codemirrorInternals._codemirror!.setValue(
      "document.body.textContent = 'Hello 2'"
    );
    await assertPreviewContains('Hello 2');
    codemirrorInternals._codemirror!.undo();
    await assertPreviewContains('Hello JS');
    codemirrorInternals._codemirror!.redo();
    await assertPreviewContains('Hello 2');
  });

  test('undo/redo should not cross project file boundaries', async () => {
    const JS_CONTENT = `document.body.textContent = 'Hello JS';`;
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/js" filename="hello.js">
            ${JS_CONTENT}
          </script>
          <script type="sample/html" filename="index.html">
            <body>
              <script type="module" src="hello.js">&lt;/script>
            </body>
          </script>
        </playground-ide>
      `,
      container
    );
    const fileEditor = (await pierce(
      'playground-ide',
      'playground-file-editor'
    )) as PlaygroundFileEditor;

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    const editorInternals = editor as unknown as {
      _codemirror: PlaygroundCodeEditor['_codemirror'];
    };

    await raf();
    assert.equal(fileEditor.filename, 'hello.js');
    assert.equal(editorInternals._codemirror!.getValue().trim(), JS_CONTENT);

    fileEditor.filename = 'index.html';
    await raf();
    editorInternals._codemirror!.undo();

    await raf();
    // Expect to still be on the html page.
    assert.notEqual(editorInternals._codemirror!.getValue().trim(), JS_CONTENT);
  });

  test('undo/redo history persists when files change', async () => {
    const JS_CONTENT = `document.body.textContent = 'Hello JS';`;
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/js" filename="hello.js">
            ${JS_CONTENT}
          </script>
          <script type="sample/html" filename="index.html">
            <body>
              <script type="module" src="hello.js">&lt;/script>
            </body>
          </script>
        </playground-ide>
      `,
      container
    );
    const fileEditor = (await pierce(
      'playground-ide',
      'playground-file-editor'
    )) as PlaygroundFileEditor;

    const editor = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    const editorInternals = editor as unknown as {
      _codemirror: PlaygroundCodeEditor['_codemirror'];
    };

    await raf();
    assert.equal(fileEditor.filename, 'hello.js');
    assert.equal(editorInternals._codemirror!.getValue().trim(), JS_CONTENT);

    editorInternals._codemirror!.setValue(
      "document.body.textContent = 'Hello 2'"
    );

    fileEditor.filename = 'index.html';
    await raf();
    assert.include(
      editorInternals._codemirror!.getValue().trim(),
      `<script type="module" src="hello.js">`
    );
    editorInternals._codemirror!.setValue(`<body>
    <script type="module" src="hello.js">&lt;/script>
    <p>Add this</p>
    </body>`);
    await raf();

    fileEditor.filename = 'hello.js';
    await raf();
    assert.include(editorInternals._codemirror!.getValue(), `'Hello 2'`);

    for (let i = 0; i < 6; i++) {
      editorInternals._codemirror!.undo();
      await raf();
      assert.equal(editorInternals._codemirror!.getValue().trim(), JS_CONTENT);
    }
    editorInternals._codemirror!.redo();
    await raf();
    assert.include(editorInternals._codemirror!.getValue(), `'Hello 2'`);

    fileEditor.filename = 'index.html';
    await raf();

    // index.html file still has history
    assert.equal(editorInternals._codemirror!.getHistory()?.done.length, 3);
    assert.include(editorInternals._codemirror!.getValue(), `<p>Add this</p>`);

    editorInternals._codemirror!.undo();
    await raf();
    assert.isFalse(
      editorInternals._codemirror!.getValue().includes(`<p>Add this</p>`)
    );
    assert.include(
      editorInternals._codemirror!.getValue(),
      `<script type="module" src="hello.js">`
    );
  });

  test('rename file preserves history', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/js" filename="hello.js">
            document.body.textContent = 'Hello JS';
          </script>
          <script type="sample/html" filename="index.html">
            <body>
              <script type="module" src="hello.js">&lt;/script>
            </body>
          </script>
        </playground-ide>
      `,
      container
    );
    const project = (await pierce(
      'playground-ide',
      'playground-project'
    )) as PlaygroundProject;
    const codemirror = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    const codemirrorInternals = codemirror as unknown as {
      _codemirror: PlaygroundCodeEditor['_codemirror'];
    };
    await raf();
    assert.include(codemirrorInternals._codemirror!.getValue(), 'Hello JS');
    codemirrorInternals._codemirror!.setValue(
      "document.body.textContent = 'Hello 2'"
    );
    project.renameFile('hello.js', 'potato.js');
    await raf();
    assert.include(codemirrorInternals._codemirror!.getValue(), 'Hello 2');
    codemirrorInternals._codemirror!.undo();
    await raf();
    assert.include(codemirrorInternals._codemirror!.getValue(), 'Hello JS');
    codemirrorInternals._codemirror!.redo();
    await raf();
    assert.include(codemirrorInternals._codemirror!.getValue(), 'Hello 2');
  });

  test('code remains folded when switching files', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/js" filename="hello.js">
            /* playground-fold */
              document.body.textContent = 'Hello JS';
            /* playground-fold-end */

            console.log('potato');
          </script>
          <script type="sample/html" filename="index.html">
            <body>
              <script type="module" src="hello.js">&lt;/script>
            </body>
          </script>
        </playground-ide>
      `,
      container
    );
    const EXPECTED_FOLDED = "…console.log('potato');";
    const fileEditor = (await pierce(
      'playground-ide',
      'playground-file-editor'
    )) as PlaygroundFileEditor;
    const codemirror = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    await raf();
    assert.equal(
      innerTextWithoutSpaces(
        codemirror?.shadowRoot?.querySelector<HTMLDivElement>('*')
      ),
      EXPECTED_FOLDED
    );
    fileEditor.filename = 'index.html';
    await raf();
    assert.include(
      innerTextWithoutSpaces(
        codemirror?.shadowRoot?.querySelector<HTMLDivElement>('*')
      ),
      `src="hello.js"></script>`
    );
    fileEditor.filename = 'hello.js';
    await raf();
    assert.equal(
      innerTextWithoutSpaces(
        codemirror?.shadowRoot?.querySelector<HTMLDivElement>('*')
      ),
      EXPECTED_FOLDED
    );
  });

  test('code remains folded when switching files that both have folds', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/js" filename="hello.js">
            /* playground-fold */
              document.body.textContent = 'Hello JS';
            /* playground-fold-end */

            console.log('potato');
          </script>
          <script type="sample/html" filename="index.html">
            <body>
              <!-- playground-fold -->
              <script type="module" src="hello.js">&lt;/script>
              <!-- playground-fold-end -->
            </body>
          </script>
        </playground-ide>
      `,
      container
    );
    const EXPECTED_FOLDED = "…console.log('potato');";
    const fileEditor = (await pierce(
      'playground-ide',
      'playground-file-editor'
    )) as PlaygroundFileEditor;
    const codemirror = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    await raf();
    assert.equal(
      innerTextWithoutSpaces(
        codemirror?.shadowRoot?.querySelector<HTMLDivElement>('*')
      ),
      EXPECTED_FOLDED
    );
    fileEditor.filename = 'index.html';
    await raf();
    assert.equal(
      innerTextWithoutSpaces(
        codemirror?.shadowRoot?.querySelector<HTMLDivElement>('*')
      ),
      '<body>…</body>'
    );
    fileEditor.filename = 'hello.js';
    await raf();
    assert.equal(
      innerTextWithoutSpaces(
        codemirror?.shadowRoot?.querySelector<HTMLDivElement>('*')
      ),
      EXPECTED_FOLDED
    );
  });

  test('code remains folded on value change and undo', async () => {
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/js" filename="hello.js">
            /* playground-fold */
              document.body.textContent = 'Hello JS';
            /* playground-fold-end */

            console.log('potato');
          </script>
          <script type="sample/html" filename="index.html">
            <body>
              <script type="module" src="hello.js">&lt;/script>
            </body>
          </script>
        </playground-ide>
      `,
      container
    );
    const EXPECTED_FOLDED = "…console.log('potato');";
    const codemirror = (await pierce(
      'playground-ide',
      'playground-file-editor',
      'playground-code-editor'
    )) as PlaygroundCodeEditor;
    const codemirrorInternals = codemirror as unknown as {
      _codemirror: PlaygroundCodeEditor['_codemirror'];
    };
    await raf();
    assert.equal(
      innerTextWithoutSpaces(
        codemirror?.shadowRoot?.querySelector<HTMLDivElement>('*')
      ),
      EXPECTED_FOLDED
    );
    codemirror.value = `/* playground-fold */
document.body.textContent = 'Hello JS';
/* playground-fold-end */

console.log('tomato');`;
    await raf();
    assert.equal(
      innerTextWithoutSpaces(
        codemirror?.shadowRoot?.querySelector<HTMLDivElement>('*')
      ),
      "…console.log('tomato');"
    );

    codemirrorInternals._codemirror?.undo();
    await raf();

    assert.equal(
      innerTextWithoutSpaces(
        codemirror?.shadowRoot?.querySelector<HTMLDivElement>('*')
      ),
      EXPECTED_FOLDED
    );
  });

  test('focuses file with selected flag, from config', async () => {
    const ide = document.createElement('playground-ide')!;
    ide.sandboxBaseUrl = '/';
    container.appendChild(ide);
    // Start with a.html selected
    ide.config = {
      files: {
        'index.html': {
          content: 'index',
        },
        'a.html': {
          content: 'A',
          selected: true,
        },
        'b.html': {
          content: 'B',
        },
      },
    };
    await assertTabSelected('a.html');
    // Change to b.html selected
    ide.config = {
      files: {
        'index.html': {
          content: 'index',
        },
        'a.html': {
          content: 'A',
        },
        'b.html': {
          content: 'B',
          selected: true,
        },
      },
    };
    await assertTabSelected('b.html');
    // Nothing selected; should stay on b.html
    ide.config = {
      files: {
        'index.html': {
          content: 'index',
        },
        'b.html': {
          content: 'B',
        },
        'a.html': {
          content: 'A',
        },
      },
    };
    await assertTabSelected('b.html');
  });

  test('focuses file with selected flag, from slots', async () => {
    // Start with a.html selected
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/html" filename="index.html">
            index
          </script>
          <script type="sample/html" filename="a.html" selected>
            A
          </script>
          <script type="sample/html" filename="b.html">
            B
          </script>
        </playground-ide>
      `,
      container
    );
    const ide = container.firstElementChild as PlaygroundIde;
    await assertTabSelected('a.html');
    // Change to b.html selected
    ide.textContent = '';
    render(
      html`
        <script type="sample/html" filename="index.html">
          index
        </script>
        <script type="sample/html" filename="a.html">
          A
        </script>
        <script type="sample/html" filename="b.html" selected>
          B
        </script>
      `,
      ide
    );
    await assertTabSelected('b.html');
    // Nothing selected; should stay on b.html
    render(
      html`
        <script type="sample/html" filename="index.html">
          index
        </script>
        <script type="sample/html" filename="a.html">
          A
        </script>
        <script type="sample/html" filename="b.html">
          B
        </script>
      `,
      ide
    );
    await assertTabSelected('b.html');
  });
});
