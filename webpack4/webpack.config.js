const Plu = require('./plugins/Plu');
const PluTwo = require('./plugins/PluTwo');
const { join } = require('./utils');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log(join('./src/app.js'));

module.exports = {
  mode: 'production',
  entry: join('./src/app.js'),
  output: {
    path: join('./dist'),
    filename: 'bundle-[contenthash:8].js'
  },
  plugins: [new CleanWebpackPlugin(), new Plu(), new PluTwo()]
};
