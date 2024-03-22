/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {build} from '../typescript-worker/build.js';
import {executeServerCommand} from '@web/test-runner-commands';

import type {
  BuildResult,
  ModuleImportMap,
  File,
  FileDiagnostic,
} from '../shared/worker-api.js';
import type {CdnData} from './fake-cdn-plugin.js';

export const configureFakeCdn = async (
  data: CdnData
): Promise<{cdnBaseUrl: string; deleteCdnData: () => Promise<void>}> => {
  const {cdnBaseUrl, id} = (await executeServerCommand(
    'set-fake-cdn-data',
    data
  )) as {cdnBaseUrl: string; id: number};
  const deleteCdnData = async () => {
    await executeServerCommand('delete-fake-cdn-data', id);
  };
  return {
    cdnBaseUrl,
    deleteCdnData,
  };
};

export const checkTransform = async (
  files: File[],
  expected: BuildResult,
  importMap: ModuleImportMap = {},
  cdnData: CdnData = {}
) => {
  const {cdnBaseUrl, deleteCdnData} = await configureFakeCdn(cdnData);
  try {
    const result = await build(files, {importMap, cdnBaseUrl});

    // console.log('build result', result);

    for (const {diagnostic} of result.diagnostics) {
      // Sometimes diagnostics contain a CDN URL to help with debugging
      // (usually the unpkg.com URL). But that will be a local dynamic URL in
      // testing, so we'll substitute a static string so that we can do a
      // simple equality test.
      while (diagnostic.message.includes(cdnBaseUrl)) {
        diagnostic.message = diagnostic.message.replace(
          cdnBaseUrl,
          '<CDN-BASE-URL>/'
        );
      }
    }

    assert.deepEqual(
      result.files.sort(compareFiles),
      expected.files.sort(compareFiles)
    );
    assert.deepEqual(
      result.diagnostics.sort(compareDiagnostics),
      expected.diagnostics.sort(compareDiagnostics)
    );
    if (expected.semanticDiagnostics !== undefined) {
      assert.isDefined(result.semanticDiagnostics);
      assert.deepEqual(
        (await result.semanticDiagnostics!).sort(compareDiagnostics),
        (await expected.semanticDiagnostics).sort(compareDiagnostics)
      );
    }
  } finally {
    await deleteCdnData();
  }
};

const compareFiles = (a: File, b: File) => {
  return a.name.localeCompare(b.name);
};

const compareDiagnostics = (a: FileDiagnostic, b: FileDiagnostic) => {
  return (
    a.filename.localeCompare(b.filename) ||
    a.diagnostic.message.localeCompare(b.diagnostic.message)
  );
};
