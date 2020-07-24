import {Remote} from 'comlink';
import {SwControllerAPI} from '../sw';
import {MESSAGE_TYPES} from './constants';

declare global {
  interface Window {
    __CodeEditorSessions?: Set<string>;
  }
  interface ImportMeta {
    url: string;
  }

  interface FetchEvent extends Event {
    readonly request?: Request;
    respondWith?: (response: Response | Promise<Response>) => void;
    readonly clientId: string;
  }

  interface ActivateEvent extends Event {
    waitUntil?: (waitable?: Promise<any>) => void;
  }

  type clientType = 'window' | 'worker' | 'sharedworker';

  interface Client {
    postMessage(message: any, transfer?: Transferable[]): void;
    postMessage(message: any, options?: {transfer?: any[]}): void;
    readonly id: string;
    readonly type: clientType;
    readonly url: string;
    readonly navigate: (url: string) => void;
  }

  interface Clients {
    claim: () => Promise<void>;
    get: (id: string) => Promise<Client | undefined>;
    matchAll(options?: {
      includeUntrontrolled?: boolean;
      type?: 'window' | 'worker' | 'sharedworker' | 'all';
    }): Promise<Client[]>;
  }

  interface ServiceWorkerGlobalScope extends Window {
    registration: ServiceWorkerRegistration;
    clients: Clients;
  }
}

export type RemoteSw = Promise<null | Remote<SwControllerAPI>>;
export type AcceptableExtensions = 'js' | 'ts' | 'html';

export interface CodeSampleEditorTextarea extends HTMLTextAreaElement {
  extension: 'js' | 'ts' | 'html';
  name: string;
}
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
