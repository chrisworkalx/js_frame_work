// 防抖
function debounce(fn, time = 500) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

//节流
//在某一段时间内一定会触发一次
//频繁操作会停止其他操作
function throttle(fn, time = 3000) {
  let startTime = Date.now();
  let timer = null;
  return function (...args) {
    let endTime = Date.now();
    if (endTime - startTime < time) {
      console.log('还在等待执行');
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, args);
        startTime = Date.now();
      }, endTime - startTime);
    } else {
      fn.apply(this, args);
      startTime = Date.now();
    }
  };
}
