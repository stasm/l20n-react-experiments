import babel from 'rollup-plugin-babel';

export default {
  entry: './src/components/app.js',
  format: 'iife',
  plugins: [babel()],
  dest: './dist/components/bundle.js'
};
