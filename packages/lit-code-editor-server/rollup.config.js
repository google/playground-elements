import resolve from 'rollup-plugin-node-resolve';
import minfy from 'rollup-plugin-babel-minify';

export default {
  input: 'client/lib/index.js',
  output: {
    file: 'client/bundle/index.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    // minfy({
    //   comments: false
    // })
  ]
}