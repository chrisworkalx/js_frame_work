const { defineConfig } = require('@vue/cli-service');
// webpack definePlugin
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.worker.js$/,
      use: {
        loader: 'worker-loader',
        // 允许将内联的 web worker 作为 BLOB
        options: { inline: 'no-fallback' }
      }
    });
  },
  parallel: false,
  chainWebpack: (config) => {
    config.output.globalObject('this');
  },
  devServer: {
    client: {
      overlay: false // 页面eslint报错问题先忽略
    }
  },
  lintOnSave: false
});
