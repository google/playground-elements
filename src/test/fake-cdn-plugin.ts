/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import type {TestRunnerPlugin} from '@web/test-runner-core/dist/server/TestRunnerPlugin.js';
import semver from 'semver';

/**
 * A plugin for @web/test-runner that simulates an NPM CDN like unpkg.com. It
 * extends the built-in @web/test-runner server, and can be re-configured from
 * the test suite itself between each test using a server command
 * (https://modern-web.dev/docs/test-runner/commands/).
 *
 * Usage:
 *
 *    import {executeServerCommand} from '@web/test-runner-commands';
 *
 *    const cdnData = {
 *      "foo": {
 *        "1.2.3": {
 *          "main": "lib/index.js",
 *          "files": {
 *            "lib/index.js": {
 *              "content": "console.log('hello');"
 *            }
 *          }
 *        }
 *      }
 *    };
 *    const cdnBaseUrl = await executeServerCommand('set-fake-cdn-data', cdnData);
 *    // Redirects to <cdnBaseUrl>/foo@1.2.3/lib/index.js and serves its content.
 *    const result = await fetch(new URL("foo@^1.0.0", cdnBaseUrl).href);
 */
export function fakeCdnPlugin(): TestRunnerPlugin {
  const pathPrefix = '/fake-cdn/';
  let baseUrl: string | undefined;
  let data: CdnData = {};

  return {
    name: 'fake-cdn',

    serverStart(args) {
      baseUrl = `http://${args.config.hostname}:${args.config.port}${pathPrefix}`;
    },

    executeCommand({command, payload}) {
      if (command === 'set-fake-cdn-data') {
        data = payload as CdnData;
        return baseUrl;
      }
      return false;
    },

    serve(ctx) {
      if (!ctx.path.startsWith(pathPrefix)) {
        return undefined;
      }
      const specifier = decodeURIComponent(ctx.path.slice(pathPrefix.length));
      const parsed = parseNpmModuleSpecifier(specifier);
      if (!parsed) {
        ctx.response.status = 404;
        return undefined;
      }
      const {pkg, semverRangeOrTag, path} = parsed;
      const packageData = data[pkg];
      if (!packageData) {
        ctx.response.status = 404;
        return undefined;
      }
      // Note we don't support tags other than "latest" for now, but we could
      // easily add that to CdnData if needed.
      const semverRange =
        semverRangeOrTag === '' || semverRangeOrTag === 'latest'
          ? '*'
          : semverRangeOrTag;
      const versions = Object.keys(packageData.versions);
      const version = semver.maxSatisfying(versions, semverRange);
      if (!version) {
        ctx.response.status = 404;
        return undefined;
      }
      if (version !== semverRange) {
        ctx.response.status = 302;
        ctx.response.redirect(`${pathPrefix}${pkg}@${version}/${path}`);
        return undefined;
      }
      const versionData = packageData.versions[version];
      if (!versionData) {
        ctx.response.status = 404;
        return undefined;
      }
      if (path === '') {
        ctx.response.status = 302;
        ctx.response.redirect(
          `${pathPrefix}${pkg}@${version}/${versionData.main ?? 'index.js'}`
        );
        return undefined;
      }
      const file = versionData.files[path];
      if (!file) {
        ctx.response.status = 404;
        return undefined;
      }
      return {
        body: file.content,
        type: path.endsWith('.js')
          ? 'text/javascript'
          : path.endsWith('.json')
          ? 'application/json'
          : 'text/plain',
      };
    },
  };
}

export type CdnData = {
  [pkg: string]: {
    versions: {
      [version: string]: {
        main?: string;
        files: {
          [path: string]: {
            content: string;
          };
        };
      };
    };
  };
};

const parseNpmModuleSpecifier = (
  specifier: string
): {pkg: string; semverRangeOrTag: string; path: string} | undefined => {
  const match = specifier.match(
    /^((?:@[^\/@]+\/)?[^\/\@]+)(?:@([^\/]+))?\/?(.*)$/
  );
  if (match === null) {
    return undefined;
  }
  const [, pkg, semverRangeOrTag, path] = match;
  return {pkg, semverRangeOrTag, path};
};
