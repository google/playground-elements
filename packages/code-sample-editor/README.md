# code-sample-editor
Element to insert for code editor

## Getting Started
### development
```sh
# in code-sample-editor-package root directory
npm install
npm run bootstrap
npm run build
cd packages/code-sample-editor
npm run dev
```

If the `code-sample-editor-server` is running, then open your browser to
`http://localhost:8081`

### usage
install package
```sh
npm install @polymer/code-sample-editor
```
use element in HTML:
```html
<html>
  <head>
    <!-- or wherever your definition is for this element -->
    <script type="module" src="node_modules/@polymer/code-sample-editor/src/code-sample-editor.js"></script>
  </head>
  <body>
    <!-- or any other url to your running code-sample-editor-server instance -->
    <code-sample-editor serverOrigin="http://localhost:3000"></code-sample-editor>
</html
```
or in your lit-element:
```ts
import {customElement, html, LitElement} from 'lit-element';
import '@polymer/code-sample-editor';

@customElement('my-element')
class MyElement extends LitElement {
  render() {
    return html`
      <!-- or any other url to your running code-sample-editor-server instance -->
      <code-sample-editor serverOrigin="http://localhost:3000"></code-sample-editor>
    `;
  }
}
```