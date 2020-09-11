import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'service-worker/service-worker.js',
    output: {
      file: 'service-worker.js',
      format: 'iife',
      exports: 'none',
    },
    plugins: [resolve()],
  }, {
    input: 'typescript-worker/typescript-worker.js',
    output: {
      file: 'typescript-worker.js',
      format: 'iife',
      exports: 'none',
    },
    plugins: [
      commonjs({
        ignore: (id) => true,
      }),
      resolve(),
    ],
  }
]
