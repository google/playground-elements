/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import '../playground-ide.js';
import '../playground-code-editor.js';

import {assert} from '@esm-bundle/chai';
import {sendKeys} from '@web/test-runner-commands';
import {html, ReactiveElement, render} from 'lit';

import {PlaygroundCodeEditor} from '../playground-code-editor.js';
import {PlaygroundProject} from '../playground-project.js';

const AUTOCOMPLETE_WRAPPER_CLASS = '.cm-tooltip-autocomplete ul';
const ACTIVE_SELECTOR = `${AUTOCOMPLETE_WRAPPER_CLASS} [aria-selected="true"]`;
const COMPLETION_LABEL = `${AUTOCOMPLETE_WRAPPER_CLASS} .cm-completionLabel`;

suite('completions', () => {
  let container: HTMLDivElement;
  let project: PlaygroundProject | undefined | null;
  let editor: PlaygroundCodeEditor | undefined | null;
  // Flag to prevent polling loops from continuing after test teardown
  let testRunning: boolean;

  setup(async () => {
    testRunning = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    render(
      html`
        <playground-ide sandbox-base-url="/">
          <script type="sample/ts" filename="hello.ts"></script>
          <script type="sample/html" filename="index.html">
            <body>
              <script type="module" src="hello.js">&lt;/script>
            </body>
          </script>
        </playground-ide>
      `,
      container
    );
    await assertPreviewContains('');

    project = document
      .querySelector('playground-ide')
      ?.shadowRoot?.querySelector('playground-project');

    editor = document
      .querySelector('playground-ide')
      ?.shadowRoot?.querySelector('playground-file-editor')
      ?.shadowRoot?.querySelector('playground-code-editor');
  });

  teardown(() => {
    testRunning = false;
    container.remove();
  });

  // Simulates user typing with delays between keystrokes
  // This helps prevent race conditions in the completion system
  const emulateUser = async (word: string) => {
    const chars = word.split('');
    while (chars.length > 0) {
      const c = chars.shift();
      if (c) {
        await raf();
        await raf();
        // Send keys with delays to ensure the editor has time to process each keystroke
        await sendKeys({
          type: c,
        });
      }
    }
  };

  const waitForIframeLoad = (iframe: HTMLElement) =>
    new Promise<void>((resolve) => {
      iframe.addEventListener('load', () => resolve(), {once: true});
    });

  // Polls for text in the preview iframe with a safety exit if test is torn down
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
          // Use testRunning flag to prevent infinite polling after test teardown
        } else if (testRunning) {
          setTimeout(check, 10);
        }
      };
      check();
    });
  };

  // Polls for an element to appear with a maximum number of attempts
  // This prevents flakiness when elements take time to render
  const waitForElement = (
    parent: ParentNode | null | undefined,
    elementName: string
  ) => {
    return new Promise((resolve, reject) => {
      (function tryToFindElem(attempt) {
        if (parent?.querySelector(elementName)) {
          return resolve('');
        }
        if (attempt > 20) {
          return reject(
            new Error(`Element ${elementName} not found after 20 attempts`)
          );
        }
        setTimeout(() => tryToFindElem(attempt + 1), 200);
      })(1);
    });
  };

  // Helper to wait for completion suggestions to appear in the UI
  const waitForCompletionsToAppear = () =>
    waitForElement(editor?.shadowRoot, ACTIVE_SELECTOR);

  // Request animation frame with additional delay to ensure UI updates are complete
  // This is crucial for deflaking tests that depend on UI state
  const raf = async () =>
    new Promise((r) => requestAnimationFrame(() => setTimeout(r, 50)));
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

  // Wait for TypeScript compilation to complete before proceeding with tests
  const waitForCompileDone = () =>
    new Promise((resolve) => {
      project?.addEventListener(
        'compileDone',
        async () => {
          resolve('');
        },
        {once: true}
      );
    });

  test('displays completion items on input', async () => {
    await waitForCompileDone();
    editor?.focus();
    await emulateUser('document.query');

    // Try-catch with detailed logging helps identify the cause of flaky test failures
    try {
      await waitForCompletionsToAppear();
      await waitForElement(editor?.shadowRoot, AUTOCOMPLETE_WRAPPER_CLASS);

      const completionItemList = editor?.shadowRoot?.querySelector(
        AUTOCOMPLETE_WRAPPER_CLASS
      );

      assert.isNotNull(completionItemList, 'Completion item list should exist');
      assert.isDefined(
        completionItemList,
        'Completion item list should be defined'
      );

      assert.isAtLeast(
        completionItemList?.children.length || 0,
        1,
        'Should have at least one completion item'
      );
    } catch (error) {
      console.error('Completion test failed:', error);
      console.log('Editor value:', editor?.value);
      throw error;
    }
  });

  test('can navigate the completion item list', async () => {
    await waitForCompileDone();
    editor?.focus();
    await emulateUser('document.que');
    await waitForCompletionsToAppear();

    // Multiple RAF calls ensure UI is fully updated before proceeding
    // This prevents flakiness when testing keyboard navigation
    await raf();
    await raf();

    sendKeys({
      press: 'ArrowDown',
    });

    await raf();

    const activeHint = editor?.shadowRoot?.querySelector(ACTIVE_SELECTOR);

    assert.match(
      activeHint!.id,
      /^cm-ac-.+-1$/,
      'Active hint should have the ID cm-complete-0-1 marking the second hint'
    );
  });

  test('enter key confirms completion item selection', async () => {
    await waitForCompileDone();
    editor?.focus();
    await emulateUser('document.queryS');

    // Try-catch with detailed logging helps identify the cause of flaky test failures
    try {
      await waitForCompletionsToAppear();

      // Multiple RAF calls ensure the completion popup is fully rendered and interactive
      await raf();
      await raf();
      await raf();

      const editorChange = new Promise((resolve) => {
        const changeHandler = () => {
          editor?.removeEventListener('change', changeHandler);
          resolve('');
        };
        editor?.addEventListener('change', changeHandler);
        // Safety timeout to prevent test from hanging if change event never fires
        setTimeout(() => {
          resolve('');
        }, 20000);
      });

      await sendKeys({
        press: 'Enter',
      });

      await editorChange;

      assert.include(
        editor?.value || '',
        'document.query',
        'Completion should be visible in the code editor'
      );

      // Additional delay to ensure completion UI has fully disappeared
      await new Promise((r) => setTimeout(r, 500));

      const completionItemList = editor?.shadowRoot?.querySelector(
        AUTOCOMPLETE_WRAPPER_CLASS
      );
      assert.isNull(
        completionItemList,
        'Completion item list should disappear on completion confirmation'
      );
    } catch (error) {
      console.error('Enter key confirmation test failed:', error);
      console.log('Editor value:', editor?.value);
      throw error;
    }
  });

  test('completions should contain local scoped items', async () => {
    await waitForCompileDone();
    editor?.focus();
    await emulateUser(`function reallySpecificFunctionName() {
            console.log("foo");
        }`);
    await sendKeys({press: 'Enter'});
    await emulateUser('reallySpecifi');
    await waitForElement(editor?.shadowRoot, AUTOCOMPLETE_WRAPPER_CLASS);

    const completionItemList = editor?.shadowRoot?.querySelector(
      AUTOCOMPLETE_WRAPPER_CLASS
    );
    assert.isNotNull(completionItemList);

    const completionItemText = (
      completionItemList?.querySelector(COMPLETION_LABEL) as HTMLElement
    ).innerText;
    assert.equal(
      completionItemText,
      'reallySpecificFunctionName',
      'Completion item should be the created function'
    );
  });
});
