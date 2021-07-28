/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ts from '../internal/typescript.js';
import {ModuleResolver} from './module-resolver.js';
import {Deferred} from '../shared/deferred.js';
import {
  parseNpmStyleSpecifier,
  fileExtension,
  changeFileExtension,
  classifySpecifier,
  resolveUrlPath,
} from './util.js';

import type {Result} from '../shared/util.js';

/**
 * Fetches typings for TypeScript imports and their transitive dependencies, and
 * for standard libraries.
 */
export class TypesFetcher {
  private readonly _moduleResolver: ModuleResolver;
  private readonly _entrypointTasks: Promise<void>[] = [];
  private readonly _handledSpecifiers = new Set<string>();
  private readonly _specifierToFetchResult = new Map<
    string,
    Deferred<Result<string, number>>
  >();

  constructor(moduleResolver: ModuleResolver) {
    this._moduleResolver = moduleResolver;
  }

  /**
   * Start fetching type definitions for all bare module specifiers in the given
   * TypeScript source text. Relative module specifiers are ignored.
   *
   * This function returns immediately, but begins an asynchronous walk of the
   * module import graph to fetch all typings and package.json files that will
   * be needed in order for TypeScript to type check this file. To access the
   * results, call {@link getTypings}.
   */
  addBareModuleTypings(sourceText: string): void {
    const fileInfo = ts.preProcessFile(sourceText, undefined, true);
    for (const {fileName: specifier} of fileInfo.importedFiles) {
      if (classifySpecifier(specifier) === 'bare') {
        this._entrypointTasks.push(this._handleBareSpecifier(specifier));
      }
    }
    for (const {fileName: lib} of fileInfo.libReferenceDirectives) {
      this._entrypointTasks.push(this._addLibTypings(lib));
    }
  }

  /**
   * Start fetching type definitions for a built-in TypeScript lib, like "dom"
   * or "esnext".
   *
   * This function returns immediately, but begins an asynchronous walk of the
   * <reference> graph. To access the results, await {@link getTypings}.
   */
  addLibTypings(lib: string): void {
    this._entrypointTasks.push(this._addLibTypings(lib));
  }

  /**
   * Get the d.ts and package.json files that will be needed for type checking
   * for all bare modules and libs added since construction.
   *
   * @returns Promise of a Map whose keys are bare module specifiers, and values
   * are file contents. Example keys: "lit-html/lit-html.d.ts",
   * "lit-html/package.json".
   */
  async getFiles(): Promise<Map<string, string>> {
    await Promise.all(this._entrypointTasks);
    const files = new Map();
    for (const [specifier, deferred] of this._specifierToFetchResult) {
      const fetched = await deferred.promise;
      if (fetched.error === undefined) {
        // Note that if the user writes an import for a package that doesn't
        // exist, we'll omit it here (since it will have error 404), so
        // TypeScript will fail to find a typings file, and will generate a
        // diagnostic on the bad import. So we don't actually need to do
        // anything special with errors (though we could potentially surface
        // more information).
        files.set(specifier, fetched.result);
      }
    }
    return files;
  }

  private async _addLibTypings(lib: string): Promise<void> {
    await this._handleBareSpecifier(
      `typescript/lib/lib.${lib.toLowerCase()}.js`
    );
  }

  private async _handleBareAndRelativeSpecifiers(
    sourceText: string,
    referrerSpecifier: NodePackage
  ): Promise<void> {
    const fileInfo = ts.preProcessFile(sourceText, undefined, true);
    const promises = [];
    for (const {fileName: specifier} of fileInfo.importedFiles) {
      const kind = classifySpecifier(specifier);
      if (kind === 'bare') {
        promises.push(this._handleBareSpecifier(specifier));
      } else if (kind === 'relative') {
        promises.push(
          this._handleRelativeSpecifier(specifier, referrerSpecifier)
        );
      }
    }
    for (const {fileName: lib} of fileInfo.libReferenceDirectives) {
      promises.push(this.addLibTypings(lib));
    }
    await Promise.all(promises);
  }

  private async _handleBareSpecifier(bare: string): Promise<void> {
    if (this._handledSpecifiers.has(bare)) {
      return;
    }
    this._handledSpecifiers.add(bare);
    const npm = parseNpmStyleSpecifier(bare);
    if (npm === undefined) {
      return;
    }
    const pkg = npm.pkg;
    // If there's no path, we need to discover the main module.
    let jsPath = npm.path;
    if (jsPath === '') {
      const packageJson = await this._fetchPackageJson(pkg);
      if (packageJson.error !== undefined) {
        return;
      }
      jsPath = packageJson.result.main ?? 'index.js';
    }
    const ext = fileExtension(jsPath);
    if (ext === '') {
      // No extension is presumed js.
      jsPath += '.js';
    } else if (ext !== 'js') {
      // Unhandled kind of import.
      return;
    }
    const dtsPath = changeFileExtension(jsPath, 'd.ts');
    const dtsSpecifier = `${pkg}/${dtsPath}`;
    if (this._handledSpecifiers.has(dtsSpecifier)) {
      return;
    }
    this._handledSpecifiers.add(dtsSpecifier);
    const dtsResult = await this._fetchAsset(dtsSpecifier);
    if (dtsResult.error !== undefined) {
      return;
    }
    await this._handleBareAndRelativeSpecifiers(dtsResult.result, {
      pkg,
      path: jsPath,
    });
  }

  private _resolveBareModule(bare: string): string {
    const result = this._moduleResolver.resolve(bare, '');
    if (result.type !== 'bare') {
      throw new Error(`Only expected bare module for specifier ${bare}`);
    }
    return result.url;
  }

  private async _handleRelativeSpecifier(
    relative: string,
    referrerSpecifier: NodePackage
  ): Promise<void> {
    const ext = fileExtension(relative);
    if (ext === '') {
      // No extension is presumed js.
      relative += '.js';
    } else if (ext !== 'js') {
      // Unhandled kind of import.
      return;
    }
    const jsPath = resolveUrlPath(referrerSpecifier.path, relative).slice(1); // Remove the leading '/'.
    const dtsPath = changeFileExtension(jsPath, 'd.ts');
    const dtsSpecifier = `${referrerSpecifier.pkg}/${dtsPath}`;
    if (this._handledSpecifiers.has(dtsSpecifier)) {
      return;
    }
    this._handledSpecifiers.add(dtsSpecifier);
    const dtsResult = await this._fetchAsset(dtsSpecifier);
    if (dtsResult.error !== undefined) {
      return;
    }
    await this._handleBareAndRelativeSpecifiers(dtsResult.result, {
      pkg: referrerSpecifier.pkg,
      path: jsPath,
    });
  }

  private async _fetchAsset(
    specifier: string
  ): Promise<Result<string, number>> {
    let deferred = this._specifierToFetchResult.get(specifier);
    if (deferred !== undefined) {
      return deferred.promise;
    }
    deferred = new Deferred();
    this._specifierToFetchResult.set(specifier, deferred);

    let url = this._resolveBareModule(specifier);
    // It's common to have a module resolver that resolves to unpkg.com URLs
    // with the ?module parameter. But ?module mode errors on .d.ts files and
    // package.json files (anything other than .js and .html), so we have to
    // remove that here.
    const urlObj = new URL(url);
    if (urlObj.host === 'unpkg.com' && urlObj.searchParams.has('module')) {
      urlObj.searchParams.delete('module');
      url = urlObj.href;
    }
    const resp = await fetch(url);
    let result: Result<string, number>;
    if (resp.status === 200) {
      result = {result: await resp.text()};
    } else {
      result = {error: resp.status};
    }
    deferred.resolve(result);
    return result;
  }

  private async _fetchPackageJson(
    pkg: string
  ): Promise<Result<PackageJson, number>> {
    const result = await this._fetchAsset(`${pkg}/package.json`);
    if (result.error !== undefined) {
      return result;
    }
    return {result: JSON.parse(result.result) as PackageJson};
  }
}

interface PackageJson {
  main?: string;
}

interface NodePackage {
  pkg: string;
  path: string;
}
