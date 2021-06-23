/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {MergedAsyncIterables} from '../typescript-worker/util.js';

suite('MergedAsyncIterables', () => {
  const flush = async <T>(iterable: AsyncIterable<T>): Promise<T[]> => {
    const results: T[] = [];
    for await (const value of iterable) {
      results.push(value);
    }
    return results;
  };

  const raf = () => new Promise((resolve) => requestAnimationFrame(resolve));

  test('empty', async () => {
    const expected: unknown[] = [];
    const merged = new MergedAsyncIterables();
    const actual = await flush(merged);
    assert.deepEqual(actual, expected);
  });

  test('one', async () => {
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

  test('two', async () => {
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

  test('three', async () => {
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
});
