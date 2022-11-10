/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {checkTransform} from './worker-test-util.js';

import {
  BuildOutput,
  ModuleImportMap,
  SampleFile,
} from '../shared/worker-api.js';
import {CdnData} from './fake-cdn-plugin.js';

const browser = (() => {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) {
    return 'chrome';
  }
  if (ua.includes('Firefox')) {
    return 'firefox';
  }
  if (ua.includes('Safari')) {
    return 'safari';
  }
  return 'chrome';
})();

suite('bare module worker', () => {
  test('empty project', async () => {
    const files: SampleFile[] = [];
    const cdn: CdnData = {};
    const expected: BuildOutput[] = [];
    await checkTransform(files, expected, {}, cdn);
  });

  test('one simple static import', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo/index.js";',
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'index',
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
          content: 'import "./node_modules/foo@1.0.0/index.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/index.js',
          content: 'index',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('multiple static and dynamic imports', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: `
           import {a} from "foo/index.js";
           const {b} = import("foo/index.js");
           import {c} from "foo/index.js";
           const {d} = import("foo/index.js");
         `,
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: `
                   export const a = 'a';
                   export const b = 'b';
                   export const c = 'c';
                   export const d = 'd';
                   `,
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
          content: `
           import {a} from "./node_modules/foo@1.0.0/index.js";
           const {b} = import('./node_modules/foo@1.0.0/index.js');
           import {c} from "./node_modules/foo@1.0.0/index.js";
           const {d} = import('./node_modules/foo@1.0.0/index.js');
         `,
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/index.js',
          content: `
                   export const a = 'a';
                   export const b = 'b';
                   export const c = 'c';
                   export const d = 'd';
                   `,
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('namespaced NPM package', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "@foo/bar/index.js";',
      },
    ];
    const cdn: CdnData = {
      '@foo/bar': {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'index',
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
          content: 'import "./node_modules/@foo/bar@1.0.0/index.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/@foo/bar@1.0.0/index.js',
          content: 'index',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('default module uses package.json "module" field as 1st choice', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo";',
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'module.js': {
                content: 'module',
              },
              'main.js': {
                content: 'main',
              },
              'index.js': {
                content: 'index',
              },
              'package.json': {
                content: `{
                   "module": "module.js",
                   "main": "main.js"
                 }`,
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
          content: 'import "./node_modules/foo@1.0.0/module.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/module.js',
          content: 'module',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('default module uses package.json "main" field as 2nd choice', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo";',
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'module.js': {
                content: 'module',
              },
              'main.js': {
                content: 'main',
              },
              'index.js': {
                content: 'index',
              },
              'package.json': {
                content: `{
                   "main": "main.js"
                 }`,
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
          content: 'import "./node_modules/foo@1.0.0/main.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/main.js',
          content: 'main',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('default module uses "index.js" field as 3rd choice', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo";',
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'module.js': {
                content: 'module',
              },
              'main.js': {
                content: 'main',
              },
              'index.js': {
                content: 'index',
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
          content: 'import "./node_modules/foo@1.0.0/index.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/index.js',
          content: 'index',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('project file in nested directory', async () => {
    const files: SampleFile[] = [
      {
        name: 'some/sub/dir/index.js',
        content: 'import "foo/index.js";',
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'index',
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
          name: 'some/sub/dir/index.js',
          content: 'import "../../../node_modules/foo@1.0.0/index.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/index.js',
          content: 'index',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('import chain in dependency', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo/a.js";',
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'a.js': {
                content: 'import "./b.js";',
              },
              'b.js': {
                content: 'import "./c.js";',
              },
              'c.js': {
                content: 'c',
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
          content: 'import "./node_modules/foo@1.0.0/a.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/a.js',
          content: 'import "./b.js";',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/b.js',
          content: 'import "./c.js";',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/c.js',
          content: 'c',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('circular import in dependency', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo/a.js";',
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'a.js': {
                content: 'import "./b.js";',
              },
              'b.js': {
                content: 'import "./a.js";',
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
          content: 'import "./node_modules/foo@1.0.0/a.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/a.js',
          content: 'import "./b.js";',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/b.js',
          content: 'import "./a.js";',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test("version specified in local project's package.json", async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo/index.js";',
      },
      {
        name: 'package.json',
        content: `
           {
             "dependencies": {
               "foo": "^2.0.0"
             }
           }
         `,
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'foo1',
              },
            },
          },
          '2.0.0': {
            files: {
              'index.js': {
                content: 'foo2',
              },
            },
          },
          '3.0.0': {
            files: {
              'index.js': {
                content: 'foo3',
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
          content: 'import "./node_modules/foo@2.0.0/index.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@2.0.0/index.js',
          content: 'foo2',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'package.json',
          content: `
           {
             "dependencies": {
               "foo": "^2.0.0"
             }
           }
         `,
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test("version specified in dependency's package.json", async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo/index.js";',
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'import "bar";',
              },
              'package.json': {
                content: `{
                   "dependencies": {
                     "bar": "^2.0.0"
                   }
                 }`,
              },
            },
          },
        },
      },
      bar: {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'bar1',
              },
            },
          },
          '2.0.0': {
            files: {
              'index.js': {
                content: 'bar2',
              },
            },
          },
          '3.0.0': {
            files: {
              'index.js': {
                content: 'bar3',
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
          content: 'import "./node_modules/foo@1.0.0/index.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/index.js',
          content: 'import "../bar@2.0.0/index.js";',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/bar@2.0.0/index.js',
          content: 'bar2',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('extension-less import in project file', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo/bar";',
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'bar.js': {
                content: 'bar',
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
          content: 'import "./node_modules/foo@1.0.0/bar.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/bar.js',
          contentType: 'text/javascript; charset=utf-8',
          content: 'bar',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('extension-less import in dependency', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo/a.js";',
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'a.js': {
                content: 'import "./b";',
              },
              'b.js': {
                content: 'b',
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
          content: 'import "./node_modules/foo@1.0.0/a.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/a.js',
          contentType: 'text/javascript; charset=utf-8',
          content: 'import "./b.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/b.js',
          contentType: 'text/javascript; charset=utf-8',
          content: 'b',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('non-existent dependency', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "non-existent/index.js";',
      },
    ];
    const cdn: CdnData = {};
    const expected: BuildOutput[] = [
      {
        kind: 'file',
        file: {
          name: 'index.js',
          content: 'import "non-existent/index.js";',
        },
      },
      {
        diagnostic: {
          message:
            'Could not resolve module "non-existent/index.js": CDN HTTP 404 error (<CDN-BASE-URL>/non-existent@latest/package.json): Not Found',
          range: {
            end: {
              character: 29,
              line: 0,
            },
            start: {
              character: 8,
              line: 0,
            },
          },
        },
        filename: 'index.js',
        kind: 'diagnostic',
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('invalid package.json', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo/index.js";',
      },
      {
        name: 'package.json',
        content: `{
           "dependencies": XXX
         }`,
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'foo1',
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
          content: 'import "./node_modules/foo@1.0.0/index.js";',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/index.js',
          content: 'foo1',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'package.json',
          content: `{
           "dependencies": XXX
         }`,
        },
      },
      {
        diagnostic: {
          message:
            'Invalid package.json: ' +
            {
              chrome:
                'SyntaxError: Unexpected token \'X\', ..."dencies": XXX\n      "... is not valid JSON',
              firefox:
                'SyntaxError: JSON.parse: unexpected character at line 2 column 28 of the JSON data',
              safari:
                'SyntaxError: JSON Parse error: Unexpected identifier "XXX"',
            }[browser],
          range: {
            start:
              browser === 'safari' || browser === 'chrome'
                ? {line: 0, character: 0}
                : {line: 1, character: 27},
            end: {line: 2, character: 10},
          },
        },
        filename: 'package.json',
        kind: 'diagnostic',
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('use import map', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: 'import "foo";',
      },
    ];
    const importMap: ModuleImportMap = {
      imports: {
        foo: 'http://example.com/foo',
      },
    };
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'foo',
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
          content: 'import "http://example.com/foo";',
        },
      },
    ];
    await checkTransform(files, expected, importMap, cdn);
  });

  test('prefers "import" condition exports', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: `
          import 'foo';
          import 'foo/bar.js';
        `,
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'esm/index.js': {
                content: 'ESM',
              },
              'esm/bar.js': {
                content: 'ESM',
              },
              'cjs/index.js': {
                content: 'CJS',
              },
              'cjs/bar.js': {
                content: 'CJS',
              },
              'index.js': {
                content: 'NONE',
              },
              'bar.js': {
                content: 'NONE',
              },
              'package.json': {
                content: `{
                  "exports": {
                    ".": {
                      "cjs": "./cjs/index.js",
                      "import": "./esm/index.js",
                      "default": "./index.js"
                    },
                    "./bar.js": {
                      "cjs": "./cjs/bar.js",
                      "import": "./esm/bar.js",
                      "default": "./bar.js"
                    }
                  }
                }`,
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
          content: `
          import './node_modules/foo@1.0.0/esm/index.js';
          import './node_modules/foo@1.0.0/esm/bar.js';
        `,
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/esm/index.js',
          content: 'ESM',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/esm/bar.js',
          content: 'ESM',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('prefers "development" condition exports', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: `
          import 'foo';
          import 'foo/bar.js';
        `,
      },
    ];
    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'index.js': {
                content: 'PROD',
              },
              'bar.js': {
                content: 'PROD',
              },
              'development/index.js': {
                content: 'DEV',
              },
              'development/bar.js': {
                content: 'DEV',
              },
              'package.json': {
                content: `{
                  "exports": {
                    ".": {
                      "development": "./development/index.js",
                      "default": "./index.js"
                    },
                    "./bar.js": {
                      "development": "./development/bar.js",
                      "default": "./bar.js"
                    }
                  }
                }`,
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
          content: `
          import './node_modules/foo@1.0.0/development/index.js';
          import './node_modules/foo@1.0.0/development/bar.js';
        `,
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/development/index.js',
          content: 'DEV',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/development/bar.js',
          content: 'DEV',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('prefers "import" + "browser" condition exports over default', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: `
          import 'foo';
          import 'foo/bar.js';
        `,
      },
    ];

    const cdn: CdnData = {
      foo: {
        versions: {
          '1.0.0': {
            files: {
              'browser/index.js': {
                content: 'BROWSER',
              },
              'browser/bar.js': {
                content: 'BROWSER',
              },
              'default/index.js': {
                content: 'DEFAULT',
              },
              'default/bar.js': {
                content: 'DEFAULT',
              },
              'package.json': {
                content: `{
                  "exports": {
                    ".": {
                      "import": {
                        "browser": "./browser/index.js"
                      },
                      "default": "./default/index.js"
                    },
                    "./bar.js": {
                      "import": {
                        "browser": "./browser/bar.js"
                      },
                      "default": "./default/bar.js"
                    }
                  }
                }`,
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
          content: `
          import './node_modules/foo@1.0.0/browser/index.js';
          import './node_modules/foo@1.0.0/browser/bar.js';
        `,
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/browser/index.js',
          content: 'BROWSER',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/foo@1.0.0/browser/bar.js',
          content: 'BROWSER',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });

  test('@lion/button style import', async () => {
    const files: SampleFile[] = [
      {
        name: 'index.js',
        content: `
          import '@lion/button/define';
        `,
      },
    ];
    const cdn: CdnData = {
      '@lion/button': {
        versions: {
          '0.14.3': {
            files: {
              'define.js': {
                // Note this is a bare module specifier referring to its own
                // package, so package exports must be consulted again; there is
                // no file called "define-button.js".
                content: "import '@lion/button/define-button';",
              },
              'lion-button.js': {
                content: 'customElements.define(...);',
              },
              'package.json': {
                content: `{
                  "exports": {
                    "./define-button": "./lion-button.js",
                    "./define": "./define.js"
                  }
                }`,
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
          content: `
          import './node_modules/@lion/button@0.14.3/define.js';
        `,
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/@lion/button@0.14.3/define.js',
          content: "import './lion-button.js';",
          contentType: 'text/javascript; charset=utf-8',
        },
      },
      {
        kind: 'file',
        file: {
          name: 'node_modules/@lion/button@0.14.3/lion-button.js',
          content: 'customElements.define(...);',
          contentType: 'text/javascript; charset=utf-8',
        },
      },
    ];
    await checkTransform(files, expected, {}, cdn);
  });
});
