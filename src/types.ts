declare global {
  interface Window {
    __CodeEditorSessions?: Set<string>;
  }
  interface ImportMeta {
    url: string
  }

  interface FetchEvent extends Event {
    readonly request?: Request;
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

export enum MESSAGE_TYPES {
  ESTABLISH_HANDSHAKE = "ESTABLISH_HANDSHAKE",
  HANDSHAKE_RECEIVED = "HANDSHAKE_RECEIVED",
}

export type Message = EstablishHandshake | HandshakeRecieved;

export interface EstablishHandshake {
  type: MESSAGE_TYPES.ESTABLISH_HANDSHAKE;
}

export interface HandshakeRecieved {
  type: MESSAGE_TYPES.HANDSHAKE_RECEIVED;
}