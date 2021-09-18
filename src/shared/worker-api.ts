/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import type {Diagnostic} from 'vscode-languageserver';

/**
 * Sent from the project to the proxy, with configuration and a port for further
 * messages.
 */
export const CONFIGURE_PROXY = 1;

/**
 * Sent from the proxy to the service worker, with a port that will be connected
 * to the project.
 */
export const CONNECT_SW_TO_PROJECT = 2;

/**
 * Sent from the proxy to the project, with a port that will be connected to the
 * service worker.
 */
export const CONNECT_PROJECT_TO_SW = 3;

/**
 * Sent from the service worker to the project, to confirm that the port was
 * received.
 */
export const ACKNOWLEDGE_SW_CONNECTION = 4;

/**
 * Sent from the service worker to the proxy, to notify when a file API is
 * missing and hence a re-connection is probably required.
 */
export const MISSING_FILE_API = 5;

/**
 * Sent from the project to the service worker proxy when there is a version
 * mismatch to request a call to ServiceWorkerRegistration.update().
 */
export const UPDATE_SERVICE_WORKER = 6;

export type PlaygroundMessage =
  | {
      type: typeof CONFIGURE_PROXY;
      url: string;
      scope: string;
      port: MessagePort;
    }
  | {
      type: typeof CONNECT_SW_TO_PROJECT;
      port: MessagePort;
    }
  | {
      type: typeof CONNECT_PROJECT_TO_SW;
      port: MessagePort;
    }
  | {
      type: typeof ACKNOWLEDGE_SW_CONNECTION;
      version: string;
    }
  | {
      type: typeof MISSING_FILE_API;
    }
  | {
      type: typeof UPDATE_SERVICE_WORKER;
    };

export interface ServiceWorkerAPI {
  setFileAPI(fileAPI: FileAPI, sessionID: string): void;
}

export interface TypeScriptWorkerAPI {
  compileProject(
    files: Array<SampleFile>,
    config: {
      importMap: ModuleImportMap;
      cdnBaseUrl?: string;
    },
    emit: (result: BuildOutput) => void
  ): Promise<void>;
}

export interface HttpError {
  status: number;
  body: string;
}

export interface FileAPI {
  getFile(name: string): Promise<SampleFile | HttpError>;
}

export interface SampleFile {
  /** Filename. */
  name: string;
  /** Optional display label. */
  label?: string;
  /** File contents. */
  content: string;
  /** MIME type. */
  contentType?: string;
  /** Don't display in tab bar. */
  hidden?: boolean;
}

export interface FileOptions {
  /** Optional file content. If omitted, files are fetched by name. */
  content?: string;
  /**
   * Optional content MIME type. If omitted, type is taken from fetch
   * Content-Type header if available, otherwise inferred from filename.
   */
  contentType?: string;
  /** Optional display label. */
  label?: string;
  /** Don't display in tab bar. */
  hidden?: boolean;
}

export interface ProjectManifest {
  /** Optional project manifest URL to extend from */
  extends?: string;
  files?: {[filename: string]: FileOptions};
  importMap?: ModuleImportMap;
}

export interface ModuleImportMap {
  imports?: {[name: string]: string};
  // No scopes for now.
}

export type BuildOutput = FileBuildOutput | DiagnosticBuildOutput | DoneOutput;

export type FileBuildOutput = {
  kind: 'file';
  file: SampleFile;
};

export type DiagnosticBuildOutput = {
  kind: 'diagnostic';
  filename: string;
  diagnostic: Diagnostic;
};

export type DoneOutput = {
  kind: 'done';
};
