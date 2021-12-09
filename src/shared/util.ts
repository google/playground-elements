/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

export const endWithSlash = (s: string) => (s.endsWith('/') ? s : s + '/');

export const getRandomString = () =>
  crypto.getRandomValues(new Uint32Array(1))[0].toString(32);

/**
 * If the given URL object is a Skypack URL, perform an in-place update that
 * switches from optimized mode to raw mode.
 *
 * See https://github.com/google/playground-elements/issues/107
 */
export const forceSkypackRawMode = (url: URL): URL => {
  if (url.hostname === 'cdn.skypack.dev') {
    url.pathname = url.pathname.replace(
      /mode=imports\/(un)?optimized/,
      'mode=raw'
    );
  }
  return url;
};

export type Result<V, E> =
  | {result: V; error?: undefined}
  | {result?: undefined; error: E};
