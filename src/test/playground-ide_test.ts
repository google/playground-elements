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
import '../lib/playground-ide.js';
import {PlaygroundIde} from '../lib/playground-ide.js';
import {html, render} from 'lit-html';
import {UpdatingElement} from 'lit-element';
import {PlaygroundCodeMirror} from '../lib/playground-codemirror.js';
import {PlaygroundProject} from '../lib/playground-project.js';

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
        <playground-ide>
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
        <playground-ide>
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
        <playground-ide>
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
    await assertPreviewContains('Hello HTML 1');

    const codemirror = (await pierce(
      'playground-ide',
      'playground-editor',
      'playground-codemirror'
    )) as PlaygroundCodeMirror;
    const codemirrorInternals = (codemirror as unknown) as {
      _codemirror: PlaygroundCodeMirror['_codemirror'];
    };
    codemirrorInternals._codemirror!.setValue('Hello HTML 2');
    const project = (await pierce(
      'playground-ide',
      'playground-project'
    )) as PlaygroundProject;
    await project.save();
    await assertPreviewContains('Hello HTML 2');
  });
});
