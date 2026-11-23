/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {PlaygroundProject} from '../playground-project.js';
import '../playground-project.js';
import {ProjectConfig, ProjectManifest} from '../shared/worker-api.js';

/**
 * The `config` property is commonly set from untrusted input (e.g. a shared
 * URL), so it must never make this page fetch something on behalf of the
 * config. These tests check that, and that `project-src` still does fetch.
 */
suite('playground-project config property', () => {
  let container: HTMLDivElement;
  let realFetch: typeof window.fetch;
  let realWarn: typeof console.warn;
  /** Absolute URLs of every fetch made by this page during the test. */
  let fetched: string[];
  /** Fake responses by absolute URL. Anything else goes to the network. */
  let responses: Map<string, {body: string; contentType: string}>;
  /** Warnings logged by playground-project during the test. */
  let warnings: string[];

  const absolute = (url: string) => new URL(url, document.baseURI).href;

  setup(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    fetched = [];
    responses = new Map();
    warnings = [];

    realFetch = window.fetch;
    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = absolute(
        input instanceof Request ? input.url : String(input)
      );
      fetched.push(url);
      const fake = responses.get(url);
      if (fake !== undefined) {
        return Promise.resolve(
          new Response(fake.body, {
            status: 200,
            headers: {'Content-Type': fake.contentType},
          })
        );
      }
      return realFetch(input, init);
    };

    realWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      const message = args.join(' ');
      if (message.startsWith('[playground-project]')) {
        warnings.push(message);
      } else {
        realWarn(...args);
      }
    };
  });

  teardown(() => {
    window.fetch = realFetch;
    console.warn = realWarn;
    container.remove();
  });

  /**
   * Create a project, apply the given source to it, and wait until its files
   * have loaded.
   */
  const loadProject = async (
    setSource: (project: PlaygroundProject) => void
  ): Promise<PlaygroundProject> => {
    const project = document.createElement('playground-project');
    project.sandboxBaseUrl = '/';
    const loaded = new Promise<void>((resolve) => {
      project.addEventListener('filesChanged', (event) => {
        if (event.projectLoaded) {
          resolve();
        }
      });
    });
    setSource(project);
    container.appendChild(project);
    await loaded;
    return project;
  };

  const loadConfig = (config: unknown) =>
    loadProject((project) => {
      project.config = config as ProjectConfig;
    });

  const filenames = (project: PlaygroundProject) =>
    (project.files ?? []).map((file) => file.name);

  const effectiveCdnBaseUrl = (project: PlaygroundProject) =>
    (
      project as unknown as {_getEffectiveCdnBaseUrl(): string}
    )._getEffectiveCdnBaseUrl();

  const assertNothingFetchedMatching = (marker: string) => {
    assert.deepEqual(
      fetched.filter((url) => url.includes(marker)),
      []
    );
  };

  test('loads files with inline content', async () => {
    const project = await loadConfig({
      files: {
        'index.html': {content: '<p>hi</p>', label: 'Home', selected: true},
        'empty.js': {content: ''},
        'hidden.css': {content: 'p {}', hidden: true},
      },
    });
    assert.deepEqual(project.files, [
      {
        name: 'index.html',
        content: '<p>hi</p>',
        contentType: 'text/html; charset=utf-8',
        label: 'Home',
        selected: true,
      },
      {
        name: 'empty.js',
        content: '',
        contentType: 'application/javascript; charset=utf-8',
      },
      {
        name: 'hidden.css',
        content: 'p {}',
        contentType: 'text/css; charset=utf-8',
        hidden: true,
      },
    ]);
    assert.deepEqual(warnings, []);
  });

  test('a serialized config can be loaded again', async () => {
    const first = await loadConfig({
      files: {
        'index.html': {content: '<p>hi</p>', selected: true},
        'a.ts': {content: 'export const a = 1;', hidden: true},
      },
      importMap: {imports: {foo: 'https://example.com/foo.js'}},
    });
    const serialized = JSON.stringify(first.config);
    const second = await loadConfig(JSON.parse(serialized));
    assert.deepEqual(second.files, first.files);
    assert.deepEqual(second.config, first.config);
    assert.deepEqual(warnings, []);
  });

  test('type does not allow what the setter ignores', () => {
    // These are compile-time checks: each @ts-expect-error fails the build if
    // the type starts to allow the line below it.
    const check = (config: ProjectConfig) => config;
    // @ts-expect-error Files must have inline content.
    check({files: {'index.html': {}}});
    // @ts-expect-error "extends" is not allowed.
    check({extends: '/base.json'});
    // @ts-expect-error "cdnBaseUrl" is not allowed.
    check({cdnBaseUrl: 'https://cdn.example.com/npm'});
    const manifest: ProjectManifest = {};
    // @ts-expect-error A manifest is not a config.
    check(manifest);
  });

  test('does not fetch files that have no content', async () => {
    const project = await loadConfig({
      files: {
        'index.html': {content: 'hello'},
        'no-fetch-marker/relative.txt': {},
        '/no-fetch-marker/root-relative.txt': {},
        [absolute('/no-fetch-marker/absolute.txt')]: {},
        'no-fetch-marker/undefined.txt': {content: undefined},
      },
    });
    assert.deepEqual(filenames(project), ['index.html']);
    assertNothingFetchedMatching('no-fetch-marker');
    assert.equal(warnings.length, 1);
    assert.include(warnings[0], 'no-fetch-marker/relative.txt');
    assert.include(warnings[0], '/no-fetch-marker/root-relative.txt');
    assert.include(warnings[0], 'no-fetch-marker/absolute.txt');
    assert.include(warnings[0], 'no-fetch-marker/undefined.txt');
  });

  test('does not follow extends', async () => {
    responses.set(absolute('/no-fetch-marker/base.json'), {
      body: JSON.stringify({files: {'inherited.txt': {content: 'inherited'}}}),
      contentType: 'application/json',
    });
    const project = await loadConfig({
      extends: '/no-fetch-marker/base.json',
      files: {'index.html': {content: 'hello'}},
    });
    assert.deepEqual(filenames(project), ['index.html']);
    assertNothingFetchedMatching('no-fetch-marker');
    assert.equal(warnings.length, 1);
    assert.include(warnings[0], '"extends"');
  });

  test('does not use cdnBaseUrl from the config', async () => {
    const project = await loadConfig({
      cdnBaseUrl: absolute('/no-fetch-marker/api#'),
      files: {'index.html': {content: 'hello'}},
    });
    assert.equal(effectiveCdnBaseUrl(project), 'https://unpkg.com');
    assert.equal(warnings.length, 1);
    assert.include(warnings[0], '"cdnBaseUrl"');
  });

  test('cdnBaseUrl property still applies with a config', async () => {
    const project = await loadProject((p) => {
      p.cdnBaseUrl = 'https://cdn.example.com/npm';
      p.config = {files: {'index.html': {content: 'hello'}}};
    });
    assert.equal(effectiveCdnBaseUrl(project), 'https://cdn.example.com/npm');
    assert.deepEqual(warnings, []);
  });

  test('ignores malformed file entries', async () => {
    const project = await loadConfig(
      JSON.parse(`{
        "files": {
          "index.html": {"content": "hello"},
          "no-fetch-marker/null.txt": null,
          "no-fetch-marker/string.txt": "not an object",
          "no-fetch-marker/number.txt": 1,
          "no-fetch-marker/null-content.txt": {"content": null},
          "no-fetch-marker/number-content.txt": {"content": 1},
          "no-fetch-marker/object-content.txt": {"content": {}}
        }
      }`)
    );
    assert.deepEqual(filenames(project), ['index.html']);
    assertNothingFetchedMatching('no-fetch-marker');
    assert.equal(warnings.length, 1);
  });

  test('tolerates a malformed files property', async () => {
    for (const files of [null, 'not an object', 1]) {
      const project = await loadConfig({files});
      assert.deepEqual(filenames(project), []);
    }
  });

  test('project-src still fetches files, extends, and cdnBaseUrl', async () => {
    responses.set(absolute('/fetch-marker/project.json'), {
      body: JSON.stringify({
        extends: 'base.json',
        cdnBaseUrl: 'https://cdn.example.com/npm',
        files: {
          'index.html': {},
          'inline.txt': {content: 'inline'},
        },
      }),
      contentType: 'application/json',
    });
    responses.set(absolute('/fetch-marker/index.html'), {
      body: 'fetched',
      contentType: 'text/html',
    });
    responses.set(absolute('/fetch-marker/base.json'), {
      body: JSON.stringify({files: {'inherited.txt': {content: 'inherited'}}}),
      contentType: 'application/json',
    });
    const project = await loadProject((p) => {
      p.projectSrc = '/fetch-marker/project.json';
    });
    assert.deepEqual(
      (project.files ?? []).map(({name, content}) => ({name, content})),
      [
        {name: 'index.html', content: 'fetched'},
        {name: 'inline.txt', content: 'inline'},
        {name: 'inherited.txt', content: 'inherited'},
      ]
    );
    assert.includeMembers(fetched, [
      absolute('/fetch-marker/project.json'),
      absolute('/fetch-marker/index.html'),
      absolute('/fetch-marker/base.json'),
    ]);
    assert.equal(effectiveCdnBaseUrl(project), 'https://cdn.example.com/npm');
    assert.deepEqual(warnings, []);
  });
});
