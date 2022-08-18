/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {html, css, PropertyValues, nothing} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';

import '@material/mwc-icon-button';

import './internal/tab-bar.js';
import './internal/tab.js';
import './playground-file-system-controls.js';

import {PlaygroundConnectedElement} from './playground-connected-element.js';

import {PlaygroundFileEditor} from './playground-file-editor.js';
import {PlaygroundFileSystemControls} from './playground-file-system-controls.js';
import {FilesChangedEvent, PlaygroundProject} from './playground-project.js';
import {PlaygroundInternalTab} from './internal/tab.js';

/**
 * A horizontal bar of tabs for switching between playground files, with
 * optional controls for create/delete/rename.
 */
@customElement('playground-tab-bar')
export class PlaygroundTabBar extends PlaygroundConnectedElement {
  static override styles = css`
    :host {
      display: flex;
      font-size: var(--playground-tab-bar-font-size, 14px);
      height: var(--playground-bar-height, 40px);
      background: var(--playground-tab-bar-background, #eaeaea);
      align-items: center;
    }

    playground-internal-tab-bar {
      height: var(--playground-bar-height, 40px);
    }

    playground-internal-tab::part(button) {
      box-sizing: border-box;
      padding: 2px 24px 0 24px;
    }

    playground-internal-tab {
      color: var(--playground-tab-bar-foreground-color, #000);
    }

    playground-internal-tab[active] {
      color: var(
        --playground-tab-bar-active-color,
        var(--playground-highlight-color, #6200ee)
      );
      background: var(--playground-tab-bar-active-background, transparent);
    }

    :host([editable-file-system]) playground-internal-tab::part(button) {
      /* The 24px menu button with opacity 0 now serves as padding-right. */
      padding-right: 0;
    }

    .menu-button {
      visibility: hidden;
      --mdc-icon-button-size: 24px;
      --mdc-icon-size: 16px;
    }

    playground-internal-tab:hover > .menu-button,
    playground-internal-tab:focus-within > .menu-button {
      visibility: visible;
    }

    mwc-icon-button {
      color: var(--playground-tab-bar-foreground-color);
    }

    .add-file-button {
      margin: 0 4px;
      opacity: 70%;
      --mdc-icon-button-size: 24px;
      --mdc-icon-size: 24px;
    }

    .add-file-button:hover {
      opacity: 1;
    }
  `;

  /**
   * Allow the user to add, remove, and rename files in the project's virtual
   * filesystem. Disabled by default.
   */
  @property({type: Boolean, attribute: 'editable-file-system', reflect: true})
  editableFileSystem = false;

  @state()
  private _activeFileName = '';

  @state()
  private _activeFileIndex = 0;

  @query('playground-file-system-controls')
  private _fileSystemControls?: PlaygroundFileSystemControls;

  /**
   * The actual `<playground-file-editor>` node, determined by the `editor`
   * property.
   */
  @state()
  private _editor?: PlaygroundFileEditor;

  /**
   * The editor that this tab bar controls. Either the
   * `<playground-file-editor>` node itself, or its `id` in the host scope.
   */
  @property()
  set editor(elementOrId: PlaygroundFileEditor | string) {
    if (typeof elementOrId === 'string') {
      // Defer querying the host to a rAF because if the host renders this
      // element before the one we're querying for, it might not quite exist
      // yet.
      requestAnimationFrame(() => {
        const root = this.getRootNode() as ShadowRoot | Document;
        this._editor =
          (root.getElementById(elementOrId) as PlaygroundFileEditor | null) ??
          undefined;
      });
    } else {
      this._editor = elementOrId;
    }
  }

  private get _visibleFiles() {
    return (this._project?.files ?? []).filter(({hidden}) => !hidden);
  }

  override update(changedProperties: PropertyValues) {
    if (changedProperties.has('_project')) {
      const oldProject = changedProperties.get('_project') as PlaygroundProject;
      if (oldProject) {
        oldProject.removeEventListener(
          'filesChanged',
          this._onProjectFilesChanged
        );
      }
      if (this._project) {
        this._handleFilesChanged(true);
        this._project.addEventListener(
          'filesChanged',
          this._onProjectFilesChanged
        );
      }
    }
    if (changedProperties.has('_activeFileName') && this._editor) {
      this._editor.filename = this._activeFileName;
      this._setNewActiveFile();
    }
    super.update(changedProperties);
  }

  override render() {
    return html`
      <playground-internal-tab-bar
        @tabchange=${this._onTabchange}
        label="File selector"
      >
        ${this._visibleFiles.map(
          ({name, label}) =>
            html`<playground-internal-tab
              .active=${name === this._activeFileName}
              data-filename=${name}
            >
              ${label || name}
              ${this.editableFileSystem
                ? html`<mwc-icon-button
                    aria-label="File menu"
                    class="menu-button"
                    @click=${this._onOpenMenu}
                  >
                    <!-- Source: https://material.io/resources/icons/?icon=menu&style=baseline -->
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentcolor"
                    >
                      <path
                        d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                      />
                    </svg>
                  </mwc-icon-button>`
                : nothing}
            </playground-internal-tab>`
        )}
      </playground-internal-tab-bar>

      ${this.editableFileSystem
        ? html`
            <mwc-icon-button
              class="add-file-button"
              aria-label="New file"
              @click=${this._onClickAddFile}
            >
              <!-- Source: https://material.io/resources/icons/?icon=add&style=baseline -->
              <svg
                fill="currentcolor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                shape-rendering="crispEdges"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </mwc-icon-button>

            <playground-file-system-controls
              .project=${this._project}
              @newFile=${this._onNewFile}
            >
            </playground-file-system-controls>
          `
        : nothing}
    `;
  }

  private _onProjectFilesChanged = (event: FilesChangedEvent) => {
    this._handleFilesChanged(event.projectLoaded);
  };

  private _handleFilesChanged(newProjectLoaded = false) {
    if (newProjectLoaded) {
      const fileToSelect = this._visibleFiles.find(
        (file) => file.selected
      )?.name;
      if (fileToSelect !== undefined) {
        this._activeFileName = fileToSelect;
      }
    }
    this._setNewActiveFile();
    this.requestUpdate();
  }

  private _onTabchange(
    event: CustomEvent<{
      tab?: PlaygroundInternalTab;
      previous?: PlaygroundInternalTab;
    }>
  ) {
    const tab = event.detail.tab;
    if (!tab) {
      return;
    }
    const name = tab.dataset['filename']!;
    const index = tab.index!;
    if (name !== this._activeFileName) {
      this._activeFileName = name;
      this._activeFileIndex = index;
    }
  }

  private _onOpenMenu(
    event: CustomEvent<{index: number; anchor: HTMLElement}>
  ) {
    const controls = this._fileSystemControls;
    if (!controls) {
      return;
    }
    controls.state = 'menu';
    // Figure out which file the open menu should be associated with. It's not
    // necessarily the active tab, since you can click on the menu button for a
    // tab without activating that tab.
    //
    // We're looking for a "data-filename" attribute in the event path, which
    // should be on the <playground-internal-tab>.
    //
    // Note that we can't be sure what the target of the click event will be.
    // Between MWC v0.25.1 and v0.25.2, when clicking on an <mwc-icon-button>,
    // the target changed from the <mwc-icon-button> to its internal <svg>.
    for (const el of event.composedPath()) {
      if (el instanceof HTMLElement && el.dataset['filename']) {
        controls.filename = el.dataset['filename'];
        break;
      }
    }
    controls.anchorElement = event.target as HTMLElement;
    event.stopPropagation();
  }

  private _onClickAddFile(event: Event) {
    const controls = this._fileSystemControls;
    if (!controls) {
      return;
    }
    controls.state = 'newfile';
    controls.anchorElement = event.target as HTMLElement;
  }

  private _onNewFile(event: CustomEvent<{filename: string}>) {
    this._activeFileName = event.detail.filename;
    // TODO(aomarks) We should focus the editor here. However,
    // CodeMirror.focus() isn't working for some reason.
  }

  /**
   * Whenever a file is created, deleted, or renamed, figure out what the best
   * new active tab should be.
   */
  private _setNewActiveFile() {
    // Stay on the same filename if it's still around, even though its index
    // might have changed.
    if (this._activeFileName) {
      const index = this._visibleFiles.findIndex(
        (file) => file.name === this._activeFileName
      );
      if (index >= 0) {
        this._activeFileIndex = index;
        return;
      }
    }

    // Stay on the same index, or the nearest one to the left of where we were
    // before.
    for (let i = this._activeFileIndex; i >= 0; i--) {
      const file = this._visibleFiles[i];
      if (file && !file.hidden) {
        this._activeFileName = file.name;
        return;
      }
    }

    // No visible file to display.
    this._activeFileIndex = 0;
    this._activeFileName = '';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playground-tab-bar': PlaygroundTabBar;
  }
}
