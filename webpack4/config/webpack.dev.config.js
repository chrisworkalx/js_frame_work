const { resolve } = require('path');
const Plu = require('./plugins/Plu');
const join = ($path) => resolve(__dirname, $path);

module.exports = {
  mode: 'production',
  entry: join('./src/app.js'),
  output: {
    path: join('./dist'),
    filename: 'bundle-[contenthash:8].js'
  },
  plugins: [new Plu()]
};
