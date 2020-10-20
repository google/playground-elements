import {LitElement, html, property, customElement} from 'lit-element';

@customElement('my-element')
export class MyElement extends LitElement {
  @property()
  greet = 'nobody';

  render() {
    return html`<p>Hello <b>${this.greet}</b>!</p>`;
  }
}
