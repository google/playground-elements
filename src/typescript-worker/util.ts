/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

type IteratorResultWithNext<T> = Promise<{
  value: IteratorResult<T>;
  next: () => IteratorResultWithNext<T>;
}>;

/**
 * Merges multiple async iterables into one iterable. Iterator next promises are
 * raced, so order is not preserved. Additional iterables can be added before or
 * during iteration.
 */
export class MergedAsyncIterables<T> {
  private _iterators = new Map<
    () => IteratorResultWithNext<T>,
    IteratorResultWithNext<T>
  >();

  add(iterable: AsyncIterable<T>) {
    const iterator = iterable[Symbol.asyncIterator]();
    const next = async () => ({
      value: await iterator.next(),
      next,
    });
    this._iterators.set(next, next());
  }

  async *[Symbol.asyncIterator]() {
    while (this._iterators.size > 0) {
      const {value, next} = await Promise.race(this._iterators.values());
      if (value.done) {
        this._iterators.delete(next);
      } else {
        yield value.value;
        this._iterators.set(next, next());
      }
    }
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
    new URL(specifier).href;
    return 'url';
  } catch {}
  if (specifier.match(/^(\.){0,2}\//) !== null) {
    return 'relative';
  }
  return 'bare';
};

/**
 * Parse the given module import specifier using format
 * "<pkg>[@<version>][/<path>]".
 *
 * E.g. given "foo@^1.2.3/bar.js" return {
 *   pkg: "foo",
 *   range: "^1.2.3",
 *   path: "bar.js"
 * }
 */
export const parseNpmStyleSpecifier = (
  specifier: string
): {pkg: string; version: string; path: string} | undefined => {
  const match = specifier.match(
    /^((?:@[^\/@]+\/)?[^\/\@]+)(?:@([^\/]+))?\/?(.*)$/
  );
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
 * ".".
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
 * should not include the leading ".".
 */
export const changeFileExtension = (path: string, newExt: string): string => {
  const oldExt = fileExtension(path);
  if (oldExt === '') {
    return path + '.' + newExt;
  }
  return path.slice(0, -oldExt.length) + newExt;
};
