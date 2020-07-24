import {
  FileRecord,
  ProjectManifest,
  AcceptableExtensions,
  RemoteSw,
} from './types.js';
import { ACCEPTABLE_EXTENSIONS, EMPTY_INDEX } from './constants.js';

export const endWithSlash = (str: string) => str.replace(/\/?$/, '/');

export const fetchProject = async (
  projectPath: string
): Promise<FileRecord[]> => {
  try {
    const projectDir = endWithSlash(projectPath);
    const manifestPath = `${projectDir}code-sample-editor.json`;
    const manifestFetched = await fetch(manifestPath);
    const manifest = (await manifestFetched.json()) as ProjectManifest;

    const filenames = Object.keys(manifest.files || []);
    if (filenames.length) {
      const filesFetched: Promise<string>[] = [];
      const fileMetadata: {
        name: string;
        extension: AcceptableExtensions;
      }[] = [];

      for (const filename of filenames) {
        const [name, extensionRaw] = filename.split('.');
        if (name && extensionRaw) {
          if (extensionRaw && ACCEPTABLE_EXTENSIONS.includes(extensionRaw)) {
            const extension = extensionRaw as AcceptableExtensions;
            fileMetadata.push({ name, extension });
            const fileFetched = fetch(`${projectDir}${name}.${extension}`).then(
              (response) => {
                if (response.status === 404) {
                  throw new Error(
                    `Could not find file ` + `${projectDir}${name}.${extension}`
                  );
                }
                return response.text();
              }
            );
            filesFetched.push(fileFetched);
          } else {
            console.error(
              `Unsupported file extension ${extensionRaw} in ` +
              `file ${filename} in ${manifestPath}`
            );
            continue;
          }
        } else {
          console.error(
            `could not parse file name or file extension from ` +
            `${filename} in ${manifestPath}`
          );
          continue;
        }
      }

      const fileContents = await Promise.all(filesFetched);
      const fileRecords: FileRecord[] = [];

      if (fileContents.length !== fileMetadata.length) {
        throw new Error('There was an error fetching the project files');
      }

      for (let i = 0; i < fileContents.length; i++) {
        const fileContent = fileContents[i];
        const metadata = fileMetadata[i];
        const fileRecord: FileRecord = {
          name: metadata.name,
          extension: metadata.extension,
          content: fileContent,
        };

        fileRecords.push(fileRecord);
      }

      if (fileRecords.length) {
        return fileRecords;
      }
    } else {
      console.error(`No files defined manifest at ${manifestPath}`);
    }

    return [EMPTY_INDEX];
  } catch (e) {
    console.error(e);
    return [EMPTY_INDEX];
  }
};

export const addFileRecordFromName = (
  rawFileName: string | undefined,
  fileRecords: FileRecord[]
): FileRecord[] | null => {
  if (!rawFileName) {
    console.error('no file name defined');
    return null;
  }

  const newFileNameParts = rawFileName.split('.');
  if (newFileNameParts.length < 2) {
    console.error(`no extension defined on filename ${rawFileName}`);
    return null;
  }

  const rawFileExtension = newFileNameParts.pop() as string;

  if (!ACCEPTABLE_EXTENSIONS.includes(rawFileExtension)) {
    console.error(
      `Unsupported file extension ${rawFileExtension} for ` +
      `file ${rawFileName}.`
    );
    return null;
  }

  const newFileExtension = rawFileExtension as AcceptableExtensions;
  const newFileName = newFileNameParts.join('.');
  const fileAlreadyExists = fileRecords.reduce((agg, fr) => {
    const currentFileName = fr.name;
    const currentFileExtension = fr.extension;
    if (agg) {
      return agg;
    }

    if (
      (currentFileName === newFileName &&
        currentFileExtension === newFileExtension) ||
      (newFileExtension === 'js' && currentFileExtension === 'ts') ||
      (newFileExtension === 'ts' && currentFileExtension === 'js')
    ) {
      return true;
    }

    return false;
  }, false);

  if (!fileAlreadyExists) {
    const newFr: FileRecord = {
      content: '',
      extension: newFileExtension,
      name: newFileName,
    };

    fileRecords.push(newFr);

    return fileRecords;
  } else {
    console.error(`File ${rawFileName} already exists in project.`);
    return null;
  }
};

export const clearSwContentsAndSave = async (
  fileRecords: FileRecord[] | Promise<FileRecord[]>,
  remoteSw: RemoteSw,
  sessionId: string
): Promise<FileRecord[]> => {
  const sw = await remoteSw;
  const content = await fileRecords;

  if (!sw) {
    return content;
  }

  await sw.clearContents(sessionId);
  // TODO (emarquez): Implement babel transforms here

  await sw.setProjectContent(content, sessionId);
  return content;
};
