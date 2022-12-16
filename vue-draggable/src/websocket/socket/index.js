/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2022-12-09 10:58:22
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2022-12-16 11:51:04
 * @FilePath     : \\flexiv_cloud_frontend\\src\\utils\\websocket\\socket2.js
 * @Copyright (C) 2022 mingfei.yao. All rights reserved.
 */
const eventMap = new Map();
const serviceMap = {};
const event = {
  onopen: [],
  onmessage: [],
  onclose: [],
  onerror: []
};

import { messageCenter } from './messageCenter.js';


export class SocketService {
  socketInstance = null; //
  initOpt = null; // 初始化socket的参数
  timer = null; // 断开重连定时器
  waitingTimer = null; // 超时等待时间器
  heartTimer = null; // 心跳时间器
  reconnecTime = 1000 * 5; // 断开重连时间
  heartBeatingInterval = 1000 * 5;
  receiveMessageTimeout = 1000 * 2;
  hasConnected = false; //检测是否连接成功
  lockReconnect = false; // 是否已经执行重连
  constructor({ url, params, ...rest }) {
    this.initOpt = { url, params, ...rest };
    try {
      this.socketInstance = new WebSocket(url);
      SocketService.collectEvent(this.initOpt, this, true);
      Object.keys(event).forEach((key) => {
        const funList = eventMap.has(url) && eventMap.get(url)[key];
        this.socketInstance[key] = (e) => {
          this.handleSocketStatus(key);
          this.handleSocketNextStep(e, key);
          if (Array.isArray(funList)) {
            funList.forEach((fun) => {
              if (typeof fun == 'function') fun(e, key);
            });
          }
        };
      });
    } catch (err) {
      console.error('=================创建socket失败constructor==============', err);
      SocketService.reconnect(this, '初始化');
    }
  }
  //socket连接状态判断
  handleSocketStatus(key) {
    if(['onopen','onmessage'].includes(key)) {
      this.hasConnected = true;
    }
    if(['onclose', 'onerror'].includes(key)) {
      this.hasConnected = false;
    }
  }
  //socket处理步骤
  handleSocketNextStep(e, key) {
    if(e.type === 'open') {
      this.startHeartBeat();
    } else if (['onclose', 'onerror'].includes(key)) {
      // 关闭或者报错 进行重新连接
      console.error(`==============失败类型：${e.type}===============`, e);
      SocketService.reconnect(this);
    }
  }
  /*
   * 心跳初始函数
   * @param time：心跳时间间隔
   */
  startHeartBeat(time) {
    this.heartTimer && clearTimeout(this.heartTimer);
    this.heartTimer = setTimeout(() => {
      //心跳检测
      this.send('ping#');
      this.waitingTimer = this.waitingServer();
    }, time);
  }

  //延时等待服务端响应，通过webSocketState判断是否连线成功
  waitingServer() {
    this.hasConnected = false;
    this.waitingTimer && clearTimeout(this.waitingTimer);
    return setTimeout(() => {
      if (this.hasConnected)
        return this.startHeartBeat(this.heartBeatingInterval);
      console.error('=======================心跳无响应，已断线==============================');
      SocketService.reconnect(this);
    }, this.receiveMessageTimeout);
  }
  send(params) {
    if (params && typeof params === 'object') {
      params = JSON.stringify(params);
    }
    this.initOpt.params = params;
    this.socketInstance.send(params);
    return this;
  }
  close() {
    if (this.socketInstance) {
      this.socketInstance.close();
      this.socketInstance = null;
      this.lockReconnect = true; // 防止因为主动关闭 而导致的重新连接
      this.heartTimer && clearTimeout(this.heartTimer);
      this.waitingTimer && clearTimeout(this.waitingTimer);
      this.timer && clearTimeout(this.timer);
      this.timer = null;
      this.waitingTimer = null;
      this.heartTimer = null;
      delete serviceMap[this.initOpt.url]; // 删除服务实例
      eventMap.delete(this.initOpt.url); // 删除事件
    }
    return this;
  }
  //关闭所有的websocket实例
  static closeAll() {
    for(let key in serviceMap) {
      if(serviceMap[key]) {
        //关闭socket实例
        serviceMap[key].close();
      }
    }
    for(let key in serviceMap) {
      // 清空服务
      delete serviceMap[key];
    }
    eventMap.clear(); // 清空事件
  }
  static collectEvent(
    {
      url = '',
      heartBeatingInterval = 5000, //心跳检测间隔 5秒
      receiveMessageTimeout = 2000, //如果2秒内没有回来 会重连
      params,
      ...rest
    },
    serviceInstance,
    restFlag
  ) {
    this.heartBeatingInterval = heartBeatingInterval;
    this.receiveMessageTimeout = receiveMessageTimeout;
    // 收集事件
    if (!eventMap.has(url) || restFlag) {
      eventMap.set(url, JSON.parse(JSON.stringify(event)));
    }
    //初始化携带参数处理
    if (params && restFlag) {
      // 重新连接 或者 初始化实例 连接成功发送数据
      eventMap.get(url)['onopen'].push(() => {
        serviceInstance.send(params);
      });
    }
    Object.keys(rest).forEach((key) => {
      const lowKey = (key || '').toLowerCase();
      if (typeof rest[key] == 'function' && event[lowKey]) {
        // 判断是函数 并且是event列表里面的函数
        eventMap.get(url)[lowKey].push(rest[key]);
      }
    });
    if (params && serviceInstance.socketInstance.readyState == 1) {
      // 已经初始化 并且有params 发送一次数据
      serviceInstance.send(params);
    }
  }
  static reconnect(serviceSelf) {
    if (serviceSelf.lockReconnect) {
      // 是否已经执行重连
      return;
    }
    serviceSelf.lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    serviceSelf.timer && clearTimeout(serviceSelf.timer);
    serviceSelf.timer = setTimeout(() => {
      const socketService = new SocketService(serviceSelf.initOpt);
      serviceMap[serviceSelf.initOpt.url] = socketService;
      serviceSelf.lockReconnect = false;
      messageCenter.emit('reconnect',socketService);//发布reconnect事件
    }, 5000);
  }
}

export const handleProxyServiceMap = (serviceMap, service) => {
  for(let key in serviceMap) {
    Object.defineProperty(serviceMap,key,{
      configurable: true,
      enumerable: true,
      set(newVal){
        service.ws = newVal;
      },
      get(){
        return service;
      }
    });
  }
};

export const socketRequest = (opt) => {
  if (typeof opt.params == 'object' && Object.keys(opt.params).length == 0) {
    opt.params = null;
  }
  let service = {ws: null};
  if (serviceMap[opt.url]) {
    service.ws = serviceMap[opt.url];
    SocketService.collectEvent(opt, service.ws);
  } else {
    service.ws = new SocketService(opt);
    serviceMap[opt.url] = service;
  }
  handleProxyServiceMap(serviceMap, service);
  return service;
};
