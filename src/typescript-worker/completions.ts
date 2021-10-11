/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Fuse from 'fuse.js';
import type {GetCompletionsAtPositionOptions} from 'typescript';
import {EditorToken, WorkerConfig} from '../shared/worker-api';
import {getWorkerContext} from './worker-context';

export const queryCompletions = async (
  filename: string,
  tokenUnderCursor: EditorToken,
  cursorIndex: number,
  config: WorkerConfig
): Promise<string[]> => {
  const workerContext = getWorkerContext(config);

  const languageService = workerContext.languageServiceContext.service;
  const options = {} as GetCompletionsAtPositionOptions;
  // TODO: Find a way to wait for build
  await new Promise(resolve => setTimeout(resolve, 100));
  const completions = languageService.getCompletionsAtPosition(
    filename,
    cursorIndex,
    options
  );


  const fuse = new Fuse(completions?.entries.map(comp => comp.name) ?? [], {
    threshold: 0.6,
    distance: 3,
    shouldSort: true,
    isCaseSensitive: true,
    includeScore: true,
    minMatchCharLength: Math.max(tokenUnderCursor.string.length - 1, 1)
  });

  const relevantCompletions = fuse.search(tokenUnderCursor.string);

  return relevantCompletions?.map(comp => comp.item) ?? [];
};
