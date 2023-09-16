const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false // 页面eslint报错问题先忽略
    }
  },
  lintOnSave: false
});
