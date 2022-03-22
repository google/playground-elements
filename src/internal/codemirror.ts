/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// Our own specialized CodeMirror bundle (see rollup.config.js).
import '../_codemirror/codemirror-bundle.js';

// Note it's critical we use `import type` here, or else we'll also import the
// wrong runtime modules.
import type CodeMirrorCore from 'codemirror';
import type CoreMirrorFolding from 'codemirror/addon/fold/foldcode.js';
import type CodeMirrorHinting from 'codemirror/addon/hint/show-hint.js';
import type CodeMirrorComment from 'codemirror/addon/comment/comment.js';

/**
 * CodeMirror function.
 *
 * This function is defined as window.CodeMirror, but @types/codemirror doesn't
 * declare that.
 */
export const CodeMirror = (
  window as {
    CodeMirror: typeof CodeMirrorCore &
      typeof CoreMirrorFolding &
      typeof CodeMirrorHinting &
      typeof CodeMirrorComment;
  }
).CodeMirror;
