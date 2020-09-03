import { LitElement, html, customElement } from 'lit-element';

@customElement('my-second-element')
export class MySecondElement extends LitElement {
  render() {
    return html`
      <div>This is inside the shadow dom of my-second-element</div>
    `;
  }
}
