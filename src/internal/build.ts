/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {Deferred} from '../shared/deferred.js';

import type {
  File,
  FileDiagnostic,
  Diagnostic,
  HttpError,
  BuildResult,
} from '../shared/worker-api.js';

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
  private _files = new Map<string, Deferred<File | HttpError>>();
  private _diagnosticsCallback: () => void;
  private _diagnosticsDebounceId: number | undefined;

  /**
   * @param diagnosticsCallback Function that will be invoked when one or more
   * new diagnostics have been received. Fires at most once per animation frame.
   */
  constructor({diagnosticsCallback}: {diagnosticsCallback: () => void}) {
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
  async getFile(name: string): Promise<File | HttpError> {
    let deferred = this._files.get(name);
    if (deferred === undefined) {
      if (this._state === 'done') {
        // TODO (justinfagnani): If the file is a package dependency (in
        // 'node_modules/'), get the file from the TypeScript worker here
        // rather than assuming that it is present in the files cache.
        // Let the worker handle the error if the file is not found.
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
   * Handle a worker build result.
   */
  onResult(output: BuildResult) {
    if (this._state !== 'active') {
      return;
    }
    for (const file of output.files) {
      this._onFile(file);
    }
    for (const fileDiagnostic of output.diagnostics) {
      this._onDiagnostic(fileDiagnostic);
    }
  }

  onSemanticDiagnostics(semanticDiagnostics?: Array<FileDiagnostic>) {
    if (semanticDiagnostics !== undefined) {
      for (const fileDiagnostic of semanticDiagnostics) {
        this._onDiagnostic(fileDiagnostic);
      }
    }
  }

  private _changeState(state: State) {
    this._state = state;
    this._stateChange.resolve();
    this._stateChange = new Deferred();
  }

  private _onFile(file: File) {
    let deferred = this._files.get(file.name);
    if (deferred === undefined) {
      deferred = new Deferred();
      this._files.set(file.name, deferred);
    }
    deferred.resolve(file);
  }

  private _onDiagnostic(fileDiagnostic: FileDiagnostic) {
    let arr = this.diagnostics.get(fileDiagnostic.filename);
    if (arr === undefined) {
      arr = [];
      this.diagnostics.set(fileDiagnostic.filename, arr);
    }
    arr.push(fileDiagnostic.diagnostic);
    if (this._diagnosticsDebounceId === undefined) {
      this._diagnosticsDebounceId = requestAnimationFrame(() => {
        if (this._state !== 'cancelled') {
          this._diagnosticsDebounceId = undefined;
          this._diagnosticsCallback();
        }
      });
    }
  }

  /**
   * Completes a build. Must be called after onResult() and
   * onSemanticDiagnostics().
   *
   * TODO (justinfagnani): do this automatically?
   */
  onDone() {
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
