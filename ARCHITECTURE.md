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
    IDE{{&lt;playground-ide>}};
    subgraph Project;
    ProjectElement{{&lt;playground-project>}};
    WebWorker(Build Worker);
    ProxyIframe[Proxy &lt;iframe>];
    end;
    subgraph Editors;
    FileEditor1{{&lt;playground-file-editor>}};
    FileEditor2{{&lt;playground-file-editor>}};
    end;
    subgraph Preview;
    PreviewElement{{&lt;playground-preview>}};
    PreviewIframe[Preview &lt;iframe>];
    end;
    subgraph Network;
    ServiceWorker(Service Worker);
    CDN([CDN]);
    end;

    IDE -...-> Project;
    IDE -.-> Editors;
    IDE -.-> Preview;
    WebWorker -- Built Project Files --> ProjectElement;
    ProjectElement -- Project Files --> WebWorker;
    ProjectElement -- Built Project Files --> ProxyIframe;
    Editors -- Project Files --> ProjectElement;
    ProjectElement --> PreviewElement;
    PreviewElement <--> PreviewIframe;
    ProxyIframe -- Built Project Files --> ServiceWorker;
    ServiceWorker -- All Files --> PreviewIframe;
    CDN -- NPM Dependencies --> ServiceWorker;
    CDN -- TypeScript Types --> WebWorker;
```
