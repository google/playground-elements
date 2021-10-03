/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {
  MergedAsyncIterables,
  relativeUrlPath,
  resolveUrlPath,
  classifySpecifier,
  parseNpmStyleSpecifier,
  fileExtension,
  changeFileExtension,
  charToLineAndChar,
} from '../typescript-worker/util.js';

suite('MergedAsyncIterables', () => {
  const flush = async <T>(iterable: AsyncIterable<T>): Promise<T[]> => {
    const results: T[] = [];
    for await (const value of iterable) {
      results.push(value);
    }
    return results;
  };

  const raf = () => new Promise((resolve) => requestAnimationFrame(resolve));

  test('zero iterables', async () => {
    const expected: unknown[] = [];
    const merged = new MergedAsyncIterables();
    const actual = await flush(merged);
    assert.deepEqual(actual, expected);
  });

  test('one iterable', async () => {
    const a = (async function* () {
      yield 'a0';
      yield 'a1';
    })();
    const expected = ['a0', 'a1'];
    const merged = new MergedAsyncIterables();
    merged.add(a);
    const actual = await flush(merged);
    assert.deepEqual(actual, expected);
  });

  test('throws if iterator added after complete', async () => {
    const merged = new MergedAsyncIterables();
    merged.add(
      (async function* () {
        yield 'a';
      })()
    );
    await flush(merged);
    assert.throws(() => {
      merged.add(
        (async function* () {
          yield 'b';
        })()
      );
    });
  });

  test('two iterables', async () => {
    const a = (async function* () {
      await raf();
      yield 'a0';
      yield 'a1';
    })();
    const b = (async function* () {
      yield 'b0';
      yield 'b1';
    })();
    const expected = ['b0', 'b1', 'a0', 'a1'];
    const merged = new MergedAsyncIterables();
    merged.add(a);
    merged.add(b);
    const actual = await flush(merged);
    assert.deepEqual(actual, expected);
  });

  test('three iterables', async () => {
    const a = (async function* () {
      await raf(); // 0
      await raf(); // 1
      yield 'a0';
      await raf(); // 2
      await raf(); // 3
      yield 'a1';
    })();
    const b = (async function* () {
      yield 'b0';
      await raf(); // 0
      await raf(); // 1
      await raf(); // 2
      await raf(); // 3
      await raf(); // 4
      yield 'b1';
    })();
    const c = (async function* () {
      await raf(); // 0
      yield 'c0';
      await raf(); // 1
      await raf(); // 2
      yield 'c1';
    })();
    const expected = ['b0', 'c0', 'a0', 'c1', 'a1', 'b1'];
    const merged = new MergedAsyncIterables();
    merged.add(a);
    merged.add(b);
    merged.add(c);
    const actual = await flush(merged);
    assert.deepEqual(actual, expected);
  });

  test('recursively add iterables', async () => {
    const merged = new MergedAsyncIterables();
    const a = (async function* () {
      yield 'a0';
      merged.add(
        (async function* () {
          await raf();
          yield 'b0';
          merged.add(
            (async function* () {
              yield 'c0';
            })()
          );
          await raf();
          yield 'b1';
        })()
      );
      yield 'a1';
    })();
    const expected = ['a0', 'a1', 'b0', 'c0', 'b1'];
    merged.add(a);
    const actual = await flush(merged);
    assert.deepEqual(actual, expected);
  });

  test('notice a new iterator while waiting on an existing one', async () => {
    const merged = new MergedAsyncIterables<string>();

    merged.add(
      (async function* () {
        await raf();
        yield 'slow';
      })()
    );

    // The key thing about this test is that we've started iterating before
    // adding the second source.
    const actual: string[] = [];
    const done = (async () => {
      for await (const value of merged) {
        actual.push(value);
      }
    })();

    merged.add(
      (async function* () {
        yield 'fast';
      })()
    );

    await done;
    const expected = ['fast', 'slow'];
    assert.deepEqual(actual, expected);
  });
});

suite('relativeUrlPath', () => {
  const cases: Array<{from: string; to: string; expected: string}> = [
    {
      from: 'index.js',
      to: 'my-element.js',
      expected: './my-element.js',
    },
    {
      from: 'index.js',
      to: 'node_modules/foo/foo.js',
      expected: './node_modules/foo/foo.js',
    },
    {
      from: 'node_modules/foo/foo.js',
      to: 'node_modules/foo/foo2.js',
      expected: './foo2.js',
    },
    {
      from: 'node_modules/foo/foo.js',
      to: 'node_modules/bar/bar.js',
      expected: '../bar/bar.js',
    },
    {
      from: 'node_modules/foo/a/b/c.js',
      to: 'node_modules/bar/a/b/c.js',
      expected: '../../../bar/a/b/c.js',
    },
    {
      from: 'index.js',
      to: 'index.js',
      expected: '',
    },
    {
      from: '',
      to: 'index.js',
      expected: './index.js',
    },
    {
      from: 'index.js',
      to: '',
      expected: './',
    },
    {
      from: '',
      to: '',
      expected: '',
    },
  ];

  for (const {from, to, expected} of cases) {
    test(`"${from}" -> "${to}"`, () => {
      const actual = relativeUrlPath(from, to);
      assert.equal(actual, expected);
    });
  }
});

suite('resolveUrlPath', () => {
  const cases: Array<{a: string; b: string; expected: string}> = [
    {
      a: 'index.js',
      b: './my-element.js',
      expected: '/my-element.js',
    },
    {
      a: 'index.js',
      b: './node_modules/foo/foo.js',
      expected: '/node_modules/foo/foo.js',
    },
    {
      a: 'node_modules/foo/foo.js',
      b: './foo2.js',
      expected: '/node_modules/foo/foo2.js',
    },
    {
      a: 'node_modules/foo/foo.js',
      b: '../bar/bar.js',
      expected: '/node_modules/bar/bar.js',
    },
    {
      a: 'node_modules/foo/a/b/c.js',
      b: '../../../bar/a/b/c.js',
      expected: '/node_modules/bar/a/b/c.js',
    },
    {
      a: 'index.js',
      b: '',
      expected: '/index.js',
    },
    {
      a: 'node_modules/index.js',
      b: '.',
      expected: '/node_modules/',
    },
    {
      a: 'node_modules/index.js',
      b: './',
      expected: '/node_modules/',
    },
    {
      a: 'node_modules/index.js',
      b: '../',
      expected: '/',
    },
  ];

  for (const {a, b, expected} of cases) {
    test(`"${a}" -> "${b}"`, () => {
      const actual = resolveUrlPath(a, b);
      assert.equal(actual, expected);
    });
  }
});

suite('classifySpecifier', () => {
  const cases: Array<{specifier: string; expected: string}> = [
    {
      specifier: 'foo',
      expected: 'bare',
    },
    {
      specifier: 'foo.js',
      expected: 'bare',
    },
    {
      specifier: './foo.js',
      expected: 'relative',
    },
    {
      specifier: '../foo.js',
      expected: 'relative',
    },
    {
      specifier: '../../foo/bar.js',
      expected: 'relative',
    },
    {
      specifier: '/foo.js',
      expected: 'relative',
    },
    {
      specifier: 'http://example.com/foo.js',
      expected: 'url',
    },
  ];

  for (const {specifier, expected} of cases) {
    test(specifier, () => {
      const actual = classifySpecifier(specifier);
      assert.equal(actual, expected);
    });
  }
});

suite('parseNpmStyleSpecifier', () => {
  const cases: Array<{
    specifier: string;
    expected: ReturnType<typeof parseNpmStyleSpecifier>;
  }> = [
    {
      specifier: 'foo',
      expected: {pkg: 'foo', version: '', path: ''},
    },
    {
      specifier: 'foo@^1.2.3',
      expected: {pkg: 'foo', version: '^1.2.3', path: ''},
    },
    {
      specifier: 'foo/bar.js',
      expected: {pkg: 'foo', version: '', path: 'bar.js'},
    },
    {
      specifier: 'foo@^1.2.3/bar.js',
      expected: {pkg: 'foo', version: '^1.2.3', path: 'bar.js'},
    },
    {
      specifier: '@ns/foo',
      expected: {pkg: '@ns/foo', version: '', path: ''},
    },
    {
      specifier: '@ns/foo@^1.2.3',
      expected: {pkg: '@ns/foo', version: '^1.2.3', path: ''},
    },
    {
      specifier: '@ns/foo/bar.js',
      expected: {pkg: '@ns/foo', version: '', path: 'bar.js'},
    },
    {
      specifier: '@ns/foo@^1.2.3/bar.js',
      expected: {pkg: '@ns/foo', version: '^1.2.3', path: 'bar.js'},
    },
    {
      specifier: '',
      expected: undefined,
    },
  ];

  for (const {specifier, expected} of cases) {
    test(specifier, () => {
      const actual = parseNpmStyleSpecifier(specifier);
      assert.deepEqual(actual, expected);
    });
  }
});

suite('fileExtension', () => {
  const cases: Array<{
    path: string;
    expected: string;
  }> = [
    {
      path: 'foo',
      expected: '',
    },
    {
      path: 'foo.js',
      expected: 'js',
    },
    {
      path: 'foo.ts',
      expected: 'ts',
    },
    {
      path: 'foo.ts/bar.js',
      expected: 'js',
    },
  ];

  for (const {path, expected} of cases) {
    test(path, () => {
      const actual = fileExtension(path);
      assert.equal(actual, expected);
    });
  }
});

suite('changeFileExtension', () => {
  const cases: Array<{
    path: string;
    newExt: string;
    expected: string;
  }> = [
    {
      path: 'foo',
      newExt: 'd.ts',
      expected: 'foo.d.ts',
    },
    {
      path: 'foo.js',
      newExt: 'd.ts',
      expected: 'foo.d.ts',
    },
    {
      path: '',
      newExt: 'd.ts',
      expected: '.d.ts',
    },
    {
      path: 'foo.js',
      newExt: '',
      expected: 'foo.',
    },
  ];

  for (const {path, newExt, expected} of cases) {
    test(`"${path}" -> "${newExt}"`, () => {
      const actual = changeFileExtension(path, newExt);
      assert.equal(actual, expected);
    });
  }
});

suite('charToLineAndChar', () => {
  const cases: Array<{
    str: string;
    char: number;
    expected: ReturnType<typeof charToLineAndChar>;
  }> = [
    {
      str: 'foo\nbar\nbaz',
      //    ^
      char: 0,
      expected: {line: 0, character: 0},
    },
    {
      str: 'foo\nbar\nbaz',
      //       ^^
      char: 3,
      expected: {line: 0, character: 3},
    },
    {
      str: 'foo\nbar\nbaz',
      //         ^
      char: 4,
      expected: {line: 1, character: 0},
    },
    {
      str: 'foo\r\nbar\r\nbaz',
      //       ^^
      char: 3,
      expected: {line: 0, character: 3},
    },
    {
      str: 'foo\r\nbar\r\nbaz',
      //         ^^
      char: 4,
      expected: {line: 0, character: 4},
    },
    {
      str: 'foo\r\nbar\r\nbaz',
      //           ^
      char: 5,
      expected: {line: 1, character: 0},
    },
    {
      str: 'foo\nbar\nbaz',
      //                ^
      char: 10,
      expected: {line: 2, character: 2},
    },
  ];

  for (const {str, char, expected} of cases) {
    test(`${char} in ${JSON.stringify(str)}`, () => {
      const actual = charToLineAndChar(str, char);
      assert.deepEqual(actual, expected);
    });
  }
});
