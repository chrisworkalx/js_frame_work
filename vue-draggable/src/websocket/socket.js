import store from '../store';
import Vue from 'vue';
const EventBus = new Vue();

/**
 * socket。
 * 只管接受服务端数据发送给外边和接受外边数据发送给服务端，
 * 至于是否连上了，外边无需关心，至于外边是否侦听了这里也无需关心
 */

const client = {
  hasConnected: false,
  jumpTimer: null,
  hasHeartJumping: true,
  //每5秒心跳一次
  jumpInterval: 5000,
  reconnectTimes: 0,
  wss: null,
  //消息队列
  msgQueue: [],
  trace(value) {
    const { cmd, msg, data } = value;
    const msgData = !data ? '' : (typeof data === 'object') ? JSON.stringify(data) : data;
    console.log(cmd, msg, msgData);
  },
  //断开
  disconnect() {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
    this.hasConnected = false;
    if (this.jumpTimer) {
      clearInterval(this.jumpTimer);
    }
    this.hasHeartJumping = true;
    this.reconnectTimes = 0;
    this.msgQueue = [];
  },
  //连接
  connect() {
    const token = store.getters.token;
    if (!token) {
      this.trace({ cmd: 'connect', msg: '请先登录' });
      return;
    }

    if (this.hasConnected) {
      this.trace({ cmd: 'connect', msg: '已经连接' });
      return;
    }
    // 这里暂时用官方测试链接
    const url = `ws://121.40.165.18:8800?token=${token}`;
    this.trace({ cmd: 'connect', msg: `连接 ${url}` });
    this.wss = new WebSocket(url);
    //监听open
    this.wss.onopen = () => {
      let {readyState} = this.wss;
      if(readyState===1){
        console.log('连接服务成功了',readyState);
        this.trace({ cmd: 'onopen', msg: 'onopen'+readyState });
        this.hasConnected = true;
        this.reconnectTimes = 0;
        this.hasHeartJumping = true;
      }
      // 看自己需要
      this.toSocket({ cmd: 'reply' });

      for (const item of this.msgQueue) {
        this.toSocket(item);
      }
      this.jumpHeart();
      EventBus.$off('sendMsg', this.sendMsg.bind(this));
      EventBus.$on('sendMsg', this.sendMsg.bind(this));
    };

    this.wss.onclose = (res) => {
      this.trace({ cmd: 'onclose', msg: 'onclose', data: res });
      this.hasConnected = false;
    };

    this.wss.onerror = (error) => {
      this.trace({ cmd: 'error', msg: 'error', data: error });
    };

    this.wss.onmessage = (res) => {
      this.trace({ cmd: 'onmessage', msg: 'onmessage', data: res.data });
      let data = res.data;
      if (!data) {
        return;
      }
      data = {cmd:'heart',data};// data = JSON.parse(data);
      if (data.cmd === 'heart') {
        this.hasHeartJumping = true;
        return;
      }
      EventBus.$emit('message', data);
    };
  },
  reconnect(force = false) {
    this.trace({ cmd: 'reconnect', msg: 'reconnect', data: { force, reconnectTimes: this.reconnectTimes }});
    if (!force && this.reconnectTimes > 10) {
      return;
    }
    this.disconnect();
    this.connect();
    this.reconnectTimes++;
  },
  //心跳
  jumpHeart() {
    if (this.jumpTimer) {
      clearInterval(this.jumpTimer);
      this.jumpTimer = null;
    }

    this.jumpTimer = setInterval(() => {
      if (!this.hasHeartJumping) {
        this.hasConnected = false;
        this.reconnect();
        return;
      }

      this.hasHeartJumping = false;

      this.toSocket({ cmd: 'heart' });
    }, this.jumpInterval);
  },
  toSocket(value) {
    let data = value;
    if (typeof value === 'object') {
      data = JSON.stringify(value);
    }
    this.wss.send(data);
  },
  //发送消息
  sendMsg(value) {
    //断开重联
    if (!this.hasConnected) {
      this.msgQueue.push(value);
      this.reconnect(true);
    } else {
      //发送socket消息内容
      this.toSocket(value);
    }
  }
};
export default client;
