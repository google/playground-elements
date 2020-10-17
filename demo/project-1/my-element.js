import {LitElement, html} from 'https://unpkg.com/lit-element?module';

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
