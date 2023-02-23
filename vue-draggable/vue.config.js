/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-28 15:28:05
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-22 18:12:55
 * @FilePath     : \\vue-draggable\\vue.config.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 7777,
    host: 'localhost',
    open: true,
    client: {
      overlay: false // 页面eslint报错问题先忽略
    }
    // client: {
    // Can be used only for `errors`/`warnings`
    //
    // overlay: true,
    // progress: true
    // }
  }
});
