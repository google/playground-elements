/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {expose} from 'comlink';
import {build} from './build.js';
import {
  File,
  BuildResult,
  WorkerAPI,
  WorkerConfig,
  FileDiagnostic,
} from '../shared/worker-api.js';
import {getCompletionItemDetails, queryCompletions} from './completions.js';

// Note: Comlink can only proxy objects/function that are direct parameters or
// return values of exposed functions. So we can't return an object with a
// Promise of semantic diagnostics or a function to retrieve them. Instead, we
// must take a callback function. There may be a way to write a Comlink
// custom handler to allow passing an object with proxies in it.
const workerAPI: WorkerAPI = {
  compileProject: async (
    files: Array<File>,
    config: WorkerConfig,
    onSemanticDiagnostics?: (diagnostics?: Array<FileDiagnostic>) => void
  ): Promise<BuildResult> => {
    const result = await build(files, config);
    if (onSemanticDiagnostics !== undefined) {
      void Promise.resolve(result.semanticDiagnostics).then(
        onSemanticDiagnostics
      );
    }
    return {
      files: result.files,
      diagnostics: result.diagnostics,
    };
  },
  getCompletions: queryCompletions,
  getCompletionItemDetails: getCompletionItemDetails,
};
expose(workerAPI);
