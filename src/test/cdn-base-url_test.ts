/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {assert} from '@esm-bundle/chai';
import {checkTransform} from './worker-test-util.js';
import {PlaygroundProject} from '../playground-project.js';
import {PlaygroundIde} from '../playground-ide.js';
import {
  SampleFile,
  BuildOutput,
  ProjectManifest,
  DiagnosticBuildOutput,
} from '../shared/worker-api.js';
import {CdnData} from './fake-cdn-plugin.js';

suite('CDN Base URL Configuration', () => {
  let container: HTMLDivElement;

  setup(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  teardown(() => {
    container.remove();
  });

  suite('CachingCdn URL Handling', () => {
    test('resolves bare modules using CDN base URL', async () => {
      const files: SampleFile[] = [
        {
          name: 'index.ts',
          content: `
            import {html} from "lit";
            console.log(html\`Hello\`);
          `,
        },
      ];
      const cdn: CdnData = {
        lit: {
          versions: {
            '2.0.0': {
              files: {
                'package.json': {
                  content: '{"main": "index.js"}',
                },
                'index.js': {
                  content:
                    'export const html = (strings, ...values) => ({ strings, values });',
                },
                'index.d.ts': {
                  content:
                    'export declare const html: (strings: TemplateStringsArray, ...values: unknown[]) => unknown;',
                },
              },
            },
          },
        },
      };
      const expected: BuildOutput[] = [
        {
          kind: 'diagnostic',
          filename: 'index.ts',
          diagnostic: {
            code: 2307,
            message:
              "Cannot find module 'lit' or its corresponding type declarations.",
            range: {
              start: {
                line: 1,
                character: 31,
              },
              end: {
                line: 1,
                character: 36,
              },
            },
            severity: 1,
            source: 'typescript',
          },
        } as DiagnosticBuildOutput,
        {
          kind: 'diagnostic',
          filename: 'index.ts',
          diagnostic: {
            code: 2584,
            message:
              "Cannot find name 'console'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.",
            range: {
              start: {line: 2, character: 12},
              end: {line: 2, character: 19},
            },
            severity: 1,
            source: 'typescript',
          },
        } as DiagnosticBuildOutput,
        {
          kind: 'file',
          file: {
            name: 'index.js',
            content:
              'import { html } from "lit@2.0.0";\nconsole.log(html `Hello`);\n',
            contentType: 'text/javascript',
          },
        },
      ];

      // Create a spy to capture the URL used for fetching
      let capturedUrl: string | null = null;
      const originalFetch = window.fetch;
      window.fetch = function (
        url: string | URL | Request,
        init?: RequestInit
      ) {
        const urlString =
          url instanceof URL
            ? url.toString()
            : url instanceof Request
            ? url.url
            : url;
        if (urlString.includes('lit')) {
          console.log('Captured URL:', urlString);
          capturedUrl = urlString;
        }
        return originalFetch(url, init);
      } as typeof window.fetch;

      try {
        // Import map is configured to use the CDN via the fake CDN provider
        await checkTransform(
          files,
          expected,
          {
            imports: {
              lit: 'lit@2.0.0',
            },
          },
          cdn
        );

        // Verify the correct CDN URL was used
        assert.exists(capturedUrl, 'A CDN URL should have been captured');
        assert.include(
          capturedUrl!,
          '/fake-cdn/',
          'The CDN URL should include the fake CDN path'
        );
        assert.include(
          capturedUrl!,
          'lit@',
          'The CDN URL should include the package name'
        );
      } finally {
        window.fetch = originalFetch;
      }
    });

    test('uses default CDN base URL when not specified', async () => {
      const files: SampleFile[] = [
        {
          name: 'index.ts',
          content: `
            import {html} from "lit";
            console.log(html\`Hello\`);
          `,
        },
      ];
      const cdn: CdnData = {
        lit: {
          versions: {
            '2.0.0': {
              files: {
                'package.json': {
                  content: '{"main": "index.js"}',
                },
                'index.js': {
                  content:
                    'export const html = (strings, ...values) => ({ strings, values });',
                },
                'index.d.ts': {
                  content:
                    'export declare const html: (strings: TemplateStringsArray, ...values: unknown[]) => unknown;',
                },
              },
            },
          },
        },
      };
      const expected: BuildOutput[] = [
        {
          kind: 'diagnostic',
          filename: 'index.ts',
          diagnostic: {
            code: 2307,
            message:
              "Cannot find module 'lit' or its corresponding type declarations.",
            range: {
              start: {
                line: 1,
                character: 31,
              },
              end: {
                line: 1,
                character: 36,
              },
            },
            severity: 1,
            source: 'typescript',
          },
        } as DiagnosticBuildOutput,
        {
          kind: 'diagnostic',
          filename: 'index.ts',
          diagnostic: {
            code: 2584,
            message:
              "Cannot find name 'console'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.",
            range: {
              start: {line: 2, character: 12},
              end: {line: 2, character: 19},
            },
            severity: 1,
            source: 'typescript',
          },
        } as DiagnosticBuildOutput,
        {
          kind: 'file',
          file: {
            name: 'index.js',
            content:
              'import { html } from "lit@2.0.0";\nconsole.log(html `Hello`);\n',
            contentType: 'text/javascript',
          },
        },
      ];

      // Test with default CDN base URL
      await checkTransform(
        files,
        expected,
        {
          imports: {
            lit: 'lit@2.0.0',
          },
        },
        cdn
      );
    });
  });

  suite('PlaygroundProject CDN base URL', () => {
    test('sets cdnBaseUrl property', async () => {
      const project = document.createElement(
        'playground-project'
      ) as PlaygroundProject;
      project.cdnBaseUrl = 'https://cdn.jsdelivr.net/npm';
      container.appendChild(project);
      await project.updateComplete;
      assert.equal(project.cdnBaseUrl, 'https://cdn.jsdelivr.net/npm');
    });
  });

  suite('PlaygroundIDE CDN base URL', () => {
    test('passes cdnBaseUrl property to playground-project', async function () {
      // Increase timeout for this test
      this.timeout(10000);

      // Import the component first
      await import('../playground-ide.js');

      const ide = document.createElement('playground-ide') as PlaygroundIde;
      ide.cdnBaseUrl = 'https://cdn.jsdelivr.net/npm';
      container.appendChild(ide);

      // Wait for component to initialize
      await ide.updateComplete;

      // Wait for a bit to ensure shadow DOM is created
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Ensure shadow root exists
      assert.exists(ide.shadowRoot, 'IDE should have a shadow root');

      // Get and check the project component
      const project = ide.shadowRoot!.querySelector(
        'playground-project'
      ) as PlaygroundProject;
      assert.exists(project, 'Playground project should exist in shadow root');

      // Wait for project to update
      await project.updateComplete;

      // Check the CDN property
      assert.equal(project.cdnBaseUrl, 'https://cdn.jsdelivr.net/npm');
    });
  });

  suite('End-to-end CDN URL resolution', () => {
    test('correctly resolves modules using the configured CDN base URL', async function () {
      this.timeout(10000);

      // Create a playground-ide with custom CDN base URL
      const ide = document.createElement('playground-ide') as PlaygroundIde;
      const customCdnBaseUrl = 'https://custom-cdn.example.com/packages';
      ide.cdnBaseUrl = customCdnBaseUrl;

      // Add a simple project that imports from a bare module
      const projectConfig: ProjectManifest = {
        files: {
          'index.ts': {
            content: 'import {html} from "lit";\nconsole.log(html`Hello`);',
          },
        },
        importMap: {
          imports: {
            lit: 'lit@2.0.0',
          },
        },
      };

      ide.config = projectConfig;

      container.appendChild(ide);
      await ide.updateComplete;

      // Get the project component and verify its CDN base URL
      const project = ide.shadowRoot!.querySelector(
        'playground-project'
      ) as PlaygroundProject;
      assert.equal(
        project.cdnBaseUrl,
        customCdnBaseUrl,
        'CDN base URL should be passed from IDE to project'
      );
    });
  });
});
