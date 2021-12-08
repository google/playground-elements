/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Fuse from "fuse.js";
import type { CompletionEntry } from "typescript";
import { EditorCompletion, EditorCompletionMatch } from "./worker-api";

export function sortCompletionItems(completions: CompletionEntry[] | undefined, searchWord: string): EditorCompletion[] {
    if (!completions) return [];
    // If the user input a letter or a partial word, we want to offer
    // the closest matches first, and the weaker matches after. We will use
    // Fuse to score our completions by their fuzzy matches.
    // See https://fusejs.io/api/options.html
    const fuse = new Fuse(completions ?? [], {
        // Keep the threshold a bit lower than the default
        // so that the matching isn't too forgiving/confusing, but so
        // that a small typo doesn't delete all of the matches
        threshold: 0.4,
        distance: 100,
        shouldSort: true,
        isCaseSensitive: true,
        includeScore: true,
        includeMatches: true,
        findAllMatches: true,
        keys: ['name'],
    });
    const relevantCompletions = fuse.search(searchWord);

    const editorCompletions: EditorCompletion[] = relevantCompletions
        // Map the relevant info from fuse scoring
        .map((item) => ({
            text: item.item.name,
            displayText: item.item.name,
            score: item.score ?? 0,
            matches: item.matches as EditorCompletionMatch[],
        }))
        // Sort the completions by how well they matched the given keyword
        .sort((a, b) => {
            if (a.score === b.score) {
                return a.text.localeCompare(b.text);
            }
            return a.score - b.score;
        });

    console.log(editorCompletions);
    return editorCompletions
}

export function completionEntriesAsEditorCompletions(completions: CompletionEntry[] | undefined, prefix: string = ""): EditorCompletion[] {
    return completions?.map((comp) => ({
        // Since the completion engine will only append the word
        // given as the text property here, auto-completing from a period
        // would replace the period with the word. This is why we need
        // to append the period into the text property. This is not visible to the
        // user however, so no harm is done.
        text: prefix + comp.name,
        displayText: comp.name,
        score: Number.parseInt(comp.sortText),
    })) ?? [];
}
