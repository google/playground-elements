/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Merges multiple async iterables into one iterable. Order is not preserved.
 * Iterables can be added before or during iteration. After exhausted, adding a
 * new iterator throws.
 */
export class MergedAsyncIterables<T> {
  private readonly _buffer: Array<{value: T; emitted: () => void}> = [];
  private _numSources = 0;
  private _notify?: () => void;
  private _done = false;

  async *[Symbol.asyncIterator]() {
    while (this._numSources > 0) {
      while (this._buffer.length > 0) {
        const {value, emitted} = this._buffer.shift()!;
        yield value;
        // Let the loop in add() continue
        emitted();
      }
      // Wait until there is a new value or a source iterator was exhausted
      await new Promise<void>((resolve) => (this._notify = resolve));
      this._notify = undefined;
    }
    this._done = true;
  }

  add(iterable: AsyncIterable<T>) {
    if (this._done) {
      throw new Error(
        'Merged iterator is exhausted. Cannot add new source iterators.'
      );
    }
    this._numSources++;
    void (async () => {
      for await (const value of iterable) {
        // Wait for this value to be emitted before continuing
        await new Promise<void>((emitted) => {
          this._buffer.push({value, emitted});
          this._notify?.();
        });
      }
      this._numSources--;
      this._notify?.();
    })();
  }
}

/**
 * Return the relative path from two URL pathnames.
 *
 * E.g. given "a/b/c.js" and "a/d.js" return "../d.js".
 */
export const relativeUrlPath = (from: string, to: string): string => {
  const fromParts = from.split('/');
  const toParts = to.split('/');
  let numCommon = 0;
  while (
    numCommon < fromParts.length &&
    numCommon < toParts.length &&
    fromParts[numCommon] === toParts[numCommon]
  ) {
    numCommon++;
  }
  const numUp = fromParts.length - numCommon - 1;
  return (
    (numUp === 0 ? './' : new Array(numUp + 1).join('../')) +
    toParts.slice(numCommon).join('/')
  );
};

/**
 * Resolve two URL pathnames into an absolute path.
 *
 * E.g. given "a/b/c.js" and "../d.js" return "a/d.js".
 */
export const resolveUrlPath = (a: string, b: string) =>
  // The base URL is arbitrary and "ws://_" is very short.
  new URL(b, new URL(a, 'ws://_')).pathname;

/**
 * Return whether the given module import specifier is bare, a relative URL, or
 * a fully qualified URL.
 */
export const classifySpecifier = (
  specifier: string
): 'bare' | 'relative' | 'url' => {
  try {
    // Note a specifier like "te:st.js" would be classified as a URL. This is
    // ok, because we can assume bare specifiers are always prefixed with a NPM
    // package name, which cannot contain ":" characters.
    new URL(specifier).href;
    return 'url';
    // eslint-disable-next-line no-empty
  } catch {}
  if (specifier.match(/^(\.){0,2}\//) !== null) {
    return 'relative';
  }
  return 'bare';
};

export interface NpmFileLocation {
  pkg: string;
  version: string;
  path: string;
}

/**
 * Parse the given module import specifier using format
 * "<pkg>[@<version>][/<path>]".
 *
 * E.g. given "foo@^1.2.3/bar.js" return {
 *   pkg: "foo",
 *   version: "^1.2.3",
 *   path: "bar.js"
 * }
 */
export const parseNpmStyleSpecifier = (
  specifier: string
): NpmFileLocation | undefined => {
  const match = specifier.match(/^((?:@[^/@]+\/)?[^/@]+)(?:@([^/]+))?\/?(.*)$/);
  if (match === null) {
    return undefined;
  }
  const [, pkg, version, path] = match as [
    unknown,
    string,
    string | undefined,
    string
  ];
  return {pkg, version: version ?? '', path};
};

/**
 * Return the file extension of the given URL path. Does not include the leading
 * ".". Note this only considers the final ".", so e.g. given "foo.d.ts" this
 * will return "ts".
 */
export const fileExtension = (path: string): string => {
  const lastSlashIdx = path.lastIndexOf('/');
  const lastDotIdx = path.lastIndexOf('.');
  return lastDotIdx === -1 || lastDotIdx < lastSlashIdx
    ? ''
    : path.slice(lastDotIdx + 1);
};

/**
 * Change the given URL path's file extension to a different one. `newExt`
 * should not include the leading ".". Note this only considers the final ".",
 * so e.g. given "foo.d.ts" and ".js" this will return "foo.d.js".
 */
export const changeFileExtension = (path: string, newExt: string): string => {
  const oldExt = fileExtension(path);
  if (oldExt === '') {
    return path + '.' + newExt;
  }
  return path.slice(0, -oldExt.length) + newExt;
};

/**
 * Given a string and string-relative character index, return the equivalent
 * line number and line-relative character index.
 */
export const charToLineAndChar = (
  str: string,
  char: number
): {line: number; character: number} => {
  let line = 0;
  let character = 0;
  for (let i = 0; i < char && i < str.length; i++) {
    if (str[i] === '\n') {
      line++;
      character = 0;
    } else {
      character++;
    }
  }
  return {line, character};
};

/**
 * The "exports" field of a package.json.
 *
 * See https://nodejs.org/api/packages.html#packages_exports.
 */
export type PackageExports =
  | PackageExportsTarget
  | PackageExportsPathOrConditionMap;

/**
 * The export result for some path or condition.
 */
export type PackageExportsTarget =
  // A concrete path.
  | PackageExportsTargetPath
  // Condition maps can be nested.
  | PackageExportsConditionMap
  // The first valid target in an array wins.
  | PackageExportsTarget[]
  // An explicit "not found".
  | null;

/**
 * A concrete resolved path (e.g. "./lib/foo.js").
 */
export type PackageExportsTargetPath = string;

/**
 * Map from a path or condition to a target.
 */
export type PackageExportsPathOrConditionMap = {
  [pathOrCondition: string]: PackageExportsTarget;
};

/**
 * Map from a condition to a target.
 *
 * Note this is technically the same type as PackageExportsPathOrConditionMap,
 * but it's distinguished for clarity because "path" keys are only allowed in
 * the top-level of the "exports" object.
 */
export type PackageExportsConditionMap = {
  [condition: string]: PackageExportsTarget;
};

export interface PackageJson {
  version?: string;
  main?: string;
  exports?: PackageExports;
  module?: string;
  types?: string;
  typings?: string;
  type?: string;
  dependencies?: {[key: string]: string};
}

export interface PackageJsonWithExports extends PackageJson {
  exports: PackageExports;
}

/**
 * Return whether the given string is an exact semver version, as opposed to a
 * range or tag.
 */
export const isExactSemverVersion = (s: string) =>
  s.match(
    // https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
  ) !== null;

export const pkgVersion = ({pkg, version}: {pkg: string; version: string}) =>
  `${pkg}@${version || 'latest'}`;

export const pkgVersionPath = ({pkg, version, path}: NpmFileLocation) =>
  trimTrailingSlash(`${pkgVersion({pkg, version})}/${trimLeadingSlash(path)}`);

export const trimLeadingSlash = (s: string) =>
  s.startsWith('/') ? s.slice(1) : s;

export const trimTrailingSlash = (s: string) =>
  s.endsWith('/') ? s.slice(0, -1) : s;
