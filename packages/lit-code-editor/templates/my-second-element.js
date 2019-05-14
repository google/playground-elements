import {LitElement, html} from "https://unpkg.com/lit-element?module";

class MySecondElement extends LitElement {
  render () {
    return html`
      <div>This is inside the shadow dom of my-second-element</div>
    `;
  }
}

customElements.define('my-second-element', MySecondElement);