let timer;
let repeatTimes = 0;

async function P2UploadFile(fileName) {
  return new Promise((res) => setTimeout(() => res(fileName), 2000));
}

async function getP6upload2(params) {
  repeatTimes++;

  //暂且认为这是正确的道响应结果  要关闭继续调取定时器
  //我们给一个状态 这是一个通过的条件
  const condition = Math.random() > 0.6;
  console.log('condition', condition);
  if (condition) {
    resetRequest();
    return 'pass';
  } else {
    console.log('repeatTimes', repeatTimes);
    return 'forbidden';
  }
}

function resetRequest() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  repeatTimes = 0;
}

function repeatQuest(fileName) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  timer = setTimeout(async () => {
    try {
      const result = await getP6upload2(fileName);

      if (result !== 'pass' && repeatTimes < 6) {
        repeatQuest(fileName);
      } else {
        console.log('结束运行');
        resetRequest();
      }
    } catch (e) {
      console.log('e', e);
      if (repeatTimes < 6) {
        repeatQuest(fileName);
      } else {
        resetRequest();
      }
    }
  }, 2000);
}

// P2UploadFile('a.txt').then((fileName) => {
//   console.log(fileName);
//   repeatQuest(fileName);
// });

/**
 * 封装一个通用的接口重试函数
 * @param {Function} fn - 返回 Promise 的函数（例如 fetch 调用）
 * @param {number} retries - 最大重试次数
 * @param {number} delay - 每次重试间隔时间（毫秒）
 * @param {Function} shouldRetry - 可选：是否应该重试（默认只在抛出异常时重试）
 * @returns {Promise<any>}
 */
async function retryRequest(fn, retries = 3, delay = 1000, shouldRetry = null) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await fn();
      if (shouldRetry && !shouldRetry(result)) {
        // 如果有 shouldRetry 并返回 false，认为不满足重试条件
        return result;
      }
      return result;
    } catch (err) {
      console.log('err', err);
      if (attempt === retries) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

function testAPI() {
  return new Promise((res, rej) => {
    const random = Math.random();
    console.log('random', random);
    if (random > 0.8) {
      res('success');
    } else {
      rej('error');
    }
  });
}

retryRequest(testAPI, 6, 2000, (res) => {
  console.log('res', res);
  return res !== 'success';
});
