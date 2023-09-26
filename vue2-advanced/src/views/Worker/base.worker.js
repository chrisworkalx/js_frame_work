addEventListener('message', (e) => {
  // postMessage也是一个微任务的形态存活于线程中
  postMessage('Greeting from Worker'); //先注册到worker线程中

  setTimeout(() => {
    console.log('setTimeout run');
    postMessage('Greeting from SetTimeout');
  });

  Promise.resolve().then(() => {
    console.log('Promise run'); //微任务
    postMessage('Greeting from Promise');
  });

  for (let i = 0; i < 1001; i++) {
    if (i === 1000) {
      console.log('Loop run'); //同步 第一打印
      postMessage('Greeting from Loop');
    }
  }
});
