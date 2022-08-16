/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {NodeModuleResolver} from '../typescript-worker/node-module-resolver.js';

import {PackageJson} from '../typescript-worker/util.js';

suite('NodeModuleResolver', () => {
  const check = ({
    path,
    packageJson,
    conditions = ['default', 'module', 'import'],
    expected,
  }: {
    path: string;
    packageJson: PackageJson;
    conditions?: string[];
    expected: string;
  }) => {
    const resolver = new NodeModuleResolver({conditions});
    const actual = resolver.resolve(
      {pkg: 'mydep', version: '1.2.3', path},
      packageJson,
      './my-element.js'
    );
    assert.equal(actual, expected);
  };

  test('default with path', () => {
    check({
      path: 'foo.js',
      packageJson: {},
      expected: 'foo.js',
    });
  });

  test('default no path', () => {
    check({
      path: '',
      packageJson: {},
      expected: 'index.js',
    });
  });

  test('default with main', () => {
    check({
      path: '',
      packageJson: {
        main: 'main.js',
      },
      expected: 'main.js',
    });
  });

  test('exports default module', () => {
    check({
      path: '',
      packageJson: {
        exports: {
          '.': './main.js',
        },
      },
      expected: 'main.js',
    });
  });

  test('exports main sugar', () => {
    check({
      path: '',
      packageJson: {
        exports: './main.js',
      },
      expected: 'main.js',
    });
  });

  test('exports remapped module', () => {
    check({
      path: 'foo.js',
      packageJson: {
        exports: {
          './foo.js': './lib/foo.js',
        },
      },
      expected: 'lib/foo.js',
    });
  });

  test('throws if exports but no mapping', () => {
    assert.throws(() => {
      check({
        path: 'foo.js',
        packageJson: {
          exports: {
            './bar.js': './lib/bar.js',
          },
        },
        expected: 'Package subpath',
      });
    }, 'Package subpath \'./foo.js\' is not defined by "exports" in /node_modules/mydep@1.2.3/package.json imported from ./my-element.js');
  });

  test("throws if target doesn't start with ./", () => {
    assert.throws(() => {
      check({
        path: 'foo.js',
        packageJson: {
          exports: {
            './foo.js': 'dist/foo.js',
          },
        },
        expected: '',
      });
    }, 'Invalid "exports" target "dist/foo.js" defined for \'./foo.js\' in the package config /node_modules/mydep@1.2.3/package.json imported from ./my-element.js; targets must start with "./"');
  });

  test('subpath export', () => {
    check({
      path: 'features/foo.js',
      packageJson: {
        exports: {
          './features/*': './src/features/*',
        },
      },
      expected: 'src/features/foo.js',
    });
  });

  test('banned subpath export', () => {
    assert.throws(() => {
      check({
        path: 'features/private/foo.js',
        packageJson: {
          exports: {
            './features/*': './src/features/*',
            './features/private/*': null,
          },
        },
        expected: '',
      });
    }, 'Package subpath \'./features/private/foo.js\' is not defined by "exports" in /node_modules/mydep@1.2.3/package.json imported from ./my-element.js');
  });

  test('conditions', () => {
    check({
      path: '',
      packageJson: {
        exports: {
          '.': {
            import: './main.js',
            require: './main.cjs',
          },
        },
      },
      expected: 'main.js',
    });
  });

  test('conditions with main sugar', () => {
    check({
      path: '',
      packageJson: {
        exports: {
          import: './main.js',
          require: './main.cjs',
        },
      },
      expected: 'main.js',
    });
  });

  test('condition precedence', () => {
    check({
      path: '',
      packageJson: {
        exports: {
          '.': {
            development: './dev.js',
            default: './prod.js',
          },
        },
      },
      conditions: ['development'],
      expected: 'dev.js',
    });
  });

  test('nested conditions', () => {
    const path = '';
    const packageJson = {
      exports: {
        node: {
          import: './feature-node.mjs',
          require: './feature-node.cjs',
        },
        default: './feature.mjs',
      },
    };
    check({
      path,
      packageJson,
      conditions: ['browser'],
      expected: 'feature.mjs',
    });
    check({
      path,
      packageJson,
      conditions: ['node', 'import'],
      expected: 'feature-node.mjs',
    });
    check({
      path,
      packageJson,
      conditions: ['node', 'require'],
      expected: 'feature-node.cjs',
    });
  });

  test('target array, first is valid', () => {
    check({
      path: '',
      packageJson: {
        exports: {
          '.': ['./main.js', 'INVALID'],
        },
      },
      expected: 'main.js',
    });
  });

  test('target array, second is valid', () => {
    check({
      path: '',
      packageJson: {
        exports: {
          '.': ['INVALID', './main.js'],
        },
      },
      expected: 'main.js',
    });
  });
});
