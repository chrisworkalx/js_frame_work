/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-29 17:23:48
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-29 17:32:21
 * @FilePath     : \\js_frame_work\\vue_test_p\\tests\\unit\\demo.spec.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */

//回调函数
function fetchData(callback) {
  setTimeout(() => {
    callback("hello jest");
  }, 1000);
}

//Promise
function fetchData1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("hello jest"), 1000);
  });
}

function func(condition) {
  return condition ? Promise.resolve(0) : Promise.reject(1);
}

//这种会直接通过，不会继续setTimeout函数等待--错误案例
// test('是否返回 hello jest', () => {
//   function callback(data) {
//     expect(data).toBe('hello jest');
//   }

//   fetchData(callback);
// });

// 执行了这段测试，控制态输出测试用例通过
test("是否返回 hello jest", (done) => {
  function callback(data) {
    //这里加了done需要等待执行完函数体才结束
    expect(data).toBe("hello jest");
    done();
  }
  fetchData(callback);
});

test("是否返回 hello jest", () => {
  // 确保返回了 Promise 对象，否则测试在 fetchData 执行完成之前就已经结束，随后then中的函数不会执行
  return fetchData1().then((data) => {
    expect(data).toBe("hello jest");
  });
});

//.resolves / .rejects 匹配器
test("是否返回 hello jest", () => {
  // 确保返回了这句断言
  return expect(fetchData1()).resolves.toBe("hello jest");
});

test("Promise 是否进入 rejected", () => {
  return expect(func(false)).rejects.toBe(1);
});

// 正常 catch 时没有问题
test("Promise 是否进入 rejected", () => {
  return func(false).catch((e) => expect(e).toBe(1));
});

test("Promise 是否进入 rejected", () => {
  // 确保之后的代码进行了1次断言
  expect.assertions(1); // 没有这句的话 测试可以通过
  return func(true).catch((e) => expect(e).toBe(1));
});

//Async/Await

test("是否返回 hello jest", async () => {
  const data = await fetchData1();
  expect(data).toBe("hello jest");
});

test("Promise 是否进入 rejected", async () => {
  expect.assertions(1);
  try {
    await func(false);
  } catch (e) {
    expect(e).toBe(1);
  }
});

//也可以将async/await和.resolves/.rejects匹配器组合起来使用
test("是否返回 hello jest", async () => {
  await expect(fetchData1()).resolves.toBe("hello jest");
});

test("Promise 是否进入 rejected", async () => {
  await expect(func(false)).rejects.toBe(1);
});
