/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  fileExtension,
  parseNpmStyleSpecifier,
  isExactSemverVersion,
  pkgVersion,
  pkgVersionPath,
} from './util.js';
import {Deferred} from '../shared/deferred.js';

import {NpmFileLocation, PackageJson} from './util.js';

export interface CdnFile {
  content: string;
  contentType: string;
}

/**
 * An interface to unpkg.com or a similar NPM CDN service.
 */
export class CachingCdn {
  private readonly _cdnBaseUrl: string;

  /**
   * A cache for all fetch operations to avoid redundant network requests.
   * Maps from package-version-path to a promise that resolves with the URL and
   * file content.
   */
  private readonly _fetchCache = new Map<
    string,
    Deferred<{url: string; file: CdnFile}>
  >();

  /**
   * Maps from package + version ranges/tags to resolved semver versions. This
   * allows us to canonicalize more efficiently, because once we've resolved
   * e.g. "foo@^1.0.0/foo.js" to "foo@1.2.3/foo.js", we can then canonicalize
   * "foo@^1.0.0/bar.js" without another fetch.
   */
  private readonly _versionCache = new Map<string, string>();

  /**
   * @param cdnBaseUrl Base URL for the CDN (e.g., 'https://unpkg.com')
   */
  constructor(cdnBaseUrl: string) {
    this._cdnBaseUrl = cdnBaseUrl.endsWith('/')
      ? cdnBaseUrl.slice(0, -1)
      : cdnBaseUrl;
  }

  /**
   * Fetch a file from the CDN.
   */
  async fetch(location: NpmFileLocation): Promise<CdnFile> {
    const {file} = await this._fetch(location);
    return file;
  }

  /**
   * Resolve a package location to a CDN URL using the configured provider
   */
  private _resolveCdnUrl(location: NpmFileLocation): string {
    // Construct the URL directly using the CDN base URL
    const packageSpec = `${location.pkg}@${location.version}`;

    const path = location.path ? `/${location.path}` : '';

    return `${this._cdnBaseUrl}/${packageSpec}${path}`;
  }

  /**
   * Return a version of the given CDN file specifier where version ranges and
   * NPM tags are resolved to concrete semver versions, and ambiguous paths are
   * resolved to concrete ones.
   *
   * E.g. foo@^1.0.0 -> foo@1.2.3/index.js
   *
   * TODO(aomarks) Remove this method in favor of separate resolveVersion and
   * fileExists methods, so that the caller can fully control resolution. We
   * shouldn't rely on unpkg's redirection logic for resolving paths anymore,
   * because it doesn't follow Node package exports, which can arbitrary remap
   * paths.
   */
  async canonicalize(location: NpmFileLocation): Promise<NpmFileLocation> {
    let exact = isExactSemverVersion(location.version);
    if (!exact) {
      const pv = pkgVersion(location);
      const resolved = this._versionCache.get(pv);
      if (resolved !== undefined) {
        location = {...location, version: resolved};
        exact = true;
      }
    }
    if (!exact || fileExtension(location.path) === '') {
      const {url} = await this._fetch(location);
      location = this._parseCdnUrl(url)!;
    }
    return location;
  }

  /**
   * Resolve the concrete version of the given package and version range
   */
  async resolveVersion({
    pkg,
    version,
  }: {
    pkg: string;
    version: string;
  }): Promise<string> {
    return (await this.canonicalize({pkg, version, path: 'package.json'}))
      .version;
  }

  /**
   * Fetch and parse a package's package.json file.
   */
  async fetchPackageJson({
    pkg,
    version,
  }: {
    pkg: string;
    version: string;
  }): Promise<PackageJson> {
    const {
      url,
      file: {content},
    } = await this._fetch({pkg, version, path: 'package.json'});
    try {
      return JSON.parse(content) as PackageJson;
    } catch (e) {
      throw new Error(`Error parsing CDN package.json from ${url}: ${e}`);
    }
  }

  private async _fetch(
    location: NpmFileLocation
  ): Promise<{url: string; file: CdnFile}> {
    let exact = isExactSemverVersion(location.version);
    if (!exact) {
      const pv = pkgVersion(location);
      const resolved = this._versionCache.get(pv);
      if (resolved !== undefined) {
        location = {...location, version: resolved};
        exact = true;
      }
    }
    const pvp = pkgVersionPath(location);
    const cached = this._fetchCache.get(pvp);
    if (cached !== undefined) {
      return cached.promise;
    }
    const deferred = new Deferred<{
      url: string;
      file: CdnFile;
    }>();
    this._fetchCache.set(pvp, deferred);
    const url = this._resolveCdnUrl(location);
    let res: Response;
    let content = '';
    try {
      res = await fetch(url);
      content = await res.text();

      if (res.status !== 200) {
        const errorMessage = `CDN HTTP ${res.status} error (${url}): ${content}`;
        console.warn(errorMessage);
        const err = new Error(errorMessage);
        deferred.reject(err);
        return deferred.promise;
      }
    } catch (e) {
      // Error usually happens if it's a 404 on the CDN causing the fetch to
      // throw a cors error
      console.warn(
        `Network error fetching ${url}: ${
          e instanceof Error ? e.message : String(e)
        }`
      );
      const err = new Error(
        `Failed to fetch from CDN (${url}): ${
          e instanceof Error ? e.message : String(e)
        }`
      );
      deferred.reject(err);
      return deferred.promise;
    }
    if (!exact) {
      const canonical = this._parseCdnUrl(res.url);
      if (canonical) {
        this._versionCache.set(pkgVersion(location), canonical.version);
        this._fetchCache.set(pkgVersionPath(canonical), deferred);
      }
    }

    const result = {
      url: res.url,
      file: {
        content,
        contentType: res.headers.get('content-type') ?? 'text/plain',
      },
    };
    deferred.resolve(result);
    return deferred.promise;
  }

  private _parseCdnUrl(url: string): NpmFileLocation | undefined {
    // Check if the URL starts with our CDN base URL
    if (!url.startsWith(this._cdnBaseUrl)) {
      const errorMessage = `Failed to parse CDN URL: ${url} - URL does not start with CDN base URL: ${this._cdnBaseUrl}`;
      console.warn(errorMessage);
      return undefined;
    }

    // Extract the path after the CDN base URL
    const path = url.slice(this._cdnBaseUrl.length + 1); // +1 for the trailing slash

    // Use the utility function to parse the path as an NPM-style specifier
    const parsed = parseNpmStyleSpecifier(path);

    if (parsed) {
      return parsed;
    }

    const errorMessage = `Failed to parse CDN URL: ${url} - could not extract package information`;
    console.warn(errorMessage);
    return undefined;
  }
}
