/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-28 15:28:05
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-10 18:47:07
 * @FilePath     : \\vue-draggable\\vue.config.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 7777,
    open: true
    // client: {
    // Can be used only for `errors`/`warnings`
    //
    // overlay: {
    //   errors: true,
    //   warnings: true,
    // }
    // overlay: true,
    // progress: true
    // }
  }
});
