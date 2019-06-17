import { FileRecord } from './types';

export const EMPTY_INDEX: FileRecord = {
  name: 'index',
  extension: 'html',
  content: ''
};

export const ACCEPTABLE_EXTENSIONS = ['js', 'ts', 'html'];

export enum MESSAGE_TYPES {
  ESTABLISH_HANDSHAKE = 'ESTABLISH_HANDSHAKE',
  HANDSHAKE_RECEIVED = 'HANDSHAKE_RECEIVED'
}
