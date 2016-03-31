import babel from 'rollup-plugin-babel';

export default {
  entry: './src/example/app.js',
  format: 'iife',
  plugins: [babel()],
  dest: './dist/example/bundle.js'
};
