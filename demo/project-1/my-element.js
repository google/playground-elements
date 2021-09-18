import {LitElement, html} from 'https://unpkg.com/lit?module';
import {customElement} from 'https://unpkg.com/lit/decorators.js?module';

class MyElement extends LitElement {
  static get properties() {
    return {
      myNumber: {
        type: Number,
      },
    };
  }

  render() {
    return html` <div>Here is ${this.myNumber}</div> `;
  }
}

customElements.define('my-element', MyElement);
