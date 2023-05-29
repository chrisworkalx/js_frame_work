// 我们还是用上边AsyncSeriesWaterfallHook这个例子
const { AsyncSeriesWaterfallHook } = require('tapable');

let hook = new AsyncSeriesWaterfallHook(['name', 'age']);
console.time('cost');
hook.tapAsync('person1', (name, age, callback) => {
  setTimeout(() => {
    console.log('person1', name, age);
    callback(null, 'person1的name');
  }, 1000);
});
hook.tapAsync('person2', (name, age, callback) => {
  setTimeout(() => {
    console.log('person2', name, age);
    callback(null, 'person2的name');
  }, 2000);
});
hook.tapAsync('person3', (name, age, callback) => {
  setTimeout(() => {
    console.log('person3', name, age);
    callback();
  }, 3000);
});
// 添加2个拦截器
hook.intercept({
  register(tapInfo) {
    console.log('拦截器1register开始执行了');
    return tapInfo;
  },
  tap(tapInfo) {
    console.log('拦截器1开始tap了');
  },
  call(name, age) {
    console.log(name, age);
    console.log('拦截器1开始call了');
  }
});
hook.intercept({
  register(tapInfo) {
    console.log('拦截器2register开始执行了');
    return tapInfo;
  },
  tap(tapInfo) {
    console.log('拦截器2开始tap了');
  },
  call(name, age) {
    console.log(name, age);
    console.log('拦截器2开始call了');
  }
});
hook.callAsync('zhangsan', 18, (err) => {
  console.log('err：', err);
  console.timeEnd('cost');
});
/**
 * 拦截器1register开始执行了
拦截器1register开始执行了
拦截器1register开始执行了
拦截器2register开始执行了
拦截器2register开始执行了
拦截器2register开始执行了
zhangsan 18
拦截器1开始call了
zhangsan 18
拦截器2开始call了
拦截器1开始tap了
拦截器2开始tap了
person1 zhangsan 18
拦截器1开始tap了
拦截器2开始tap了
person2 person1的name 18
拦截器1开始tap了
拦截器2开始tap了
person3 person2的name 18
err： null
cost: 6.021s
*/
