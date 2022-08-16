/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  CompletionInfo,
  GetCompletionsAtPositionOptions,
  SymbolDisplayPart,
  WithMetadata,
} from 'typescript';
import {EditorCompletionDetails, WorkerConfig} from '../shared/worker-api.js';
import {getWorkerContext} from './worker-context.js';

/**
 * Query completions from the Language Service, and sort them by
 * relevance for user to use.
 */
export const queryCompletions = async (
  filename: string,
  fileContent: string,
  tokenUnderCursor: string,
  cursorIndex: number,
  config: WorkerConfig
): Promise<WithMetadata<CompletionInfo> | undefined> => {
  const workerContext = getWorkerContext(config);

  const languageService = workerContext.languageServiceContext.service;
  const languageServiceHost = workerContext.languageServiceContext.serviceHost;
  const searchWordIsPeriod = tokenUnderCursor === '.';

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

  return completions;
};

/**
 * Acquire extra information on the hovered completion item.
 * This includes some package info, context and signatures.
 *
 * This is done separate from acquiring completions, since it's slower, and
 * is done on a per completion basis.
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
  return documentation?.map((doc) => doc.text) ?? [];
}
