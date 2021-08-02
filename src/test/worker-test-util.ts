/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {build} from '../typescript-worker/build.js';
import {executeServerCommand} from '@web/test-runner-commands';

import type {
  BuildOutput,
  ModuleImportMap,
  SampleFile,
} from '../shared/worker-api.js';
import type {CdnData} from './fake-cdn-plugin.js';

const configureFakeCdn = async (
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
  files: SampleFile[],
  expected: BuildOutput[],
  importMap: ModuleImportMap = {},
  cdnData: CdnData = {}
) => {
  const {cdnBaseUrl, deleteCdnData} = await configureFakeCdn(cdnData);
  try {
    const results: BuildOutput[] = [];
    await new Promise<void>((resolve) => {
      const emit = (result: BuildOutput) => {
        if (result.kind === 'done') {
          resolve();
        } else {
          results.push(result);
        }
      };
      build(files, {importMap, cdnBaseUrl}, emit);
    });

    assert.deepEqual(
      results.sort(sortBuildOutput),
      expected.sort(sortBuildOutput)
    );
  } finally {
    await deleteCdnData();
  }
};

const sortBuildOutput = (a: BuildOutput, b: BuildOutput) => {
  if (a.kind === 'file' && b.kind === 'file') {
    return a.file.name.localeCompare(b.file.name);
  }
  if (a.kind === 'diagnostic' && b.kind === 'diagnostic') {
    return a.diagnostic.message.localeCompare(b.diagnostic.message);
  }
  return a.kind.localeCompare(b.kind);
};
