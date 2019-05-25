declare global {
  interface Window {
    __CodeEditorSessions?: Set<string>;
  }
  interface ImportMeta {
    url: string
  }

  interface FetchEvent extends Event {
    request?: Request;
    respondWith?: (response: Response | Promise<Response>) => void;
  }

  interface ActivateEvent extends Event {
    waitUntil?: (waitable?: Promise<any>) => void;
  }

  interface Clients {
    claim: () => Promise<void>
  }

  interface ServiceWorkerGlobalScope extends Window {
    registration: ServiceWorkerRegistration,
    clients: Clients,
  }
}


export type AcceptableExtensions = 'js'|'ts'|'html';

export interface CodeEditorTextarea extends HTMLTextAreaElement {
  extension: 'js'|'ts'|'html';
  name: string;
}
export interface FileRecord {
  name: string;
  extension: AcceptableExtensions;
  content: string;
  isTemplate?: boolean
}

export interface FileOptions {
  isTemplate?: boolean
}
export interface ProjectManifest {
  files?: {
    [filename: string]: FileOptions
  }
}

interface ProjectContentMessage {
  records: FileRecord[],
  sesionId: string,
}

export enum MESSAGE_TYPES {
  ESTABLISH_HANDSHAKE = "ESTABLISH_HANDSHAKE",
  HANDSHAKE_RECEIVED = "HANDSHAKE_RECEIVED",
  PROJECT_CONTENT = "PROJECT_CONTENT",
  RESPONSES_READY = "RESPONSES_READY",
  AWAITING_CONTENT = "AWAITING_CONTENT",
  RESPONSES_CLEARED = "RESPONSES_CLEARED",
  CLEAR_CONTENTS = "CLEAR_CONTENTS",
}

export type Message =
  EstablishHandshake |
  HandshakeRecieved |
  ProjectContent |
  ResponsesReady |
  AwaitingContent |
  ClearContents |
  ResponsesCleared;



export interface EstablishHandshake {
  type: MESSAGE_TYPES.ESTABLISH_HANDSHAKE;
}

export interface HandshakeRecieved {
  type: MESSAGE_TYPES.HANDSHAKE_RECEIVED;
}

export interface ProjectContent {
  type: MESSAGE_TYPES.PROJECT_CONTENT,
  message: {
    records: FileRecord[],
    sesionId: string,
  }
}

export interface ResponsesReady {
  type: MESSAGE_TYPES.RESPONSES_READY,
}

export interface AwaitingContent {
  type: MESSAGE_TYPES.AWAITING_CONTENT,
}

export interface ClearContents {
  type: MESSAGE_TYPES.CLEAR_CONTENTS,
  message: string
}

export interface ResponsesCleared {
  type: MESSAGE_TYPES.RESPONSES_CLEARED,
}