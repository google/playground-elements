/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {BareModuleTransformer} from './bare-module-transformer.js';

import type {
  File,
  BuildResult,
  WorkerConfig,
  Diagnostic,
  FileDiagnostic,
} from '../shared/worker-api.js';
import {getWorkerContext} from './worker-context.js';
import {buildTypeScript} from './typescript-builder.js';
import {
  type PackageJson,
  charToLineAndChar,
  parseNpmStyleSpecifier,
} from './util.js';

export const build = async (
  files: Array<File>,
  config: WorkerConfig
): Promise<BuildResult> => {
  const workerContext = getWorkerContext(config);
  const bareModuleTransformer = new BareModuleTransformer(
    workerContext.cdn,
    workerContext.importMapResolver
  );

  const {data: projectPackageJson, diagnostic: packageJsonDiagnostic} =
    getPackageJson(files);

  const buildResult = await buildTypeScript(
    workerContext,
    files,
    projectPackageJson
  );

  if (packageJsonDiagnostic !== undefined) {
    buildResult.diagnostics.push(packageJsonDiagnostic);
  }

  // Trasnform bare module specifiers in all files, and load external
  // dependencies.
  // TODO (justinfagnani): Maybe stop loading external dependencies statically.
  // Instead let the service worker handle fetches for them, then transform
  // them. Or maybe just stop handling dynamic imports.

  // Files to transform to resolve bare module specifiers.
  // Entries that are Files are project file and contain their own source test.
  // Entries that are strings are external files and need to be fetched from the
  // CDN.
  const filesToResolve = new Set<File | string>();
  buildResult.files.forEach((file) => filesToResolve.add(file));

  for (const fileOrLocation of filesToResolve) {
    let file: File;
    let packageJson: PackageJson | undefined;
    if (typeof fileOrLocation === 'string') {
      // External files are represented by strings.
      const location = parseNpmStyleSpecifier(fileOrLocation);
      if (location === undefined) {
        continue;
      }
      try {
        const cdnFile = await workerContext.cdn.fetch(location);
        file = {
          name: `node_modules/${fileOrLocation}`,
          ...cdnFile,
        };
        buildResult.files.push(file);
      } catch (e) {
        // TODO(aomarks) This file will end up as a 404 error when fetched from
        // the preview iframe, because we're simply omitting this file from our
        // output on error. We should instead allow FileBuildOutput to carry an
        // HTTP status code, so then we could propagate this specific error to be
        // served by the service worker, so that it shows up more usefully in the
        // network tab.
        console.error(
          `Error fetching ${fileOrLocation} from CDN: ${(e as Error).message}`
        );
        continue;
      }
      try {
        packageJson = await workerContext.cdn.fetchPackageJson(location);
      } catch {
        packageJson = undefined;
      }
    } else {
      // Only project files are represented by File objects.
      file = fileOrLocation;
      packageJson = projectPackageJson;
    }
    const result = await bareModuleTransformer.transformModule(
      file,
      packageJson
    );

    if (result.file !== undefined) {
      file.content = result.file.content;
    }
    buildResult.diagnostics.push(
      ...result.diagnostics.map((d) => ({
        filename: file.name,
        diagnostic: d,
      }))
    );
    result.externalLocations?.forEach((location) =>
      filesToResolve.add(location)
    );
  }

  return buildResult;
};

/**
 * Create a useful Playground diagnostic from a JSON.parse exception.
 */
const makeJsonParseDiagnostic = (e: Error, file: File): Diagnostic => {
  const start = extractPositionFromJsonParseError(e.message, file.content) ?? {
    line: 0,
    character: 0,
  };
  return {
    message: `Invalid package.json: ${e}`,
    range: {
      start,
      // To the rest of the file.
      end: charToLineAndChar(file.content, file.content.length),
    },
  };
};

/**
 * Try to extract the line and character from a `JSON.parse` exception message.
 *
 * Chrome and Firefox often include this information, but using different
 * formats. Safari never includes this information.
 */
const extractPositionFromJsonParseError = (
  message: string,
  json: string
): {line: number; character: number} | undefined => {
  const chrome = message.match(/at position (\d+)/);
  if (chrome !== null) {
    return charToLineAndChar(json, Number(chrome[1]));
  }
  const firefox = message.match(/at line (\d+) column (\d+)/);
  if (firefox !== null) {
    return {
      line: Number(firefox[1]) - 1,
      character: Number(firefox[2]) - 1,
    };
  }
  return undefined;
};

const getPackageJson = (
  files: Array<File>
): {data: PackageJson | undefined; diagnostic: FileDiagnostic | undefined} => {
  const packageJsonFile = files.find((file) => file.name === 'package.json');
  let projectPackageJson: PackageJson | undefined;
  let packageJsonDiagnostic: FileDiagnostic | undefined;
  if (packageJsonFile !== undefined) {
    try {
      projectPackageJson = JSON.parse(packageJsonFile.content);
    } catch (e) {
      packageJsonDiagnostic = {
        filename: packageJsonFile!.name,
        diagnostic: makeJsonParseDiagnostic(e as Error, packageJsonFile),
      };
    }
  }
  return {
    data: projectPackageJson,
    diagnostic: packageJsonDiagnostic,
  };
};
