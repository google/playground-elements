# playground-elements

[![Published on npm](https://img.shields.io/npm/v/playground-elements.svg)](https://www.npmjs.com/package/playground-elements) [![Tests](https://github.com/PolymerLabs/playground-elements/workflows/Tests/badge.svg)](https://github.com/PolymerLabs/playground-elements/actions?query=workflow%3Atests+branch%3Amaster)

⚠️ _Active work in progress! Subject to rapid major changes._ ⚠️

A multi-file code editor component with live preview

## Introduction

`<playground-ide>` is a web component that allows you to embed multi-file, editable, live-preview code examples that use JavaScript, TypeScript, HTML and CSS. It's like a mini-IDE that you can embed many times in a page, and it works without a server!

## Features

### No server-required

`<playground-ide>` uses a service worker to send files from the main page to the preview iframe. Users can edit examples locally and the edited files are served to the iframe without ever hitting the network. This means you can use `<playground-ide>` with a static file server, and preview reloads are ultra-fast!

### Multi-file unbundled editing

`<playground-ide>` serves each file indivdually to the preview iframe, instead of bundling them first. This gives faster refresh times and means taht you can utilize the standard web platform features in your examples without a bundler getting in the way and potentially breaking things. The experience is very much like working wtih a static file server.

HTML can have multiple `<script>` and `<link>` tags, even dynamically added. CSS can use `@import` and `url()`. JavaScript can use `import.meta.url`, dynamic `import()`, and `fetch()`. It all just works.

### Bare-module specifiers support

Standard JavaScript modules are great, but currently they lack one feature that has such overwhelming use and utility that we included support for it: base module specifiers.

If you import a module by name, like:

```js
import {html, render} from 'lit-html';
```

`<playground-ide>` will automatically rewrite the import specifier to use [unpkg.com](unpkg.com) URLs:

```js
import {html, render} from 'https://unpkg.com/lit-html?module';
```

### TypeScript support

Besides standard JavaScript, `<playground-ide>` supports TypeScript files, which are automatically transpiled to JavaScript in a web worker.

The TypeScript worker behaves exactly like the `tsc` compiler does, so the examples match local code. This means that when you import other TypeScript files, you do with with a `.js` extension, which matches the compiler output.

`my-element.ts`

```ts
import {LitElement, html, customElement} from 'lit-element';

@customElement('my-element')
class MyElement extends LitElement {
  /* ... */
}
```

`index.html`

```html
<script type="module" src="my-element.js"></script>
```

Note the filename of `my-element.js`.

### Inline or external sources

You can define an example entirely in HTML for simplicity:

```html
<playground-ide>
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
</playground-ide>
```

Or define your project in a JSON manifest:

```html
<playground-ide project-src="./example-1.json"></playground-ide>
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

## Getting Started

Install with npm:

```sh
npm i playground-elements
```

Load the component definition:

```html
<script
  type="module"
  src="/node_modules/playground-elements/playground-ide.js"
></script>
```

Use the component:

```html
<playground-ide project-src="./example-1.json"></playground-ide>
```

`<playground-ide>` uses bare module specifiers in its code, so you'll need a server that supports rewriting module specifiers with the Node module resolution algorithm, or a build tool like Rollup.

`<playground-ide>` also uses `import.meta.url` to load the worker scripts.

## Theming

### Syntax highlighting

Each kind of language token is controlled by a CSS custom property with the name
`--playground-code-TOKEN-color`. For example, the `keyword` token is controlled
by `--playground-code-keyword-color`.

| Token        | Default                                 | JS/TS                                                                                    | HTML                                 | CSS                                        |
| ------------ | --------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------ |
| `default`    | ![](images/colors/000000.png) `#000000` | `{}[];`                                                                                  | <code>&lt;p><b>foo</b>&lt;/p></code> | `{}:;`                                     |
| `atom`       | ![](images/colors/221199.png) `#221199` | `true`                                                                                   | `&amp;`                              | `bold`                                     |
| `attribute`  | ![](images/colors/0000CC.png) `#0000CC` |                                                                                          | <code>&lt;foo <b>bar</b>></code>     | <code>@media <b>screen</b> { }</code>      |
| `builtin`    | ![](images/colors/3300AA.png) `#3300AA` |                                                                                          |                                      | <code><b>#id</b> { }</code>                |
| `callee`     | ![](images/colors/000000.png) `#000000` | <code><b>func</b>()</code>                                                               |                                      | <code><b>calc</b>()</code>                 |
| `comment`    | ![](images/colors/AA5500.png) `#AA5500` | `// foo`                                                                                 | `<!-- foo -->`                       | `/* foo */`                                |
| `def`        | ![](images/colors/0000FF.png) `#0000FF` | <code>let <b>foo</b> = bar</code> <br> <code>/\*\*@param {string} <b>foo</b>\*/</code>   |                                      | `@media`                                   |
| `keyword`    | ![](images/colors/770088.png) `#770088` | `class`                                                                                  |                                      | `blue`                                     |
| `meta`       | ![](images/colors/555555.png) `#555555` |                                                                                          | `<!doctype html>`                    |                                            |
| `number`     | ![](images/colors/116644.png) `#116644` | `4`                                                                                      |                                      | `4px`                                      |
| `operator`   | ![](images/colors/000000.png) `#000000` | `=`                                                                                      |                                      |                                            |
| `property`   | ![](images/colors/000000.png) `#000000` | <code>class foo { <b>bar</b>; } </code>                                                  |                                      | <code><b>color</b>:</code>                 |
| `qualifier`  | ![](images/colors/555555.png) `#555555` |                                                                                          |                                      | <code><b>.class</b> { }</code>             |
| `string`     | ![](images/colors/AA1111.png) `#AA1111` | `"foo"`                                                                                  | <code>&lt;a b=<b>"c"</b>></code>     | <code>content: <b>"foo"</b></code>         |
| `string-2`   | ![](images/colors/FF5500.png) `#FF5500` | `` `foo` `` <br> `/foo/`                                                                 |                                      | <code><b>zoom</b>: 50%</code> <sup>1</sup> |
| `tag`        | ![](images/colors/117700.png) `#117700` | <code>/\*\*<b>@param</b> {string} foo\*/</code>                                          | `<foo>`                              | <code><b>div</b> { }                       |
| `type`       | ![](images/colors/008855.png) `#008855` | <code>let foo: <b>string</b></code> <br> <code>/\*\*@param {<b>string</b>} foo\*/</code> |                                      |                                            |
| `variable`   | ![](images/colors/000000.png) `#000000` | <code>let foo = <b>bar</b></code>                                                        |                                      | <code>@keyframes <b>spin</b> { }</code>    |
| `variable-2` | ![](images/colors/0055AA.png) `#0055AA` | <code>(arg) => { <b>arg</b> }</code> <sup>2</sup>                                        |                                      |                                            |
| `variable-3` | ![](images/colors/008855.png) `#008855` |                                                                                          |                                      | <code>::<b>hover</b></code>                |
| `local`      | ![](images/colors/0000FF.png) `#0000FF` | <code>(<b>arg</b>) => { }</code>                                                         |                                      |                                            |

##### Notes

1. In CSS, `string-2` is used for "non-standard" properties, but the
   [list](https://github.com/codemirror/CodeMirror/blob/264022ee4af4abca1c158944dc299a8faf8696d6/mode/css/css.js#L566)
   is outdated.
2. In JS/TS, `variable-2` is used for function-local variables.

#### Parsers

Playground uses the `google_modes` CodeMirror syntax highlighting modes for
TS/JS/HTML, because they support highlighting of HTML and CSS within JavaScript
tagged template literals.

- JavaScript: https://github.com/codemirror/google-modes/blob/master/src/javascript.grammar
- TypeScript: https://github.com/codemirror/google-modes/blob/master/src/typescript.grammar
- JSDoc: https://github.com/codemirror/google-modes/blob/master/src/jsdoc.grammar
- HTML: https://github.com/codemirror/google-modes/blob/master/src/html.grammar
- CSS: https://github.com/codemirror/CodeMirror/blob/master/mode/css/css.js

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
