import {LitElement, html} from "https://unpkg.com/lit-element?module";
import "./my-second-element.js"

class MyElement extends LitElement {
  static get properties() {
    return {
      myNumber: {
        type: Number
      }
    }
  }

  render () {
    return html`
      <div>Here is ${this.myNumber}</div>
      <div>And here is my second element:</div>
      <my-second-element></my-second-element>
    `;
  }
}

customElements.define('my-element', MyElement);