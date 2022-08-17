/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {PlaygroundInternalTab} from './tab.js';

/**
 * A horizontal bar of tabs.
 *
 * Slots:
 * - default: The <playground-internal-tab> tabs.
 */
@customElement('playground-internal-tab-bar')
export class PlaygroundInternalTabBar extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      overflow-x: auto;
    }

    :host::-webkit-scrollbar {
      display: none;
    }

    div {
      display: flex;
    }
  `;

  /**
   * Aria label of the tab list.
   */
  @property()
  label?: string;

  /**
   * Get or set the active tab.
   */
  get active(): PlaygroundInternalTab | undefined {
    return this._active;
  }

  set active(tab: PlaygroundInternalTab | undefined) {
    /**
     * Note the active tab can be set either by setting the bar's `active`
     * property to the tab, or by setting the tab's `active` property to
     * true. The two become synchronized according to the following flow:
     *
     *   bar click/keydown
     *           |
     *           v
     *   bar.active = tab ---> changed? ---> tab.active = true
     *           ^                                 |
     *           |                                 v
     *   bar tabchange listener        changed from false to true?
     *           ^                                 |
     *           |                                 |
     *           +--- tab dispatches tabchange <---+
     */
    const oldActive = this._active;
    if (tab === oldActive) {
      return;
    }
    this._active = tab;
    if (oldActive !== undefined) {
      oldActive.active = false;
    }
    if (tab !== undefined) {
      tab.active = true;
    } else {
      // Usually the tab itself emits the tabchange event, but we need to handle
      // the "no active tab" case here.
      this.dispatchEvent(
        new CustomEvent<{tab?: PlaygroundInternalTab}>('tabchange', {
          detail: {tab: undefined},
          bubbles: true,
        })
      );
    }
  }

  private _tabs: PlaygroundInternalTab[] = [];
  private _active: PlaygroundInternalTab | undefined = undefined;

  override render() {
    return html`
      <div role="tablist" aria-label=${ifDefined(this.label)}>
        <slot
          @slotchange=${this._onSlotchange}
          @click=${this._activateTab}
          @keydown=${this._onKeydown}
          @tabchange=${this._activateTab}
        ></slot>
      </div>
    `;
  }

  private _onSlotchange(event: Event) {
    this._tabs = (
      event.target as HTMLSlotElement
    ).assignedElements() as PlaygroundInternalTab[];
    let newActive;
    // Manage the idx and active properties on all tabs. The first tab that
    // asserts it is active wins.
    for (let i = 0; i < this._tabs.length; i++) {
      const tab = this._tabs[i];
      tab.index = i;
      if (newActive !== undefined) {
        tab.active = false;
      } else if (tab.active || tab.hasAttribute('active')) {
        // Check both the active property and the active attribute, because the
        // user could have set the initial active state either way, and it might
        // not have reflected to the other yet.
        newActive = tab;
      }
    }
    this.active = newActive;
  }

  private _activateTab(event: Event) {
    const tab = this._findEventTab(event);
    if (tab === undefined) {
      return;
    }
    this.active = tab;
    this._scrollTabIntoViewIfNeeded(tab);
  }

  /**
   * If the given tab is not visible, or if not enough of its adjacent tabs are
   * visible, scroll so that the tab is centered.
   */
  private _scrollTabIntoViewIfNeeded(tab: PlaygroundInternalTab) {
    // Note we don't want to use tab.scrollIntoView() because that would also
    // scroll the viewport to show the tab bar.
    const barRect = this.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    // Add a margin so that we'll also scroll if not enough of an adjacent tab
    // is visible, so that it's clickable. 48px is the recommended minimum touch
    // target size from the Material Accessibility guidelines
    // (https://material.io/design/usability/accessibility.html#layout-and-typography)
    const margin = 48;
    if (
      tabRect.left - margin < barRect.left ||
      tabRect.right + margin > barRect.right
    ) {
      const centered =
        tabRect.left -
        barRect.left +
        this.scrollLeft -
        barRect.width / 2 +
        tabRect.width / 2;
      this.scroll({left: centered, behavior: 'smooth'});
    }
  }

  private async _onKeydown(event: KeyboardEvent) {
    const oldIdx = this.active?.index ?? 0;
    const endIdx = this._tabs.length - 1;
    let newIdx = oldIdx;
    switch (event.key) {
      case 'ArrowLeft': {
        if (oldIdx === 0) {
          newIdx = endIdx; // Wrap around.
        } else {
          newIdx--;
        }
        break;
      }
      case 'ArrowRight': {
        if (oldIdx === endIdx) {
          newIdx = 0; // Wrap around.
        } else {
          newIdx++;
        }
        break;
      }
      case 'Home': {
        newIdx = 0;
        break;
      }
      case 'End': {
        newIdx = endIdx;
        break;
      }
    }
    if (newIdx !== oldIdx) {
      // Prevent default scrolling behavior.
      event.preventDefault();
      const tab = this._tabs[newIdx];
      this.active = tab;
      // Wait for tabindex to update so we can call focus.
      await tab.updateComplete;
      tab.focus();
    }
  }

  private _findEventTab(event: Event): PlaygroundInternalTab | undefined {
    const target = event.target as HTMLElement | undefined;
    if (target?.localName === 'playground-internal-tab') {
      return event.target as PlaygroundInternalTab;
    }
    for (const el of event.composedPath()) {
      if (
        (el as HTMLElement | undefined)?.localName === 'playground-internal-tab'
      ) {
        return el as PlaygroundInternalTab;
      }
    }
    return undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-internal-tab-bar': PlaygroundInternalTabBar;
  }
}
