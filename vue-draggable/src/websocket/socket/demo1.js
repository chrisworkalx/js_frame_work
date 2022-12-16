/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2022-12-08 17:50:06
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2022-12-08 19:07:14
 * @FilePath     : \\release_2.1.5\\src\\utils\\websocket\\socket.js
 * @Copyright (C) 2022 mingfei.yao. All rights reserved.
 */

import { messageCenter } from './messageCenter.js';

const ModeCode = {
  //websocket消息类型
  MSG: 'message', //普通消息
  HEART_BEAT: 'heart_beat' //心跳
};

//测试
export const socketUrl = 'ws://127.0.0.1:2048/ws/?name=mingfei';

export default class MyWebSocket extends WebSocket {
  constructor(url, protocols) {
    super(url, protocols);
    this.wss = null;
    return this;
  }

  //类上静态方法
  static connect(config = {
    /******** config默认参数
      * 1. url: websocket连接服务器
      * 2. time：心跳时间间隔
      * 3. timeout：心跳超时间隔
      * 4. reconnect：断线重连时间，一般的，断线重连时间等于心跳时间间隔加断线重连时间（忽略超时等待）
      * */
    url: socketUrl,
    time: 10 * 1000,
    timeout: 1 * 1000,
    reconnect: 5 * 1000
  }) {
    //TODO: 先判断浏览器是否支持websocket
    if('WebSocket' in window ) {
      let {url, ...rest} = config;
      this.wss = new MyWebSocket(url);
      //初始化绑定事件
      this.wss.init({...rest}, true);
      // return this.wss;
      return this;
    } else {
      console.error('您的浏览器不支持websocket，请更换浏览器');
    }
  }

  /*
    * 入口函数
    * @param heartBeatConfig  time：心跳时间间隔 timeout：心跳超时间隔 reconnect：断线重连时间间隔
    * @param isReconnect 是否断线重连
    */
  init(heartBeatConfig, isReconnect) {
    this.onopen = this.openHandler; //连接上时回调
    this.onclose = this.closeHandler; //断开连接时回调
    this.onmessage = this.messageHandler; //收到服务端消息
    this.onerror = this.errorHandler; //连接出错
    this.heartBeat = heartBeatConfig;
    this.isReconnect = isReconnect;
    this.reconnectTimer = null; //断线重连时间器
    this.waitingTimer = null; // 超时等待时间器
    this.heartTimer = null; // 心跳时间器
    this.webSocketState = false; //socket状态 true为已连接
  }

  openHandler() {
    messageCenter.emit('changeBtnState', 'open'); //触发事件改变按钮样式
    this.webSocketState = true; //socket状态设置为连接，做为后面的断线重连的拦截器
    !!this.heartBeat &&
       !!this.heartBeat.time &&
       this.startHeartBeat(this.heartBeat.time); //是否启动心跳机制
    console.log('开启');
  }

  messageHandler(e) {
    this.webSocketState = true;
    const data = this.getMsg(e);
    messageCenter.emit('receiveMessage', data); //发送消息去订阅
    switch (data.ModeCode) {
    case ModeCode.MSG: //普通消息
      console.log('收到消息' + data.msg);
      break;
    case ModeCode.HEART_BEAT: //心跳
      console.log('收到心跳响应' + data.msg);
      break;
    }
  }

  closeHandler() {
    //socket关闭
    messageCenter.emit('changeBtnState', 'close'); //触发事件改变按钮样式
    this.webSocketState = false; //socket状态设置为断线
    console.log('关闭');
  }

  errorHandler() {
    //socket出错
    messageCenter.emit('changeBtnState', 'close'); //触发事件改变按钮样式
    this.webSocketState = false; //socket状态设置为断线
    this.reconnectWebSocket(); //重连
    console.log('出错');
  }

  sendMsg(obj) {
    this.send(JSON.stringify(obj));
  }

  getMsg(e) {
    return JSON.parse(e.data);
  }

  /*
    * 心跳初始函数
    * @param time：心跳时间间隔
    */
  startHeartBeat(time) {
    this.heartTimer = setTimeout(() => {
      this.sendMsg({
        ModeCode: ModeCode.HEART_BEAT,
        msg: new Date()
      });
      this.waitingTimer = this.waitingServer();
    }, time);
  }

  //延时等待服务端响应，通过webSocketState判断是否连线成功
  waitingServer() {
    this.webSocketState = false;
    return setTimeout(() => {
      if (this.webSocketState) return this.startHeartBeat(this.heartBeat.time);
      console.log('心跳无响应，已断线');
      this.reconnectTimer = this.reconnectWebSocket();
    }, this.heartBeat.timeout);
  }

  //重连操作
  reconnectWebSocket() {
    if (!this.isReconnect) return;
    return setTimeout(() => {
      messageCenter.emit('reconnect');
      // this.wss = MyWebSocket.connect();
      MyWebSocket.connect();
    }, this.heartBeat.reconnect);
  }
  // 清除所有定时器
  clearTimer() {
    clearTimeout(this.reconnectTimer);
    clearTimeout(this.heartTimer);
    clearTimeout(this.waitingTimer);
  }
  // 关闭连接
  clear(isReconnect = false) {
    this.isReconnect = isReconnect;
    this.clearTimer();
    this.close();
    this.wss = null;
  }
}
