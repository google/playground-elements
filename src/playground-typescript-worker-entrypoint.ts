/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {expose} from 'comlink';
import {build} from './typescript-worker/build.js';
import {WorkerAPI} from './shared/worker-api.js';
import {
  getCompletionItemDetails,
  queryCompletions,
} from './typescript-worker/completions.js';

const workerAPI: WorkerAPI = {
  compileProject: build,
  getCompletions: queryCompletions,
  getCompletionItemDetails: getCompletionItemDetails,
};
expose(workerAPI);
