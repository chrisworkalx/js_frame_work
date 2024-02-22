module.exports = {
  devServer: {
    overlay: {
      //让我们的浏览器关闭掉遮盖层的错误代码提示
      warnings: false,
      errors: false
    }
  }
  // lintOnSave: false //直接关闭eslint检查
};
