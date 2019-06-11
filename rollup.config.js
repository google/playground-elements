import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'sw.js',
  output: {
    file: 'sw.js',
    format: 'iife',
    name: 'CMESW'
  },
  plugins: [resolve()],
}