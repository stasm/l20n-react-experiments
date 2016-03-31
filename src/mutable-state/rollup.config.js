import babel from 'rollup-plugin-babel';

export default {
  entry: './src/mutable-state/app.js',
  format: 'iife',
  plugins: [babel()],
  dest: './dist/mutable-state/bundle.js'
};
