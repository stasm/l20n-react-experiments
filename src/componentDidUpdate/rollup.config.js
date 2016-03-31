import babel from 'rollup-plugin-babel';

export default {
  entry: './src/componentDidUpdate/app.js',
  format: 'iife',
  plugins: [babel()],
  dest: './dist/componentDidUpdate/bundle.js'
};
