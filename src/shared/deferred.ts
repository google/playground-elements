/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

export class Deferred<T> {
  readonly promise: Promise<T>;
  private _resolve!: (value: T) => void;
  resolved = false;

  constructor() {
    this.promise = new Promise<T>((resolve) => {
      this._resolve = resolve;
    });
  }

  resolve(value: T) {
    this.resolved = true;
    this._resolve(value);
  }
}
