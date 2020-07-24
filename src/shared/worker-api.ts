/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

export const ESTABLISH_HANDSHAKE = 1;
export const HANDSHAKE_RECEIVED = 2;

export interface ServiceWorkerAPI {
  setFileAPI(fileAPI: FileAPI, sessionID: string): void;
}

export interface TypeScriptWorkerAPI {
  compileProject(files: Array<SampleFile>): Promise<Map<string, string>>;
}

export interface FileAPI {
  getFile(name: string): Promise<SampleFile | undefined>;
}

export interface SampleFile {
  name: string;
  content: string;
  contentType?: string;
}

export interface FileOptions {
  // This is reserved to indicate if a file is a template, ie it shouldn't be
  // loaded itself, but copied to create new files. It's currently unused.
  isTemplate?: boolean;
}

export interface ProjectManifest {
  files?: { [filename: string]: FileOptions };
}
