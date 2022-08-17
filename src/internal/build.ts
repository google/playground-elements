/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {Deferred} from '../shared/deferred.js';

import {
  SampleFile,
  BuildOutput,
  FileBuildOutput,
  DiagnosticBuildOutput,
  HttpError,
} from '../shared/worker-api.js';
import {Diagnostic} from 'vscode-languageserver-protocol';

const unreachable = (n: never) => n;

type State = 'active' | 'done' | 'cancelled';

const errorNotFound: HttpError = {
  status: /* Not Found */ 404,
  body: 'Playground file not found',
};

const errorCancelled: HttpError = {
  status: /* Service Unavailable */ 503,
  body: 'Playground build cancelled',
};

/**
 * The results of a particular Playground build.
 */
export class PlaygroundBuild {
  diagnostics = new Map<string, Diagnostic[]>();
  private _state: State = 'active';
  private _stateChange = new Deferred<void>();
  private _files = new Map<string, Deferred<SampleFile | HttpError>>();
  private _diagnosticsCallback: () => void;
  private _diagnosticsDebounceId: number | undefined;

  /**
   * @param diagnosticsCallback Function that will be invoked when one or more
   * new diagnostics have been received. Fires at most once per animation frame.
   */
  constructor(diagnosticsCallback: () => void) {
    this._diagnosticsCallback = diagnosticsCallback;
  }

  /**
   * The current state of this build.
   */
  state(): State {
    // Note this could be a getter, but TypeScript optimistically preserves
    // type-narrowing on properties between awaits, which makes usage awkward in
    // this case (see https://github.com/microsoft/TypeScript/issues/31429).
    return this._state;
  }

  /**
   * Promise of the next state change.
   */
  get stateChange(): Promise<void> {
    return this._stateChange.promise;
  }

  /**
   * Set this build's state to cancelled, ignore any future build results, and
   * fail any pending file gets.
   */
  cancel(): void {
    this._errorPendingFileRequests(errorCancelled);
    this._changeState('cancelled');
  }

  /**
   * Return a promise of a build output with the given name. If the file is not
   * received before the build is completed or cancelled, this promise will be
   * rejected.
   */
  async getFile(name: string): Promise<SampleFile | HttpError> {
    let deferred = this._files.get(name);
    if (deferred === undefined) {
      if (this._state === 'done') {
        return errorNotFound;
      } else if (this._state === 'cancelled') {
        return errorCancelled;
      }
      deferred = new Deferred();
      this._files.set(name, deferred);
    }
    return deferred.promise;
  }

  /**
   * Handle a worker build output.
   */
  onOutput(output: BuildOutput) {
    if (this._state !== 'active') {
      return;
    }
    if (output.kind === 'file') {
      this._onFile(output);
    } else if (output.kind === 'diagnostic') {
      this._onDiagnostic(output);
    } else if (output.kind === 'done') {
      this._onDone();
    } else {
      throw new Error(
        `Unexpected BuildOutput kind: ${
          (unreachable(output) as BuildOutput).kind
        }`
      );
    }
  }

  private _changeState(state: State) {
    this._state = state;
    this._stateChange.resolve();
    this._stateChange = new Deferred();
  }

  private _onFile(output: FileBuildOutput) {
    let deferred = this._files.get(output.file.name);
    if (deferred === undefined) {
      deferred = new Deferred();
      this._files.set(output.file.name, deferred);
    }
    deferred.resolve(output.file);
  }

  private _onDiagnostic(output: DiagnosticBuildOutput) {
    let arr = this.diagnostics.get(output.filename);
    if (arr === undefined) {
      arr = [];
      this.diagnostics.set(output.filename, arr);
    }
    arr.push(output.diagnostic);
    if (this._diagnosticsDebounceId === undefined) {
      this._diagnosticsDebounceId = requestAnimationFrame(() => {
        if (this._state !== 'cancelled') {
          this._diagnosticsDebounceId = undefined;
          this._diagnosticsCallback();
        }
      });
    }
  }

  private _onDone() {
    this._errorPendingFileRequests(errorNotFound);
    this._changeState('done');
  }

  private _errorPendingFileRequests(error: HttpError) {
    for (const file of this._files.values()) {
      if (!file.settled) {
        file.resolve(error);
      }
    }
  }
}
