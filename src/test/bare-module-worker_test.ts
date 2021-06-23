/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import type {
  BuildOutput,
  ModuleImportMap,
  SampleFile,
} from '../shared/worker-api.js';

import {checkTransform} from './worker-test-util.js';

suite('bare module builder', () => {
  test('transforms static bare module import to unpkg', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "lit-html";',
      },
    ];
    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content: 'import "https://unpkg.com/lit-html?module";',
        },
      },
    ];
    await checkTransform(files, expected);
  });

  test('transforms dynamic bare module import to unpkg', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import("lit-html");',
      },
    ];
    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content: "import('https://unpkg.com/lit-html?module');",
        },
      },
    ];
    await checkTransform(files, expected);
  });

  test('follows import map', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: `
          import "lit-html";
          import "lit-html/directives/repeat.js";
        `,
      },
    ];
    const importMap: ModuleImportMap = {
      imports: {
        'lit-html': 'https://cdn.skypack.dev/lit-html@2.0.0-pre.7',
        'lit-html/': 'https://cdn.skypack.dev/lit-html@2.0.0-pre.7/',
      },
    };
    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content: `
          import "https://cdn.skypack.dev/lit-html@2.0.0-pre.7";
          import "https://cdn.skypack.dev/lit-html@2.0.0-pre.7/directives/repeat.js";
        `,
        },
      },
    ];
    await checkTransform(files, expected, importMap);
  });

  test('emits syntax error', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        // Note es-module-lexer is very forgiving. It will only throw on syntax
        // errors around import/export statements.
        content: 'import"',
      },
    ];
    const expected: BuildOutput[] = [
      {
        diagnostic: {
          message: 'es-module-lexer error: Parse error @:1:7',
          range: {
            end: {
              character: 7,
              line: 0,
            },
            start: {
              character: 6,
              line: 0,
            },
          },
        },
        filename: 'index.js',
        kind: 'diagnostic',
      },
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content: 'import"',
        },
      },
    ];
    await checkTransform(files, expected);
  });
});
