/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Fuse from 'fuse.js';
import type {GetCompletionsAtPositionOptions} from 'typescript';
import {
  EditorCompletion,
  EditorCompletionMatch,
  EditorToken,
  WorkerConfig,
} from '../shared/worker-api';
import {getWorkerContext} from './worker-context';

export const queryCompletions = async (
  filename: string,
  fileContent: string,
  tokenUnderCursor: EditorToken,
  cursorIndex: number,
  config: WorkerConfig
): Promise<EditorCompletion[]> => {
  const workerContext = getWorkerContext(config);

  const languageService = workerContext.languageServiceContext.service;
  const languageServiceHost = workerContext.languageServiceContext.serviceHost;
  const searchWordIsPeriod = tokenUnderCursor.string === '.';
  const options = {} as GetCompletionsAtPositionOptions;
  if (searchWordIsPeriod) {
    options.triggerCharacter = '.';
  }

  languageServiceHost.updateFile(filename, fileContent);

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
    threshold: 0.3,
    distance: 20,
    shouldSort: true,
    isCaseSensitive: true,
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
    minMatchCharLength: Math.max(tokenUnderCursor.string.length, 1),
  });

  const relevantCompletions = fuse.search(tokenUnderCursor.string);

  const editorCompletions: EditorCompletion[] = relevantCompletions.map(
    (item) => ({
      text: item.item,
      displayText: item.item,
      score: item.score ?? 0,
      matches: item.matches as EditorCompletionMatch[],
    })
  ).sort((a,b) => {
      if (a.score === b.score) {
          return a.text.localeCompare(b.text);
      }
      return a.score - b.score;
  });

  return editorCompletions;
};
