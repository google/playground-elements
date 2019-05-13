export interface FileRecord {
  name: string;
  extension: 'js'|'ts'|'html';
  content: string;
}

export interface ProjectRecord {
  entrypoint: FileRecord;
  files: FileRecord[];
}