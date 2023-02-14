import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import { CONNECT, SOCKET_OPEN } from './type';

const socketUrl = 'ws://' + '10.18.0.50:8080/provider/ws/';

let socketBus;
let ws;

function useSocket(wsUrl = socketUrl) {
  Vue.use(VueNativeSock, wsUrl, {
    reconnection: true, // 自动重新连接 (false)
    reconnectionAttempts: 20, // 重新连接尝试次数 (Infinity),
    reconnectionDelay: 5000, // 重新连接时间间隔
    format: 'json',
    connectManually: true // 手动开启
  });
  socketBus = new Vue(); // vue实例，用来绑定动态监听器 onclosed onmessage等事件
  ws = {
    connect() {
      socketBus.$connect();
    },
    disconnect() {
      socketBus.$disconnect();
    }
  };
  socketBus.$options.sockets.onclose = () => {
    console.log('websocket closed');
  };
  socketBus.$options.sockets.onopen = () => {
    console.log('websocket onOpened');
    setInterval(() => {
      console.log('hello');
    }, 3000);
  };
  socketBus.$options.sockets.onmessage = (e) => {
    let data;
    try {
      data = JSON.parse(e.data);
    } catch (err) {
      data = null;
    }
    console.log('data', data);
    handleSocketData(data); // 数据处理函数
  };
  return {
    socketBus,
    ws
  };
}

function handleSocketData(data) {
  if (!data) {
    return;
  }
  switch (data.type.toUpperCase()) {
    case CONNECT: // 设备调试返回结果
      socketBus.$emit(SOCKET_OPEN, data); // 子组件向父组件传递debugEvent事件和data数据
      break;
    default:
      break;
  }
}

export default useSocket;
export {
  CONNECT,
  SOCKET_OPEN
};
