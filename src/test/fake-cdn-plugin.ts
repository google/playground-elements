/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {TestRunnerPlugin} from '@web/test-runner-core/dist/server/TestRunnerPlugin.js';
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
 *        "versions": {
 *          "1.2.3": {
 *            "files": {
 *              "package.json": {
 *                "content": `{
 *                  "main": "lib/index.js"
 *                }`
 *              },
 *              "lib/index.js": {
 *                "content": "console.log('hello');"
 *              },
 *            }
 *          }
 *        }
 *      }
 *    };
 *    const {cdnBaseUrl, id} = await executeServerCommand('set-fake-cdn-data', cdnData);
 *    // Redirects to <cdnBaseUrl>/foo@1.2.3/lib/index.js and serves its content.
 *    const result = await fetch(new URL("foo@^1.0.0", cdnBaseUrl).href);
 *    await executeServerCommand('delete-fake-cdn-data', id);
 */
export function fakeCdnPlugin(): TestRunnerPlugin {
  const pathPrefix = '/fake-cdn/';
  let baseUrl: string | undefined;
  const dataMap = new Map<string, CdnData>();
  let _nextId = 0;

  return {
    name: 'fake-cdn',

    serverStart(args) {
      baseUrl = `http://${args.config.hostname}:${args.config.port}${pathPrefix}`;
    },

    executeCommand({command, payload}) {
      if (command === 'set-fake-cdn-data') {
        // Create a separate data store for each configuration, so that we can
        // support concurrent tests.
        const id = String(_nextId++);
        dataMap.set(id, payload as CdnData);
        return {
          id,
          cdnBaseUrl: `${baseUrl}${id}/`,
        };
      } else if (command === 'delete-fake-cdn-data') {
        // Allow deleting test data so that memory doesn't grow unbounded,
        // especially for when we're in a long running --watch mode session.
        const id = payload as string;
        dataMap.delete(id);
        return true;
      }
      return null;
    },

    serve(ctx) {
      if (!ctx.path.startsWith(pathPrefix)) {
        return undefined;
      }
      const urlMatch = ctx.path.slice(pathPrefix.length).match(/^(\d+)\/(.*)/);
      if (urlMatch === null) {
        ctx.response.status = 404;
        return undefined;
      }
      const id = urlMatch[1];
      const data = dataMap.get(id);
      if (data === undefined) {
        ctx.response.status = 404;
        return undefined;
      }
      const specifier = decodeURIComponent(urlMatch[2]);
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
        // The version in the URL was a range, rather than a concrete version.
        // Redirect to the concrete version's URL. Note that redirecting here,
        // rather than just serving the resolved file directly, is an important
        // behavior of unpkg that we want to preserve in tests, because we rely
        // on being able to extract resolved versions from redirect URLs.
        ctx.response.status = 302;
        ctx.response.redirect(`${pathPrefix}${id}/${pkg}@${version}/${path}`);
        return undefined;
      }
      const versionData = packageData.versions[version];
      if (!versionData) {
        ctx.response.status = 404;
        return undefined;
      }
      if (path === '') {
        const packageJson = JSON.parse(
          versionData.files['package.json']?.content ?? '{}'
        ) as {main?: string};
        // Only look at the "main" field, not "module", because that's how
        // unpkg.com works when it's not in ?module mode, which is how we're
        // using it (so that we get raw bare module specifiers).
        const main = packageJson.main ?? 'index.js';
        ctx.response.status = 302;
        ctx.response.redirect(`${pathPrefix}${id}/${pkg}@${version}/${main}`);
        return undefined;
      }
      const file = versionData.files[path];
      if (file !== undefined) {
        ctx.response.status = file.status ?? 200;
        ctx.response.body = file.content;
        ctx.response.type = path.endsWith('.js')
          ? 'text/javascript'
          : path.endsWith('.json')
          ? 'application/json'
          : 'text/plain';
        return undefined;
      }
      if (path === 'package.json') {
        // You can't publish to NPM without a package.json; for convenience in
        // testing, just make an empty one if the test data didn't contain one.
        return {
          body: '{}',
          type: 'application/json',
        };
      }
      if (versionData.files[path + '.js']) {
        ctx.response.status = 302;
        ctx.response.redirect(ctx.path + '.js');
        return undefined;
      }
      ctx.response.status = 404;
      return undefined;
    },
  };
}

export type CdnData = {
  [pkg: string]: {
    versions: {
      [version: string]: {
        files: {
          [path: string]: {
            content: string;
            status?: number;
          };
        };
      };
    };
  };
};

const parseNpmModuleSpecifier = (
  specifier: string
): {pkg: string; semverRangeOrTag: string; path: string} | undefined => {
  const match = specifier.match(/^((?:@[^/@]+\/)?[^/@]+)(?:@([^/]+))?\/?(.*)$/);
  if (match === null) {
    return undefined;
  }
  const [, pkg, semverRangeOrTag, path] = match;
  return {pkg, semverRangeOrTag, path};
};
