/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {assert} from '@esm-bundle/chai';
import '../lib/code-sample.js';
import {CodeSampleElement} from '../lib/code-sample.js';
import {html, render} from 'lit-html';
import {UpdatingElement} from 'lit-element';
import {CodeMirrorEditorElement} from '../lib/codemirror-editor.js';
import {CodeSampleProjectElement} from '../lib/code-sample-project.js';

suite('code-sample', () => {
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
    assert.instanceOf(document.createElement('code-sample'), CodeSampleElement);
  });

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
      'code-sample',
      'code-sample-preview',
      'iframe'
    )) as HTMLIFrameElement;
    await new Promise((resolve) => {
      const listener = () => {
        iframe.removeEventListener('load', listener);
        resolve();
      };
      iframe.addEventListener('load', listener);
    });
    // TODO(aomarks) Chromium and Webkit both fire iframe "load" after the
    // contentDocument has actually loaded, but Firefox fires it before. Why is
    // that? If not for that, we wouldn't need to poll here.
    await new Promise((resolve) => {
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
        <code-sample>
          <script type="sample/html" filename="index.html">
            <p>Hello HTML</p>
            <script>console.log('hello');&lt;/script>
          </script>
        </code-sample>
      `,
      container
    );
    await assertPreviewContains('Hello HTML');
  });

  test('renders JS', async () => {
    render(
      html`
        <code-sample>
          <script type="sample/html" filename="index.html">
            <body>
              <script src="hello.js">&lt;/script>
            </body>
          </script>
          <script type="sample/js" filename="hello.js">
            document.body.textContent = 'Hello JS';
          </script>
        </code-sample>
      `,
      container
    );
    await assertPreviewContains('Hello JS');
  });

  test('renders TS', async () => {
    render(
      html`
        <code-sample>
          <script type="sample/html" filename="index.html">
            <body>
              <script src="hello.js">&lt;/script>
            </body>
          </script>
          <script type="sample/ts" filename="hello.ts">
            const hello: string = "Hello TS";
            document.body.textContent = hello;
          </script>
        </code-sample>
      `,
      container
    );
    await assertPreviewContains('Hello TS');
  });

  test('re-renders HTML', async () => {
    render(
      html`
        <code-sample>
          <script type="sample/html" filename="index.html">
            <body>
              <p>Hello HTML 1</p>
            </body>
          </script>
        </code-sample>
      `,
      container
    );
    await assertPreviewContains('Hello HTML 1');

    const codemirror = (await pierce(
      'code-sample',
      'code-sample-editor',
      'codemirror-editor'
    )) as CodeMirrorEditorElement;
    const codemirrorInternals = (codemirror as unknown) as {
      _codemirror: CodeMirrorEditorElement['_codemirror'];
    };
    codemirrorInternals._codemirror!.setValue('Hello HTML 2');
    const project = (await pierce(
      'code-sample',
      'code-sample-project'
    )) as CodeSampleProjectElement;
    await project.save();
    await assertPreviewContains('Hello HTML 2');
  });
});
