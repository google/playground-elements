/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {
  NodeModulesLayoutMaker,
  DependencyGraph,
  NodeModulesDirectory,
  PackageDependencies,
} from '../typescript-worker/node-modules-layout-maker.js';

suite('NodeModulesLayoutMaker', () => {
  const checkLayout = (
    rootDeps: PackageDependencies,
    depGraph: DependencyGraph,
    expected: NodeModulesDirectory
  ) => {
    const layoutMaker = new NodeModulesLayoutMaker();
    const actual = layoutMaker.layout(rootDeps, depGraph);
    assert.deepEqual(actual, expected);
  };

  test('no dependencies', () => {
    // ROOT
    const rootDeps: PackageDependencies = {};
    const depGraph: DependencyGraph = {};
    const expected: NodeModulesDirectory = {};
    checkLayout(rootDeps, depGraph, expected);
  });

  test('only direct dependencies', () => {
    //    ROOT
    //     /\
    //    /  \
    //   v    v
    //  A1    B2
    const rootDeps: PackageDependencies = {
      a: '1',
      b: '2',
    };
    const depGraph: DependencyGraph = {};
    // ROOT
    // ├── A1
    // └── B2
    const expected: NodeModulesDirectory = {
      a: {version: '1', nodeModules: {}},
      b: {version: '2', nodeModules: {}},
    };
    checkLayout(rootDeps, depGraph, expected);
  });

  test('simple chain', () => {
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
    const rootDeps: PackageDependencies = {
      a: '1',
    };
    const depGraph: DependencyGraph = {
      a: {1: {b: '2'}},
      b: {2: {c: '3'}},
    };
    // ROOT
    // ├── A1
    // ├── B2
    // └── C3
    const expected: NodeModulesDirectory = {
      a: {version: '1', nodeModules: {}},
      b: {version: '2', nodeModules: {}},
      c: {version: '3', nodeModules: {}},
    };
    checkLayout(rootDeps, depGraph, expected);
  });

  test('version conflict between root and branch', () => {
    //   ROOT
    //    /\
    //   v  v
    //  A1  B1
    //   |
    //   v
    //   B2
    const rootDeps: PackageDependencies = {
      a: '1',
      b: '1',
    };
    const depGraph: DependencyGraph = {
      a: {1: {b: '2'}},
    };
    // ROOT
    // ├── A1
    // │   └── B2
    // └── B1
    const expected: NodeModulesDirectory = {
      a: {
        version: '1',
        nodeModules: {
          b: {version: '2', nodeModules: {}},
        },
      },
      b: {version: '1', nodeModules: {}},
    };
    checkLayout(rootDeps, depGraph, expected);
  });

  test('version conflict between root and longer branch', () => {
    //       ROOT
    //        /\
    //       /  \
    //      v    v
    //     A1    B1
    //      |
    //      v
    //     C1
    //      |
    //      v
    //     B2
    const rootDeps: PackageDependencies = {
      a: '1',
      b: '1',
    };
    const depGraph: DependencyGraph = {
      a: {1: {c: '1'}},
      c: {1: {b: '2'}},
    };
    // ROOT
    // ├── A1
    // ├── B1
    // └── C1
    //     └── B2
    const expected: NodeModulesDirectory = {
      a: {version: '1', nodeModules: {}},
      b: {version: '1', nodeModules: {}},
      c: {
        version: '1',
        nodeModules: {
          b: {
            version: '2',
            nodeModules: {},
          },
        },
      },
    };
    checkLayout(rootDeps, depGraph, expected);
  });

  test('version conflict between two branches', () => {
    //     ROOT
    //      /\
    //     /  \
    //    v    v
    //   A1    B1
    //   |      |
    //   v      v
    //  C1      C2
    const rootDeps: PackageDependencies = {
      a: '1',
      b: '1',
    };
    const depGraph: DependencyGraph = {
      a: {1: {c: '1'}},
      b: {1: {c: '2'}},
    };
    // ROOT
    // ├── A1
    // ├── B1
    // │   └── C2
    // └── C1
    const expected: NodeModulesDirectory = {
      a: {version: '1', nodeModules: {}},
      b: {
        version: '1',
        nodeModules: {
          c: {version: '2', nodeModules: {}},
        },
      },
      c: {version: '1', nodeModules: {}},
    };
    checkLayout(rootDeps, depGraph, expected);
  });

  test('version conflict requiring directory duplication', () => {
    //      ROOT
    //       /|\
    //      / | \
    //     /  |  \
    //    v   v   v
    //    A1  B1  C1
    //         \   /
    //          \ /
    //           v
    //           A2 --> D1
    const rootDeps: PackageDependencies = {
      a: '1',
      b: '1',
      c: '1',
    };
    const depGraph: DependencyGraph = {
      a: {2: {d: '1'}},
      b: {1: {a: '2'}},
      c: {1: {a: '2'}},
    };
    // ROOT
    // ├── A1
    // ├── B1
    // │   └── A2
    // ├── C1
    // │   └── A2
    // └── D1
    const expected: NodeModulesDirectory = {
      a: {
        version: '1',
        nodeModules: {},
      },
      b: {
        version: '1',
        nodeModules: {
          a: {version: '2', nodeModules: {}},
        },
      },
      c: {
        version: '1',
        nodeModules: {
          a: {version: '2', nodeModules: {}},
        },
      },
      d: {
        version: '1',
        nodeModules: {},
      },
    };
    checkLayout(rootDeps, depGraph, expected);
  });

  test('short loop', () => {
    //   ROOT --> A1 --> B1
    //             ^     |
    //             |     |
    //             +-----+
    const rootDeps: PackageDependencies = {
      a: '1',
    };
    const depGraph: DependencyGraph = {
      a: {1: {b: '1'}},
      b: {1: {a: '1'}},
    };
    // ROOT
    // ├── A1
    // └── B1
    const expected: NodeModulesDirectory = {
      a: {version: '1', nodeModules: {}},
      b: {version: '1', nodeModules: {}},
    };
    checkLayout(rootDeps, depGraph, expected);
  });

  test('longer loop on a branch', () => {
    //       ROOT
    //        /\
    //       /  \
    //      v    v
    //     A1    C1
    //    /  ^
    //   /    \
    //  v      \
    //  B1 --> C2
    const rootDeps: PackageDependencies = {
      a: '1',
      c: '1',
    };
    const depGraph: DependencyGraph = {
      a: {1: {b: '1'}},
      b: {1: {c: '2'}},
      c: {2: {a: '1'}},
    };
    // ROOT
    // ├── A1
    // ├── C1
    // └── B1
    //     └── C2
    const expected: NodeModulesDirectory = {
      a: {version: '1', nodeModules: {}},
      c: {version: '1', nodeModules: {}},
      b: {
        version: '1',
        nodeModules: {
          c: {version: '2', nodeModules: {}},
        },
      },
    };
    checkLayout(rootDeps, depGraph, expected);
  });
});
