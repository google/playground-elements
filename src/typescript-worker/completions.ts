/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Fuse from 'fuse.js';
import type { GetCompletionsAtPositionOptions, SymbolDisplayPart } from 'typescript';
import {
    EditorCompletion,
    EditorCompletionDetails,
    EditorCompletionMatch,
    EditorToken,
    WorkerConfig,
} from '../shared/worker-api';
import { getWorkerContext } from './worker-context';

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
    languageServiceHost.updateFile(filename, fileContent);

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
    const fuse = new Fuse(completions?.entries ?? [], {
        threshold: 0.3,
        distance: 20,
        shouldSort: true,
        isCaseSensitive: true,
        includeScore: true,
        includeMatches: true,
        findAllMatches: true,
        keys: ["name"],
        minMatchCharLength: Math.max(tokenUnderCursor.string.length, 1),
    });

    const relevantCompletions = fuse.search(tokenUnderCursor.string);

    const editorCompletions: EditorCompletion[] = relevantCompletions.map(
        (item) => ({
            text: item.item.name,
            displayText: item.item.name,
            score: item.score ?? 0,
            matches: item.matches as EditorCompletionMatch[],
        })
    ).sort((a, b) => {
        if (a.score === b.score) {
            return a.text.localeCompare(b.text);
        }
        return a.score - b.score;
    });

    // Limit to a 100 completion suggestions to save some bandwidth
    // ...Surely no-one wants more than a 100 suggestions?
    return editorCompletions.slice(0, 100);
};

export const getCompletionItemDetails = async (
    filename: string,
    cursorIndex: number,
    config: WorkerConfig,
    completionWord: string
): Promise<EditorCompletionDetails> => {
    const workerContext = getWorkerContext(config);
    const languageService = workerContext.languageServiceContext.service;

    const details = languageService.getCompletionEntryDetails(filename, cursorIndex, completionWord, undefined, undefined, undefined, undefined);

    const detailInformation: EditorCompletionDetails = {
        text: displayPartsToString(details?.displayParts),
        tags: details?.tags ?? [],
        documentation: getDocumentations(details?.documentation)
    };
    return detailInformation;
}

function displayPartsToString(displayParts: SymbolDisplayPart[] | undefined): string {
    if (!displayParts || displayParts.length === 0) return "";
    let displayString = "";
    displayParts.forEach(part => {
        displayString += part.text;
    })
    return displayString;
}

function getDocumentations(documentation: SymbolDisplayPart[] | undefined): string[] {
    if (!documentation || documentation.length === 0) return [];

    const documentationStrings: string[] = [];
    documentation.forEach(doc => {
        documentationStrings.push(doc.text);
    })
    return documentationStrings;
}
