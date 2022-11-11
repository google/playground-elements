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

suite('completions', () => {
  let container: HTMLDivElement;
  let project: PlaygroundProject | undefined | null;
  let editor: PlaygroundCodeEditor | undefined | null;
  let testRunning: boolean;

  setup(async () => {
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
    container.remove();
  });

  const emulateUser = async (word: string) => {
    const chars = word.split('');
    while (chars.length > 0) {
      const c = chars.shift();
      if (c) {
        await raf();
        await raf();
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

  const waitForElement = (
    parent: ParentNode | null | undefined,
    elementName: string
  ) => {
    return new Promise((resolve, reject) => {
      (function tryToFindElem(attempt) {
        if (parent?.querySelector(elementName)) {
          return resolve('');
        }
        if (attempt > 10) {
          return reject();
        }
        setTimeout(() => tryToFindElem(attempt + 1), 100);
      })(1);
    });
  };

  const waitForCompletionsToAppear = () =>
    new Promise((resolve, reject) => {
      // Make sure we can grab the focuscontainer for observing
      if (!editor || !editor.shadowRoot) return reject();
      const focusContainer = editor.shadowRoot.querySelector('#focusContainer');
      if (!focusContainer) return reject();

      const config = {childList: true};
      // To avoid computer/dom specific timing errors in tests, we rely on
      // mutations
      const observer = new MutationObserver(async (mutationsList, obs) => {
        if (addedNodesContainsCompletionsMenu(mutationsList)) {
          obs.disconnect();
          resolve('');
        }
      });

      if (focusContainer) {
        observer.observe(focusContainer, config);
      }

      setTimeout(() => {
        observer.disconnect();
        resolve('');
      }, 10000);
    });
  const addedNodesContainsCompletionsMenu = (mutationsList: MutationRecord[]) =>
    mutationsList.some((mut) =>
      Array.from(mut.addedNodes).some((node) =>
        (node as Element).classList.contains('CodeMirror-hints')
      )
    );
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
    await waitForCompletionsToAppear();
    await waitForElement(editor?.shadowRoot, '.CodeMirror-hints');

    const completionItemList =
      editor?.shadowRoot?.querySelector('.CodeMirror-hints');

    if (completionItemList?.children.length !== 7) {
      // For debugging purposes, it's easier to debug if we know the invalid
      // completions
      console.log('Invalid completions: ');
      for (const listItem of completionItemList?.children || []) {
        console.log(
          listItem?.querySelector<HTMLElement>('.hint-object-name')?.innerText
        );
      }
    }
    assert.isNotNull(completionItemList);
    assert.isDefined(completionItemList);
    assert.equal(
      completionItemList?.children.length,
      7,
      'Completion item list length'
    );
  });

  test('can navigate the completion item list', async () => {
    await waitForCompileDone();
    editor?.focus();
    await emulateUser('document.que');
    await waitForCompletionsToAppear();

    sendKeys({
      press: 'ArrowDown',
    });
    await waitForElement(
      editor?.shadowRoot,
      '.CodeMirror-hint-active#cm-complete-0-1'
    );

    const activeHint = editor?.shadowRoot?.querySelector(
      '.CodeMirror-hint-active'
    );

    assert.equal(
      activeHint?.id,
      'cm-complete-0-1',
      'Active hint should have the ID cm-complete-0-1 marking the second hint'
    );
  });

  test('enter key confirms completion item selection', async () => {
    await waitForCompileDone();
    editor?.focus();
    await emulateUser('document.queryS');
    await waitForCompletionsToAppear();

    const editorChange = new Promise((resolve) => {
      editor?.addEventListener('change', () => {
        resolve('');
      });
      setTimeout(() => {
        resolve('');
      }, 10000);
    });
    sendKeys({
      press: 'Enter',
    });

    await editorChange;

    assert.equal(
      editor?.value,
      'document.querySelector',
      'Completion should be visible in the code editor'
    );

    const completionItemList =
      editor?.shadowRoot?.querySelector('.CodeMirror-hints');
    assert.isNull(
      completionItemList,
      'Completion item list should disappear on completion confirmation'
    );
  });

  test('completions should contain local scoped items', async () => {
    await waitForCompileDone();
    editor?.focus();
    await emulateUser(`function reallySpecificFunctionName() {
            console.log("foo");
        }`);
    await sendKeys({press: 'Enter'});
    await emulateUser('reallySpecifi');

    const completionItemList =
      editor?.shadowRoot?.querySelector('.CodeMirror-hints');
    assert.isNotNull(completionItemList);

    const completionItemText = (
      completionItemList?.querySelector('.hint-object-name') as HTMLElement
    ).innerText;
    assert.equal(
      completionItemText,
      'reallySpecificFunctionName',
      'Completion item should be the created function'
    );
  });
});
