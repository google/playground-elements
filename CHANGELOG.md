# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!--
   PRs should document their user-visible changes (if any) in the
   Unreleased section, uncommenting the header as necessary.
-->

<!-- ## [X.Y.Z] - YYYY-MM-DD -->
<!-- ## [Unreleased] -->

## [0.19.1] - 2024-08-19

### Fixed

- Fix broken import of typescript.js module

## [0.19.0] - 2024-08-19

### Changed

- Upgraded to TypeScript 5.2 and Lit 3.0
- **BREAKING** Use modules in workers. See [caniuse.com's support table](https://caniuse.com/mdn-api_worker_worker_ecmascript_modules) for browser support information.
- Updated `comlink`, `fuse.js`, and `tslib` dependencies.

<!-- ### Added -->
<!-- ### Fixed -->
<!-- ### Removed -->

## [0.18.1] - 2023-08-10

### Fixed

- Fix tab-to-spaces conversion in the code editor which was resulting in one less space being produced on tab than desired.

## [0.18.0] - 2023-05-25

### Changed

- **BREAKING** Update bundled version of TypeScript from `4.8.4` to `5.0.4`. See [TypeScript 5 breaking changes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#breaking-changes-and-deprecations).

## [0.17.1] - 2023-04-25

### Added

- Fetch all `@types` packages listed in the project's `package.json` file and
  include them for TypeScript compilation. This allows type-checking packages
  that do not ship their own types but do have a DefinitelyTyped package
  available. Note: This does not automatically download the `@types` package for
  a package. It must be manually listed in `package.json`.

## [0.17.0] - 2022-11-11

### Changed

- Replaced `vscode-languageserver` dependency with smaller
  `vscode-languageserver-protocol`.
- TypeScript version upgraded from `4.4.4` to `4.8.4`.
- `PlaygroundConnectedElement` `project` is now permitted to be `undefined` according to TypeScript.
- Upgrade `codemirror` from `5.63.0` to `5.65.9`.
- **BREAKING** Switched TypeScript `moduleResolution` from `esnext` to `nodenext`.
- **BREAKING** Bumped TypeScript `target` from `es2017` to `es2021`.
- **BREAKING** The local `package.json` is now passed to TypeScript for
  compilation, and the default value of the `type` field is modified to
  `module`.

## [0.16.3] - 2022-08-02

### Added

- Added styntax highlighting for `jsx` and `tsx` modules.

## [0.16.2] - 2022-06-16

### Added

- Added support for compiling `jsx` and `tsx` modules.

## [0.16.1] - 2022-05-17

### Changed

- Upgraded MWC dependencies.

## [0.16.0] - 2022-05-11

### Changed

- **BREAKING** Added `browser` to the set of export conditions used during
  module resolution.

## [0.15.5] - 2022-05-06

### Added

- Added `lineWrapping` property (`line-wrapping` attribute) to
  `<playground-code-editor>`, `<playground-file-editor>` and `<playground-ide>`
  which when enabled wraps long lines, otherwise the editor will scroll. Off by
  default.

### Fixed

- Fix typo in README. Add missing forward slash in escaped script tag.

## [0.15.4] - 2022-04-05

### Added

- Add the ability to select a file by setting `selected: true` in a project
  config, or by setting the `selected` attribute on slotted children.

## [0.15.3] - 2022-03-29

### Fixed

- Fixed the hiding of comments that surround a fold/hide code block from
  creating invisible readonly regions.

- Refactored fold/hide marker logic so it doesn't add document history when
  clearing the prior fold/hide markers.

- Fix typo and incorrectly documented event name in README. `changed` event
  should instead be `change`.

## [0.15.2] - 2022-03-24

### Added

- Make hidden code blocks readonly to prevent accidental erasure.

- Added `Ctrl+/` or `Cmd+/` hotkey for toggling line comments.

- Added keyboard shortcut documentation to the playground-code-editor README.

## [0.15.1] - 2022-03-16

### Changed

- playground-preview now exposes the internal iframe via the `iframe` property.

## [0.15.0] - 2022-03-07

### Added

- Added `noCompletions` property documentation to README.

### Fixed

- Normalize content-type response header to lowercase when matching filetypes.

## [0.15.0-pre.5] - 2022-02-23

### Added

- More mobile friendly completion items via media query

### Fixed

- Pressing ESC to close completions menu doesn't de-focus the code-editor

- Word wrapping on long completion item details doesn't extend to multiple lines

- Elevation on completion items list matches other elevations on project

## [0.15.0-pre.4] - 2022-02-17

### Added

- Added `Ctrl-Space` hotkey for triggering interactive code completions.

## [0.15.0-pre.3] - 2022-02-16

### Fixed

- Fixed syntax highlighting and code folding regressions introduced when using
  `documentKey`.

## [0.15.0-pre.2] - 2022-02-15

### Added

- Added `documentKey` property to `<playground-code-editor>` which is
  used to keep track of individual CodeMirror document instances internally.
  Default behavior without setting a `documentKey` is unchanged.

  Use `documentKey` for fine control over the CodeMirror document instance. For
  example, to model changing a file.

### Fixed

- Fixed undo history applying across files
  ([#154](https://github.com/google/playground-elements/issues/154)).

  Previously all files shared the same document instance resulting in files
  sharing undo/redo history. Now each file has its own isolated internal
  document instance.

- Fixed only a single closing script tag unescaping in html files using
  playground-ide
  ([#251](https://github.com/google/playground-elements/issues/251)).

## [0.15.0-pre.1] - 2022-02-04

### Added

- Added interactive code completions for TypeScript files
  ([#243](https://github.com/google/playground-elements/pull/243)).

  Completions can be disabled by setting the `no-completions` attribute on
  `<playground-ide>`, `<playground-file-editor>`, or `<playground-code-editor`>
  components.

## [0.14.8] - 2022-01-25

### Added

- Added `html-file` attribute (`htmlFile` property) to `playground-preview` and
  `playground-ide` which allows configuring the project HTML file which should
  be displayed in the preview. Defaults to `index.html` (which was previously
  the only possible value)

### Fixed

- Remove nbsp characters from README.

## [0.14.7] - 2021-12-07

### Fixed

- Fixed missing `aria-label` attributes on the reload button, file context menu
  button, and new file button

## [0.14.6] - 2021-10-18

### Fixed

- Fixed bug where files could not be deleted or renamed using MWC v0.25.2 or
  above.

## [0.14.5] - 2021-10-07

### Fixed

- Upgraded `es-module-lexer` dependency to bring in fix for
  https://github.com/guybedford/es-module-lexer/issues/92.

## [0.14.4] - 2021-10-06

### Fixed

- Fixed positioning of overlay that displays over previews when service workers
  are not available so that it is constrained to the preview, rather than the
  nearest containing positioned ancestor.

## [0.14.3] - 2021-10-06

### Added

- Added an overlay that will display over the preview when we detect that
  service workers are not available. One reason this can happen is using
  Playground in Firefox private browsing mode, which does not support service
  workers (https://bugzilla.mozilla.org/show_bug.cgi?id=1320796).

- Added `cursorPosition`, `cursorIndex`, and `tokenUnderCursor` getters to
  `<playground-code-editor>`.

### Changed

- Upgraded dependencies, including CodeMirror.

### Fixed

- Fixed a bottleneck that prevented previews from loading until semantic
  TypeScript errors were computed. This should significantly improve the latency
  between updating a file and the new preview loading.

- Fixed bug where parent window history entries were added every time the
  preview reloaded.

- Improvements to service worker version updates:

  - The service worker will require less frequent updates going forward.
    Previously it needed updating for every playground-elements release. Now it
    only needs updating if the bytes of the service worker have changed between
    releases.

  - The default service worker scope has changed from
    `<sandboxBaseUrl>/playground-project` to
    `<sandboxBaseUrl>/__playground_swfs_<serviceWorkerHash>`. This should make service
    worker updates more reliable because old and new versions of service workers
    will no longer be in contention to control the same URLs.

  - Misc other small service worker robustness improvements, and additional
    logging to help debug future issues.

## [0.14.2] - 2021-09-30

### Changed

- Updated bundled version of TypeScript to 4.4.3.
- Internal refactoring of language service.

## [0.14.1] - 2021-09-21

### Changed

- GitHub org changed from PolymerLabs to google.

## [0.14.0] - 2021-09-20

### Changed

- Upgrade to Lit 2.0.
- TypeScript files are now compiled incrementally for improved performance

### Fixed

- Fixed bug where the `value` property of a `<playground-code-editor>` did not take effect if set before element upgrade.

### Added

- It is now possible to set the `value` of a `<playground-code-editor>` using the `value` HTML attribute.

## [0.13.0] - 2021-09-14

### Changed

- Node [package exports](https://nodejs.org/api/packages.html#packages_exports)
  are now supported when resolving dependency modules.

  The `module`, `import`, and `development`
  [conditions](https://nodejs.org/api/packages.html#packages_conditional_exports)
  are enabled.

  Note this change should not theoretically be **BREAKING**, but this release is
  versioned with a major increment because there a risk of breakage in practice
  due to misconfigured `package.json` files, differences between `prod` and
  `dev` modes, etc.

### Added

- Added `modified` property to `<playground-project>` and `<playground-ide>`
  which indicates whether the user has modified, added, or removed any project
  files. Resets whenever a new project is loaded.

## [0.12.1] - 2021-08-26

### Changed

- If a file is marked `hidden`, and the user creates a new file by that name,
  the file will become visible and editable.

## [0.12.0] - 2021-08-17

### Fixed

- Fixes duplicate module errors by canonicalizing all import specifiers. Import
  specifiers are now canonicalized by version number and default module. This
  applies both to local project files, and throughout the entire external
  dependency tree.

- Import maps now apply to modules in external dependencies, not just to local
  project files.

- The TypeScript compiler can now deal with multiple versions of the same
  dependency. Previously, if the import graph included two versions of the same
  package, only one arbitrary version of the types would be compiled. This
  caused various errors and missing type issues.

### Changed

- If the project contains a `package.json` file, then its
  [`dependencies`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies)
  field will be used to determine the version of dependencies (just like how NPM
  works locally).

- Dependencies are now served from the special
  "<service-worker-scope>/node_modules/..." path, instead of directly from
  `https://unpkg.com/...?module` URLs. Behind-the-scenes, dependencies are still
  fetched from unpkg, but they are now themselves transformed to ensure correct
  specifier canonicalization.

- **BREAKING** Due to large changes to the way dependencies are handled, there
  is some risk of breakage due to subtle behavior changes that existing
  configurations may be relying on. Therefore, this release is versioned with a
  major increment.

## [0.11.1] - 2021-08-09

### Added

- Added MIME-type detection for the following project file extensions: `gif`,
  `ico`, `jpeg`, `jpg`, `mid`, `midi`, `mp3`, `png`, `svg`, `weba`, `webm`,
  `webp`.

## [0.11.0] - 2021-07-28

### Fixed

- Playgrounds now ensure that the service worker they are connected to have a
  matching version. Fixes issues relating to playgrounds being broken for some
  time after an upgrade.

- The `--playground-tab-bar-font-size` CSS custom property now behaves as
  documented, and defaults to `14px`.

- The `--playground-floating-controls-color` CSS custom property now behaves as
  documented.

- Fix missing `.js` extension from import in `build.js` that may have broken
  Webpack and other builds.

- The hover effect and touch area for tabs in the tab bar are no longer offset
  by the height of the active tab indicator.

- Fix bug that caused failures to load `d.ts` files and "Could not resolve
  module specifier" console errors when using import maps.

### Changed

- **BREAKING** `playground-base-url` is now resolved relative to the
  `import.meta.url` of the module containing the definition of
  `<playground-project>`, instead of relative to `document.location.href` as
  before. This means that `.` can now be used to refer to the local playground
  installation directory.

- The service worker now sets the `Origin-Agent-Cluster: ?1` heading on all
  responses, to encourage browsers to allocate a separate process or thread for
  Playground preview iframe under certain conditions. See the [Process
  isolation](https://github.com/google/playground-elements#process-isolation)
  section of the README for more details.

- It is now possible to change the `font-family` of the tab-bar using a
  `::part(tab-bar)` selector.

## [0.10.1] - 2021-07-14

### Changed

- Bumped MWC dependency versions.

## [0.10.0] - 2021-07-01

### Added

- Adds `--playground-code-padding` and `--playground-code-line-padding` for
  configuring code editor padding.

- Bare module specifiers are now transformed in dynamic `import()` statements.

### Changed

- **BREAKING** The `src/` directory is no longer published to NPM.

- **BREAKING** `.js` files are no longer compiled by TypeScript, so they cannot
  contain types, decorators, or other TypeScript-specific syntax.

- Previews will now begin loading immediately, instead of waiting for
  compilation to completely finish, and each `.js` file is served as it
  compiles.

### Fixed

- Query parameters are now ignored when serving files from the virtual file
  system.

## [0.9.4] - 2021-05-18

### Fixed

- Fixed timeouts when using the default `unpkg.com` service worker origin,
  caused by `comlink` versions being out-of-sync between local components and
  remote service worker.

### Added

- Added `readonly` property to `<playground-file-editor>`.

## [0.9.3] - 2021-05-05

### Changed

- Error tooltips now follow `--playground-code-font-family`.
- Optimized the UX for fast compile and display by switching to a leading edge
  debouncer and eliminating the minimum display time for the loading bar.

## [0.9.2] - 2021-04-26

### Changed

- Playground now executes code on the unpkg.com origin by default, meaning user
  code execution is now sandboxed by default. The sandbox URL can still be
  changed with the `sandboxBaseUrl` property or `sandbox-base-url` attribute,
  though it is highly advisable to always use a separate and unprivileged
  origin.

## [0.9.1] - 2021-04-19

### Changed

- Tab key now inserts 2 spaces instead of a tab character.

### Fixed

- Fixed missing vertical scrollbars.
- Fixed transparent region between horizontal and vertical scrollbars.

## [0.9.0] - 2021-04-13

### Changed

- Focusing the editor using the Tab key no longer activates edit mode
  immediately. This prevents the Tab key from being trapped, which was an
  accessibility problem for keyboard users.

  Instead, when the editor is focused, users can now press Enter to begin
  editing, and Escape to stop editing. A prompt is displayed with these
  instructions when focused. Focusing the editor with a mouse click continues to
  activate edit mode immediately, as before.

- The editor now uses the CodeMirror `contenteditable` input style, which has
  much better screen reader support.

- Line numbers are now annotated with `aria-hidden` so that they are not voiced
  by screen readers.

- Increased default `line-height` from `normal` to `1.4em`.

- Added a default `padding-left` of `1em`.

- Increased width of cursor from `1px` to `2px`.

- Increased default tab `font-size` from `0.75rem` to `0.8em`;

- Increased default `--playground-bar-height` from `35px` to `40px.

- `--playground-cursor-color` now defaults to the value of
  `--playground-code-default-color`.

- `--playground-code-gutter-background` now defaults to the value of
  `--playground-code-background`.

- `--playground-code-gutter-margin-right` default changed from `1px solid #ddd` to `none`.

- `--playground-code-linenumber-color` default changed from `#999` to `#767676`.

### Added

- Added `playground-styles.css` and `playground-styles.js` which can be imported
  to apply Playground styles to server-side rendered code.

- Added `dialog` CSS shadow part to `code-editor`, `file-editor`, and `ide` for
  styling modal dialogs that appear over the editor (currently just used for the
  keyboard help that shows when the editor is focused using the keyboard).

- Added CSS custom properties:

  - `--playground-code-line-height`: `line-height` of code in the editor.
  - `--playground-tab-bar-font-size`: `font-size` of tabs in the file picker tab
    bar.
  - `--playground-tab-bar-active-color`: Text `color` of active file-picker tab.
  - `--playground-tab-bar-indicator-color`: `color` of the active tab indicator
    line (use `transparent` to hide).
  - `--playground-tab-bar-active-background`: `background` of the active file-picker tab.

- Added `aria-label` attribute to reload, new file, and file context menu
  buttons.

- Added `title` attribute to preview `<iframe>` element.

- Added `aria-label` to the preview loading indicator, and set
  `aria-hidden=true` when the preview is not loading.

## [0.8.0] - 2021-04-02

### Added

- TypeScript type errors are now displayed inline. Previously, only syntax
  errors were displayed. Type errors may take slightly longer to appear than
  syntax errors, because they require fetching `.d.ts` files and running a more
  expensive compiler pass.

### Changed

- [**BREAKING**] Removed `--playground-error-border` property, and updated
  inline error style from a dashed border to a red squiggle.

## [0.7.0] - 2021-03-30

### Changed

- [**BREAKING**] Replaced `files` getter/setter on `<playground-project>` and
  `<playground-ide>` with `config` getter/setter. This property has the same
  type as the JSON config, and can be used to save/restore the state of all
  files and other configuration.

### Fixed

- TypeScript errors of the form `Property '...' does not exist on type` and
  `Cannot find name '...'` are now suppressed (temporarily until `d.ts` files
  are fetched).

## [0.6.6] - 2021-03-29

### Fixed

- Fixed missing `@types/codemirror` dependency.

## [0.6.5] - 2021-03-29

### Fixed

- Fixed missing `lib/codemirror.js` file in NPM package.

## [0.6.4] - 2021-03-29

### Added

- TypeScript errors are now displayed in the editor with red underlines. A
  tooltip displaying the error is shown on hover.

  - Note that only basic/syntactic errors are currently shown, because typings
    of dependencies are not currently available to compilation.

- Added CSS property `--playground-error-border`, the `border-bottom` of code
  spans with an error (`2px red dashed` by default).

- Added CSS shadow part `diagnostic-tooltip` for styling the tooltip that
  appears when hovering over an error.

## [0.6.3] - 2021-03-24

### Added

- Added optional `hidden` property/attribute which prevents a file from being
  displayed in the tab bar.

- Added support for JSON files with syntax highlighting.

- Added `extends` property to JSON config file, an optional URL of another JSON
  config file to extend from. Useful for setting side-wide defaults.

### Fixed

- Fixed bug where editor did not immediately switch to newly created files.

- Fixed bug where `label` was ignored in tab bar.

## [0.6.2] - 2021-03-02

### Added

- Added `content` and `contentType` as optional properties of the JSON manifest.

### Changed

- License headers shortened to concise SPDX style.

### Fixed

- Fixed infinite loop that could occur when switching between two files that
  both contain code folding/hiding regions.

## [0.6.1] - 2021-03-01

### Added

- Added `playground-hide` and `playground-fold` region comments that hide and
  fold regions of a file, while still compiling and serving them, to help users
  focus on the relevant code. See
  https://github.com/google/playground-elements#hiding--folding for
  details.

## [0.6.0] - 2021-02-19

### Changed

- [**BREAKING**] Leading whitespace that is common to all lines of slotted
  `<script>` files will now be trimmed, along with empty leading/trailing lines.
  To disable this behavior, add the `preserve-whitespace` attribute.

### Added

- Added `--playground-floating-controls-color` to control the highlight color of
  buttons and text inputs in floating add/remove/rename file controls. Defaults
  to `var(--playground-highlight-color, #6200ee)`.

### Fixed

- Playground can now be imported from Skypack.

- Fix bugs where `--playground-tab-bar-background` and
  `--playground-tab-bar-foreground-color` did not apply correctly.

## [0.5.0] - 2021-01-30

### Changed

- [**BREAKING**] When both `projectSrc` and `files` are set, it is now the _most
  recently set_ property that wins. Previously, `files` always won.

- `<playground-preview>` now auto-reloads after 300ms, previously 500ms.

### Added

- `<playground-project>` now emits a `compileStart` and `compileDone` event.

### Removed

- [**BREAKING**] `<playground-project>` no longer emits a `contentChanged` event.

## [0.4.3] - 2021-01-21

### Fixed

- Do not add `?module` parameter to import map URLs for bare module specifiers,
  only to fallback unpkg.com URLs.

- Prevent `z-index` issues with CodeMirror scrollbars and other elements by
  using a separate stacking context.

### Changed

- `<playground-preview>` now has a default label (called `location`) of
  `"Result"`.

## [0.4.2] - 2021-01-21

### Added

- Import maps are now supported. This allows customizing the URL that a bare
  module specifier resolves to, e.g. to a specific version, or to a different
  CDN.

  Note that import maps currently only apply to the _immediate imports of
  project source files_, not to external transitive dependencies.

  Also note `scopes` are not yet supported, only `imports`.

  See https://github.com/WICG/import-maps and
  https://wicg.github.io/import-maps/ for more information on import maps.

  Previously, all bare modules resolved to unpkg.com URLs at the latest version.
  This continues to be the fallback behavior if no import map is provided, or no
  entry in it matches.

  To specify an import map in a JSON project manifest, add an `importMap`
  property:

  ```json
  {
    "files": {
      "index.html": {},
      "my-element.ts": {}
    },
    "importMap": {
      "imports": {
        "lit-html": "https://unpkg.com/lit-html@next-major",
        "lit-html/": "https://unpkg.com/lit-html@next-major/"
      }
    }
  }
  ```

  To specify an import map inline, add a `<script type="sample/importmap">`
  slotted child:

  ```html
  <playground-ide>
    <script type="sample/importmap">
      {
        "imports": {
          "lit-html": "https://unpkg.com/lit-html@next-major",
          "lit-html/": "https://unpkg.com/lit-html@next-major/"
        }
      }
    </script>
    ...
  </playground-ide>
  ```

### Fixed

- Bare module imports in `.js` files are now resolved in the same way as `.ts`
  files.

## [0.4.1] - 2021-01-15

### Fixed

- Fixed `<playground-file-editor>` not always displaying initial file.
- Fixed `editable-file-system` attribute name (was `editableFileSystem`).
- Fixed `<playground-ide>` not stretching `<playground-file-editor>` vertically.

## [0.4.0] - 2021-01-15

### Added

- Added `editableFileSystem` property (`editable-file-system` attribute) to
  `<playground-ide>`. When `true`, the user will be able to create, delete, and
  rename files in the virtual filesystem.

  - To create a new file: click the "+" icon button in the tab bar.
  - To rename a file: click the three-dots menu button on its tab, and select
    "Rename".
  - To delete a file: click the three-dots menu button on its tab, and select
    "Delete".

- Added `<playground-file-system-controls>` element which displays popup
  menus/dialogs for creating, deleting, and renaming files.

### Changed

- [**BREAKING**] The tab bar has been factored into a new standalone element
  called `<playground-tab-bar>`. The `<playground-file-editor>` element no
  longer integrates the tab bar, and the `noFilePicker` property has been
  removed.

- [**BREAKING**] The following CSS custom properties have been renamed:

  - `--playground-file-picker-background` -> `--playground-tab-bar-background`
  - `--playground-file-picker-foreground` -> `--playground-tab-bar-foreground`

- [**BREAKING**] The following CSS shadow parts have been renamed:

  - `file-picker` -> `tab-bar`

## [0.3.7] - 2021-01-08

### Added

- Added `files` property to `<playground-ide>` and `<playground-project>`. Use
  this property to directly get and set the array of project files (e.g. to
  save/restore the project state).

  Note that directly setting `files` always takes precedence over setting
  `projectSrc`, and both take precedence over slotted children.

### Changed

- It is no longer necessary to load the Material Icons font. The reload button
  icon is now inlined SVG.

### Fixed

- Fix caret placement issues with some dynamic layouts.

## [0.3.6] - 2020-12-08

### Fixed

- Fix shifted/hidden code in Safari when line numbers are enabled.

## [0.3.5] - 2020-12-03

### Fixed

- Fix `mwc-tab` race condition bug (dependency version bump).

## [0.3.4] - 2020-12-03

### Changed

- The playground service worker now serves its own 404s when a file is not
  found, instead of forwarding the request to the server.

### Fixed

- Fix race condition where preview could load too early and 404.
- Fix race condition where preview could sometimes never load.
- Fix preview 404 that could occur after leaving page idle for some time.

## [0.3.3] - 2020-12-01

### Fixed

- Fix Safari scrolling bug by limiting preview max-height.

## [0.3.2] - 2020-11-30

### Fixed

- Fix installation error relating to missing `node_modules/puppeteer` directory.

### Changed

- Bumped and un-pinned `@material/mwc` dependencies.

### Removed

- Removed some unnecessary files from NPM package.

## [0.3.1] - 2020-11-11

### Fixed

- Remove debugging log statement.
- Remove unecessary file from NPM package.

## [0.3.0] - 2020-11-11

### Changed

- [**BREAKING**] `service-worker.js` has been renamed to
  `playground-service-worker.js`, `typescript-worker.js` has been renamed to
  `playground-typescript-worker.js`, and an additional file called
  `playground-service-worker-proxy.html` is now also required. This change may
  affect bundling configurations.

### Added

- Service Workers and scripts are now able and advised to run on a second
  origin, in order to isolate arbitrary script execution from sensitive actions
  or data on the host origin.

  The `sandboxBaseUrl` property (or `sandbox-base-url` attribute) has been added
  `<playground-ide>` and `<playground-project>` to control this origin.

  If the default same origin is used, a warning will be logged to the console.

## [0.2.0] - 2020-10-28

### Changed

- [**BREAKING**] Replaced `theme` property with new custom property based
  theming system (see below).

- [**BREAKING**] Renamed CSS custom properties:
  - `playground-code-color` -> `playground-code-default-color`
  - `playground-file-editor-background-color` -> `playground-code-background`
  - `playground-file-picker-background-color` -> `playground-file-picker-background`
  - `playground-preview-toolbar-background-color` -> `playground-preview-toolbar-background`

### Added

- Added CSS Custom Properties for configuring the CodeMirror theme.

  Includes broad properties like `--playground-code-background` and
  `--playground-selection-color`, as well as token-specific properties like
  `--playground-code-keyword-color` and `--playground-code-string-color`.

  See the `themes/` directory for more examples of what can be customized.

- Added `themes/` directory which includes CSS files and JS modules for each of
  the standard CodeMirror themes, adapted to use CSS Custom Properties.

  Use the configurator at https://google.github.io/playground-elements/ to
  try out the available themes.

  To load a theme, load its stylesheet into your document or shadow root scope,
  and set the corresponding `playground-theme-NAME` class on any playground
  element or ancestor.

  In HTML:

  ```html
  <head>
    <link
      rel="stylesheet"
      href="/node_modules/playground-elements/themes/mbo.css"
    />
  </head>

  <body class="playground-theme-mbo">
    <playground-ide></playground-ide>
  </body>
  ```

  In a LitElement:

  ```js
  import mbo from 'playground-elements/themes/mbo.css.js';

  class MyElement extends LitElement {
    static styles = [mbo, css`...`];

    render() {
      return `
        <playground-ide class="playground-theme-mbo">
        </playground-ide>
      `;
    }
  }
  ```

### Fixed

- Fix inconsistent line-number guttter sizing.

## [0.1.1] - 2020-10-26

### Added

- Added `--playground-preview-size` CSS custom property to control the initial
  size of the RHS preview bar in `<playground-ide>`. The LHS editor will take up
  all additional space. Defaults to `30%`.

- Added `resizable` property/attribute which allows users to click and drag in
  the space between the LHS editor and RHS preview of `<playground-ide>` to
  change their relative sizes.

### Fixed

- Invalid module import paths.
- Reload button icon now respects `--playground-preview-toolbar-foreground-color`.

### Changed

- TypeScript decorator runtime is now imported from `tslib` instead of inlined.

## [0.1.0] - 2020-10-24

- [**BREAKING**] NPM package and GitHub repo renamed from `code-sample-editor`
  to `playground-elements`.

- [**BREAKING**] Renamed all elements:

  - `<code-sample> -> <playground-ide>`
  - `<code-sample-project>` -> `<playground-project>`
  - `<code-sample-editor>` -> `<playground-file-editor>`
  - `<codemirror-editor>` -> `<playground-code-editor>`

- [**BREAKING**] Renamed all element JS modules:
  - `./lib/code-sample.js` -> `./playground-ide.js`
  - `./lib/code-sample-project.js` -> `./playground-project.js`
  - `./lib/code-sample-editor.js` -> `./playground-file-editor.js`
  - `./lib/codemirror-editor.js` -> `./playground-code-editor.js`

## [0.1.0-pre.4] - 2020-10-22

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

- The `<code-sample>` side-by-side layout is now consistently 70%/30% (widths can be
  changed using the `editor` and `preview` CSS shadow parts).

### Added

- Add syntax highlighting of TypeScript files.

- Add syntax highlighting of nested HTML and CSS inside JS/TS.

- Add `filename` property/attribute to `<code-sample-editor>` which allows
  getting and setting the currently selected file.

- Add `noFilePicker` property (`no-file-picker` attribute) to
  `<code-sample-editor>` which disables the top file selection tab-bar.

- Add `lineNumbers` property (`line-numbers` attribute) to `<code-sample>`,
  `<code-sample-editor>`, and `<codemirror-editor>` which enables the
  left-hand-side gutter with line numbers. Off by default.

- Add a `<slot>` to `<code-sample-editor>` which will be displayed until the
  file is loaded. This facilitates pre-rendering syntax-highlighted code before
  both the element has upgraded, and before the project file has been fetched.

- Add a `<slot>` to `<code-sample-preview>` which will be displayed until the
  preview iframe has loaded for the first time. This facilitates pre-rendering
  preview HTML both before both the element has upgraded, and before the live
  preview first renders.

- Add `label` property and attribute to project files. When set, the file picker
  will display this label instead of the filename.

- An animated progress bar now displays when a preview is loading.

- Added CSS Shadow Parts:

  - `<code-sample-editor>`: `file-picker`
  - `<code-sample-preview>`: `preview-toolbar`, `preview-location`, `preview-reload-button`, `preview-loading-indicator`
  - `<code-sample>`: `editor`, `preview`, `file-picker`, `preview-toolbar`, `preview-location`, `preview-reload-button`, `preview-loading-indicator`

- Added CSS Custom Properties:

  - `--playground-code-font-family`
  - `--playground-code-font-size`
  - `--playground-editor-background-color`
  - `--playground-file-picker-background-color`
  - `--playground-file-picker-foreground-color`
  - `--playground-preview-toolbar-background-color`
  - `--playground-preview-toolbar-foreground-color`
  - `--playground-border`
  - `--playground-highlight-color`
  - `--playground-bar-height`

- Added `theme` property to `<code-sample>`, `<code-sample-editor>`, and
  `<codemirror-editor>`, which sets the theme (currently only `default`,
  `monokai`, `ambiance`, `ayu-mirage` are available, but a way to load other
  themes will follow).

- Previews will now automatically reload on changes (0.5 second debounce).

- Added `readonly` property/attribute to `<codemirror-editor>` which disables
  the ability to edit.

### Fixed

- Fix absent CSS syntax highlighting.
- Fix various styling/layout glitches.
- Fix service worker and TypeScript worker URLs, which reached up too many
  parent directories.

## [0.1.0-pre.3] - 2020-10-05

### Fixed

- Fix missing CodeMirror styles on Firefox and Safari.
- Fix Safari crashes in `<mwc-tab>` code.

## 0.1.0-pre.2 - 2020-09-12

### Fixed

- Fix extra/missing files.

## 0.1.0-pre.1 - 2020-09-12

- Initial release.

[unreleased]: https://github.com/google/playground-elements/compare/v0.18.1...HEAD
[0.18.1]: https://github.com/google/playground-elements/compare/v0.18.0...v0.18.1
[0.18.0]: https://github.com/google/playground-elements/compare/v0.17.1...v0.18.0
[0.17.1]: https://github.com/google/playground-elements/compare/v0.17.0...v0.17.1
[0.17.0]: https://github.com/google/playground-elements/compare/v0.16.3...v0.17.0
[0.16.3]: https://github.com/google/playground-elements/compare/v0.16.2...v0.16.3
[0.16.2]: https://github.com/google/playground-elements/compare/v0.16.1...v0.16.2
[0.16.1]: https://github.com/google/playground-elements/compare/v0.16.0...v0.16.1
[0.16.0]: https://github.com/google/playground-elements/compare/v0.15.5...v0.16.0
[0.15.5]: https://github.com/google/playground-elements/compare/v0.15.4...v0.15.5
[0.15.4]: https://github.com/google/playground-elements/compare/v0.15.3...v0.15.4
[0.15.3]: https://github.com/google/playground-elements/compare/v0.15.2...v0.15.3
[0.15.2]: https://github.com/google/playground-elements/compare/v0.15.1...v0.15.2
[0.15.1]: https://github.com/google/playground-elements/compare/v0.15.0...v0.15.1
[0.15.0]: https://github.com/google/playground-elements/compare/v0.15.0-pre.5...v0.15.0
[0.15.0-pre.5]: https://github.com/google/playground-elements/compare/v0.15.0-pre.4...v0.15.0-pre.5
[0.15.0-pre.4]: https://github.com/google/playground-elements/compare/v0.15.0-pre.3...v0.15.0-pre.4
[0.15.0-pre.3]: https://github.com/google/playground-elements/compare/v0.15.0-pre.2...v0.15.0-pre.3
[0.15.0-pre.2]: https://github.com/google/playground-elements/compare/v0.15.0-pre.1...v0.15.0-pre.2
[0.15.0-pre.1]: https://github.com/google/playground-elements/compare/v0.14.8...v0.15.0-pre.1
[0.14.8]: https://github.com/google/playground-elements/compare/v0.14.7...v0.14.8
[0.14.7]: https://github.com/google/playground-elements/compare/v0.14.6...v0.14.7
[0.14.6]: https://github.com/google/playground-elements/compare/v0.14.5...v0.14.6
[0.14.5]: https://github.com/google/playground-elements/compare/v0.14.4...v0.14.5
[0.14.4]: https://github.com/google/playground-elements/compare/v0.14.3...v0.14.4
[0.14.3]: https://github.com/google/playground-elements/compare/v0.14.2...v0.14.3
[0.14.2]: https://github.com/google/playground-elements/compare/v0.14.1...v0.14.2
[0.14.1]: https://github.com/google/playground-elements/compare/v0.14.0...v0.14.1
[0.14.0]: https://github.com/google/playground-elements/compare/v0.13.0...v0.14.0
[0.13.0]: https://github.com/google/playground-elements/compare/v0.12.1...v0.13.0
[0.12.1]: https://github.com/google/playground-elements/compare/v0.12.0...v0.12.1
[0.12.0]: https://github.com/google/playground-elements/compare/v0.11.1...v0.12.0
[0.11.1]: https://github.com/google/playground-elements/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/google/playground-elements/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/google/playground-elements/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/google/playground-elements/compare/v0.9.4...v0.10.0
[0.9.4]: https://github.com/google/playground-elements/compare/v0.9.3...v0.9.4
[0.9.3]: https://github.com/google/playground-elements/compare/v0.9.2...v0.9.3
[0.9.2]: https://github.com/google/playground-elements/compare/v0.9.1...v0.9.2
[0.9.1]: https://github.com/google/playground-elements/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/google/playground-elements/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/google/playground-elements/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/google/playground-elements/compare/v0.6.6...v0.7.0
[0.6.6]: https://github.com/google/playground-elements/compare/v0.6.5...v0.6.6
[0.6.5]: https://github.com/google/playground-elements/compare/v0.6.4...v0.6.5
[0.6.4]: https://github.com/google/playground-elements/compare/v0.6.3...v0.6.4
[0.6.3]: https://github.com/google/playground-elements/compare/v0.6.2...v0.6.3
[0.6.2]: https://github.com/google/playground-elements/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/google/playground-elements/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/google/playground-elements/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/google/playground-elements/compare/v0.4.3...v0.5.0
[0.4.3]: https://github.com/google/playground-elements/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/google/playground-elements/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/google/playground-elements/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/google/playground-elements/compare/v0.3.7...v0.4.0
[0.3.7]: https://github.com/google/playground-elements/compare/v0.3.6...v0.3.7
[0.3.6]: https://github.com/google/playground-elements/compare/v0.3.5...v0.3.6
[0.3.5]: https://github.com/google/playground-elements/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/google/playground-elements/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/google/playground-elements/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/google/playground-elements/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/google/playground-elements/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/google/playground-elements/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/google/playground-elements/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/google/playground-elements/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/google/playground-elements/compare/v0.1.0-pre.4...v0.1.0
[0.1.0-pre.4]: https://github.com/google/playground-elements/compare/v0.1.0-pre.3...v0.1.0-pre.4
[0.1.0-pre.3]: https://github.com/google/playground-elements/releases/tag/v0.1.0-pre.3
