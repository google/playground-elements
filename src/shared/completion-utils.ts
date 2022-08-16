/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Fuse from 'fuse.js';
import {CompletionInfo} from 'typescript';
import {
  EditorCompletion,
  EditorCompletionMatch,
  CompletionEntryWithDetails,
  CompletionInfoWithDetails,
  EditorCompletionDetails,
} from './worker-api.js';

export function sortCompletionItems(
  completions: CompletionEntryWithDetails[] | undefined,
  searchWord: string
): EditorCompletion[] {
  if (!completions) return [];
  // If the user input a letter or a partial word, we want to offer
  // the closest matches first, and the weaker matches after. We will use
  // Fuse to score our completions by their fuzzy matches.
  // See https://fusejs.io/api/options.html
  const fuse = new Fuse(completions ?? [], {
    // Keep the threshold a bit lower than the default
    // so that the matching isn't too forgiving/confusing, but so
    // that a small typo doesn't delete all of the matches
    threshold: 0.3,
    shouldSort: true,
    isCaseSensitive: true,
    includeScore: true,
    includeMatches: true,
    keys: ['name'],
    // Match characters so that at least most of the word matches
    minMatchCharLength: Math.max(searchWord.length / 1.2, 1),
  });
  const relevantCompletions = fuse.search(searchWord);

  const editorCompletions: EditorCompletion[] = relevantCompletions
    // Map the relevant info from fuse scoring
    .map(
      (item) =>
        ({
          text: item.item.name,
          displayText: item.item.name,
          score: item.score ?? 0,
          matches: item.matches as EditorCompletionMatch[],
          get details() {
            return item.item.details;
          },
        } as EditorCompletion)
    )
    // Sort the completions by how well they matched the given keyword
    .sort((a, b) => {
      if (a.score === b.score) {
        return a.text.localeCompare(b.text);
      }
      return a.score - b.score;
    });

  return editorCompletions;
}

export function completionEntriesAsEditorCompletions(
  completions: CompletionEntryWithDetails[] | undefined,
  prefix = ''
): EditorCompletion[] {
  return (
    completions?.map(
      (comp) =>
        ({
          // Since the completion engine will only append the word
          // given as the text property here, auto-completing from a period
          // would replace the period with the word. This is why we need
          // to append the period into the text property. This is not visible to the
          // user however, so no harm is done.
          text: prefix + comp.name,
          displayText: comp.name,
          score: Number.parseInt(comp.sortText),
          get details() {
            return comp.details;
          },
        } as EditorCompletion)
    ) ?? []
  );
}

/**
 * Create a array of completion entries with a details fetching
 * function built in, so that the code editor can use it to fetch
 * the details when needed itself, instead of having to ask the project
 * layer for them.
 */
export function populateCompletionInfoWithDetailGetters(
  completionInfo: CompletionInfo,
  filename: string,
  cursorIndex: number,
  getCompletionDetailsFunction: (
    filename: string,
    cursorIndex: number,
    completionWord: string
  ) => Promise<EditorCompletionDetails>
) {
  const completionInfoWithDetails = completionInfo as CompletionInfoWithDetails;
  completionInfoWithDetails.entries = completionInfo?.entries.map(
    (entry) =>
      ({
        ...entry,
        // Details are fetched using a proxy pattern, in which the details
        // are not instantiated until requested for. When asking for details
        // from the completion item, the getter is called, launching the
        // query if needed.
        _details: undefined,
        get details() {
          if (!this._details) {
            this._details = getCompletionDetailsFunction(
              filename,
              cursorIndex,
              entry.name
            );
          }
          return this._details;
        },
      } as CompletionEntryWithDetails)
  );
  return completionInfoWithDetails;
}
