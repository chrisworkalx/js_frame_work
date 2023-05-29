class Plu {
  apply(compiler) {
    //会被wb调用
    compiler.hooks.emit.tap('plu', (compilation) => {
      console.log('plu');
    });
    compiler.hooks.emit.tapAsync('asyncPlu', (compilation, callback) => {
      setTimeout(() => {
        console.log('asyncPlu');
        callback();
      }, 2000);
    });
    compiler.hooks.emit.tapPromise('proPlu', (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('proPlu');
          resolve();
        }, 1000);
      });
    });
    compiler.hooks.afterEmit.tap('plu2', (compilation) => {
      console.log('plu2');
    });
    compiler.hooks.done.tap('plu3', (stats) => {
      console.log('plu3');
    });
  }
}
module.exports = Plu;
