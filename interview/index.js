function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
}

function throttle(fn, delay) {
  let timer = null;
  let startDate = Date.now();
  return function () {
    let args = Array.prototype.slice.call(arguments);
    let endDate = Date.now();
    if (endDate - startDate > delay) {
      startDate = endDate;
      if (timer) {
        clearTimeout(timer);
      }
      fn.call(this, args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this, args);
      }, delay);
    }
  };
}
