import RollupPluginPostCss from 'rollup-plugin-postcss';

export default {
  input: './shop/index.js',
  output: {
    file: 'dist/bundle.js'
  },
  plugins: [RollupPluginPostCss()],
  treeshake: false
};
