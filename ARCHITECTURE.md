# Architecture

The Playground elements have three features that require a somewhat complex architecture:

- Loading files from the main window into a preview iframe without using a server
- Compiling TypeScript files and resolving bare import specifiers on the fly
- Loading dependencies from a CDN

To accomplish this, the Playground elements have a somewhat complex set of workers and iframes:
- A playground-project element that coordinates most of the initialization and communication
- A preview iframe
- A service worker to serve files to the preview iframe
- A web worker to compile TypeScript files and resolve bare import specifiers
- A proxy iframe to install and communicate with the service worker from the main page

These workers and iframes are controlled by various Playground elements like `<playground-project>`, `<playground-preview>`, and `<playground-file-editor>`.

This chart shows the data flow between components. The arrows show the direction of the primary flow of data, ie, the file being transferred, not the message requesting the file.

```mermaid
flowchart TD
    subgraph Project
    ProxyIframe[Proxy iframe]
    ProjectElement{{playground-project}}
    WebWorker(Build Worker)
    ServiceWorker(Service Worker)
    end
    subgraph Editors
    FileEditor1{{playground-file-editor}}
    FileEditor2{{playground-file-editor}}
    end
    subgraph Preview
    PreviewElement{{playground-preview}}
    PreviewIframe[Preview iframe]
    end
    CDN([NPM CDN])

    ServiceWorker -- All Files --> PreviewIframe
    ProjectElement -- Built Files --> ProxyIframe
    Editors -- Project Files --> ProjectElement
    ProjectElement -...-> PreviewElement
    PreviewElement -.-> PreviewIframe
    ProxyIframe -- Built Files --> ServiceWorker
    WebWorker -- Built Files --> ProjectElement
    ProjectElement -- Project Files --> WebWorker
    CDN -- NPM Dependencies --> WebWorker
```

This diagram shows the sequence of messages and events between components.

ALL_CAPS labels are direct `postMessage()` messages. methodName() labels on solid lines are Comlink remote method calls over MessagePorts. methodName() labels on loop-back dotted lines are important local invocations. Other dotted lines are responses or browser events.

```mermaid
sequenceDiagram
    participant Project as playground-project
    participant Proxy as Proxy iframe
    participant Preview as Preview iframe
    participant ServiceWorker as Service Worker
    participant BuildWorker as Build Worker
    Proxy -->> Project: load event
    activate Project
    Project ->>+ Proxy: CONFIGURE_PROXY
    deactivate Project
    Proxy -->> Proxy: navigator.serviceWorker.register()
    Proxy ->>+ ServiceWorker: CONNECT_SW_TO_PROJECT
    Proxy ->>- Project: CONNECT_PROJECT_TO_SW
    ServiceWorker ->>- Project: ACKNOWLEDGE_SW_CONNECTION
    activate Project
    Project ->> ServiceWorker: setFileAPI()
    deactivate Project
    Project -->> Project: _loadProjectFromSource()
    Project ->> BuildWorker: compileProject()
    activate BuildWorker
    Preview -->> ServiceWorker: fetch event
    activate ServiceWorker
    ServiceWorker ->> Project: getFile()
    activate Project
    Project ->> BuildWorker: getFile()
    BuildWorker -->> Project: File
    deactivate BuildWorker
    Project -->> ServiceWorker: File
    deactivate Project
    ServiceWorker -->> Preview: File
    deactivate ServiceWorker

```
