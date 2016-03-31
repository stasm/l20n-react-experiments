import babel from 'rollup-plugin-babel';

export default {
  entry: './src/declarative-state/app.js',
  format: 'iife',
  plugins: [babel()],
  dest: './dist/declarative-state/bundle.js'
};
