# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!--
   PRs should document their user-visible changes (if any) in the
   Unreleased section, uncommenting the header as necessary.
-->

<!-- ## [X.Y.Z] - YYYY-MM-DD -->
<!-- ## Unreleased -->
<!-- ### Changed -->
<!-- ### Added -->
<!-- ### Fixed -->
<!-- ### Removed -->

## Unreleased

### Changed

- [**BREAKING**] Major refactor of elements to allow them to be more easily used
  independently. The new elements are:

  - `<code-sample>`: A single editor with file-selection bar and preview in
    side-by-side layout. If a different layout is required, the editor and
    preview elements can instead be used directly, along with a project element.
    New equivalent of what used to be `<code-sample-editor>`.

  - `<code-sample-project>`: New purely abstract element that coordinates
    between the service worker, editor elements, and preview elements.

  - `<code-sample-editor>`: An editor with file-selection bar, tied to a project
    element. New equivalent to the left-hand-side side of what used to be
    `<code-sample-editor>`.

  - `<code-sample-preview>`: A rendered HTML preview window, tied to a project
    element. New equivalent to the right-hand-side of what used to be
    `<code-sample-editor-preview>`.

  - `<codemirror-editor>`: A pure CodeMirror editor, mostly unchanged from
    previous version.

  Example usage without `<code-sample>`:

  ```html
  <code-sample-project
    id="myProject"
    project-src="/demo/typescript/project.json"
  ></code-sample-project>
  <code-sample-editor project="myProject"></code-sample-editor>
  <code-sample-preview project="myProject"></code-sample-preview>
  ```

  The `project` property can either be an ID in the host scope (as shown above)
  or a direct reference to a `<code-sample-project>` element (which would allow
  the elements to live in different scopes).

### Added

- Add syntax highlighting for TypeScript files.

### Fixed

- Fix absent CSS syntax highlighting.

## [0.1.0-pre.3] - 2020-10-05

### Fixed

- Fix missing CodeMirror styles on Firefox and Safari.
- Fix Safari crashes in `<mwc-tab>` code.

## [0.1.0-pre.2] - 2020-09-12

### Fixed

- Fix extra/missing files.

## [0.1.0-pre.1] - 2020-09-12

- Initial release.
