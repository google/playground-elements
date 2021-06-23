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
