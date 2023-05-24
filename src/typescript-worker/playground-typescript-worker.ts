/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {expose} from 'comlink';
import {build} from './build.js';
import {WorkerAPI, WorkerConfig} from '../shared/worker-api.js';
import {getCompletionItemDetails, queryCompletions} from './completions.js';
import {getWorkerContext} from './worker-context.js';

const workerAPI: WorkerAPI = {
  compileProject: build,
  getCompletions: queryCompletions,
  getCompletionItemDetails: getCompletionItemDetails,
  getFreshWorkerContext(config: WorkerConfig) {
    getWorkerContext(config, true);
  },
};
expose(workerAPI);
