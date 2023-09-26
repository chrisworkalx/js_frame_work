// worker.js（worker线程）
// worker主动关闭连接
self.addEventListener('message', (e) => {
  postMessage('Greeting from Worker');

  self.close(); // 关闭 worker

  setTimeout(() => {
    //外层关闭后这里就不会执行了
    console.log('setTimeout run');
    self.postMessage('Greeting from SetTimeout');
  });

  Promise.resolve().then(() => {
    //微任务
    console.log('Promise run');
    self.postMessage('Greeting from Promise');
  });

  for (let i = 0; i < 1001; i++) {
    if (i === 1000) {
      console.log('Loop run');
      self.postMessage('Greeting from Loop');
    }
  }
});
