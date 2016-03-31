import babel from 'rollup-plugin-babel';
import { join } from 'path';

const path = leaf => join(__dirname, leaf);

export default {
  entry: path('./src/app.js'),
  format: 'iife',
  plugins: [babel()],
  dest: path('./bundle.js')
};
