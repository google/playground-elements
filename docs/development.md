# Development Guide

TOC:

- [Objective](#Objective)
- [Goals](#Goals)
- [Non-Goals](#Non-Goals)
- [Design Overview](#Design-Overview)
- [Notable Branches](#Notable-Branches)
  - [master](#master)
  - [monaco](#monaco)
  - [codemirror](#codemirror)
  - [codemirror5](#codemirror5)
  - [stateless-sw](#stateless-sw)
  - [typescript](#typescript)

## Objective

Create a relatively simple and lightweight code editor for our docs sites that
can run simple `lit-html` and `LitElement` projects. Eventually we would want to
extend this code editor to be a full-fledged, code-first learning experience.

## Goals

- Allow editing of multiple files
- Preview samples in an isolated iframe
- Load individual files into the iframe without bundling, and with minimal
  transforms
- Support HTML, JavaScript, CSS, and TypeScript
- Enable a live-coding experience with web components
- Support bare module specifiers
- Send fewer bytes than our current StackBlitz solution
- Element is able to be consumed without any special setup steps
- Works with static file serving
- Works offline
- Multiple editors per page
- Syntax highlighting, code-completion, and type-checking for lit-html templates
- Minimal UI

## Non-Goals

- Fully support browsers that don’t support ServiceWorkers
- Sharing code between users
- Reload persistence

## Design Overview

This code editor can achieve its goals by simply using iframes and
ServiceWorkers. The document can create and configure a ServiceWorker to respond
to the requests from an iframe.

There are 3 parts to this element:

- The Document
  - This is the main document where the element is inserted
  - This part handles
    - Registering and configuring the ServiceWorker that controls the sandbox
      iframe
    - Unregistering the ServiceWorker
    - Code transformations for bare module specifiers (Reviewing this decision)
    - Creating the Sandbox iframe
    - User input & UI
    - Formatting user input and sending it to the Serviceworker
    - Creating and deleting elements
- The ServiceWorker
  - This is the ServiceWorker created by the Document that is supposed to handle
    request by the sandbox
  - This ServiceWorker handles
    - Receiving file names and contents from the document
    - Clearing file names and contents from the document
    - Responding to requests from the sanbox
- The Sandbox
  - This part is an iframe inside the element with the following path:
    https://whatever.domain/modules/:uniqueHash/index.html
    Of which the ServiceWorker will intercept all requests and only respond to
    requests that it has contents for which will mostly be from the sandbox
    domain (e.g. not unpkg links)
  - This iframe handles:
    - Loading index.html from the modules path which is not defined on the
      server but only in the ServiceWorker

## Notable Branches

This repo is still in alpha with some ongoing development. Here are some notable
branches that have some active ongoing research.

### master

The main branch is the most stable. It uses a stateful serviceworker that has
a scope of `protocol://domain.tld/modules` (configurable by `sanboxScope` in the
document). This SW then receives requests from the document to respond to files
under a specific unique hash with the given data which comes from the textareas
in the document.

The UI is very simple, it uses only divs buttons iframes and textareas for the
editor itself. It's more of a skeleton and it only supports html and javascript
files. A lot of the logic can be found in `/src/lib/utils.ts` written to have as
few side-effects as possible and mostly functional.

Testing is non-existent, and will soon be written to test the most minimal
functionality.

Message passing between the SW and the document is mostly handled by
[Comlink](https://github.com/GoogleChromeLabs/comlink). The relevant code can be
found in
[`/src/lib/utils.ts@setUpServiceWorker`](https://github.com/PolymerLabs/code-sample-editor/blob/master/src/lib/util.ts#L90)
and
[`/lib/sw.ts@SwController`](https://github.com/PolymerLabs/code-sample-editor/blob/master/src/sw.ts#L61).
The ServiceWorker is always listening for `MESSAGE_TYPES.ESTABLISH_HANDSHAKE`
messages, and upon mesage, it will
[expose `SwController` to the requesting client](https://github.com/PolymerLabs/code-sample-editor/blob/master/src/sw.ts#L16).
The client then feeds contents to the SW, and the SW will respond to fetch
requests from the corresponding sandbox iframes with those contents (though it
tries to ignore fetch requests from different domains or scopes e.g. unpkg).

### monaco

[Monaco](https://github.com/microsoft/monaco-editor) is the main editor of
Visual Studio Code by Microsoft. Unfortunately, Monaco is not written to be ES
Module compatible and would require some global instantiation or Rollup build
process. I first attempted Rollup, which worked, but it seemed to cause several
silent failures and significant developer barrier (complex build process to
simply make this work).

Additionally, monaco-editor does not work in Shadow DOM. The codebase has quite
a lot of `parentNode` checks that do not account for `DocumentFragment` or
`ShadowRoot`. There is also quite a lot of sdom-ignorant code regarding the
caret. This may be a possible future fix, but developing on `monaco-editor` is
difficult because it is ripped from
[`vscode`](https://github.com/microsoft/vscode) with a tool rather than
independently developed. Therefore, my current method is to put the editor in an
iframe (currently via the `srcdoc` attribute), and expose the API that I need
with Comlink. Additionally, to skip out on Rollup, we just load it with a simple
script that loads it from Microsoft's recommended CDN.

#### Implementation

This branch has replaced the textareas with
[`code-sample-editor-editor`](https://github.com/PolymerLabs/code-sample-editor/blob/329462e6540e6fc143fbfd9889b0f7b50ed5165a/src/lib/code-sample-editor-editor.ts)
custom elements. These elements insert an iframe with a srcdoc that creates a
monaco editor and
[wraps](https://github.com/PolymerLabs/code-sample-editor/blob/monaco/src/lib/code-sample-editor-editor.ts#L98)
the iframe with a Comlink
[`Remote<typeof MonacoIframe>`](https://github.com/PolymerLabs/code-sample-editor/blob/monaco/src/lib/monaco-iframe-script.ts#L34)
wrapper. This interface exposes the minimal Monaco API we need.

#### Findings

Monaco seems to have the feature set that we want already built in e.g. tooltips
and code analysis. There are also some tools built on the VS Code extension
interface that we may be able to take advantage of. This comes at the cost of
size which we attempt to mitigate via loading it via the preferred CDN.
Additionally, there is a much more limited implementation due to the fact that
it lives in an iframe because monaco-editor does not support shadow DOM.

#### TODO

- Implement multi-file intellisense
- Cleanup srcdoc code
  - May require serving via service worker rather than srcdoc
- Load monaco lazily / on demand
- Package files that are not imported via import statements in a better way
  - ServiceWorkers are an issue
  - Files loaded from within the monaco iframe srcdoc are not analyzable
  - Currently not bundler-friendly

### codemirror

[Codemirror](https://codemirror.net/) is one of the web's

#### Implementation

#### Findings

#### TODO

### codemirror5

#### Implementation

#### Findings

#### TODO

### stateless-sw

#### Implementation

#### Findings

#### TODO

### typescript

#### Implementation

#### Findings

#### TODO
