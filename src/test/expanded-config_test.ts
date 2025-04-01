import { expandProjectConfig } from '../playground-project.js';
import { assert } from '@esm-bundle/chai';

suite('expandProjectConfig cdnBaseUrl behavior', () => {
  const originalFetch = globalThis.fetch;

  setup(() => {
    // Mock fetch to return a parent config when requested
    globalThis.fetch = async (input: RequestInfo | URL): Promise<Response> => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.endsWith('parent-config.json')) {
        return {
          status: 200,
          json: async () => ({
            files: {
              'parent.txt': { content: 'parent content' }
            },
            cdnBaseUrl: 'https://parent-cdn.com'
          }),
          text: async () => 'parent config'
        } as Response;
      }
      return {
        status: 404,
        json: async () => ({}),
        text: async () => 'Not Found'
      } as Response;
    };
  });

  teardown(() => {
    // Restore original fetch
    globalThis.fetch = originalFetch;
  });

  test("should use parent's cdnBaseUrl when child does not define one", async () => {
    const childConfig = {
      files: {
        'child.txt': { content: 'child content' }
      },
      extends: 'https://example.com/parent-config.json'
    };

    const result = await expandProjectConfig(childConfig, 'https://example.com/');
    assert.equal(result.cdnBaseUrl, 'https://parent-cdn.com');
  });

  test("should prefer child's cdnBaseUrl over parent's when defined", async () => {
    const childConfig = {
      files: {
        'child.txt': { content: 'child content' }
      },
      cdnBaseUrl: 'https://child-cdn.com',
      extends: 'https://example.com/parent-config.json'
    };

    const result = await expandProjectConfig(childConfig, 'https://example.com/');
    assert.equal(result.cdnBaseUrl, 'https://child-cdn.com');
  });
});
