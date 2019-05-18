import { LitElement, customElement, html, css } from 'lit-element';

@customElement('code-sample-editor-layout')
class LitCodeEditorArea extends LitElement {
  static get styles() {
    return css`
      #tabs, #editAreas {
        display: flex;
      }

      #tabs ::slotted(span) {
        padding: 0 6px 0 6px;
        border: solid black 1px;
      }
    `;
  }

  private onTabSlotChange(e: Event) {
    console.log((e.target as HTMLSlotElement).assignedElements());
  }

  private onSubmit(e: Event) {
    this.dispatchEvent(new CustomEvent('save', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div id="tabs">
        <slot @slotchange=${this.onTabSlotChange} name="tab"></slot>
        <button>Add File</button>
      </div>
      <div id="editAreas">
        <slot name="editor"></slot>
      </div>
      <button @click=${this.onSubmit}>Save</button>
    `;
  }
}