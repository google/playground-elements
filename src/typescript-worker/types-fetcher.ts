/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ts from '../internal/typescript.js';
import {ImportMapResolver} from './import-map-resolver.js';
import {Deferred} from '../shared/deferred.js';
import {
  parseNpmStyleSpecifier,
  changeFileExtension,
  classifySpecifier,
  resolveUrlPath,
  trimTrailingSlash,
  trimLeadingSlash,
} from './util.js';

import {Result} from '../shared/util.js';
import {CachingCdn} from './caching-cdn.js';
import {PackageJson, NpmFileLocation} from './util.js';
import {
  PackageDependencies,
  DependencyGraph,
  NodeModulesDirectory,
  NodeModulesLayoutMaker,
} from './node-modules-layout-maker.js';

type PackageName = string;
type PackageVersion = string;
type FilePath = string;
type FileContent = string;

/**
 * The top-level project. Used as a referrer.
 */
const root = Symbol();

/**
 * Fetches typings for TypeScript imports and their transitive dependencies, and
 * for standard libraries.
 */
export class TypesFetcher {
  private readonly _cdn: CachingCdn;
  private readonly _importMapResolver: ImportMapResolver;
  private readonly _rootPackageJson: PackageJson | undefined;

  private readonly _rootDependencies: PackageDependencies = {};
  private readonly _dependencyGraph: DependencyGraph = {};
  private readonly _filesByPackageVersion = new Map<
    PackageName,
    Map<PackageVersion, Map<FilePath, Promise<Result<FileContent, number>>>>
  >();

  /**
   * Fetch all ".d.ts" typing files for the full transitive dependency tree of
   * the given project source files and standard libs.
   *
   * @param cdn Interface to unpkg.com or similar CDN service for fetching
   * assets.
   * @param importMapResolver Resolves bare modules to custom URLs, for
   * optionally overriding the CDN.
   * @param rootPackageJson The parsed package.json file for the root project,
   * or undefined if there isn't one.
   * @param sources Project TypeScript source file contents. All bare module
   * imports in these sources will be followed.
   * @param tsLibs Case-insensitive TypeScript standard libraries to fetch, e.g.
   * "es2020", "DOM".
   */
  static async fetchTypes(
    cdn: CachingCdn,
    importMapResolver: ImportMapResolver,
    rootPackageJson: PackageJson | undefined,
    sources: string[],
    tsLibs: string[]
  ): Promise<{
    files: Map<FilePath, FileContent>;
    layout: NodeModulesDirectory;
    dependencyGraph: {
      root: PackageDependencies;
      deps: DependencyGraph;
    };
  }> {
    const fetcher = new TypesFetcher(cdn, importMapResolver, rootPackageJson);
    // Note we use Promise.allSettled instead of Promise.all because we really
    // do want to ignore exceptions due to 404s etc., and don't want one error
    // to fail the entire tree. If the .d.ts files for an import fail to load
    // for any reason, then they won't exist in the virtual filesystem passed to
    // TypeScript, and the user will therefore see a "missing types" error. An
    // improvement would be to surface some more detail to the user, though,
    // especially for non-404 errors.
    await Promise.allSettled([
      ...sources.map((source) =>
        fetcher._handleBareAndRelativeSpecifiers(source, root)
      ),
      ...tsLibs.map((lib) => fetcher._addTypeScriptStandardLib(lib)),
    ]);
    const layout = new NodeModulesLayoutMaker().layout(
      fetcher._rootDependencies,
      fetcher._dependencyGraph
    );
    const files = new Map<string, string>();
    await fetcher._materializeNodeModulesTree(layout, files, '');
    // Note in practice we only really need "files", but it's useful to also
    // return the dependency graph and layout for testing.
    return {
      files,
      layout,
      dependencyGraph: {
        root: fetcher._rootDependencies,
        deps: fetcher._dependencyGraph,
      },
    };
  }

  private constructor(
    cdn: CachingCdn,
    importMapResolver: ImportMapResolver,
    rootPackageJson: PackageJson | undefined
  ) {
    this._cdn = cdn;
    this._importMapResolver = importMapResolver;
    this._rootPackageJson = rootPackageJson;
  }

  private async _addTypeScriptStandardLib(lib: string): Promise<void> {
    return this._handleBareSpecifier(
      `typescript/lib/lib.${lib.toLowerCase()}.js`,
      root
    );
  }

  private async _handleBareAndRelativeSpecifiers(
    sourceText: string,
    referrer: NpmFileLocation | typeof root
  ): Promise<void> {
    const fileInfo = ts.preProcessFile(sourceText, undefined, true);
    const promises = [];
    for (const {fileName: specifier} of fileInfo.importedFiles) {
      const kind = classifySpecifier(specifier);
      if (kind === 'bare') {
        promises.push(this._handleBareSpecifier(specifier, referrer));
      } else if (kind === 'relative' && referrer !== root) {
        // Note we never need to follow relative imports from project root files
        // because those can only be other project files, which are already
        // being processed, since we pass all project files to this class.
        promises.push(this._handleRelativeSpecifier(specifier, referrer));
      }
    }
    for (const {fileName: lib} of fileInfo.libReferenceDirectives) {
      promises.push(this._addTypeScriptStandardLib(lib));
    }
    await Promise.allSettled(promises);
  }

  private async _handleBareSpecifier(
    bare: string,
    referrer: NpmFileLocation | typeof root
  ): Promise<void> {
    let location = parseNpmStyleSpecifier(bare);
    if (location === undefined) {
      return;
    }
    // Versions don't make much sense with an import map, since you just have
    // bare specifier -> URL. We can leave whatever version we already have; it
    // will always be ignored.
    const handledByImportMap = this._importMapResolver.resolve(bare) !== null;
    // Get the version range based on the referrer's package.json.
    if (!handledByImportMap) {
      location.version = await this._getDependencyVersion(
        referrer,
        location.pkg
      );
    }
    // Get the ".d.ts" path by changing extension, or looking up the "typings"
    // field, etc.
    location.path = await this._getDtsPath(location);
    // Resolve the concrete version.
    if (!handledByImportMap) {
      location = await this._cdn.canonicalize(location);
    }
    if (referrer === root || location.pkg !== referrer.pkg) {
      // Note the two package names can be the same in the case that a typings
      // file imports another module from the same package using its own bare
      // module name, instead of a relative path. TypeScript does support this
      // case, and it does happen (e.g. @material/base does this). We don't need
      // a self-edge in the dependency graph, though.
      this._addEdgeToDependencyGraph(referrer, location);
    }
    // Stop early if we've already handled this specifier.
    if (
      this._filesByPackageVersion
        .get(location.pkg)
        ?.get(location.version)
        ?.get(location.path) !== undefined
    ) {
      return;
    }
    // Ready to fetch and recurse.
    const dtsResult = await this._fetchAndAddToOutputFiles(location);
    if (dtsResult.error !== undefined) {
      return;
    }
    await this._handleBareAndRelativeSpecifiers(dtsResult.result, location);
  }

  private async _handleRelativeSpecifier(
    relative: string,
    referrer: NpmFileLocation
  ): Promise<void> {
    const location = {
      // We know package and version must be the same as the referrer, since
      // this is a relative path, and we are therefore still in the same
      // package.
      pkg: referrer.pkg,
      version: referrer.version,
      // Make the path package-root relative, instead of referrer-path relative.
      path: trimLeadingSlash(resolveUrlPath(referrer.path, relative).slice(1)),
    };
    location.path = changeFileExtension(location.path, 'd.ts');
    // Stop early if we've already handled this specifier.
    if (
      this._filesByPackageVersion
        .get(location.pkg)
        ?.get(location.version)
        ?.get(location.path) !== undefined
    ) {
      return;
    }
    const dtsResult = await this._fetchAndAddToOutputFiles(location);
    if (dtsResult.error !== undefined) {
      return;
    }
    await this._handleBareAndRelativeSpecifiers(dtsResult.result, location);
  }

  private async _getDependencyVersion(
    from: NpmFileLocation | typeof root,
    to: string
  ): Promise<string> {
    const packageJson =
      from === root
        ? this._rootPackageJson
        : await this._fetchPackageJsonAndAddToOutputFiles(from);
    return packageJson?.dependencies?.[to] ?? 'latest';
  }

  private async _getDtsPath(location: NpmFileLocation): Promise<string> {
    if (location.path !== '') {
      return changeFileExtension(location.path, 'd.ts');
    }
    const packageJson = await this._fetchPackageJsonAndAddToOutputFiles(
      location
    );
    return (
      packageJson?.typings ??
      packageJson?.types ??
      (packageJson?.main !== undefined
        ? changeFileExtension(packageJson.main, 'd.ts')
        : undefined) ??
      'index.d.ts'
    );
  }

  private async _fetchPackageJsonAndAddToOutputFiles(location: {
    pkg: string;
    version: string;
  }): Promise<PackageJson> {
    const result = await this._fetchAndAddToOutputFiles({
      ...location,
      path: 'package.json',
    });
    if (result.error !== undefined) {
      throw new Error(
        `Could not fetch package.json for ` +
          `${location.pkg}@${location.version}: ${result.error}`
      );
    }
    return JSON.parse(result.result) as PackageJson;
  }

  private async _fetchAndAddToOutputFiles(
    location: NpmFileLocation
  ): Promise<Result<string, number>> {
    const importMapUrl = this._importMapResolver.resolve(
      trimTrailingSlash(`${location.pkg}/${location.path}`)
    );
    if (importMapUrl === null) {
      location = await this._cdn.canonicalize(location);
    }

    let versions = this._filesByPackageVersion.get(location.pkg);
    if (versions === undefined) {
      versions = new Map();
      this._filesByPackageVersion.set(location.pkg, versions);
    }
    let files = versions.get(location.version);
    if (files === undefined) {
      files = new Map();
      versions.set(location.version, files);
    }
    let promise = files.get(location.path);
    if (promise !== undefined) {
      return promise;
    }
    const deferred = new Deferred<Result<string, number>>();
    promise = deferred.promise;
    files.set(location.path, promise);

    let content;
    if (importMapUrl !== null) {
      const r = await fetch(importMapUrl);
      if (r.status !== 200) {
        const err = {error: r.status};
        deferred.resolve(err);
        return err;
      }
      content = await r.text();
    } else {
      try {
        const r = await this._cdn.fetch(location);
        content = r.content;
      } catch {
        const err = {error: 404};
        deferred.resolve(err);
        return err;
      }
    }
    const result = {result: content};
    deferred.resolve(result);
    return result;
  }

  /**
   * Record in our dependency graph that some package depends on another.
   */
  private _addEdgeToDependencyGraph(
    from: {pkg: string; version: string} | typeof root,
    to: {pkg: string; version: string}
  ) {
    if (from === root) {
      this._rootDependencies[to.pkg] = to.version;
    } else {
      let fromVersions = this._dependencyGraph[from.pkg];
      if (fromVersions === undefined) {
        fromVersions = {};
        this._dependencyGraph[from.pkg] = fromVersions;
      }
      let deps = fromVersions[from.version];
      if (deps === undefined) {
        deps = {};
        fromVersions[from.version] = deps;
      }
      deps[to.pkg] = to.version;
    }
  }

  /**
   * Materialize a node_modules/ file tree for the given layout into the given
   * file map, using the files we've fetched.
   *
   * For example, given the layout ...
   *
   *   ROOT
   *   ├── A1
   *   ├── B1
   *   │   └── A2
   *   └── C1
   *       └── A2
   *
   * ... and where each package just contains one "index.d.ts" file, then
   * populates the file map with keys:
   *
   *   a/index.d.ts
   *   b/index.d.ts
   *   b/node_modules/a/index.d.ts
   *   c/index.d.ts
   *   c/node_modules/a/index.d.ts
   */
  private async _materializeNodeModulesTree(
    layout: NodeModulesDirectory,
    fileMap: Map<FilePath, FileContent>,
    prefix: FilePath
  ): Promise<void> {
    for (const [pkg, entry] of Object.entries(layout)) {
      const files = this._filesByPackageVersion.get(pkg)?.get(entry.version);
      if (files === undefined) {
        continue;
      }
      for (const [pkgRelativePath, promise] of files) {
        const result = await promise;
        if (result.error === undefined) {
          const fullyQualifiedPath = `${prefix}${pkg}/${pkgRelativePath}`;
          fileMap.set(fullyQualifiedPath, result.result);
        }
      }
      await this._materializeNodeModulesTree(
        entry.nodeModules,
        fileMap,
        `${prefix}${pkg}/node_modules/`
      );
    }
  }
}
