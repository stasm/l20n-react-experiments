import babel from 'rollup-plugin-babel';

export default {
  entry: './src/mutation/app.js',
  format: 'iife',
  plugins: [babel()],
  dest: './dist/mutation/bundle.js'
};
