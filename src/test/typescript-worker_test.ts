/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {checkTransform} from './worker-test-util.js';

import {BuildOutput, SampleFile} from '../shared/worker-api.js';
import {CdnData} from './fake-cdn-plugin.js';

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
          content: 'export const foo = 3;\n',
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
          content: 'let foo = 3;\n' + 'foo = "foo";\n',
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
          import {strFn} from "foo";
          import {numFn} from "foo/bar.js";
          strFn(123);
          numFn("str");
        `,
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '2.0.0': {
            files: {
              'package.json': {
                content: '{"main": "index.js"}',
              },
              'index.js': {
                content: 'export const strFn = (s) => s;',
              },
              'bar.js': {
                content: 'export const numFn = (n) => n;',
              },
              'index.d.ts': {
                content: 'export declare const strFn: (s: string) => string;',
              },
              'bar.d.ts': {
                content: 'export declare const numFn: (n: number) => number;',
              },
            },
          },
        },
      },
    };
    const expected: BuildOutput[] = [
      {
        diagnostic: {
          code: 2345,
          message:
            "Argument of type 'number' is not assignable to parameter of type 'string'.",
          range: {
            end: {
              character: 19,
              line: 3,
            },
            start: {
              character: 16,
              line: 3,
            },
          },
          severity: 1,
          source: 'typescript',
        },
        filename: 'index.ts',
        kind: 'diagnostic',
      },
      {
        diagnostic: {
          code: 2345,
          message:
            "Argument of type 'string' is not assignable to parameter of type 'number'.",
          range: {
            end: {
              character: 21,
              line: 4,
            },
            start: {
              character: 16,
              line: 4,
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
            'import { strFn } from "./node_modules/foo@2.0.0/index.js";\nimport { numFn } from "./node_modules/foo@2.0.0/bar.js";\nstrFn(123);\nnumFn("str");\n',
          contentType: 'text/javascript',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@2.0.0/index.js',
          content: 'export const strFn = (s) => s;',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@2.0.0/bar.js',
          content: 'export const numFn = (n) => n;',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('respects package.json dependency for semantic errors', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.ts',
        content: `
          import {foo} from "foo";
          foo(123);
        `,
      },
      {
        name: 'package.json',
        content: `{
          "dependencies": {
            "foo": "^1.0.0"
          }
        }`,
      },
    ];
    const cdn: CdnData = {
      foo: {
        // foo takes a string in 1.0.0, and a number in 2.0.0. We should expect
        // an error because we depend on 1.0.0.
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'export const foo = (s) => s;',
              },
              'index.d.ts': {
                content: `
                  import type {t} from './type.js';
                  export declare const foo: (s: t) => t;
                `,
              },
              'type.d.ts': {
                content: `export type t = string;`,
              },
            },
          },
          '2.0.0': {
            files: {
              'index.js': {
                content: 'export const foo = (n) => n;',
              },
              'index.d.ts': {
                content: 'export declare const foo: (n: number) => number;',
              },
            },
          },
        },
      },
    };
    const expected: BuildOutput[] = [
      {
        diagnostic: {
          code: 2345,
          message:
            "Argument of type 'number' is not assignable to parameter of type 'string'.",
          range: {
            end: {
              character: 17,
              line: 2,
            },
            start: {
              character: 14,
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
            'import { foo } from "./node_modules/foo@1.0.0/index.js";\nfoo(123);\n',
          contentType: 'text/javascript',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/index.js',
          content: 'export const foo = (s) => s;',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'package.json',
          content: `{
          "dependencies": {
            "foo": "^1.0.0"
          }
        }`,
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('prefers typings from: typings, types, main, index.d.ts', async () => {
    const wrong = {
      content: 'export type StringType = number;',
    };
    const files: SampleFile[] = [
      {
        name: 'index.ts',
        content: `
          import {StringType} from "a";
          export const str: StringType = "foo";
        `,
      },
    ];
    const cdn: CdnData = {
      a: {
        versions: {
          '1.0.0': {
            files: {
              'package.json': {
                content: `{
                  "typings": "typings.d.ts",
                  "types": "types.d.ts",
                  "main": "main.js"
                }`,
              },
              'typings.d.ts': {
                content: 'export * from "b";',
              },
              'types.d.ts': wrong,
              'main.d.ts': wrong,
              'index.d.ts': wrong,
            },
          },
        },
      },
      b: {
        versions: {
          '1.0.0': {
            files: {
              'package.json': {
                content: `{
                  "types": "types.d.ts",
                  "main": "main.js"
                }`,
              },
              'typings.d.ts': wrong,
              'types.d.ts': {
                content: 'export * from "c";',
              },
              'main.d.ts': wrong,
              'index.d.ts': wrong,
            },
          },
        },
      },
      c: {
        versions: {
          '1.0.0': {
            files: {
              'package.json': {
                content: `{
                  "main": "main.js"
                }`,
              },
              'typings.d.ts': wrong,
              'types.d.ts': wrong,
              'main.d.ts': {
                content: 'export * from "d";',
              },
              'index.d.ts': wrong,
            },
          },
        },
      },
      d: {
        versions: {
          '1.0.0': {
            files: {
              'package.json': {
                content: `{}`,
              },
              'typings.d.ts': wrong,
              'types.d.ts': wrong,
              'main.d.ts': wrong,
              'index.d.ts': {
                content: 'export type StringType = string;',
              },
            },
          },
        },
      },
    };
    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content: `export const str = "foo";\n`,
          contentType: 'text/javascript',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('handles multiple versions', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.ts',
        content: `
          import {num} from "foo";
          import {str} from "str-or-num";
          const a: string = str;
          const b: number = num
        `,
      },
      {
        name: 'package.json',
        content: `{
          "dependencies": {
            "foo": "^1.0.0",
            "str-or-num": "^1.0.0"
          }
        }`,
      },
    ];
    const cdn: CdnData = {
      'str-or-num': {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'export const str = "str";',
              },
              'index.d.ts': {
                content: 'declare export const str: string;',
              },
            },
          },
          '2.0.0': {
            files: {
              'index.js': {
                content: 'export const num = 0;',
              },
              'index.d.ts': {
                content: 'declare export const num: number;',
              },
            },
          },
        },
      },
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'package.json': {
                content: `{
                  "dependencies": {
                    "str-or-num": "^2.0.0"
                  }
                }`,
              },
              'index.js': {
                content: `export * from 'str-or-num';`,
              },
              'index.d.ts': {
                content: `declare export * from 'str-or-num';`,
              },
            },
          },
        },
      },
      typescript: {
        versions: {
          '4.3.5': {
            files: {
              'lib/lib.dom.d.ts': {
                content: '',
              },
              'lib/lib.esnext.d.ts': {
                content: '',
              },
              'lib/lib.dom.iterable.d.ts': {
                content: '',
              },
            },
          },
        },
      },
    };
    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content:
            'import { num } from "./node_modules/foo@1.0.0/index.js";\nimport { str } from "./node_modules/str-or-num@1.0.0/index.js";\nconst a = str;\nconst b = num;\n',
          contentType: 'text/javascript',
        },
      },
      {
        file: {
          content: "export * from '../str-or-num@2.0.0/index.js';",
          contentType: 'text/javascript; charset=utf-8',
          name: 'node_modules/foo@1.0.0/index.js',
        },
        kind: 'file',
      },
      {
        file: {
          content: 'export const str = "str";',
          contentType: 'text/javascript; charset=utf-8',
          name: 'node_modules/str-or-num@1.0.0/index.js',
        },
        kind: 'file',
      },
      {
        file: {
          content: 'export const num = 0;',
          contentType: 'text/javascript; charset=utf-8',
          name: 'node_modules/str-or-num@2.0.0/index.js',
        },
        kind: 'file',
      },
      {
        file: {
          content:
            '{\n          "dependencies": {\n            "foo": "^1.0.0",\n            "str-or-num": "^1.0.0"\n          }\n        }',
          name: 'package.json',
        },
        kind: 'file',
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('compiles jsx file to js', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.jsx',
        content: `
          import React from "react";
          export const foo = (greeting) => <div>{greeting}</div>
        `,
      },
      {
        name: 'package.json',
        content: `{
          "dependencies": {
            "react": "^18.1.0"
          }
        }`,
      },
    ];

    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content:
            'import React from "./node_modules/react@18.1.0/index.js";\nexport const foo = (greeting) => React.createElement("div", null, greeting);\n',
          contentType: 'text/javascript',
        },
      },
      {
        kind: 'file',
        file: {
          content: 'export const createElement = (tag, props, children) => {};',
          contentType: 'text/javascript; charset=utf-8',
          name: 'node_modules/react@18.1.0/index.js',
        },
      },
      {
        kind: 'file',
        file: {
          content:
            '{\n          "dependencies": {\n            "react": "^18.1.0"\n          }\n        }',
          name: 'package.json',
        },
      },
    ];

    const cdn: CdnData = {
      react: {
        versions: {
          '18.1.0': {
            files: {
              'index.js': {
                content:
                  'export const createElement = (tag, props, children) => {};',
              },
            },
          },
        },
      },
    };

    await checkTransform(files, expected, {}, cdn);
  });

  test('compiles tsx file to js', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.tsx',
        content: `
          import * as React from "react";
          export const foo = (greeting: string) => <div>{greeting}</div>
        `,
      },
      {
        name: 'package.json',
        content: `{
          "dependencies": {
            "react": "^18.1.0"
          }
        }`,
      },
    ];

    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content:
            'import * as React from "./node_modules/react@18.1.0/index.js";\nexport const foo = (greeting) => React.createElement("div", null, greeting);\n',
          contentType: 'text/javascript',
        },
      },
      {
        kind: 'file',
        file: {
          content: 'export const createElement = (tag, props, children) => {};',
          contentType: 'text/javascript; charset=utf-8',
          name: 'node_modules/react@18.1.0/index.js',
        },
      },
      {
        kind: 'file',
        file: {
          content:
            '{\n          "dependencies": {\n            "react": "^18.1.0"\n          }\n        }',
          name: 'package.json',
        },
      },
    ];

    const cdn: CdnData = {
      react: {
        versions: {
          '18.1.0': {
            files: {
              'index.js': {
                content:
                  'export const createElement = (tag, props, children) => {};',
              },
              'index.d.ts': {
                content:
                  'declare export const createElement(tag: unknown, props: unknown, children: unknown) => unknown;',
              },
            },
          },
        },
      },
    };

    await checkTransform(files, expected, {}, cdn);
  });
});
