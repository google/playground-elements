/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {TypesFetcher} from '../typescript-worker/types-fetcher.js';
import {ImportMapResolver} from '../typescript-worker/import-map-resolver.js';
import {configureFakeCdn} from './worker-test-util.js';
import {assert} from '@esm-bundle/chai';
import {CachingCdn} from '../typescript-worker/caching-cdn.js';

import type {ModuleImportMap} from '../shared/worker-api.js';
import type {CdnData} from './fake-cdn-plugin.js';
import type {PackageJson} from '../typescript-worker/util.js';
import type {
  DependencyGraph,
  NodeModulesDirectory,
  PackageDependencies,
} from '../typescript-worker/node-modules-layout-maker.js';

interface ExpectedDependencyGraph {
  root: PackageDependencies;
  deps: DependencyGraph;
}

const checkTypesFetcher = async (
  sourceTexts: string[],
  packageJson: PackageJson,
  cdnData: CdnData,
  importMap: ModuleImportMap,
  expectedFiles: Map<string, string>,
  expectedDependencyGraph?: ExpectedDependencyGraph,
  expectedLayout?: NodeModulesDirectory
) => {
  const {cdnBaseUrl, deleteCdnData} = await configureFakeCdn(cdnData);
  try {
    await checkTypesFetcherImpl(
      sourceTexts,
      packageJson,
      cdnBaseUrl,
      importMap,
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  } finally {
    await deleteCdnData();
  }
};

const checkTypesFetcherImpl = async (
  sourceTexts: string[],
  packageJson: PackageJson,
  cdnBaseUrl: string,
  importMap: ModuleImportMap = {},
  expectedFiles: Map<string, string>,
  expectedDependencyGraph?: ExpectedDependencyGraph,
  expectedLayout?: NodeModulesDirectory
) => {
  const cdn = new CachingCdn(cdnBaseUrl);
  const importMapResolver = new ImportMapResolver(importMap);
  const typesFetcher = new TypesFetcher(cdn, importMapResolver, packageJson);
  const actual = await typesFetcher.fetchTypes(sourceTexts, []);
  if (expectedDependencyGraph !== undefined) {
    assert.deepEqual(actual.dependencyGraph, expectedDependencyGraph);
  }
  if (expectedLayout !== undefined) {
    assert.deepEqual(actual.layout, expectedLayout);
  }
  // Note assert.deepEqual does compare Maps correctly, but it always displays
  // "{}" as the difference in the error message, hence this conversion :(
  assert.deepEqual(
    [...actual.files].sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
    [...expectedFiles].sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
  );
};

suite('types fetcher', () => {
  test('no sources', async () => {
    const sourceTexts: string[] = [];
    const packageJson: PackageJson = {};
    const cdnData: CdnData = {};
    const expectedFiles = new Map();
    const expectedDependencyGraph: ExpectedDependencyGraph = {
      root: {},
      deps: {},
    };
    const expectedLayout: NodeModulesDirectory = {};
    await checkTypesFetcher(
      sourceTexts,
      packageJson,
      cdnData,
      {},
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  });

  test('no dependencies', async () => {
    const sourceTexts: string[] = [`export const foo = "foo";`];
    const packageJson: PackageJson = {};
    const cdnData: CdnData = {};
    const expectedFiles = new Map();
    const expectedDependencyGraph: ExpectedDependencyGraph = {
      root: {},
      deps: {},
    };
    const expectedLayout: NodeModulesDirectory = {};
    await checkTypesFetcher(
      sourceTexts,
      packageJson,
      cdnData,
      {},
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  });

  test('only direct dependencies', async () => {
    //    ROOT
    //     /\
    //    /  \
    //   v    v
    //  A1    B2
    const sourceTexts: string[] = [`import 'a';`, `import 'b';`];
    const packageJson: PackageJson = {
      dependencies: {
        a: '^1.0.0',
        b: '^1.0.0',
      },
    };
    const cdnData: CdnData = {
      a: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const a: 1;`,
              },
            },
          },
        },
      },
      b: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const b: 1;`,
              },
            },
          },
        },
      },
    };
    const expectedDependencyGraph: ExpectedDependencyGraph = {
      root: {a: '1.0.0', b: '1.0.0'},
      deps: {},
    };
    // ROOT
    // ├── A1
    // └── B2
    const expectedLayout: NodeModulesDirectory = {
      a: {version: '1.0.0', nodeModules: {}},
      b: {version: '1.0.0', nodeModules: {}},
    };
    const expectedFiles = new Map([
      ['a/package.json', '{}'],
      ['a/index.d.ts', 'declare export const a: 1;'],
      ['b/package.json', '{}'],
      ['b/index.d.ts', 'declare export const b: 1;'],
    ]);
    await checkTypesFetcher(
      sourceTexts,
      packageJson,
      cdnData,
      {},
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  });

  test('dependency shared between root and branch', async () => {
    //    ROOT
    //     /\
    //    /  \
    //   v    v
    //  A1 -> B1
    const sourceTexts: string[] = [`import 'a';`, `import 'b';`];
    const packageJson: PackageJson = {
      dependencies: {
        a: '^1.0.0',
        b: '^1.1.0',
      },
    };
    const cdnData: CdnData = {
      a: {
        versions: {
          '1.1.0': {
            files: {
              'index.d.ts': {
                content: `import 'b';`,
              },
              'package.json': {
                content: `{"dependencies": {"b": "^1.2.0"}}`,
              },
            },
          },
        },
      },
      b: {
        versions: {
          '1.3.0': {
            files: {
              'index.d.ts': {
                content: `declare export const b: 1;`,
              },
            },
          },
        },
      },
    };
    const expectedDependencyGraph: ExpectedDependencyGraph = {
      root: {a: '1.1.0', b: '1.3.0'},
      deps: {
        a: {
          '1.1.0': {
            b: '1.3.0',
          },
        },
      },
    };
    // ROOT
    // ├── A1
    // └── B2
    const expectedLayout: NodeModulesDirectory = {
      a: {version: '1.1.0', nodeModules: {}},
      b: {version: '1.3.0', nodeModules: {}},
    };
    const expectedFiles = new Map([
      ['a/package.json', `{"dependencies": {"b": "^1.2.0"}}`],
      ['a/index.d.ts', `import 'b';`],
      ['b/package.json', '{}'],
      ['b/index.d.ts', 'declare export const b: 1;'],
    ]);
    await checkTypesFetcher(
      sourceTexts,
      packageJson,
      cdnData,
      {},
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  });

  test('simple chain', async () => {
    //  ROOT
    //    |
    //    v
    //    A1
    //    |
    //    v
    //    B2
    //    |
    //    v
    //    C3
    const sourceTexts: string[] = [`import 'a';`];
    const packageJson: PackageJson = {};
    const cdnData: CdnData = {
      a: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export * from 'b';`,
              },
            },
          },
        },
      },
      b: {
        versions: {
          '2.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export * from 'c';`,
              },
            },
          },
        },
      },
      c: {
        versions: {
          '3.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const c: 3;`,
              },
            },
          },
        },
      },
    };
    const expectedDependencyGraph: ExpectedDependencyGraph = {
      root: {a: '1.0.0'},
      deps: {
        a: {
          '1.0.0': {
            b: '2.0.0',
          },
        },
        b: {
          '2.0.0': {
            c: '3.0.0',
          },
        },
      },
    };
    // ROOT
    // ├── A1
    // ├── B2
    // └── C3
    const expectedLayout: NodeModulesDirectory = {
      a: {version: '1.0.0', nodeModules: {}},
      b: {version: '2.0.0', nodeModules: {}},
      c: {version: '3.0.0', nodeModules: {}},
    };
    const expectedFiles = new Map([
      ['a/package.json', '{}'],
      ['a/index.d.ts', `declare export * from 'b';`],
      ['b/package.json', '{}'],
      ['b/index.d.ts', `declare export * from 'c';`],
      ['c/package.json', '{}'],
      ['c/index.d.ts', `declare export const c: 3;`],
    ]);
    await checkTypesFetcher(
      sourceTexts,
      packageJson,
      cdnData,
      {},
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  });

  test('bare -> relative -> bare', async () => {
    // ROOT
    //  |
    //  v
    //  A1 --> A1/other
    //            |
    //            v
    //            B1
    const sourceTexts: string[] = [`import 'a';`];
    const packageJson: PackageJson = {};
    const cdnData: CdnData = {
      a: {
        versions: {
          '1.2.3': {
            files: {
              'index.d.ts': {
                content: `import "./other.js";`,
              },
              'other.d.ts': {
                content: 'import "b";',
              },
            },
          },
        },
      },
      b: {
        versions: {
          '1.3.4': {
            files: {
              'index.d.ts': {
                content: `declare export const b: 2;`,
              },
            },
          },
        },
      },
    };
    const expectedDependencyGraph: ExpectedDependencyGraph = {
      root: {a: '1.2.3'},
      deps: {
        a: {
          '1.2.3': {b: '1.3.4'},
        },
      },
    };
    // ROOT
    // ├── A1
    // └── B1
    const expectedLayout: NodeModulesDirectory = {
      a: {
        version: '1.2.3',
        nodeModules: {},
      },
      b: {
        version: '1.3.4',
        nodeModules: {},
      },
    };
    const expectedFiles = new Map([
      ['a/package.json', '{}'],
      ['a/index.d.ts', `import "./other.js";`],
      ['a/other.d.ts', `import "b";`],
      ['b/package.json', '{}'],
      ['b/index.d.ts', `declare export const b: 2;`],
    ]);
    await checkTypesFetcher(
      sourceTexts,
      packageJson,
      cdnData,
      {},
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  });

  test('version conflict between root and branch', async () => {
    //   ROOT
    //    /\
    //   v  v
    //  A1  B1
    //   |
    //   v
    //   B2
    const sourceTexts: string[] = [`import 'a';`, `import 'b';`];
    const packageJson: PackageJson = {
      dependencies: {
        a: '^1.0.0',
        b: '^1.0.0',
      },
    };
    const cdnData: CdnData = {
      a: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export * from 'b';`,
              },
              'package.json': {
                content: `{"dependencies": {"b": "^2.0.0"}}`,
              },
            },
          },
        },
      },
      b: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const b: 1;`,
              },
            },
          },
          '2.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const b: 2;`,
              },
            },
          },
        },
      },
    };
    const expectedDependencyGraph: ExpectedDependencyGraph = {
      root: {a: '1.0.0', b: '1.0.0'},
      deps: {
        a: {
          '1.0.0': {
            b: '2.0.0',
          },
        },
      },
    };
    // ROOT
    // ├── A1
    // │   └── B2
    // └── B1
    const expectedLayout: NodeModulesDirectory = {
      a: {
        version: '1.0.0',
        nodeModules: {
          b: {version: '2.0.0', nodeModules: {}},
        },
      },
      b: {version: '1.0.0', nodeModules: {}},
    };
    const expectedFiles = new Map([
      ['a/package.json', `{"dependencies": {"b": "^2.0.0"}}`],
      ['a/index.d.ts', `declare export * from 'b';`],
      ['a/node_modules/b/package.json', '{}'],
      ['a/node_modules/b/index.d.ts', `declare export const b: 2;`],
      ['b/package.json', '{}'],
      ['b/index.d.ts', `declare export const b: 1;`],
    ]);
    await checkTypesFetcher(
      sourceTexts,
      packageJson,
      cdnData,
      {},
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  });

  test('declare module', async () => {
    // Declaring a module should not count as an import, but anything imported
    // from within the declare module block should.
    const sourceTexts: string[] = [
      `
      declare module "x" {
        declare export * from "a";
      }
    `,
    ];
    const packageJson: PackageJson = {
      dependencies: {
        a: '^1.0.0',
        x: '^1.0.0',
      },
    };
    const cdnData: CdnData = {
      a: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `
                declare module "a" {
                  declare export * from "a/internal.js";
                }`,
              },
              'internal.d.ts': {
                content: `declare export const a: 1;`,
              },
            },
          },
        },
      },
      x: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const x: 1;`,
              },
            },
          },
        },
      },
    };
    const expectedDependencyGraph: ExpectedDependencyGraph = {
      root: {a: '1.0.0'},
      deps: {},
    };
    const expectedLayout: NodeModulesDirectory = {
      a: {
        version: '1.0.0',
        nodeModules: {},
      },
    };
    const expectedFiles = new Map([
      ['a/package.json', '{}'],
      [
        'a/index.d.ts',
        `
                declare module "a" {
                  declare export * from "a/internal.js";
                }`,
      ],
      ['a/internal.d.ts', 'declare export const a: 1;'],
    ]);
    await checkTypesFetcher(
      sourceTexts,
      packageJson,
      cdnData,
      {},
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  });

  test('version conflict requiring directory duplication', async () => {
    //      ROOT
    //       /|\
    //      / | \
    //     /  |  \
    //    v   v   v
    //    A1  B1  C1
    //         \   /
    //          \ /
    //           v
    //           A2
    const sourceTexts: string[] = [
      `import 'a';
       import 'b';
       import 'c';
       `,
    ];
    const packageJson: PackageJson = {
      dependencies: {
        a: '1.0.0',
        b: '1.0.0',
        c: '1.0.0',
      },
    };
    const cdnData: CdnData = {
      a: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const: 1;`,
              },
            },
          },
          '2.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const: 2;`,
              },
            },
          },
        },
      },
      b: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export * from 'a';`,
              },
              'package.json': {
                content: `{"dependencies": {"a": "2.0.0"}}`,
              },
            },
          },
        },
      },
      c: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export * from 'a';`,
              },
              'package.json': {
                content: `{"dependencies": {"a": "2.0.0"}}`,
              },
            },
          },
        },
      },
    };
    const expectedDependencyGraph: ExpectedDependencyGraph = {
      root: {a: '1.0.0', b: '1.0.0', c: '1.0.0'},
      deps: {
        b: {
          '1.0.0': {
            a: '2.0.0',
          },
        },
        c: {
          '1.0.0': {
            a: '2.0.0',
          },
        },
      },
    };
    // ROOT
    // ├── A1
    // ├── B1
    // │   └── A2
    // └── C1
    //     └── A2
    const expectedLayout: NodeModulesDirectory = {
      a: {
        version: '1.0.0',
        nodeModules: {},
      },
      b: {
        version: '1.0.0',
        nodeModules: {
          a: {
            version: '2.0.0',
            nodeModules: {},
          },
        },
      },
      c: {
        version: '1.0.0',
        nodeModules: {
          a: {
            version: '2.0.0',
            nodeModules: {},
          },
        },
      },
    };
    const expectedFiles = new Map([
      ['a/package.json', '{}'],
      ['a/index.d.ts', `declare export const: 1;`],
      ['b/package.json', `{"dependencies": {"a": "2.0.0"}}`],
      ['b/index.d.ts', `declare export * from 'a';`],
      ['b/node_modules/a/package.json', `{}`],
      ['b/node_modules/a/index.d.ts', `declare export const: 2;`],
      ['c/package.json', `{"dependencies": {"a": "2.0.0"}}`],
      ['c/index.d.ts', `declare export * from 'a';`],
      ['c/node_modules/a/package.json', `{}`],
      ['c/node_modules/a/index.d.ts', `declare export const: 2;`],
    ]);
    await checkTypesFetcher(
      sourceTexts,
      packageJson,
      cdnData,
      {},
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  });

  test('import map: specifier includes filename', async () => {
    const sourceTexts: string[] = [`import {foo} from 'foo/foo.js';`];
    const packageJson: PackageJson = {};
    const cdnData: CdnData = {
      foo: {
        versions: {
          '2.0.0': {
            files: {},
          },
          '1.2.3': {
            files: {
              'foo.d.ts': {
                content: 'declare export const foo: string;',
              },
            },
          },
        },
      },
    };
    // Note we're using the fake CDN in a slightly different way in this test by
    // directly providing the URL in the import maps.
    const {cdnBaseUrl, deleteCdnData} = await configureFakeCdn(cdnData);
    const importMap: ModuleImportMap = {
      imports: {
        foo: `${cdnBaseUrl}foo@1.2.3`,
        'foo/': `${cdnBaseUrl}foo@1.2.3/`,
      },
    };
    const expectedFiles = new Map([
      ['foo/foo.d.ts', 'declare export const foo: string;'],
    ]);
    try {
      await checkTypesFetcherImpl(
        sourceTexts,
        packageJson,
        cdnBaseUrl,
        importMap,
        expectedFiles
      );
    } finally {
      await deleteCdnData();
    }
  });

  test('import map: dependency has relative import', async () => {
    const sourceTexts: string[] = [`import {foo} from 'foo/foo.js';`];
    const packageJson: PackageJson = {};
    const cdnData: CdnData = {
      foo: {
        versions: {
          '2.0.0': {
            files: {},
          },
          '1.2.3': {
            files: {
              'foo.d.ts': {
                content: 'export * from "./bar.js";',
              },
              'bar.d.ts': {
                content: 'declare export const foo: string;',
              },
            },
          },
        },
      },
    };
    const {cdnBaseUrl, deleteCdnData} = await configureFakeCdn(cdnData);
    const importMap: ModuleImportMap = {
      imports: {
        foo: `${cdnBaseUrl}foo@1.2.3`,
        'foo/': `${cdnBaseUrl}foo@1.2.3/`,
      },
    };
    const expectedFiles = new Map([
      ['foo/foo.d.ts', 'export * from "./bar.js";'],
      ['foo/bar.d.ts', 'declare export const foo: string;'],
    ]);
    try {
      await checkTypesFetcherImpl(
        sourceTexts,
        packageJson,
        cdnBaseUrl,
        importMap,
        expectedFiles
      );
    } finally {
      await deleteCdnData();
    }
  });

  test('import map: reads "typings" from package.json', async () => {
    const sourceTexts: string[] = [`import {foo} from 'foo';`];
    const packageJson: PackageJson = {};
    const cdnData: CdnData = {
      foo: {
        versions: {
          '2.0.0': {
            files: {},
          },
          '1.2.3': {
            files: {
              'package.json': {
                content: '{"typings": "typings.d.ts"}',
              },
              'typings.d.ts': {
                content: 'declare export const foo: string;',
              },
            },
          },
        },
      },
    };
    const {cdnBaseUrl, deleteCdnData} = await configureFakeCdn(cdnData);
    const importMap: ModuleImportMap = {
      imports: {
        foo: `${cdnBaseUrl}foo@1.2.3`,
        'foo/': `${cdnBaseUrl}foo@1.2.3/`,
      },
    };
    const expectedFiles = new Map([
      ['foo/package.json', '{"typings": "typings.d.ts"}'],
      ['foo/typings.d.ts', 'declare export const foo: string;'],
    ]);
    try {
      await checkTypesFetcherImpl(
        sourceTexts,
        packageJson,
        cdnBaseUrl,
        importMap,
        expectedFiles
      );
    } finally {
      await deleteCdnData();
    }
  });

  test('CDN HTTP errors', async () => {
    // a/b/c should still resolve, even though there are 404 and 500 errors
    // served by other imports.
    const sourceTexts: string[] = [
      `import 'a';
       import 'missing';
       import 'b';
       import 'broken';
       import 'c';`,
    ];
    const packageJson: PackageJson = {
      dependencies: {
        a: '^1.0.0',
        b: '^1.0.0',
        c: '^1.0.0',
        broken: '^1.0.0',
      },
    };
    const cdnData: CdnData = {
      a: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const a: 1;`,
              },
            },
          },
        },
      },
      b: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const b: 1;`,
              },
            },
          },
        },
      },
      c: {
        versions: {
          '1.0.0': {
            files: {
              'index.d.ts': {
                content: `declare export const c: 1;`,
              },
            },
          },
        },
      },
      broken: {
        versions: {
          '1.0.0': {
            files: {
              'package.json': {
                status: 500,
                content: 'Internal error',
              },
              'index.d.ts': {
                status: 500,
                content: 'Internal error',
              },
            },
          },
        },
      },
    };
    const expectedDependencyGraph: ExpectedDependencyGraph = {
      root: {
        a: '1.0.0',
        b: '1.0.0',
        c: '1.0.0',
      },
      deps: {},
    };
    const expectedLayout: NodeModulesDirectory = {
      a: {
        version: '1.0.0',
        nodeModules: {},
      },
      b: {
        version: '1.0.0',
        nodeModules: {},
      },
      c: {
        version: '1.0.0',
        nodeModules: {},
      },
    };
    const expectedFiles = new Map([
      ['a/package.json', '{}'],
      ['a/index.d.ts', 'declare export const a: 1;'],
      ['b/package.json', '{}'],
      ['b/index.d.ts', 'declare export const b: 1;'],
      ['c/package.json', '{}'],
      ['c/index.d.ts', 'declare export const c: 1;'],
    ]);
    await checkTypesFetcher(
      sourceTexts,
      packageJson,
      cdnData,
      {},
      expectedFiles,
      expectedDependencyGraph,
      expectedLayout
    );
  });
});
