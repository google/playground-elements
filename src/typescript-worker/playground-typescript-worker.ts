/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {expose} from 'comlink';
import {compileProject} from './typescript.js';
import type {TypeScriptWorkerAPI} from '../shared/worker-api.js';

const workerAPI: TypeScriptWorkerAPI = {
  compileProject,
};
expose(workerAPI);
