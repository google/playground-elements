# lit-code-editor
Element to insert for code editor

## Getting Started
### development
```sh
# in lit-code-editor-package root directory
npm install
npm run bootstrap
npm run build
cd packages/lit-code-editor
npm run dev
```

If the `lit-code-editor-server` is running, then open your browser to
`http://localhost:8081`

### usage
install package
```sh
npm install @polymer/lit-code-editor
```
use element in HTML:
```html
<html>
  <head>
    <!-- or wherever your definition is for this element -->
    <script type="module" src="node_modules/@polymer/lit-code-editor/src/lit-code-editor.js"></script>
  </head>
  <body>
    <!-- or any other url to your running lit-code-editor-server instance -->
    <lit-code-editor serverOrigin="http://localhost:3000"></lit-code-editor>
</html
```
or in your lit-element:
```ts
import {customElement, html, LitElement} from 'lit-element';
import '@polymer/lit-code-editor';

@customElement('my-element')
class MyElement extends LitElement {
  render() {
    return html`
      <!-- or any other url to your running lit-code-editor-server instance -->
      <lit-code-editor serverOrigin="http://localhost:3000"></lit-code-editor>
    `;
  }
}
```