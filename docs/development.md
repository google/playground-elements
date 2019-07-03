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

[link](https://github.com/PolymerLabs/code-sample-editor/tree/monaco)

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
- Needs rebasing

### codemirror

[link](https://github.com/PolymerLabs/code-sample-editor/tree/codemirror)

[CodeMirror](https://codemirror.net/) is one of the web's most-popular online
text editors. This branch implements an editor that uses
[CodeMirror 6](https://github.com/codemirror/codemirror.next) which is largely a
rewrite of the traditional CodeMirror codebase. See their reasoning
[here](https://codemirror.net/6/).

CodeMirror 6 is still under development.

#### Implementation

This branch has replaces the textareas with
[`code-sample-editor-editor`](https://github.com/PolymerLabs/code-sample-editor/blob/codemirror/src/code-sample-editor-editor.ts)
custom elements. These elements simply insert CodeMirror 6 since it is module
and shadow DOM compatible and provide a common interface.

The styles are inserted as a `link[rel='stylesheet']` in the shadow root of the
element. There also had to be some undocumented changes to get CodeMirror 6's
dependencies to compile. See
[codemirror/codemirror.next#103](https://github.com/codemirror/codemirror.next/issues/103)
and [codemirror/codemirror.next#16](https://github.com/codemirror/codemirror.next/issues/16).

#### Findings

- Some of the deps have commonjs exports
- CodeMirror 6 is very much in alpha
  - Maintainer claims the entire structure is subject to change
  - Next gen syntax highlighting API has not yet been established
- Implementation after fixing deps is pretty straightforward
- Missing plugin environment necessary to implement code completion and TS
  analysis

#### TODO

- Cleanup a bit of code
- Automate dep fixes
- Figure out how to highlight HTML and TS
- Figure out how to add tooltips / code completion
- Figure out tagged template literal syntax highlighting
- Lazily load the code
- Rebase

### codemirror5

[link](https://github.com/PolymerLabs/code-sample-editor/tree/codemirror5)

[CodeMirror](https://codemirror.net/) is one of the web's most-popular online
text editors. This branch implements an editor that uses
[CodeMirror 5](https://github.com/codemirror/CodeMirror), the stable build of
CodeMirror.

#### Implementation

This branch has replaces the textareas with
[`code-sample-editor-editor`](https://github.com/PolymerLabs/code-sample-editor/blob/codemirror5/src/code-sample-editor-editor.ts)
custom elements. CodeMirror 5 is written in native ES modules, but is intended
to be available on the window, so I import it and
[make it available](https://github.com/PolymerLabs/code-sample-editor/blob/codemirror5/src/code-sample-editor-editor.ts#L5).
This is a fairly simple implementation where we must also make the styles
abailable on the shadow root. We then expose a familiar textarea-like API.

#### Findings

- Has a lot of puiblic support
- Used by Google's Cider
- Has plugin ecosystem
- Notoriously clunky architecture and a pain to extend
- No working tagged template literal highlighting implementation
  - Will require a language extension
  - [Issue on GH](https://github.com/codemirror/CodeMirror/issues/3026) was
    closed a while ago with no official fix intended
- Surprisingly simple implementation for an older library
- Fast to boot & smaller bundle than monaco
- Autocompletion / intellisense will be a hassle to implement

#### TODO

- Rebase
- Implement tooltips
- Implement autocompletion
- Implement intellisense
- Code cleanup
- Figure out tagged template literal highlighting

### stateless-sw

[link](https://github.com/PolymerLabs/code-sample-editor/tree/stateless-sw)

After meeting with Eric Simons from StackBlitz, we discussed the concept of
having a ServiceWorker that would serve user-generated files. He had a repo and
concept running called `localservice` (no longer available online) that was a
stateless SW that would ask the client for a request upon `fetch` event. We
decided not to use `localservice` since it relied on an external server as it
served a slightly different use case, I looked into implementing a similar
architecture.

#### Implementation

The document
[creates an iframe](https://github.com/PolymerLabs/code-sample-editor/blob/stateless-sw/src/lib/code-sample-editor.ts#L181)
that wraps the sandbox that we will call the "sandbox controller" with the URL
`https://domain.tld/${swScope}/${sessionId}/MODULE_CONTROLLER/index.html` in
which the SW would respond with an empty html response. The client then
[exposes](https://github.com/PolymerLabs/code-sample-editor/blob/stateless-sw/src/lib/code-sample-editor.ts#L154)
the [request API](https://github.com/PolymerLabs/code-sample-editor/blob/stateless-sw/src/lib/code-sample-editor.ts#L33)
on the window of that iframe via Comlink. Then, the document layer
[`document.write`s](https://github.com/PolymerLabs/code-sample-editor/blob/stateless-sw/src/lib/code-sample-editor.ts#L162)
the sanbox iframe inside the sandbox controller at
`https://domain.tld/${swScope}/${sessionId}/MODULES/index.html`.

When the SW sees `fetch` events from the sandbox, it
[filters through its connected clients](https://github.com/PolymerLabs/code-sample-editor/blob/stateless-sw/src/sw.ts#L17)
until it finds the controller with the matching `sessionId`. It needs to find
the controller because, the actual sandbox will not be a client if it is
requesting the `index.html`. Then, the SW will use Comlink to
[get the `Response` initialization parameters](https://github.com/PolymerLabs/code-sample-editor/blob/stateless-sw/src/sw.ts#L32)
from the client and serve the constructed response to the client.

#### Findings

- More waiting and message-passing between the client and SW at load time
  - Slightly noticable performance slowdown
- More control for the client
- Possibly over-engineered for the use case
- Fewer SW memory leak issues
  - Don't have to track when the user disconnects
- Added complexity to the sandbox by adding a controller

#### TODO

- Needs rebase

### typescript

[link](https://github.com/PolymerLabs/code-sample-editor/tree/typescript)

An attempt to support Typescript files in the editor. This branch is still a
complete mess and a total work in progress. It currently attempts to crawl the
imports and exports of a given bare module specifier and fetch all the TS
declaration files. All of these must be fetched first as the typescript compiler
requires them in a synchronous manner and all fetches are asynchronous (and
should stay that way in our case). The branch has been left off at just trying
to get the typescript compiler to run in the browser.
