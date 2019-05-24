import { LitElement, customElement, html, css } from 'lit-element';
import { CodeEditorTextarea } from './types';

@customElement('code-sample-editor-layout')
export class CodeSampleEditorLayout extends LitElement {
  static get styles() {
    return css`
      #root {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      #tabs, #editAreas {
        display: flex;
      }

      #editAreas {
        flex-grow: 1;
      }

      #tabs ::slotted([slot="tab"]) {
        padding: 0 6px 0 6px;
        border: solid black 1px;
      }

      #tabs ::slotted([slot="tab"][selected]) {
        background-color: black;
        color: white;
      }

      #tabs ::slotted([slot="tab"]:hover) {
        cursor: pointer;
      }

      #editAreas ::slotted([slot="editor"]) {
        width: 100%;
      }

      #editAreas ::slotted([slot="editor"]:not([selected])) {
        display: none;
      }
    `;
  }

  private onTabSlotChange(e: Event) {
    // console.log((e.target as HTMLSlotElement).assignedElements());
  }

  private onSubmit(e: Event) {
    this.dispatchEvent(new CustomEvent('save', {
      bubbles: true,
      composed: true,
    }));
  }

  private onTabClick(e: Event) {
    const eventPath = e.composedPath() as (EventTarget | HTMLElement)[];
    let slottedTarget: HTMLElement | null = null;
    for (let target of eventPath) {
      if (!('getAttribute' in target )) {
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

      const currentlySelectedTextarea = this.querySelector('[slot="editor"][selected]');
      if (currentlySelectedTextarea) {
        currentlySelectedTextarea.removeAttribute('selected');
      }

      slottedTarget.toggleAttribute('selected', true);
      const classNames = Array.from(slottedTarget.classList).filter(cl => cl.startsWith('link-'));
      if (classNames.length) {
        const className = classNames[0];
        const textarea = this.querySelector(`.${className}[slot="editor"]`);

        if (textarea) {
          textarea.toggleAttribute('selected', true);
        }
      }
    }
  }

  render() {
    return html`
      <div id="root">
        <div id="tabs" @click=${this.onTabClick}>
          <slot @slotchange=${this.onTabSlotChange} name="tab"></slot>
          <button>Add File</button>
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