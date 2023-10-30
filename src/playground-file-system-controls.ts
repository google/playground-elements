/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css, PropertyValues, nothing} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

// Note despite usual best practices, we should _not_ import
// @material/mwc-list-item directly, because @material/mwc-list already imports
// it, and this causes a duplicate registration error on unpkg.com because of
// redirects.
// import '@material/mwc-list';
// import '@material/web/list/list.js';

import '@material/web/menu/menu-item.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/menu/menu.js';

import {Menu, CloseMenuEvent} from '@material/web/menu/menu.js';

import {MdFilledTextField} from '@material/web/textfield/filled-text-field.js';
// import {MdList} from '@material/web/list/list.js';

// import {List} from '@material/mwc-list';

import type {MdOutlinedButton} from '@material/web/button/outlined-button.js';

import {PlaygroundConnectedElement} from './playground-connected-element.js';

/**
 * Floating controls for creating, deleting, and renaming files in playground
 * virtual file system.
 */
@customElement('playground-file-system-controls')
export class PlaygroundFileSystemControls extends PlaygroundConnectedElement {
  static override styles = css`
    :host {
      position: relative;
      --md-outlined-button-container-shape-start-start: 4px;
      --md-outlined-button-container-shape-start-end: 4px;
      --md-outlined-button-container-shape-end-start: 4px;
      --md-outlined-button-container-shape-end-end: 4px;
      --md-filled-button-container-shape-start-start: 4px;
      --md-filled-button-container-shape-start-end: 4px;
      --md-filled-button-container-shape-end-start: 4px;
      --md-filled-button-container-shape-end-end: 4px;

      --md-menu-item-top-space: 4px;
      --md-menu-item-bottom-space: 4px;
      --md-menu-item-one-line-container-height: 40px;
    }

    md-menu {
      --md-menu-container-color: white;
      --mdc-theme-primary: var(
        --playground-floating-controls-color,
        var(--playground-highlight-color, #6200ee)
      );
    }

    md-menu.menu {
      --mdc-typography-subtitle1-font-size: 13px;
      --mdc-list-item-graphic-margin: 14px;
    }

    md-list-item {
      min-width: 100px;
    }

    md-menu.rename > .wrapper,
    md-menu.newfile > .wrapper {
      padding: 18px;
    }

    .actions {
      margin-top: 18px;
      display: flex;
      justify-content: flex-end;
    }

    .actions > * {
      margin-left: 12px;
    }
  `;

  /**
   * The element that these controls will be positioned adjacent to.
   */
  @property({attribute: false})
  anchorElement?: HTMLElement;

  /**
   * The kind of control to display:
   *
   * -  closed: Hidden.
   * -    menu: Menu with "Rename" and "Delete" items.
   * -  rename: Control for renaming an existing file.
   * - newfile: Control for creating a new file.
   */
  @property()
  state: 'closed' | 'menu' | 'rename' | 'newfile' = 'closed';

  /**
   * When state is "menu" or "newfile", the name of the relevant file.
   */
  @property()
  filename?: string;

  @query('md-menu')
  private _surface!: Menu;

  // @query('.menu-list')
  // private _menuList?: MdList;

  @query('.filename-input')
  private _filenameInput?: MdFilledTextField;

  @query('.submit-button')
  private _submitButton?: MdOutlinedButton;

  private _postStateChangeRenderDone = false;

  override update(changedProperties: PropertyValues) {
    if (changedProperties.has('state')) {
      this._postStateChangeRenderDone = false;
    }
    super.update(changedProperties);
  }

  override render() {
    return html`<md-menu
      quick
      positioning="fixed"
      .open=${this.state !== 'closed'}
      .anchorElement=${this.anchorElement ?? null}
      anchor-corner="end-start"
      class="${this.state}"
      @closed=${this._onSurfaceClosed}
      @close-menu=${this._onMenuAction}
    >
      ${this._renderMenuContents()}
    </md-menu>`;
  }

  override async updated() {
    if (this._postStateChangeRenderDone) {
      return;
    }
    if (this.state === 'menu') {
      // Focus the first item so that keyboard controls work.
      // const menuList = this._menuList;
      // if (menuList) {
      //   await menuList.updateComplete;
      //   menuList.focusItemAtIndex(0);
      // }
    } else if (this.state === 'rename' || this.state === 'newfile') {
      // Focus the filename input.
      const input = this._filenameInput;
      if (input) {
        await input.updateComplete;
        input.focus();
        if (this.state === 'rename') {
          // Pre-select just the basename (e.g. "foo" in "foo.html"), since
          // users typically don't want to edit the extension.
          input.setSelectionRange(0, input.value.lastIndexOf('.'));
        }
      }
    }
    this._postStateChangeRenderDone = true;
  }

  private _renderMenuContents() {
    console.log('_renderMenuContents', this.state);
    switch (this.state) {
      case 'closed':
        return nothing;
      case 'menu':
        return this._renderMenuItems();
      case 'rename':
        return this._renderRenameDialog();
      case 'newfile':
        return this._renderNewFileDialog();
    }
  }

  private _renderMenuItems() {
    return html`
      <md-menu-item id="renameButton">
        Rename
        <svg
          slot="start"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="currentcolor"
        >
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          />
        </svg>
      </md-menu-item>
      <md-menu-item id="deleteButton">
        Delete
        <svg
          slot="start"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentcolor"
        >
          <path
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          />
        </svg>
      </md-menu-item>
    `;
  }

  private _renderRenameDialog() {
    return html`
      <div class="wrapper">
        <md-filled-text-field
          class="filename-input"
          label="Filename"
          .value=${this.filename || ''}
          @input=${this._onFilenameInputChange}
          @keydown=${this._onFilenameInputKeydown}
        ></md-filled-text-field>
        <div class="actions">
          <md-outlined-button @click=${this._onClickCancel}
            >Cancel</md-outlined-button
          >
          <md-filled-button
            class="submit-button"
            .disabled=${!this._filenameInputValid}
            @click=${this._onSubmitRename}
            >Rename</md-filled-button
          >
        </div>
      </div>
    `;
  }

  private _renderNewFileDialog() {
    return html`
      <div class="wrapper">
        <md-filled-text-field
          class="filename-input"
          label="Filename"
          @input=${this._onFilenameInputChange}
          @keydown=${this._onFilenameInputKeydown}
        ></md-filled-text-field>
        <div class="actions">
          <md-outlined-button @click=${this._onClickCancel}
            >Cancel</md-outlined-button
          >
          <md-filled-button
            class="submit-button"
            .disabled=${!this._filenameInputValid}
            @click=${this._onSubmitNewFile}
            >Create</md-filled-button
          >
        </div>
      </div>
    `;
  }

  private _onSurfaceClosed() {
    if (!this._handlingMenuAction) {
      this.state = 'closed';
    } else {
      this._surface.open = true;
    }
  }

  private _onClickCancel() {
    this._surface.close();
  }

  private _handlingMenuAction = false;

  private _onMenuAction(event: CloseMenuEvent) {
    console.log('_onMenuAction', event);
    this._handlingMenuAction = true;
    switch (event.detail.itemPath[0].id) {
      case 'renameButton':
        return this._onMenuSelectRename();
      case 'deleteButton':
        return this._onMenuSelectDelete();
    }
    setTimeout(() => {
      this._handlingMenuAction = false;
    }, 0);
  }

  private _onMenuSelectRename() {
    this.state = 'rename';
  }

  private _onMenuSelectDelete() {
    this._surface.close();
    if (this._project && this.filename) {
      this._project.deleteFile(this.filename);
    }
  }

  private _onFilenameInputChange() {
    // Force re-evaluation of the _filenameInputValid getter (instead of managing
    // an internal property).
    this.requestUpdate();
  }

  private get _filenameInputValid(): boolean {
    return !!(
      this._project &&
      this._filenameInput &&
      this._project.isValidNewFilename(this._filenameInput.value)
    );
  }

  private _onFilenameInputKeydown(event: KeyboardEvent) {
    // Slightly hacky... rather than needing to know which action to perform in
    // each context, we just click whatever submit button we're rendering.
    if (event.key === 'Enter' && this._submitButton?.disabled === false) {
      event.preventDefault();
      this._submitButton.click();
    }
  }

  private _onSubmitRename() {
    this._surface.close();
    const oldFilename = this.filename;
    const newFilename = this._filenameInput?.value;
    if (this._project && oldFilename && newFilename) {
      this._project.renameFile(oldFilename, newFilename);
    }
  }

  private _onSubmitNewFile() {
    this._surface.close();
    const filename = this._filenameInput?.value;
    if (this._project && filename) {
      this._project.addFile(filename);
      this.dispatchEvent(
        new CustomEvent<{filename: string}>('newFile', {
          detail: {filename},
        })
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-file-system-controls': PlaygroundFileSystemControls;
  }
}
