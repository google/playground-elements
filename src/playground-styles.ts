/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { css } from 'lit';

/*
 * @fileoverview
 *
 * This file is derived from \`code-mirror@^5/lib/codemirror.css\`, modified in
 * the following ways:
 *
 * - CSS custom properties added.
 * - Rules for anything that doesn't include custom properties removed.
 * - Updated to use CodeMirror 6 classHighlighter classes.
 * - Added styles for tooltips
 */

const styles = css`
.cm-editor {
  font-family: var(--playground-code-font-family, monospace);
  font-size: var(--playground-code-font-size, 14px);
  padding: var(--playground-code-padding, 0);
  height: 350px;
  color: var(--playground-code-default-color, #000);
  background: var(--playground-code-background, #fff);
  line-height: var(--playground-code-line-height, 1.4em);
}

.cm-editor .cm-line {
  padding: var(
    --playground-code-line-padding,
    0 4px
  );
}

.cm-editor .cm-scrollbar-filler,
.cm-editor .cm-gutter-filler {
  background: var(
    --playground-code-background,
    #fff
  );
}

.cm-editor .cm-gutters {
  border-right: var(--playground-code-gutter-border-right, none);
  background: var(
    --playground-code-gutter-background,
    var(--playground-code-background, #fff)
  );
  box-shadow: var(--playground-code-gutter-box-shadow, none);
}
.cm-editor .cm-gutterElement {
  color: var(--playground-code-linenumber-color, #767676);
}

.cm-editor .cm-cursor,
.cm-editor .cm-dropCursor{
  border-left: 1.2px solid
    var(
      --playground-code-cursor-color,
      var(--playground-code-default-color, #000)
    );
}

.tok-variableName {
  color: var(--playground-code-variable-color, #000);
}
.tok-keyword {
  color: var(--playground-code-keyword-color, #708);
}
.tok-literal {
  color: var(--playground-code-literal-color, var(--playground-code-keyword-color, #219));
}
.tok-atom, .tok-literal {
  color: var(--playground-code-atom-color, #219);
}
.tok-number {
  color: var(--playground-code-number-color, #164);
}
.tok-bool {
  color: var(--playground-code-bool-color, var(--playground-code-atom-color, #219));
}
.tok-propertyName {
  color: var(--playground-code-property-color, #000);
}
.tok-className {
  color: var(--playground-code-class-name, var(--playground-code-type-color, #085));
}
.tok-definition {
  color: var(--playground-code-def-color, #00f);
}
.tok-operator {
  color: var(--playground-code-operator-color, #000);
}
.tok-variableName2 {
  color: var(--playground-code-variable-2-color, #05a);
}
.tok-namespace {
  color: var(--playground-code-variable-3-color, #085);
}
.tok-typeName {
  color: var(--playground-code-type-color, #085);
}
.tok-comment {
  color: var(--playground-code-comment-color, #a50);
}
.tok-string {
  color: var(--playground-code-string-color, #a11);
}
.tok-string2 {
  color: var(--playground-code-string-2-color, #f50);
}
.tok-meta {
  color: var(--playground-code-meta-color, #555);
}
.tok-modifier {
  color: var(--playground-code-qualifier-color, #555);
}
.tok-standard {
  color: var(--playground-code-builtin-color, #30a);
}
.tok-tagName {
  color: var(--playground-code-tag-color, #170);
}
.tok-attributeName {
  color: var(--playground-code-attribute-color, #00c);
}
.tok-labelName {
  color: var(--playground-code-builtin-color, #30a);
}

.cm-selectionBackground {
  background: var(--playground-code-selection-background, #d7d4f0);
}
.cm-editor.cm-focused .cm-selectionBackground {
  background: var(--playground-code-selection-background, #d7d4f0);
}

.cm-line::selection,
.cm-line > span::selection,
.cm-line > span > span::selection {
  background: var(--playground-code-selection-background, #d7d4f0);
}

.cm-tooltip.cm-tooltip-autocomplete {
  border: 1px solid var(--playground-code-selection-background, silver);
  background: var(--playground-code-background, white);
  font-size: var(--playground-code-font-size, 14px);
  font-family: var(--playground-code-font-family, monospace);
  color: var(--playground-code-default-color, #000);
}

.cm-completionOption {
  color: var(--playground-code-default-color, black);
}

.cm-tooltip-autocomplete .cm-completionOption.cm-completionOption-selected {
  background: var(--playground-code-background, rgba(0, 0, 0, 0.2));
}

.cm-completionOption mark {
  color: var(--playground-code-qualifier-color, #555);
}


.cm-tooltip-autocomplete .cm-completionDetail {
  visibility: hidden;
  flex-basis: 80%;
  font-size: calc(var(--playground-code-font-size, 14px) * .9);
  line-height: calc(var(--playground-code-font-size, 14px) * 1.2);
  color: var(--playground-code-string-2-color, #00f);
  opacity: 0.8;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cm-tooltip-autocomplete .cm-completionMatchedText {
  color: var(--playground-code-keyword-color, #708);
}

.cm-tooltip-autocomplete li[aria-selected="true"] .cm-completionDetail {
  visibility: visible;
}

.cm-editor .cm-tooltip.cm-tooltip-autocomplete > ul {
  max-width: min(600px, 95vw);
}

.cm-tooltip.cm-tooltip-autocomplete > ul > li[role="option"] {
  display: flex;
  padding-inline: 6px;
}

.cm-tooltip.cm-tooltip-autocomplete .cm-completionIcon {
  display: none;
}

.cm-tooltip.cm-tooltip-autocomplete .cm-completionLabel {
  color: var(--playground-code-default-color, #000);
  flex: 1;
}

.cm-tooltip.cm-tooltip-autocomplete ul li[aria-selected] {
  background: var(--playground-code-background, rgb(215, 212, 240));
}
`;

export { styles };
