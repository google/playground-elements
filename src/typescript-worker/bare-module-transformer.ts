/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import * as esModuleLexer from 'es-module-lexer';
import {ModuleResolver} from './module-resolver.js';

import type {
  BuildOutput,
  DiagnosticBuildOutput,
  FileBuildOutput,
} from '../shared/worker-api.js';

export class BareModuleTransformer {
  private _moduleResolver: ModuleResolver;

  constructor(moduleResolver: ModuleResolver) {
    this._moduleResolver = moduleResolver;
  }

  async *process(
    results: AsyncIterable<BuildOutput> | Iterable<BuildOutput>
  ): AsyncIterable<BuildOutput> {
    for await (const result of results) {
      if (result.kind === 'file' && result.file.name.endsWith('.js')) {
        yield* this._transformBareModuleSpecifiers(result);
      } else {
        yield result;
      }
    }
  }

  private async *_transformBareModuleSpecifiers(
    file: FileBuildOutput
  ): AsyncIterable<BuildOutput> {
    let js = file.file.content;
    let specifiers;
    await esModuleLexer.init;
    try {
      [specifiers] = esModuleLexer.parse(js);
    } catch (e) {
      yield file;
      const diagnostic = this._makeDiagnostic(e, file.file.name);
      if (diagnostic !== undefined) {
        yield diagnostic;
      }
      return;
    }

    for (let i = specifiers.length - 1; i >= 0; i--) {
      const {
        s: start,
        e: end,
        n: oldSpecifier,
        d: dynamicStart,
      } = specifiers[i];
      if (oldSpecifier === undefined) {
        // E.g. A dynamic import that's not a static string, like
        // `import(someVariable)`. We can't handle this, skip.
        continue;
      }
      const newSpecifier = this._transformSpecifier(oldSpecifier);
      if (newSpecifier === oldSpecifier) {
        continue;
      }
      const isDynamic = dynamicStart !== -1;
      // For dynamic imports, the start/end range doesn't include quotes.
      const replacement = isDynamic ? `'${newSpecifier}'` : newSpecifier;
      js = js.substring(0, start) + replacement + js.substring(end);
    }
    file.file.content = js;
    yield file;
  }

  private _transformSpecifier(specifier: string): string {
    const {type, url} = this._moduleResolver.resolve(specifier, self.origin);
    return type === 'bare' ? url : specifier;
  }

  private _makeDiagnostic(
    e: Error,
    filename: string
  ): DiagnosticBuildOutput | undefined {
    const match = e.message.match(/@:(\d+):(\d+)$/);
    if (match === null) {
      return undefined;
    }
    const line = Number(match[1]) - 1;
    const character = Number(match[2]) - 1;
    return {
      kind: 'diagnostic',
      filename,
      diagnostic: {
        message: `es-module-lexer error: ${e.message}`,
        range: {
          start: {line, character},
          end: {line, character: character + 1},
        },
      },
    };
  }
}
