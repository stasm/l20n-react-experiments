import babel from 'rollup-plugin-babel';

export default {
  entry: './src/context/app.js',
  format: 'iife',
  plugins: [babel()],
  dest: './dist/context/bundle.js'
};
