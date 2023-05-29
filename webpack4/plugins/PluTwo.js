const fs = require('fs');
const util = require('util');
const path = require('path');
const webpack = require('webpack');
const readFile = util.promisify(fs.readFile);

//FIXME: 失效了
// const { RawSource } = webpack.sources;
// console.log('RawSource', RawSource);
// console.log('webpack.sources', webpack.sources); //undefined
const RawSource = require('webpack-sources').RawSource;
class PluTwo {
  apply(compiler) {
    //会被wb调用
    compiler.hooks.thisCompilation.tap(
      'pluTwo',
      (compilation, compilationParams) => {
        compilation.hooks.additionalAssets.tapAsync(
          'pluTwo',
          async (callback) => {
            // debugger;
            // console.log(compilation.assets.__proto__);
            const content = 'hello pluginsss';
            compilation.assets['a.txt'] = {
              //往输出文件中添加内容
              size() {
                return content.length;
              }, //定义文件大小
              source() {
                return content; //定义文件内容
              }
            };
            const data = await readFile(
              path.resolve(__dirname, '../src/test.txt')
            );
            compilation.assets['b.txt'] = new RawSource(data);
            console.dir(compilation);
            // compilation.emitAsset('c.txt', new RawSource(data));
            compilation.emittedAssets('c.txt', new RawSource(data));
            callback();
          }
        );
      }
    );
  }
}
module.exports = PluTwo;
