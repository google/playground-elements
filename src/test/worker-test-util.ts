/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {build} from '../typescript-worker/build.js';
import type {
  BuildOutput,
  ModuleImportMap,
  SampleFile,
} from '../shared/worker-api.js';

export const checkTransform = async (
  files: SampleFile[],
  expected: BuildOutput[],
  importMap: ModuleImportMap = {}
) => {
  const results: BuildOutput[] = [];
  await new Promise<void>((resolve) => {
    const emit = (result: BuildOutput) => {
      if (result.kind === 'done') {
        resolve();
      } else {
        results.push(result);
      }
    };
    build(files, importMap, emit);
  });
  assert.deepEqual(
    results.sort(sortBuildOutput),
    expected.sort(sortBuildOutput)
  );
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
