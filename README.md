# code-sample-editor
Element to insert for code editor

## Getting Started
### Development
```sh
npm install
# runs npm run watch and npm run serve at the same time
npm run dev
```

If the `code-sample-editor-server` is running, then open your browser to
`http://localhost:8081/demo` to see the demo.

### Usage
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
    <!-- Creates an empty index.html file -->
    <code-sample-editor></code-sample-editor>
    <!-- Loads a preconfigured project -->
    <code-sample-editor
        project-path="./snippets/data-binding/">
    </code-sample-editor>
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
      <!-- Creates an emptyu index.html file -->
      <code-sample-editor></code-sample-editor>
      <!-- Loads a preconfigured project -->
      <code-sample-editor
          project-path="./snippets/data-binding/">
      </code-sample-editor>
    `;
  }
}
```

An imported project path must have a `code-sample-editor.json`. This manifest
file tells the code editor which files to initially load and serve. Additionally
the manifest preseves tab order in the editor, so if you want a file to display
first, you should define it first.

It is recommended to have an `index.html` so that a file can load when the page
opens.

Project path layout:
```
/projectPathExampleDir
  code-sample-editor.json
  filename.js
  filename-to-display-first.js
  index.html
  /someDirectory
    file-in-dir.js
```

`code-sample-editor.json` example:
```json
{
  "files": {
    "filename-to-display-first.js": {},
    "filename.js": {},
    "index.html": {},
    "someDirectory/file-in-dir.js": {},
  }
}
```

## Spec
### `code-sample-editor.json`
```ts
{
  files: {
    [filename: string]: {
      replacements?: {
        [insertionPointName: string]: [insertedFilename: string]
      }
    }
  }
}
```
| field name | type | description |
| - | - | - |
| `files` | Object | identifies the files to be loaded by the code editor |
| `files.[filename]` | string | name of the file to be loaded by the editor. Must be of format `X.Y` where `X` is the file/pathname and `Y` is the file extension. Currently supported extensions: `html`, `js` |
| `files.filename` | Object | options for that file |
| `files.filename.replacements` | Object | Defines which insertion points are available in this file and what files are inserted into these points. Files that have this field defined will not be visible to the user and can be used as boilerplate files. |
| `files.filename.replacements.[insertionPointName]` | string | Name of insertion point to replace |
| `files.filename.replacements.insertionPointName` | string | Name / path of file to be inserted at the given `insertionPointName`. These files will be visible to be edited by the user. |

### Templating TODO(emarquez): implement templates
Some files can have a `files.filename.replacements` field defined. This means
that the file will be treated as a template where it will not be shown to the
user, but it will have its insertion points string replaced with the contents
of the defined files. For example:

```html
<!-- index.html -->
<html>
  <head>
    <script type="module">
      <!--headScript-->
    </script>
  </head>
  <body>
    <!--body-->
  </body>
</html>
```

project layout:
```
/exampleDir
  code-sample-editor.json
  my-element.js
  document.html
  index.html
  /someDirectory
    file-in-dir.js
```

`code-sample-editor.json` example:
```json
{
  "files": {
    "index.html": {
      "replacements": {
        "headScript": "my-element.js",
        "body": "document.html"
      }
    }
  }
}
```

```html
<!-- document.html -->
<my-element myNumber="5"></my-element>
```

```js
// my-element.js
import { LitElement, html } from 'https://unpkg.com/lit-element?module';

class MyElement extends LitElement {
  static get properties() {
    return {
      myNumber: { type: Number }
    };
  }

  render() {
    return html`
      <div>my number is ${this.myNumber}</div>
    `;
  }
}

customElements.define('my-element', MyElement);
```