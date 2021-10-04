/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

/**
 * An absolutely positioned scrim with a floating message.
 */
@customElement('playground-internal-overlay')
export class PlaygroundInternalOverlay extends LitElement {
  static override styles = css`
    :host {
      position: absolute;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      z-index: 9;
      background: rgba(0, 0, 0, 0.32);
      overflow-y: auto;
    }

    #message {
      background: #fff;
      color: #000;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.3) 0 2px 10px;
    }
  `;

  override render() {
    return html`<div id="message"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-internal-overlay': PlaygroundInternalOverlay;
  }
}
