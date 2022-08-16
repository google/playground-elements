import {LitElement, html} from 'lit';
import {property, customElement} from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  @property()
  greet = 'nobody';

  override render() {
    return html`<p>Hello <b>${this.greet}</b>!</p>`;
  }
}
