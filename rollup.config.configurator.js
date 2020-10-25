import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'configurator/playground-configurator.js',
    output: {
      file: 'configurator/deploy/playground-configurator.js',
      format: 'esm',
    },
    plugins: [
      resolve(),
      terser({
        warnings: true,
        ecma: 2017,
        compress: {
          unsafe: true,
          passes: 2,
        },
        output: {
          comments: 'some',
        },
        mangle: {
          properties: false,
        },
      }),
      copy({
        targets: [
          {
            src: 'configurator/index.html',
            dest: 'configurator/deploy/',
          },
          {
            src: 'configurator/project',
            dest: 'configurator/deploy/',
          },
          {
            src: 'typescript-worker.js',
            dest: 'configurator/deploy/',
          },
          {
            src: 'service-worker.js',
            dest: 'configurator/deploy/',
          },
        ],
      }),
    ],
  },
];
