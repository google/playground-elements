import { LitElement, customElement, html, css } from 'lit-element';

@customElement('lit-code-editor-area')
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
  render() {
    return html`
      <div id="tabs">
        <slot @slotchange=${this.onTabSlotChange} name="tab"></slot>
        <button>Add File</button>
      </div>
      <div id="editAreas">
        <slot name="editor"></slot>
      </div>
    `;
  }
}