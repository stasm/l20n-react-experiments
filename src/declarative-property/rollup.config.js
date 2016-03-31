import babel from 'rollup-plugin-babel';

export default {
  entry: './src/declarative-property/app.js',
  format: 'iife',
  plugins: [babel()],
  dest: './dist/declarative-property/bundle.js'
};
