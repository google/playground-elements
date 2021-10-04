/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import type {ReactiveElement} from '@lit/reactive-element';

export const raf = async () => new Promise((r) => requestAnimationFrame(r));

export const pierce = async (...selectors: string[]) => {
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

export const waitForIframeLoad = (iframe: HTMLElement) =>
  new Promise<void>((resolve) => {
    iframe.addEventListener('load', () => resolve(), {once: true});
  });

export const waitUntilIframeContains = async (
  iframe: HTMLIFrameElement,
  text: string,
  signal: AbortSignal
) => {
  await waitForIframeLoad(iframe);
  // TODO(aomarks) Chromium and Webkit both fire iframe "load" after the
  // contentDocument has actually loaded, but Firefox fires it before. Why is
  // that? If not for that, we wouldn't need to poll here.
  await new Promise<void>((resolve) => {
    const check = () => {
      if (iframe.contentDocument?.body?.textContent?.includes(text)) {
        resolve();
      } else {
        setTimeout(check, 10, {signal});
      }
    };
    check();
  });
};
