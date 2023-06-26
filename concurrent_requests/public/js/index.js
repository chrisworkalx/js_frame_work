const cacheAsync = (promiseGenerator, symbol) => {
  const cache = new Map();
  return async (params) => {
    console.log(params, '===params');
    return new Promise((resolve, reject) => {
      // 可以提供键值
      symbol = symbol || params;
      let cacheCfg = cache.get(symbol);
      if (!cacheCfg) {
        cacheCfg = {
          res: null,
          exector: [{ resolve, reject }]
        };
        cache.set(symbol, cacheCfg);
      } else {
        // 命中缓存
        if (cacheCfg.res) {
          console.log('🔥执行完成');
          return resolve(cacheCfg.res);
        }

        console.log('进入栈准备依次执行');
        //开始这里都会执行 依次开始push进入
        cacheCfg.exector.push({ resolve, reject });
      }

      const { exector } = cacheCfg;

      console.log(exector, '====init----exector');

      // 处理并发，在请求还处于pending过程中就发起了相同的请求
      // 拿第一个请求
      //第一次肯定会走到这里
      if (exector.length === 1) {
        const next = async () => {
          try {
            console.log(exector.length, '查询exector长度');
            if (!exector.length) return;
            const response = await promiseGenerator(params);
            console.log('执行接口调用。。。', response);
            // 如果成功了，那么直接resolve掉剩余同样的请求
            console.log('exector--length', exector.length);
            while (exector.length) {
              //一旦成功递归循环清空栈
              exector.shift().resolve(response); // 清空栈
            }
            console.log(exector, '====resolve----exector');
            // 缓存结果
            cacheCfg.res = response; //赋值 下次再次点击操作不会触发按钮点击事件
          } catch (error) {
            // 如果失败了 那么这个promise的则为reject
            const { reject } = exector.shift(); //移除执行的函数 并执行reject方法
            console.log(exector, '====reject----exector');
            reject(error);
            //失败了继续执行 数组删除该项
            next();
          }
        };
        next();
      }
    });
  };
};

async function fetchData(type) {
  const data = await fetch('//localhost:3000/test', {
    method: 'post',
    body: Qs.stringify({ type }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  d = await data.json();
  console.log(d);
  return d;
}

const cachedAsync = function (fn) {
  const cache = Object.create(null);
  return async (str) => {
    const hit = cache[str];
    console.log(hit, '==hit');
    if (hit) {
      return hit;
    }
    // 只缓存成功的Promise, 失败直接重新请求
    //因为如果是并发的话第一次执行的时候是控制不了的
    return (cache[str] = await fn(str));
  };
};

$(function () {
  const oBtn = document.querySelector('#btn');

  // const fetch2 = cachedAsync(fetchData);
  const fetch2 = cacheAsync(fetchData, 'testSymbol');

  oBtn.addEventListener('click', handleFetch, false);

  function handleFetch(e) {
    // $.ajax({
    //   type: 'post',
    //   url: 'http://localhost:3000/test',
    //   data: {
    //     type: 'hello'
    //   },
    //   dataType: 'json',
    //   success: function (response) {
    //     console.log(response, '==response');
    //   }
    // });

    fetch2(2);
    setTimeout(() => {
      fetch2(2);
      fetch2(2);
    }, 2000);
    fetch2(2);
    fetch2(2);
    // fetch2(2);
    // fetch2(2);
    // fetch2(2);
  }
});
