/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { EditorView } from 'codemirror';

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

export const playgroundTheme = EditorView.theme({
  '& .cm-scroller': {
    fontSize: 'var(--playground-code-font-size, 14px)',
    fontFamily: 'var(--playground-code-font-family, monospace)',
    lineHeight: 'var(--playground-code-line-height, 1.4em)',
  },
  '& .cm-line': {
    padding: 'var(--playground-code-line-padding, 0 4px)',
  },
  '& .cm-tooltip': {
    backgroundColor: 'var(--playground-code-background, white)',
    border: '1px solid var(--playground-code-selection-background, silver)',
    fontSize: 'var(--playground-code-font-size, 14px)',
    fontFamily: 'var(--playground-code-font-family, monospace)',
    color: 'var(--playground-code-default-color, #000)',
  },
  '& .cm-completionOption': {
    color: 'var(--playground-code-default-color, black)',
  },
  '& .cm-tooltip-autocomplete .cm-completionOption.cm-completionOption-selected': {
    background: 'var(--playground-code-background, rgba(0, 0, 0, 0.2))',
  },
  '& .cm-completionOption mark': {
    color: 'var(--playground-code-qualifier-color, #555)',
  },
  '& .cm-tooltip-autocomplete > ul > li > span.cm-completionDetail': {
    visibility: 'hidden',
    flex: 1,
    flexBasis: '80%',
    fontSize: 'calc(var(--playground-code-font-size, 14px) * .9)',
    lineHeight: 'calc(var(--playground-code-font-size, 14px) * 1.2)',
    color: 'var(--playground-code-string-2-color, #00f)',
    opacity: '0.8',
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& .cm-tooltip-autocomplete .cm-completionMatchedText': {
    color: 'var(--playground-code-keyword-color, #708)',
  },
  '& .cm-tooltip-autocomplete li[aria-selected="true"] .cm-completionDetail': {
    visibility: 'visible',
  },
  '& .cm-tooltip.cm-tooltip-autocomplete > ul': {
    maxWidth: 'min(600px, 95vw)',
  },
  '& .cm-tooltip.cm-tooltip-autocomplete > ul > li[role="option"]': {
    display: 'flex',
    paddingInline: '6px',
  },
  '& .cm-tooltip.cm-tooltip-autocomplete .cm-completionIcon': {
    display: 'none',
  },
  '& .cm-tooltip-autocomplete ul li[aria-selected]': {
    color: 'var(--playground-code-default-color, #000)',
  },
  '& .cm-tooltip-autocomplete > ul > li[aria-selected]': {
    backgroundColor: 'var(--playground-code-selection-background, #d7d4f0)',
    flex: 1,
  },
  '&': {
    padding: 'var(--playground-code-padding, 0)',
    height: '350px',
    color: 'var(--playground-code-default-color, #000)',
    backgroundColor: 'var(--playground-code-background, #fff)',
  },
  '& .cm-scrollbar-filler, & .cm-gutter-filler': {
    backgroundColor: 'var(--playground-code-background, #fff)',
  },
  '& .cm-gutters': {
    borderRight: 'var(--playground-code-gutter-border-right, none)',
    backgroundColor: 'var(--playground-code-gutter-background, var(--playground-code-background, #fff))',
    boxShadow: 'var(--playground-code-gutter-box-shadow, none)',
  },
  '& .cm-gutterElement': {
    color: 'var(--playground-code-linenumber-color, #767676)',
  },
  '& .cm-cursor, & .cm-dropCursor': {
    borderLeft: '1.2px solid var(--playground-code-cursor-color, var(--playground-code-default-color, #000))',
  },
  '& .tok-variableName': {
    color: 'var(--playground-code-variable-color, #000)',
  },
  '& .tok-keyword': {
    color: 'var(--playground-code-keyword-color, #708)',
  },
  '& .tok-literal': {
    color: 'var(--playground-code-literal-color, var(--playground-code-keyword-color, #219))',
  },
  '& .tok-atom, & .tok-literal': {
    color: 'var(--playground-code-atom-color, #219)',
  },
  '& .tok-number': {
    color: 'var(--playground-code-number-color, #164)',
  },
  '& .tok-bool': {
    color: 'var(--playground-code-bool-color, var(--playground-code-atom-color, #219))',
  },
  '& .tok-propertyName': {
    color: 'var(--playground-code-property-color, #000)',
  },
  '& .tok-className': {
    color: 'var(--playground-code-class-name, var(--playground-code-type-color, #085))',
  },
  '& .tok-definition': {
    color: 'var(--playground-code-def-color, #00f)',
  },
  '& .tok-operator': {
    color: 'var(--playground-code-operator-color, #000)',
  },
  '& .tok-variableName2': {
    color: 'var(--playground-code-variable-2-color, #05a)',
  },
  '& .tok-namespace': {
    color: 'var(--playground-code-variable-3-color, #085)',
  },
  '& .tok-typeName': {
    color: 'var(--playground-code-type-color, #085)',
  },
  '& .tok-comment': {
    color: 'var(--playground-code-comment-color, #a50)',
  },
  '& .tok-string': {
    color: 'var(--playground-code-string-color, #a11)',
  },
  '& .tok-string2': {
    color: 'var(--playground-code-string-2-color, #f50)',
  },
  '& .tok-meta': {
    color: 'var(--playground-code-meta-color, #555)',
  },
  '& .tok-modifier': {
    color: 'var(--playground-code-qualifier-color, #555)',
  },
  '& .tok-standard': {
    color: 'var(--playground-code-builtin-color, #30a)',
  },
  '& .tok-tagName': {
    color: 'var(--playground-code-tag-color, #170)',
  },
  '& .tok-attributeName': {
    color: 'var(--playground-code-attribute-color, #00c)',
  },
  '& .tok-labelName': {
    color: 'var(--playground-code-builtin-color, #30a)',
  },
  '& .cm-selectionBackground': {
    backgroundColor: 'var(--playground-code-selection-background, #d7d4f0)',
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground': {
    backgroundColor: 'var(--playground-code-selection-background, #d7d4f0)',
  },
  '& .cm-line::selection, & .cm-line > span::selection, & .cm-line > span > span::selection': {
    backgroundColor: 'var(--playground-code-selection-background, #d7d4f0)',
  },
});
