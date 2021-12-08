/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Fuse from 'fuse.js';
import type {
    GetCompletionsAtPositionOptions,
    SymbolDisplayPart,
} from 'typescript';
import {
    EditorCompletion,
    EditorCompletionDetails,
    EditorCompletionMatch,
    EditorToken,
    WorkerConfig,
} from '../shared/worker-api.js';
import { getWorkerContext } from './worker-context.js';

/**
 * Query completions from the Language Service, and sort them by
 * relevance for user to use.
 */
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
    // Update language service status so that the file is up to date
    const fileAbsolutePath = new URL(filename, self.origin).href;
    // TODO: Could this cause a race condition between the build phase 
    // and the completion phase, and could that be a problem?
    languageServiceHost.updateFileContentIfNeeded(fileAbsolutePath, fileContent);

    // Fetch the collection of completions, the language service offers us for our current context.
    // This list of completions is quite vast, and therefore we will need to do some extra sorting
    // and filtering on it before sending it back to the browser.
    const completions = languageService.getCompletionsAtPosition(
        filename,
        cursorIndex,
        options
    );

    if (searchWordIsPeriod) {
        // On period, just return the completions without fuzzy finding, since 
        // fuzzy finding is done on a matching substring of a word, and if our 
        // latest 'word' is just a period, we don't have a substring to query with,
        // as opposed to inputting `console.lo`, where we can fuzzy search with
        // the string `lo` inside the context of `console`.
        const editorCompletions =
            completions?.entries
                .map((comp) => ({
                    // Since the completion engine will only append the word
                    // given as the text property here, auto-completing from a period
                    // would replace the period with the word. This is why we need
                    // to append the period into the text property. This is not visible to the
                    // user however, so no harm is done.
                    text: '.' + comp.name,
                    displayText: comp.name,
                    score: parseInt(comp.sortText),
                })) ?? [];

        return editorCompletions;
    }
    // If the user input a letter or a partial word, we want to offer
    // the closest matches first, and the weaker matches after. We will use
    // Fuse to score our completions by their fuzzy matches.
    // See https://fusejs.io/api/options.html
    const fuse = new Fuse(completions?.entries ?? [], {
        threshold: 0.3,
        distance: 20,
        shouldSort: true,
        isCaseSensitive: true,
        includeScore: true,
        includeMatches: true,
        findAllMatches: true,
        keys: ['name'],
        minMatchCharLength: Math.max(tokenUnderCursor.string.length, 1),
    });
    const relevantCompletions = fuse.search(tokenUnderCursor.string);

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

    return editorCompletions
};

/**
 * Acquire extra information on the hovered completion item. This includes some package info,
 * context and signatures.
 */
export const getCompletionItemDetails = async (
    filename: string,
    cursorIndex: number,
    config: WorkerConfig,
    completionWord: string
): Promise<EditorCompletionDetails> => {
    const workerContext = getWorkerContext(config);
    const languageService = workerContext.languageServiceContext.service;

    // Only passing relevant params for now, since the other values
    // are not needed for current functionality
    const details = languageService.getCompletionEntryDetails(
        filename,
        cursorIndex,
        completionWord,
        undefined,
        undefined,
        undefined,
        undefined
    );

    const detailInformation: EditorCompletionDetails = {
        text: displayPartsToString(details?.displayParts),
        tags: details?.tags ?? [],
        documentation: getDocumentations(details?.documentation),
    };
    return detailInformation;
};

function displayPartsToString(
    displayParts: SymbolDisplayPart[] | undefined
): string {
    if (!displayParts || displayParts.length === 0) return '';

    let displayString = '';
    displayParts.forEach((part) => {
        displayString += part.text;
    });
    return displayString;
}

function getDocumentations(
    documentation: SymbolDisplayPart[] | undefined
): string[] {
    if (!documentation || documentation.length === 0) return [];

    const documentationStrings: string[] = [];
    documentation.forEach((doc) => {
        documentationStrings.push(doc.text);
    });
    return documentationStrings;
}
