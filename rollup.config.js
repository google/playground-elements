import resolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'service-worker/service-worker.js',
    output: {
      file: 'service-worker.js',
      format: 'iife',
      exports: 'none',
    },
    plugins: [resolve()],
  }
]
