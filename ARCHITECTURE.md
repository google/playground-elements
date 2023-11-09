# Architecture

The Playground elements have three features that require a somewhat complex architecture:

- Loading files from the main window into a preview iframe without using a server
- Compiling TypeScript files and resolving bare import specifiers on the fly
- Loading dependencies from a CDN

To accomplish this, the Playground elements have a somewhat complex set of workers and iframes:
- A preview iframe
- A service worker to serve files to the preview iframe
- A web worker to compile TypeScript files and resolve bare import specifiers
- A proxy iframe to install and communicate with the service worker from the main page

These workers and iframes are controlled by various Playground elements like `<playground-project>`, `<playground-preview>`, and `<playground-file-editor>`.

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
