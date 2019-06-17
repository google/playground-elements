import {
  LitElement,
  customElement,
  html,
  css,
  property,
  query
} from 'lit-element';
import { TemplateResult } from 'lit-html';

@customElement('code-sample-editor-layout')
export class CodeSampleEditorLayout extends LitElement {
  static get styles() {
    return css`
      #root {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      #tabs,
      #editAreas {
        display: flex;
      }

      #editAreas {
        flex-grow: 1;
      }

      #tabs ::slotted([slot='tab']) {
        padding: 0 6px 0 6px;
        border: solid black 1px;
      }

      #tabs ::slotted([slot='tab'][selected]) {
        background-color: black;
        color: white;
      }

      #tabs ::slotted([slot='tab']:hover) {
        cursor: pointer;
      }

      #editAreas ::slotted([slot='editor']) {
        width: 100%;
      }

      #editAreas ::slotted([slot='editor']:not([selected])) {
        display: none;
      }
    `;
  }

  @property({ type: Boolean })
  addFilePrompt = false;

  @query('#filenameInput')
  filenameInput?: HTMLInputElement;

  private onSubmit(e: Event) {
    this.dispatchEvent(
      new CustomEvent('save', {
        bubbles: true,
        composed: true
      })
    );
  }

  private onCreateFileClick(e: Event) {
    this.dispatchEvent(
      new CustomEvent('create-file', {
        bubbles: true,
        composed: true,
        detail: this.filenameInput!.value
      })
    );

    this.addFilePrompt = false;
  }

  private onAddFileClick(e: Event) {
    this.addFilePrompt = true;
  }

  private onTabClick(e: Event) {
    const eventPath = e.composedPath() as (EventTarget | HTMLElement)[];
    let slottedTarget: HTMLElement | null = null;
    for (let target of eventPath) {
      if (!('getAttribute' in target)) {
        continue;
      }

      const slot = target.getAttribute('slot');
      if (slot === 'tab') {
        slottedTarget = target;
        break;
      }
    }

    if (slottedTarget) {
      const currentlySelectedTab = this.querySelector('[slot="tab"][selected]');
      if (currentlySelectedTab) {
        currentlySelectedTab.removeAttribute('selected');
      }

      const currentlySelectedTextarea = this.querySelector(
        '[slot="editor"][selected]'
      );
      if (currentlySelectedTextarea) {
        currentlySelectedTextarea.removeAttribute('selected');
      }

      slottedTarget.toggleAttribute('selected', true);
      const classNames = Array.from(slottedTarget.classList).filter(cl =>
        cl.startsWith('link-')
      );
      if (classNames.length) {
        const className = classNames[0];
        const textarea = this.querySelector(`.${className}[slot="editor"]`);

        if (textarea) {
          textarea.toggleAttribute('selected', true);
        }
      }
    }
  }

  renderAddFile(): TemplateResult {
    if (this.addFilePrompt) {
      return html`
        <input
          id="filenameInput"
          placeholder="file name e.g. my-element-3.js"
        />
        <button @click=${this.onCreateFileClick}>Create File</button>
      `;
    } else {
      return html`
        <button @click=${this.onAddFileClick}>Add File</button>
      `;
    }
  }

  render() {
    return html`
      <div id="root">
        <div id="tabs" @click=${this.onTabClick}>
          <slot name="tab"></slot>
          ${this.renderAddFile()}
        </div>
        <div id="editAreas">
          <slot name="editor"></slot>
        </div>
        <div>
          <button @click=${this.onSubmit}>Save</button>
        </div>
      </div>
    `;
  }
}
