/**
 * @description:
 * @param {*} time : number
 * @return {*}
 */
const syncSleep = (time) => {
  const start = new Date().valueOf();
  while (new Date().valueOf() - start < time) {}
};

// 简易实现的 add
/**
 * @description:
 * @param {*} a : number
 * @return {*} b : number
 */
const add = (a, b) => {
  syncSleep(1);
  return a + b;
};

// 实现一个 累加函数 ，当计算未达到边界状态时， 返回下一个计算函数。 否则返回 null
const Accumulate = () => {
  let count = 0;
  let i = 1;
  let ac = () => {
    if (i <= 200) {
      console.log(i, '------i');
      count = add(count, i);
      i++;
      return ac;
    } else {
      // 任务结束
      console.log('count:', count);
    }
    return null;
  };
  return ac;
};

// 利用 MessageChannel 的 onMessage 触发 JS 的宏任务
// 为什么使用 利用 MessageChannel 而不使用 setTimeout 是因为 setTimeout 的 4ms bug
// https://juejin.cn/post/6846687590616137742 , 而 4ms 在一个 JS 浏览器渲染帧中
// 影响是比较大的

const channel = new MessageChannel();

// 当前 JS 浏览器渲染帧中任务的过期时间
// expireTime: number
let expireTime;

// 累加函数的下一个任务
//nextTask -> 是一个函数
let nextTask = Accumulate();

/**
 * @description:
 * @param {*} task -> Function
 * @return {*}
 */
const workLoop = (task) => {
  let taskForNextTime = task;
  // 如果当前时间大于过期时间，结束 while 循环
  while (new Date().valueOf() < expireTime && task) {
    taskForNextTime = task();
  }
  return taskForNextTime;
};

// handleWorkStart 会在一个新的 JS 浏览器渲染帧 触发
const handleWorkStart = () => {
  console.log('一个新的 JS 浏览器渲染帧');
  // 设置一个过期时间， 过期时间为当前时间 +5 ，
  // new Date().valueOf() 的表现不好，实际应该使用 performance
  expireTime = new Date().valueOf() + 5;

  // 执行 workLoop，如果任务完成，nextTask 为 null ,否则为一个可执行的函数
  nextTask = workLoop(nextTask);

  // 如果还有任务未完成，使用 postMessage，
  // 会在下一个 JS 浏览器渲染帧继续触发 handleWorkStart
  if (nextTask) {
    channel.port2.postMessage(null);
  }
};

// 收到 postMessage 时触发 handleWorkStart
channel.port1.onmessage = handleWorkStart;

// 模拟触发一次 累加任务
channel.port2.postMessage(null);
