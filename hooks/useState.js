// 首次render时是mount
let isMount = true;

let workInProgressHook = null;

const fiber = {
  stateNode: App,
  memoizedState: null
};

function schedule() {
  // 更新前将workInProgressHook重置为fiber保存的第一个Hook
  workInProgressHook = fiber.memoizedState;
  // 触发组件render
  const app = fiber.stateNode();
  // 组件首次render为mount，以后再触发的更新为update
  isMount = false;

  return app;
}

function useState(initialState) {
  let hook;

  if (isMount) {
    // mount时为该useState生成hook
    hook = {
      queue: {
        pending: null
      },
      memoizedState: initialState,
      next: null
    };

    // 将hook插入fiber.memoizedState链表末尾
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      console.log(111111);
      workInProgressHook.next = hook;
    }
    // 移动workInProgressHook指针
    workInProgressHook = hook;
  } else {
    // update时找到对应hook
    hook = workInProgressHook;
    // 移动workInProgressHook指针
    workInProgressHook = workInProgressHook.next;
  }

  // update执行前的初始state
  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    // 获取update环状单向链表中第一个update
    let firstUpdate = hook.queue.pending.next;

    do {
      // 执行update action
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;

      // 最后一个update执行完后跳出循环
    } while (firstUpdate !== hook.queue.pending.next);

    // 清空queue.pending
    hook.queue.pending = null;
  }

  // 将update action执行完后的state作为memoizedState
  hook.memoizedState = baseState;

  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
  // ...创建update
  const update = {
    action,
    next: null
  };

  // ...环状单向链表操作

  //还没有触发更新
  if (queue.pending === null) {
    // u0 => u0 -> u0
    update.next = update;
  } else {
    //u0 -> u0
    // u1 -> u0 -> u1
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;

  // 模拟React开始调度更新
  schedule();
}

function App() {
  const [num, updateNum] = useState(0);
  const [num1, updateNum1] = useState(100);

  console.log(`${isMount ? 'mount' : 'update'} num: `, num);
  console.log(`${isMount ? 'mount' : 'update'} num1: `, num1);

  return {
    click() {
      updateNum((num) => num + 1);
    },
    focus() {
      updateNum1((num) => num + 3);
    }
  };
}

window.app = schedule(); //浏览器调试
const app = schedule(); //node 调试
// app.click();
