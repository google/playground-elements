/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {html, render} from 'lit';
import '../playground-ide.js';
import {executeServerCommand} from '@web/test-runner-commands';

import type {ReactiveElement} from '@lit/reactive-element';
import type {PlaygroundCodeEditor} from '../playground-code-editor.js';
import type {PlaygroundProject} from '../playground-project.js';
import type {PlaygroundPreview} from '../playground-preview.js';

suite('playground-ide iframe', () => {
  let container: HTMLDivElement;

  setup(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  teardown(() => {
    container.remove();
  });

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

  test('reloading preview does not modify history', async () => {
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
  });

  test('reloading preview does not create a new iframe element', async () => {
    render(
      html`
        <playground-ide>
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

    await project.save();
    await preview.updateComplete;

    const newIframe = (await pierce(
      'playground-ide',
      'playground-preview',
      'iframe'
    )) as HTMLIFrameElement;

    assert.equal(newIframe, iframe);
  });
});
