/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import type {BuildOutput, SampleFile} from '../shared/worker-api.js';
import type {CdnData} from './fake-cdn-plugin.js';

import {checkTransform} from './worker-test-util.js';

suite('typescript builder', () => {
  test('empty project', async () => {
    const files: SampleFile[] = [];
    const expected: BuildOutput[] = [];
    await checkTransform(files, expected);
  });

  test('compiles ts file to js', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.ts',
        content: 'export const foo: number = 3;',
      },
    ];
    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content: 'export const foo = 3;\r\n',
          contentType: 'text/javascript',
        },
      },
    ];
    await checkTransform(files, expected);
  });

  test('ignores js file', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'export const foo: number = 3;',
      },
    ];
    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content: 'export const foo: number = 3;',
        },
      },
    ];
    await checkTransform(files, expected);
  });

  test('emits syntax error', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.ts',
        content: ':',
      },
    ];
    const expected: BuildOutput[] = [
      {
        diagnostic: {
          code: 1128,
          message: 'Declaration or statement expected.',
          range: {
            end: {
              character: 1,
              line: 0,
            },
            start: {
              character: 0,
              line: 0,
            },
          },
          severity: 1,
          source: 'typescript',
        },
        filename: 'index.ts',
        kind: 'diagnostic',
      },
      {
        kind: 'file',
        file: {
          name: 'index.js',
          // TODO(aomarks) This should probably return a 400 error instead of an
          // empty but valid file.
          content: '',
          contentType: 'text/javascript',
        },
      },
    ];
    await checkTransform(files, expected);
  });

  test('emits local semantic error', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.ts',
        content: `
          let foo: number = 3;
          foo = "foo";
        `,
      },
    ];
    const expected: BuildOutput[] = [
      {
        diagnostic: {
          code: 2322,
          message: "Type 'string' is not assignable to type 'number'.",
          range: {
            end: {
              character: 13,
              line: 2,
            },
            start: {
              character: 10,
              line: 2,
            },
          },
          severity: 1,
          source: 'typescript',
        },
        filename: 'index.ts',
        kind: 'diagnostic',
      },
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content: 'let foo = 3;\r\n' + 'foo = "foo";\r\n',
          contentType: 'text/javascript',
        },
      },
    ];
    await checkTransform(files, expected);
  });

  test('emits semantic error from bare module', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.ts',
        content: `
          import {render} from "lit-html";
          render("hello");
        `,
      },
    ];
    const cdn: CdnData = {
      'lit-html': {
        versions: {
          '1.4.1': {
            files: {
              'lit-html.js': {
                content: '// TODO',
              },
            },
          },
        },
      },
    };
    const expected: BuildOutput[] = [
      {
        diagnostic: {
          code: 2554,
          message: 'Expected 2-3 arguments, but got 1.',
          range: {
            end: {
              character: 25,
              line: 2,
            },
            start: {
              character: 10,
              line: 2,
            },
          },
          severity: 1,
          source: 'typescript',
        },
        filename: 'index.ts',
        kind: 'diagnostic',
      },
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content:
            'import { render } from "./node_modules/lit-html@1.4.1/index.js";\r\n' +
            'render("hello");\r\n',
          contentType: 'text/javascript',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });
});
