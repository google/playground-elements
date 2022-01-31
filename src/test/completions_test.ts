/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {html, ReactiveElement, render} from 'lit';
import '../playground-ide.js';
import '../playground-code-editor.js';
import {sendKeys} from '@web/test-runner-commands';
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
              <script src="hello.js">&lt;/script>
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
        sendKeys({
          type: c,
        });
        await raf();
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
  const raf = async () => new Promise((r) => requestAnimationFrame(r));
  const waitMilli = (ms: number) => new Promise((r) => setTimeout(r, ms));
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
          await waitMilli(500);
          resolve('');
        },
        {once: true}
      );
    });

  test('displays completion items on input', async () => {
    await waitForCompileDone();
    editor?.focus();
    await emulateUser('document.query');

    const completionItemList =
      editor?.shadowRoot?.querySelector('.CodeMirror-hints');
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

    sendKeys({
      press: 'ArrowDown',
    });
    await waitMilli(100);

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

    sendKeys({
      press: 'Enter',
    });
    await waitMilli(100);

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
