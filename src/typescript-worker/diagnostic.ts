/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {DiagnosticCategory} from '../../packages/typescript/lib/compiler/types.js';
import {Diagnostic} from '../../packages/typescript/lib/compiler/types.js';
import {flattenDiagnosticMessageText} from '../../packages/typescript/lib/compiler/program.js';
import * as lsp from 'vscode-languageserver-protocol';

/**
 * Convert a diagnostic from TypeScript format to Language Server Protocol
 * format.
 */
export function makeLspDiagnostic(tsDiagnostic: Diagnostic): lsp.Diagnostic {
  return {
    code: tsDiagnostic.code,
    source: tsDiagnostic.source ?? 'typescript',
    message: flattenDiagnosticMessageText(tsDiagnostic.messageText, '\n'),
    severity: diagnosticCategoryMapping[tsDiagnostic.category],
    range: {
      start:
        tsDiagnostic.file !== undefined && tsDiagnostic.start !== undefined
          ? tsDiagnostic.file.getLineAndCharacterOfPosition(tsDiagnostic.start)
          : {character: 0, line: 0},
      end:
        tsDiagnostic.file !== undefined &&
        tsDiagnostic.start !== undefined &&
        tsDiagnostic.length !== undefined
          ? tsDiagnostic.file.getLineAndCharacterOfPosition(
              tsDiagnostic.start + tsDiagnostic.length
            )
          : {character: 0, line: 0},
    },
  };
}

/**
 * We don't want a runtime import of 'vscode-languageserver-protocol' just for the
 * DiagnosticSeverity constants. We can duplicate the values instead, and assert
 * we got them right with a type constraint.
 */
const diagnosticCategoryMapping: {
  [DiagnosticCategory.Error]: typeof lsp.DiagnosticSeverity['Error'];
  [DiagnosticCategory.Warning]: typeof lsp.DiagnosticSeverity['Warning'];
  [DiagnosticCategory.Message]: typeof lsp.DiagnosticSeverity['Information'];
  [DiagnosticCategory.Suggestion]: typeof lsp.DiagnosticSeverity['Hint'];
} = {
  [DiagnosticCategory.Error]: 1,
  [DiagnosticCategory.Warning]: 2,
  [DiagnosticCategory.Message]: 3,
  [DiagnosticCategory.Suggestion]: 4,
};
