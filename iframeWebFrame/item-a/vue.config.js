module.exports = {
  publicPath: '/itemA/',
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  devServer: {
    port: 5001,
  },
  configureWebpack: {
    externals: {
      Mock: 'Mock',
      Cookies: 'Cookies',
    },
  },
};
