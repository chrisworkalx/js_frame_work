module.exports = {
  publicPath: '/itemB/',
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  devServer: {
    port: 5002,
  },
  configureWebpack: {
    externals: {
      Mock: 'Mock', // '包名':'全局变量'
    },
  },
};
