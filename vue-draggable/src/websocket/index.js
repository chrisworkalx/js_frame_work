// eslint-disabled
import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';

// eslint-disable-next-line no-useless-concat
const socketUrl = 'ws://' + 'localhost:3000';

/* 定义并导出接收socket后触发的自定义在事件名 -- start */
// eslint-disable-next-line import/prefer-default-export
export const debugEvent = 'debugEvent';
/* 定义并导出接收socket后触发的自定义在事件名 -- end */

// eslint-disable-next-line import/no-mutable-exports
let socketBus;

// eslint-disable-next-line no-unused-vars
function useSocket() {
  Vue.use(VueNativeSock, socketUrl, {
    reconnection: true, // 自动重新连接 (false)
    reconnectionAttempts: Infinity, // 重新连接尝试次数 (Infinity),
    reconnectionDelay: 2000, // 重新连接时间间隔
    format: 'json'
  });
  socketBus = new Vue(); // vue实例，用来绑定动态监听器 onclosed onmessage等事件
  socketBus.$options.sockets.onclose = () => {
    console.log('websocket closed');
  };
  socketBus.$options.sockets.onmessage = (e) => {
    let data;
    try {
      data = JSON.parse(e.data);
    } catch (err) {
      console.log(err);
      data = null;
    }

    console.log('data', data);
    // eslint-disable-next-line no-use-before-define
    handleSocketData(data); // 数据处理函数
  };
}

function handleSocketData(data) {
  if (!data) {
    return;
  }
  switch (+data.eventType) {
    case 3: // 设备调试返回结果
      socketBus.$emit(debugEvent, data); // 子组件向父组件传递debugEvent事件和data数据
      break;
    default:
      break;
  }
}

export { useSocket, socketUrl, socketBus };
