/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

type VersionNumber = string;

/**
 * Like the "dependencies" field of a package.json file, except the version
 * numbers are always concrete instead of semver ranges.
 */
export interface PackageDependencies {
  [pkg: string]: VersionNumber;
}

/**
 * Maps from NPM package name, to the versions of that package, to its
 * dependencies.
 */
export interface DependencyGraph {
  [pkg: string]: {
    [version: string]: PackageDependencies;
  };
}

/**
 * The contents of a "node_modules/" directory. Keys are NPM package names.
 * Values are objects containing the version, and the contents of a nested
 * "node_modules/" directory.
 */
export interface NodeModulesDirectory {
  [pkg: string]: {
    version: VersionNumber;
    nodeModules: NodeModulesDirectory;
  };
}

/**
 * Temporary data structure used during graph traversal to associate a node in
 * the dependency graph with its corresponding node_modules/ directory, and the
 * parent of that directory.
 */
interface GraphTraversalState {
  dependencies: PackageDependencies;
  nodeModules: NodeModulesDirectory;
  parent: GraphTraversalState | null;
}

/**
 * Given an NPM-style dependency graph, makes a directory structure comprised of
 * nested "node_modules/" folders that is compatible with the layout expected by
 * the Node module resolution algorithm
 * (https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders).
 *
 * Attempts to create the flattest directory layout possible to reduce file
 * duplication, without causing version conflicts.
 *
 * For example, given the dependency graph:
 *
 *      ROOT
 *       /|\
 *      / | \
 *     /  |  \
 *    v   v   v
 *    A1  B1  C1
 *         \   /
 *          \ /
 *           v
 *           A2 --> D1
 *
 * Returns the directory tree:
 *
 *   ROOT
 *   ├── A1
 *   ├── B1
 *   │   └── A2
 *   ├── C1
 *   │   └── A2
 *   └── D1
 */
export class NodeModulesLayoutMaker {
  layout(
    rootDeps: PackageDependencies,
    depGraph: DependencyGraph
  ): NodeModulesDirectory {
    const rootNodeModulesDir: NodeModulesDirectory = {};
    // Traverse the dependency graph using breadth-first search so that we
    // "install" all of a package's direct dependencies before moving on to its
    // transitive dependencies.
    const bfsQueue: Array<GraphTraversalState> = [
      {
        dependencies: rootDeps,
        nodeModules: rootNodeModulesDir,
        parent: null,
      },
    ];
    while (bfsQueue.length > 0) {
      const currentNode = bfsQueue.shift()!;
      for (const [pkg, version] of Object.entries(currentNode.dependencies)) {
        // Find the best node_modules/ directory to install this dependency
        // into. We're looking for the directory that is closest to the root
        // (including the root itself), but which has no conflicting version of
        // the same package along the path.
        let installLocation = currentNode;
        let alreadyInstalled = false;
        while (installLocation.parent !== null) {
          const parentVersion =
            installLocation.parent.nodeModules[pkg]?.version;
          if (parentVersion !== undefined) {
            alreadyInstalled = parentVersion === version;
            break;
          }
          installLocation = installLocation.parent;
        }
        if (alreadyInstalled) {
          // This package was already installed at the exact same version in
          // some reachable ancestor directory, so we're already done.
          continue;
        }
        // "Install" this dependency.
        const nestedNodeModules = {};
        installLocation.nodeModules[pkg] = {
          version,
          nodeModules: nestedNodeModules,
        };
        // Add this dependency's own dependencies onto the breadth-first search
        // queue.
        const childDependencies = depGraph[pkg]?.[version];
        if (childDependencies !== undefined) {
          bfsQueue.push({
            dependencies: childDependencies,
            nodeModules: nestedNodeModules,
            parent: installLocation,
          });
        }
      }
    }
    return rootNodeModulesDir;
  }
}
