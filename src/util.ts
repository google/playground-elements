import { Message, MESSAGE_TYPES, FileRecord, ProjectManifest, AcceptableExtensions } from "./types.js";
import { ACCEPTABLE_EXTENSIONS, EMPTY_INDEX } from "./constants.js";

const generateRandomString = (): string => {
  const arr = new Uint32Array(1);
  const val = crypto.getRandomValues(arr)[0];
  return val.toString(32);
}

export const clearSession = (sessionId: string, swPort: MessagePort|null) => {
  if (window.__CodeEditorSessions) {
    window.__CodeEditorSessions.delete(sessionId);
  }

  if (swPort) {
    const message: Message = {
      type: MESSAGE_TYPES.CLEAR_CONTENTS,
      message: sessionId
    }
    swPort.postMessage(message)
  }
}

export const generateUniqueSessionId = ():string => {
  window.__CodeEditorSessions = window.__CodeEditorSessions || new Set();

  let sessionId = generateRandomString();
  while (window.__CodeEditorSessions.has(sessionId)) {
    sessionId = generateRandomString();
  }

  window.__CodeEditorSessions.add(sessionId);

  return sessionId;
};

export const establishMessageChannelHandshake = (messageTarget: ServiceWorker):Promise<MessagePort> => {
  return new Promise((res) => {
    const mc = new MessageChannel();
    const establishHandshakeMessage: Message = {
      type: MESSAGE_TYPES.ESTABLISH_HANDSHAKE
    };

    const onMcResponse = (e: MessageEvent) => {
      const data: Message = e.data;
      if (data.type === MESSAGE_TYPES.HANDSHAKE_RECEIVED) {
        mc.port1.removeEventListener('message', onMcResponse);
        res(mc.port1);
      }
    }

    mc.port1.addEventListener('message', onMcResponse);
    mc.port1.start();
    messageTarget.postMessage(establishHandshakeMessage, [mc.port2]);
  });
};

const getSwDir = () => {
  const currentFilepath = import.meta.url;
  const currentFilepathParts = currentFilepath.split('/');
  currentFilepathParts.pop();
  currentFilepathParts.pop();
  return currentFilepathParts.join('/')
};

export const setUpServiceWorker = async (): Promise<[ServiceWorker|null,ServiceWorkerRegistration|null]> => {
  if ('serviceWorker' in navigator) {
    try {
      const swFileDir = getSwDir();
      const registration = await navigator.serviceWorker.register(
        `${swFileDir}/sw.js`,
        {scope: `${swFileDir}/modules/`});

      const isInstalling = new Promise<ServiceWorker|null>((res) => {
        registration.addEventListener('updatefound', () => {
          res(registration.installing);
        });
      });

      // safari is fast for some reason?
      let serviceWorker = registration.active;
      if (!serviceWorker) {
        serviceWorker = await isInstalling;
      }

      window.addEventListener('unload', async () => {
        const sessions = window.__CodeEditorSessions || new Set();

        for (let sessionId of sessions) {
          const message: Message = {
            type: MESSAGE_TYPES.CLEAR_CONTENTS,
            message: sessionId,
          }

          if (serviceWorker) {
            serviceWorker.postMessage(message);
          }
        }
      });

      return [serviceWorker, registration];

    } catch (e) {
      console.error(e)
      return [null, null];
    }
  } else {
    return [null, null];
  }
}

export const endWithSlash = (str: string) => {
  const endWithSlash = str[str.length - 1] === '/';
  return endWithSlash ? str : `${str}/`
}

export const fetchProject = async (projectPath: string): Promise<FileRecord[]> => {
  try {
    const projectDir = endWithSlash(projectPath);
    const manifestPath = `${projectDir}code-sample-editor.json`;
    const manifestFetched = await fetch(manifestPath);
    const manifest = (await manifestFetched.json()) as ProjectManifest;

    const filenames = Object.keys(manifest.files || []);
    if (filenames.length) {
      const filesFetched: Promise<string>[] = [];
      const fileMetadata: {name: string, extension: AcceptableExtensions}[] = [];

      for (const filename of filenames) {
        const [name, extensionRaw] = filename.split('.');
        if (name && extensionRaw) {
          if (extensionRaw && ACCEPTABLE_EXTENSIONS.includes(extensionRaw)) {
            const extension = extensionRaw as AcceptableExtensions;
            fileMetadata.push({name, extension});
            const fileFetched = fetch(`${projectDir}${name}.${extension}`)
            .then((response) => {
              if (response.status === 404) {
                throw new Error(`Could not find file ` +
                    `${projectDir}${name}.${extension}`);
              }
              return response.text();
            });
            filesFetched.push(fileFetched);

          } else {
            console.error(`Unsupported file extension ${extensionRaw} in ` +
                `file ${filename} in ${manifestPath}`);
            continue;
          }
        } else {
          console.error(`could not parse file name or file extension from ` +
              `${filename} in ${manifestPath}`);
          continue;
        }
      }

      const fileContents = await Promise.all(filesFetched);
      const fileRecords: FileRecord[] = [];

      if (fileContents.length !== fileMetadata.length) {
        throw new Error('There was an error fetching the project files');
      }

      for (let i=0; i < fileContents.length; i++) {
        const fileContent = fileContents[i];
        const metadata = fileMetadata[i];
        const fileRecord: FileRecord = {
          name: metadata.name,
          extension: metadata.extension,
          content: fileContent
        }

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
}

export const addFileRecordFromName = (
    rawFileName: string|undefined,
    fileRecords: FileRecord[]): FileRecord[]|null => {
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
    console.error(`Unsupported file extension ${rawFileExtension} for ` +
      `file ${rawFileName}.`);
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

    if (currentFileName === newFileName &&
        currentFileExtension === newFileExtension ||
        (newFileExtension === 'js' && currentFileExtension === 'ts') ||
        (newFileExtension === 'ts' && currentFileExtension === 'js')) {
      return true;
    }

    return false;
  }, false);

  if (!fileAlreadyExists) {
    const newFr: FileRecord = {
      content: '',
      extension: newFileExtension,
      name: newFileName,
    }

    fileRecords.push(newFr);

    return fileRecords;

  } else {
    console.error(`File ${rawFileName} already exists in project.`)
    return null;
  }
}