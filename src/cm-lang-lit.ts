/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {cssLanguage} from '@codemirror/lang-css';
import {htmlLanguage} from '@codemirror/lang-html';
import {javascriptLanguage, jsxLanguage} from '@codemirror/lang-javascript';
import {xmlLanguage} from '@codemirror/lang-xml';
import {LanguageSupport, LRLanguage} from '@codemirror/language';
import {
  type Input,
  type NestedParse,
  parseMixed,
  type SyntaxNode,
  type SyntaxNodeRef,
} from '@lezer/common';
import type {LRParser} from '@lezer/lr';

const parsers: Record<string, LRParser> = {
  html: htmlLanguage.parser,
  css: cssLanguage.parser,
  svg: xmlLanguage.parser,
  mathml: xmlLanguage.parser,
};

const litParseWrapper = parseMixed((ref: SyntaxNodeRef, input: Input) => {
  if (ref.name !== 'TemplateString') {
    return null;
  }

  // Get the tag name and find the parser for it.
  const tag = ref.node.prevSibling;
  if (tag === null) {
    return null;
  }

  // Safety check for range validity
  if (ref.from >= ref.to) {
    return null;
  }

  // Handle unclosed template literals by ensuring we have valid ranges
  const safeFrom = ref.from;
  const safeTo = Math.max(ref.to, safeFrom + 1); // Ensure to > from
  let tagName: string;

  if (tag.name === 'MemberExpression') {
    const prop = tag.lastChild;
    if (prop?.name !== 'PropertyName') {
      return null;
    }
    tagName = input.read(prop.from, prop.to);
  } else if (tag.name === 'VariableName') {
    tagName = input.read(tag.from, tag.to);
  } else {
    return null;
  }
  const parser = parsers[tagName];
  if (parser === undefined) {
    return null;
  }

  // If there are no interpolations, just return the parser to substitute for
  // the entire template string.
  if (ref.node.firstChild === null) {
    return {parser} satisfies NestedParse;
  }

  // If we have interpolations, return the parser and the overlay ranges that
  // match the template strings between the interpolations.
  const overlay: Array<{from: number; to: number}> = [];
  let from = safeFrom;
  let child: SyntaxNode | null = ref.node.firstChild;

  while (child !== null) {
    // Only add range if it's valid (from < to)
    if (from < child.from) {
      overlay.push({from, to: child.from});
    }
    from = child.to;
    child = child.nextSibling;
  }

  // Only add final range if it's valid
  if (from < safeTo) {
    overlay.push({from, to: safeTo});
  }

  // If we have no valid ranges, just return the parser without overlay
  if (overlay.length === 0) {
    return {parser} satisfies NestedParse;
  }

  return {parser, overlay} satisfies NestedParse;
});

/**
 * Taken from @codemirror/lang-javascript's implementation
 */
const jsLanguageData = {
  closeBrackets: {brackets: ['(', '[', '{', "'", '"', '`']},
  commentTokens: {line: '//', block: {open: '/*', close: '*/'}},
  indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
  wordChars: '$',
};

export const litLanguage = LRLanguage.define({
  name: 'lit',
  parser: javascriptLanguage.parser.configure({
    wrap: litParseWrapper,
  }),
  languageData: jsLanguageData,
});

export const litJsxLanguage = LRLanguage.define({
  name: 'lit-jsx',
  parser: jsxLanguage.parser.configure({
    wrap: litParseWrapper,
  }),
  languageData: jsLanguageData,
});

export const litTypeScriptLanguage = LRLanguage.define({
  name: 'lit-typescript',
  parser: javascriptLanguage.parser.configure({
    dialect: 'ts',
    wrap: litParseWrapper,
  }),
  languageData: jsLanguageData,
});

export const litTsxLanguage = LRLanguage.define({
  name: 'lit-tsx',
  parser: jsxLanguage.parser.configure({
    dialect: 'jsx ts',
    wrap: litParseWrapper,
  }),
  languageData: jsLanguageData,
});

/**
 * Language support for Lit, which builds on JavaScript/TypeScript and adds
 * support for HTML, CSS, SVG, and MathML tagged template literals.
 */
export const lit = (config: {jsx?: boolean; typescript?: boolean} = {}) => {
  const lang = config.jsx
    ? config.typescript
      ? litTsxLanguage
      : litJsxLanguage
    : config.typescript
    ? litTypeScriptLanguage
    : litLanguage;

  return new LanguageSupport(lang, [
    lang.extension,
    htmlLanguage.extension,
    cssLanguage.extension,
    xmlLanguage.extension,
  ]);
};
