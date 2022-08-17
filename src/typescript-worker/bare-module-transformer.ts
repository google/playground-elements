/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import * as esModuleLexer from 'es-module-lexer';
import {
  MergedAsyncIterables,
  parseNpmStyleSpecifier,
  resolveUrlPath,
  charToLineAndChar,
  fileExtension,
  classifySpecifier,
  relativeUrlPath,
} from './util.js';
import {Deferred} from '../shared/deferred.js';
import {NodeModuleResolver} from './node-module-resolver.js';

import {
  BuildOutput,
  DiagnosticBuildOutput,
  FileBuildOutput,
  SampleFile,
} from '../shared/worker-api.js';
import {ImportMapResolver} from './import-map-resolver.js';
import {CachingCdn} from './caching-cdn.js';
import {NpmFileLocation, PackageJson} from './util.js';

/**
 * Transforms bare module specifiers in .js files to canonical local paths, and
 * adds the corresponding modules to the virtual filesystem.
 *
 * For example, transforms:
 *   import {html} from "lit";
 * Into:
 *   import {html} from "./node_modules/lit@2.1.2/index.js";
 *
 * Dependencies are served from within the local
 * "<service-worker-scope>/node_modules/" path. This allows us to transform not
 * only our own project files, but the entire module dependency graph too.
 *
 * Specifiers are canonicalized to include the latest concrete version that is
 * compatible with the semver range, and to make default modules and file
 * extensions explicit. This provides improved module de-duplication over
 * unpkg.com's "?module" mode, which does not canonicalize.
 *
 * Version constraints are read from the "dependencies" field of package.json
 * files, both in dependencies and in the top-level project itself. If the
 * project doesn't contain a package.json file, the latest versions are assumed.
 */
export class BareModuleTransformer {
  private _cdn: CachingCdn;
  private _importMapResolver: ImportMapResolver;
  private _emittedExternalDependencies = new Set<string>();
  private _nodeResolver = new NodeModuleResolver({
    conditions: ['module', 'import', 'development', 'browser'],
  });

  constructor(cdn: CachingCdn, importMapResolver: ImportMapResolver) {
    this._cdn = cdn;
    this._importMapResolver = importMapResolver;
  }

  async *process(
    results: AsyncIterable<BuildOutput> | Iterable<BuildOutput>
  ): AsyncIterable<BuildOutput> {
    // This "output" iterable helps us emit all build outputs as soon as they
    // are available as we asynchronously walk the dependency tree.
    const output = new MergedAsyncIterables<BuildOutput>();
    output.add(this._handleProjectFiles(results, output));
    yield* output;
  }

  /**
   * Handle files from the top-level project.
   */
  private async *_handleProjectFiles(
    results: AsyncIterable<BuildOutput> | Iterable<BuildOutput>,
    output: MergedAsyncIterables<BuildOutput>
  ): AsyncIterable<BuildOutput> {
    // The project might contain a package.json, which will determine our
    // top-level version constraints. Resolve it lazily.
    const packageJson = new Deferred<PackageJson | undefined>();
    const getPackageJson = () => packageJson.promise;
    for await (const result of results) {
      if (result.kind === 'file' && result.file.name.endsWith('.js')) {
        output.add(this._handleModule(result, getPackageJson, output));
      } else {
        yield result;
        if (result.kind === 'file' && result.file.name === 'package.json') {
          let parsed: PackageJson | undefined;
          try {
            parsed = JSON.parse(result.file.content) as PackageJson;
          } catch (e) {
            yield makeJsonParseDiagnostic(e as Error, result.file);
          }
          if (parsed !== undefined) {
            packageJson.resolve(parsed);
          }
        }
      }
    }
    if (!packageJson.settled) {
      // We never found a package.json.
      packageJson.resolve(undefined);
    }
  }

  /**
   * Transform all of the imported module specifiers in the given JS module,
   * emit the transformed file, and process any dependencies corresponding to
   * those specifiers.
   */
  private async *_handleModule(
    file: FileBuildOutput,
    getPackageJson: () => Promise<PackageJson | undefined>,
    output: MergedAsyncIterables<BuildOutput>
  ): AsyncIterable<BuildOutput> {
    let js = file.file.content;
    let specifiers;
    await esModuleLexer.init;
    try {
      [specifiers] = esModuleLexer.parse(js);
    } catch (e) {
      yield file;
      const diagnostic = makeEsModuleLexerDiagnostic(
        e as Error,
        file.file.name
      );
      if (diagnostic !== undefined) {
        yield diagnostic;
      }
      return;
    }
    const transforms = [];
    // Note we iterating backwards so that the character offsets are not
    // invalidated after each substitution.
    for (let i = specifiers.length - 1; i >= 0; i--) {
      const {n: oldSpecifier} = specifiers[i];
      if (oldSpecifier === undefined) {
        // E.g. A dynamic import that's not a static string, like
        // `import(someVariable)`. We can't handle this, skip.
        continue;
      }
      transforms.push({
        info: specifiers[i],
        newSpecifierPromise: this._handleSpecifier(
          oldSpecifier,
          file.file.name,
          getPackageJson,
          output
        ),
      });
    }
    for (const {
      info: {s: start, e: end, n: oldSpecifier, d: dynamicStart},
      newSpecifierPromise,
    } of transforms) {
      let newSpecifier;
      try {
        newSpecifier = await newSpecifierPromise;
      } catch (e) {
        // TODO(aomarks) If this was a TypeScript file, the user isn't going to
        // see this diagnostic, since we're looking at the JS file. To show it
        // correctly on the original file, we'll need source maps support.
        yield {
          kind: 'diagnostic',
          filename: file.file.name,
          diagnostic: {
            message: `Could not resolve module "${oldSpecifier}": ${
              (e as Error).message
            }`,
            range: {
              start: charToLineAndChar(js, start),
              end: charToLineAndChar(js, end),
            },
          },
        };
        continue;
      }
      if (newSpecifier === oldSpecifier) {
        continue;
      }
      // For dynamic imports, the start/end range doesn't include quotes.
      const isDynamic = dynamicStart !== -1;
      const replacement = isDynamic ? `'${newSpecifier}'` : newSpecifier;
      js = js.substring(0, start) + replacement + js.substring(end);
    }
    file.file.content = js;
    yield file;
  }

  /**
   * Transform the given module specifier and process the dependency
   * corresponding to it if needed.
   */
  private async _handleSpecifier(
    specifier: string,
    referrer: string,
    getPackageJson: () => Promise<PackageJson | undefined>,
    output: MergedAsyncIterables<BuildOutput>
  ): Promise<string> {
    const fromImportMap = this._importMapResolver.resolve(specifier);
    if (fromImportMap !== null) {
      return fromImportMap;
    }
    const kind = classifySpecifier(specifier);
    if (kind === 'url') {
      return specifier;
    }
    if (kind === 'bare') {
      return this._handleBareSpecifier(
        specifier,
        referrer,
        getPackageJson,
        output
      );
    }
    // Anything else is a relative specifier.
    if (!referrer.startsWith('node_modules/')) {
      // A relative specifier within a top-level project file. This specifier
      // must resolve to another top-level project file, so there's nothing more
      // we need to do here.
      return specifier;
    }
    // E.g. if `referrer` is "node_modules/foo@1.2.3/a.js" and `specifier` is
    // "./b.js", then `absolute` will be "node_modules/foo@1.2.3/b.js", and
    // `bare` will be "foo@1.2.3/b.js".
    const absolute = resolveUrlPath(referrer, specifier);
    const bare = absolute.slice('/node_modules/'.length);
    if (!fileExtension(specifier)) {
      // We can't simply return the existing relative specifier if there's no
      // ".js" extension, because we still need to do path canonicalization. For
      // example: "./foo" could refer to "./foo.js" or "./foo/index.js"
      // depending on what files are published to this package. We need to
      // consult the CDN to figure that out.
      return this._handleBareSpecifier(
        bare,
        referrer,
        // Note we never need a package.json here, because the version is
        // already included in the specifier itself at this point. We also
        // wouldn't want to pass this scope's `getPackageJson`, because it would
        // be the wrong one.
        async () => undefined,
        output
      );
    }
    // This relative specifier is good as-is, since it has an extension. We just
    // need to fetch it.
    const parsed = parseNpmStyleSpecifier(bare);
    if (parsed === undefined) {
      throw new Error(`Invalid specifier "${bare}"`);
    }
    output.add(this._fetchExternalDependency(parsed, output));
    return specifier;
  }

  /**
   * Canonicalize the given bare module specifier, then fetch it and add it to
   * the local filesystem.
   */
  private async _handleBareSpecifier(
    specifier: string,
    referrer: string,
    getPackageJson: () => Promise<PackageJson | undefined>,
    output: MergedAsyncIterables<BuildOutput>
  ): Promise<string> {
    let location = parseNpmStyleSpecifier(specifier);
    if (location === undefined) {
      throw new Error(`Invalid specifier "${specifier}"`);
    }
    if (!location.version) {
      location.version =
        (await getPackageJson())?.dependencies?.[location.pkg] ?? 'latest';
    }
    // Resolve the version number before resolving the module, so that any error
    // messages generated by the NodeModuleResolver will contain a concrete
    // version number.
    location.version = await this._cdn.resolveVersion(location);
    const packageJson = await this._cdn.fetchPackageJson(location);
    location.path = this._nodeResolver.resolve(location, packageJson, referrer);
    if (!fileExtension(location.path)) {
      // TODO(aomarks) It's safe to use unpkg's redirection-based
      // canonicalization for this final file-extension-adding step ("./foo" ->
      // "./foo.js"), because we've already applied package exports remappings
      // (if we did this in reverse order, unpkg could give us a 404 for a file
      // that only exists as a package export). However, it would be safer and a
      // better separation of concerns to move this final file-extension-adding
      // step directly into the NodeResolver class.
      location = await this._cdn.canonicalize(location);
    }
    output.add(this._fetchExternalDependency(location, output));
    const absolute = `node_modules/${location.pkg}@${location.version}/${location.path}`;
    const relative = relativeUrlPath(referrer, absolute);
    return relative;
  }

  /**
   * Fetch the given external module, and add it to the local filesystem under
   * its "node_modules/" path.
   */
  private async *_fetchExternalDependency(
    location: NpmFileLocation,
    output: MergedAsyncIterables<BuildOutput>
  ) {
    const path = `${location.pkg}@${location.version}/${location.path}`;
    if (this._emittedExternalDependencies.has(path)) {
      // We already emitted this dependency. Avoid import loops and wasteful
      // double fetches.
      return;
    }
    this._emittedExternalDependencies.add(path);
    let asset;
    try {
      asset = await this._cdn.fetch(location);
    } catch (e) {
      // TODO(aomarks) This file will end up as a 404 error when fetched from
      // the preview iframe, because we're simply omitting this file from our
      // output on error. We should instead allow FileBuildOutput to carry an
      // HTTP status code, so then we could propagate this specific error to be
      // served by the service worker, so that it shows up more usefully in the
      // network tab.
      console.error(`Error fetching ${path} from CDN: ${(e as Error).message}`);
      return;
    }
    let packageJson: PackageJson | undefined | null = null;
    const getPackageJson = async (): Promise<PackageJson | undefined> => {
      if (packageJson === null) {
        try {
          packageJson = await this._cdn.fetchPackageJson(location);
        } catch {
          packageJson = undefined;
        }
      }
      return packageJson;
    };
    yield* this._handleModule(
      {
        kind: 'file',
        file: {
          name: `node_modules/${path}`,
          content: asset.content,
          contentType: asset.contentType,
        },
      },
      getPackageJson,
      output
    );
  }
}

/**
 * Create a useful Playground diagnostic from an es-module-lexer exception.
 */
const makeEsModuleLexerDiagnostic = (
  e: Error,
  filename: string
): DiagnosticBuildOutput | undefined => {
  const match = e.message.match(/@:(\d+):(\d+)$/);
  if (match === null) {
    return undefined;
  }
  const line = Number(match[1]) - 1;
  const character = Number(match[2]) - 1;
  return {
    kind: 'diagnostic',
    filename,
    diagnostic: {
      message: `es-module-lexer error: ${e.message}`,
      range: {
        start: {line, character},
        end: {line, character: character + 1},
      },
    },
  };
};

/**
 * Create a useful Playground diagnostic from a JSON.parse exception.
 */
const makeJsonParseDiagnostic = (
  e: Error,
  file: SampleFile
): DiagnosticBuildOutput => {
  const start = extractPositionFromJsonParseError(e.message, file.content) ?? {
    line: 0,
    character: 0,
  };
  return {
    kind: 'diagnostic',
    filename: file.name,
    diagnostic: {
      message: `Invalid package.json: ${e}`,
      range: {
        start,
        // To the rest of the file.
        end: charToLineAndChar(file.content, file.content.length),
      },
    },
  };
};

/**
 * Try to extract the line and character from a `JSON.parse` exception message.
 *
 * Chrome and Firefox often include this information, but using different
 * formats. Safari never includes this information.
 */
const extractPositionFromJsonParseError = (
  message: string,
  json: string
): {line: number; character: number} | undefined => {
  const chrome = message.match(/at position (\d+)/);
  if (chrome !== null) {
    return charToLineAndChar(json, Number(chrome[1]));
  }
  const firefox = message.match(/at line (\d+) column (\d+)/);
  if (firefox !== null) {
    return {
      line: Number(firefox[1]) - 1,
      character: Number(firefox[2]) - 1,
    };
  }
  return undefined;
};
