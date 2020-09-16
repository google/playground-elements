# code-sample-editor

A multi-file code editor component with live preview

## Introduction

`<code-sample-editor>` is a web component that allows you to embed multi-file, editable, live-preview code examples that use JavaScript, TypeScript, HTML and CSS. It's like a mini-IDE that you can embed many times in a page, and it works without a server!

## Features

### No server-required
`<code-sample-editor>` uses a service worker to send files from the main page to the preview iframe. Users can edit examples locally and the edited files are served to the iframe without ever hitting the network. This means you can use `<code-sample-editor>` with a static file server, and preview reloads are ultra-fast!

### Multi-file unbundled editing

`<code-sample-editor>` serves each file indivdually to the preview iframe, instead of bundling them first. This gives faster refresh times and means taht you can utilize the standard web platform features in your examples without a bundler getting in the way and potentially breaking things. The experience is very much like working wtih a static file server.

HTML can have multiple `<script>` and `<link>` tags, even dynamically added. CSS can use `@import` and `url()`. JavaScript can use `import.meta.url`, dynamic `import()`, and `fetch()`. It all just works.

### Bare-module specifiers support

Standard JavaScript modules are great, but currently they lack one feature that has such overwhelming use and utility that we included support for it: base module specifiers.

If you import a module by name, like:

```js
import {html, render} from 'lit-html';
```

`<code-sample-editor>` will automatically rewrite the import specifier to use [unpkg.com](unpkg.com) URLs:

```js
import {html, render} from 'https://unpkg.com/lit-html?module';
```

### TypeScript support

Besides standard JavaScript, `<code-sample-editor>` supports TypeScript files, which are automatically transpiled to JavaScript in a web worker.

The TypeScript worker behaves exactly like the `tsc` compiler does, so the examples match local code. This means that when you import other TypeScript files, you do with with a `.js` extension, which matches the compiler output.

`my-element.ts`
```ts
import {LitElement, html, customElement} from 'lit-element';

@customElement('my-element')
class MyElement extends LitElement { /* ... */ }
```

`index.html`
```html
<script type="module" src="my-element.js"></script>
```
Note the filename of `my-element.js`.

### Inline or external sources

You can define an example entirely in HTML for simplicity:

```html
<code-sample-editor>
  <script type="sample/html" filename="index.html">
    <script type="module" src="my-element.js">&lt;/script>
    <h1>Hello World!</h1>
    <my-element></my-element>
  </script>
  <script type="sample/js" filename="my-element.js">
    import {LitElement, html, customElement} from 'lit-element';

    class MyElement extends LitElement { /* ... */ }
    customElements.define('my-element', MyElement);
  </script>
</code-sample-editor>
```

Or define your project in a JSON manifest:

```html
<code-sample-editor project-src="./example-1.json"></code-sample-editor>
```

`example-1.json`:
```json
{
  "files": {
    "index.html": {},
    "my-element.js": {},
    "my-second-element.js": {}
  }
}
```

### Templating & File Replacements

the JSON manifest supports a simple templating system where you must define an
insertion point (that is simply fed into `string.replace`) as well as a file
that will be inserted into that template. Templates will not be displayed to the
user for editing. For example:

`project.json`:

```json
{
  "files": {
    "index.html": {
      "replacements": {
        "<!-- dom body -->": "index-dom.html",
        "<!-- dom head -->": "index-head.html"
      }
    },
    "my-element.js": {}
  }
}
```

Here we define 2 insertion points in `index.html` that will get applied
sequentially: `<!-- dom body -->` and `<!-- dom head -->` which will be replaced
with the contents of `index-dom.html` and `index-head.html` respectively.

`index.html`:

```html
<html>
  <head>
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js"></script>
    <!-- dom head -->
  </head>
  <body>
    <div>Here are the contents:</div>
    <!-- dom body -->
  </body>
</html>
```

`index-head.html`:

```html
<script type="module" src="./my-element.js"></script>
```

`index-dom.html`:

```html
<my-element myNumber="5">
  <div>Element is not upgraded</div>
</my-element>
```

The code sample editor will show a tab for each `index-head.html` and
`index-dom.html` but hide `index.html` as it is considered a template since
it has `replacements` defined.

_NB: Replacements apply `string.replace` sequentially to the same string, so
multiple replacements in the same template may cause unintended behavior if the
insertion point string is inserted by the user's code._

## Getting Started

Install with npm:
```sh
npm i code-sample-editor
```

Load the component definition:
```html
<script
  type="module"
  src="/node_modules/code-sample-editor/lib/code-sample-editor.js">
</script>
```

Use the component:
```html
<code-sample-editor project-src="./example-1.json"></code-sample-editor>
```

`<code-sample-editor>` uses bare module specifiers in its code, so you'll need a server that supports rewriting module specifiers with the Node module resolution algorithm, or a build tool like Rollup.

`<code-sample-editor>` also uses `import.meta.url` to load the worker scripts. note that Webpack does not support that currently.

## Development

After cloning the repo:
```sh
npm install

# runs npm run watch and npm run serve at the same time
npm run dev
```

Open your browser to `http://localhost:8081/demo/` to see the demo.

### Project organization

The project is organized into multiple TypeScript projects, one for each browser/worker environment, and one shared project. They reference each other via TypeScript project references and are built together with the `--build` flag to `tsc`.
