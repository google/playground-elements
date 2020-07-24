import {Remote} from 'comlink';
import {MESSAGE_TYPES} from './constants.js';

declare global {
  interface Window {
    __CodeEditorSessions?: Set<string>;
  }
  interface ImportMeta {
    url: string;
  }
}

// TODO (justinfagnani): this is temporary while we move the SwController
// around
export interface SwControllerAPI {
  setProjectContent(fileRecords: FileRecord[], sessionId: string): void;
  clearContents(sessionId: string): void;
  scope: string;
}

export type RemoteSw = Promise<null | Remote<SwControllerAPI>>;
export type AcceptableExtensions = 'js' | 'ts' | 'html';

export interface FileRecord {
  name: string;
  extension: AcceptableExtensions;
  content: string;
  isTemplate?: boolean;
}

export interface FileOptions {
  isTemplate?: boolean;
}
export interface ProjectManifest {
  files?: {
    [filename: string]: FileOptions;
  };
}

export type Message = EstablishHandshake | HandshakeRecieved;

export interface EstablishHandshake {
  type: MESSAGE_TYPES.ESTABLISH_HANDSHAKE;
}

export interface HandshakeRecieved {
  type: MESSAGE_TYPES.HANDSHAKE_RECEIVED;
}
