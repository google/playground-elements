/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {build} from '../typescript-worker/build.js';
import type {
  BuildOutput,
  ModuleImportMap,
  SampleFile,
} from '../shared/worker-api.js';

const checkTransform = async (
  files: SampleFile[],
  expected: BuildOutput[],
  importMap: ModuleImportMap = {}
) => {
  const results: BuildOutput[] = [];
  await new Promise<void>((resolve) => {
    const emit = (result: BuildOutput) => {
      if (result.kind === 'done') {
        resolve();
      } else {
        results.push(result);
      }
    };
    build(files, importMap, emit);
  });
  assert.deepEqual(
    results.sort(sortBuildOutput),
    expected.sort(sortBuildOutput)
  );
};

const sortBuildOutput = (a: BuildOutput, b: BuildOutput) => {
  if (a.kind === 'file' && b.kind === 'file') {
    return a.file.name.localeCompare(b.file.name);
  }
  if (a.kind === 'diagnostic' && b.kind === 'diagnostic') {
    return a.diagnostic.message.localeCompare(b.diagnostic.message);
  }
  return a.kind.localeCompare(b.kind);
};

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

  test('transforms bare modules to unpkg', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.ts',
        content: 'import "lit-html";',
      },
    ];
    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content: 'import "https://unpkg.com/lit-html?module";\r\n',
          contentType: 'text/javascript',
        },
      },
    ];
    await checkTransform(files, expected);
  });

  test('follows import map', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.ts',
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
          content:
            'import "https://cdn.skypack.dev/lit-html@2.0.0-pre.7";\r\n' +
            'import "https://cdn.skypack.dev/lit-html@2.0.0-pre.7/directives/repeat.js";\r\n',
          contentType: 'text/javascript',
        },
      },
    ];
    await checkTransform(files, expected, importMap);
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
            'import { render } from "https://unpkg.com/lit-html?module";\r\n' +
            'render("hello");\r\n',
          contentType: 'text/javascript',
        },
      },
    ];
    await checkTransform(files, expected);
  });
});
