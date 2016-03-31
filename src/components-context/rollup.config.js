import babel from 'rollup-plugin-babel';

export default {
  entry: './src/components-context/app.js',
  format: 'iife',
  plugins: [babel()],
  dest: './dist/components-context/bundle.js'
};
