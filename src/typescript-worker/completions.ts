/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Fuse from 'fuse.js';
import type {GetCompletionsAtPositionOptions} from 'typescript';
import {
  EditorCompletion,
  EditorToken,
  WorkerConfig,
} from '../shared/worker-api';
import {getWorkerContext} from './worker-context';

export const queryCompletions = async (
  filename: string,
  tokenUnderCursor: EditorToken,
  cursorIndex: number,
  config: WorkerConfig
): Promise<EditorCompletion[]> => {
  const workerContext = getWorkerContext(config);

  const languageService = workerContext.languageServiceContext.service;
  const searchWordIsPeriod = tokenUnderCursor.string === '.';
  const options = {} as GetCompletionsAtPositionOptions;
  if (searchWordIsPeriod) {
    options.triggerCharacter = '.';
  }

  const completions = languageService.getCompletionsAtPosition(
    filename,
    cursorIndex,
    options
  );

  if (searchWordIsPeriod) {
    // On period, just return the completions without fuzzy finding since there's no need for it
    const editorCompletions =
      completions?.entries
        .sort((a, b) => parseInt(a.sortText) - parseInt(b.sortText))
        .map((comp) => ({
          // Temporary hack to make it not replace the period
          text: '.' + comp.name,
          displayText: comp.name,
          score: parseInt(comp.sortText),
        })) ?? [];

    return editorCompletions;
  }

  const fuse = new Fuse(completions?.entries.map((comp) => comp.name) ?? [], {
    threshold: 0.4,
    distance: 3,
    shouldSort: true,
    isCaseSensitive: true,
    includeScore: true,
    minMatchCharLength: Math.max(tokenUnderCursor.string.length - 1, 1),
  });

  const relevantCompletions = fuse.search(tokenUnderCursor.string);

  const editorCompletions: EditorCompletion[] = relevantCompletions.map(
    (item) => ({
      text: item.item,
      displayText: item.item,
      score: item.score ?? 0,
    })
  );

  return editorCompletions;
};
