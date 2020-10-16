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

- Downgraded from CodeMirror v6 to v5 in order to gain support for nested
  highlighting of HTML and CSS inside JS/TS. See
  https://github.com/lezer-parser/javascript/issues/3. Will upgrade back to 6
  once support is ready.

- The caret is now only displayed when an editor is on focus (previously it was
  always displayed).

- The `<code-sample>` side-by-side layout is now consistently 70%/30% (widths be
  changed using the `editor` and `preview` CSS shadow parts).

### Added

- Add syntax highlighting of TypeScript files.

- Add syntax highlighting of nested HTML and CSS inside JS/TS.

- Add `filename` property/attribute to `<code-sample-editor>` which allows
  getting and setting the currently selected file.

- Add `noFilePicker` property (`no-file-picker` attribute) to
  `<code-sample-editor>` which disables the top file selection tab-bar.

- Add `lineNumbers` property (`line-numbers` attribute) to
  `<code-sample-editor>` which enables the left-hand-side gutter with line
  numbers. This is on by default in `<code-sample>`.

- Add a `<slot>` to `<code-sample-editor>` which will be displayed until the
  file is loaded. This facilitates pre-rendering syntax-highlighted code before
  both the element has upgraded, and before the project file has been fetched.

- Add a `<slot>` to `<code-sample-preview>` which will be displayed until the
  preview iframe has loaded for the first time. This facilitates pre-rendering
  preview HTML both before both the element has upgraded, and before the live
  preview first renders.

- Add `label` property and attribute to project files. When set, the file picker
  will display this label instead of the filename.

- The `<code-sample-preview>` toolbar and label have been removed.

- The reload button now floats in the top-right corner and spins when the iframe
  is loading.

- Added CSS Shadow Parts:

  - `<code-sample-editor>`: `file-picker`
  - `<code-sample-preview>`: `reload-button`
  - `<code-sample>`: `editor`, `preview`, `file-picker`, `reload-button`

- Previews will now automatically reload on changes (0.5 second debounce).

### Fixed

- Fix absent CSS syntax highlighting.
- Various styling/layout glitches.

## [0.1.0-pre.3] - 2020-10-05

### Fixed

- Fix missing CodeMirror styles on Firefox and Safari.
- Fix Safari crashes in `<mwc-tab>` code.

## [0.1.0-pre.2] - 2020-09-12

### Fixed

- Fix extra/missing files.

## [0.1.0-pre.1] - 2020-09-12

- Initial release.
