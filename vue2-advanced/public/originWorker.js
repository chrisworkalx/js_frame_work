//原生支持导入文件
// TODO: 注意importScripts不可以和type: module使用
// importScripts('/js/global_a.js');
// importScripts(
//   'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js'
// ); //支持跨域

//注意也可以支持导入esmodule形式 但是new Worker(path, { type: module })
import utils from './js/esmodule_b.js';

// const a = [1, 2];
// const b = [3, 4];
// const c = _.concat(a, b);
// console.log('c', c);

function fibo(n) {
  return n < 2 ? n : fibo(n - 2) + fibo(n - 1);
}

self.addEventListener('message', (e) => {
  const { count } = e.data;
  const total = utils.sum(1, 2, 3);
  const fiboTotal = fibo(count);

  self.postMessage({
    total, //list是从上面引入的
    fiboTotal
  });
});

export default self;
