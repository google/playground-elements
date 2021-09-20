import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './my-second-element.js';

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: Number })
  myNumber?: number;

  render() {
    return html`
      <div>Here is ${this.myNumber}</div>
      <div>And here is my second element:</div>
      <my-second-element></my-second-element>
    `;
  }
}
