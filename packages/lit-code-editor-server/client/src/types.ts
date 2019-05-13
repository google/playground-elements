import {ProjectRecord,FileRecord} from '@polymer/lit-code-editor/src/types.js'

export interface Message {
  type: MESSAGE_TYPES;
  message?: any|never;
}

export enum MESSAGE_TYPES {
  ENTRYPOINT_REQUEST = "ENTRYPOINT_REQUEST",
  ENTRYPOINT_RESPONSE = "ENTRYPOINT_RESPONSE",
  ESTABLISH_HANDSHAKE = "ESTABLISH_HANDSHAKE",
  HANDSHAKE_RECEIVED = "HANDSHAKE_RECEIVED",
  PROJECT_CONTENT = "PROJECT_CONTENT",
  RESPONSES_READY = "RESPONSES_READY",
  AWAITING_CONTENT = "AWAITING_CONTENT",
}

export interface EntryPointRequest extends Message {
  type: MESSAGE_TYPES.ENTRYPOINT_REQUEST;
}

export interface EntryPointResponse extends Message {
  type: MESSAGE_TYPES.ENTRYPOINT_RESPONSE;
  message: FileRecord;
}

export interface EstablishHandshake extends Message {
  type: MESSAGE_TYPES.ESTABLISH_HANDSHAKE;
}

export interface HandshakeRecieved extends Message {
  type: MESSAGE_TYPES.HANDSHAKE_RECEIVED;
}

export interface ProjectContent extends Message {
  type: MESSAGE_TYPES.PROJECT_CONTENT,
  message: ProjectRecord
}

export interface ResponsesReady extends Message {
  type: MESSAGE_TYPES.RESPONSES_READY,
}

export interface AwaitingContent extends Message {
  type: MESSAGE_TYPES.AWAITING_CONTENT,
}