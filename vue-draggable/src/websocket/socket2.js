import WSCONSTANTS from './websocketConstants';
import {  getUrlHash } from '@/utils/dui';
import API from '@/api/index';
function WebsocketClient(_this:any) {
  _this.websocket = null;
  _this.topicSet = null;
  _this.wsTimeOut = null;
  // 连接关闭时的回调
  _this.onclose = null;
  // 连接出错的回调
  _this.onerror = null;
  // 推送消息的外部回调函数 onMsgReceive(topic,data)
  _this.onMsgReceive = null;
  //心跳间隔
  _this.touchTime = 5000;
}
// WebsocketClient.prototype.pongFlag = false;
WebsocketClient.prototype.connect = function (callback?: Function){
  let fullUrl = `${API.webSocketServer}`;
  try {
    if ('WebSocket' in window) {
      console.log(fullUrl+'-----------------new WebSocket---------------------')
      this.websocket = new WebSocket(fullUrl);
    } else {
      console.error("您的浏览器不支持WebSocket,请更换最新版本浏览器");
      return false;
    }
  } catch (e) {
      console.error(e);
      return false;
  }
  var self = this;
  this.websocket.onopen = function () {
    self.pongFlag = true;
    console.log('--------------onopen-------------')
    //重连重新订阅
    if(self?.topicSet?.size > 0){
      self.subscribeAll(Array.from(self.topicSet));
    }else{
      self.topicSet = new Set();
    }
    self.callbackMap = new Map<string, Function>();
    //建立连接回调
    if(callback && typeof callback === 'function'){
      console.log('================onopen==callback===================')
      callback();
    }
  };
  this.websocket.onmessage = function (res: any) {
    //接收消息重置心跳
    self.pongFlag = true;
    self.touch();

    let response = JSON.parse(res.data);
    console.log('---------onmessage-------' + response.topic + ':' + response.data);
    //服务回调
    if (response?.type === WSCONSTANTS.WS_TYPE_CALLSERVICE) {
      let callback = self.callbackMap.get(response.topic);
      if (!callback) {
        //无回调方法默认消息提醒
        // that.sampleCallBack(data.msg);
      } else {
        if (typeof callback === 'function') {
          callback(response);
        } else {
          console.log('服务回调注册异常！');
        }
      }
    //消息回调
    } else if(response?.type === WSCONSTANTS.WS_TYPE_SUBSCRIBE){
      if (self.onMsgReceive != null) {
        self.onMsgReceive(response.topic, response);
      }else{
        console.log('消息回调注册异常！');
      }
    }else{
      console.error('websocket接收消息异常:'+response.errorCode + ': ' + response.errorMsg + '\n' + res.data);
    }
  };
  this.websocket.onclose = function () {
    console.log('--------------onclose-------------')
    this.websocket?.close();
    // this.websocket = null;
  };
  this.websocket.onerror = function(evt: any){
    console.log('--------------onerror-----------' + evt);
    // this.websocket.close();
    // this.connect();
  };
  this.touch();
}
//消息发送
WebsocketClient.prototype.send = function (data: any){
  this.websocket.send(JSON.stringify(data));
}
//订阅主题
WebsocketClient.prototype.subscribe = function (topic: any){
  if (topic === undefined || topic == null || topic == "") {
    console.error("订阅主题不正确");
    return;
  }
  let obj = {
      topic: topic,
      type: WSCONSTANTS.WS_TYPE_SUBSCRIBE,
  };
  console.log('--------------subscribe-----------' + topic);
  this.topicSet.add(topic);
  this.send(obj);
}
//批量订阅
WebsocketClient.prototype.subscribeAll = function (topicList: any){
  let obj = {
    topic: topicList,
    data: topicList,
    type: WSCONSTANTS.WS_TYPE_SUBSCRIBE_ALL,
  };
  console.log('--------------subscribeAll-----------' + topicList);
  for(let topic of topicList){
    this.topicSet.add(topic)
  }
  this.send(obj);
}
//取消订阅
WebsocketClient.prototype.unsubscribe = function (topic: string){
  let obj = {
    topic: topic,
    type: WSCONSTANTS.WS_TYPE_UNSUBSCRIBE,
  };
  console.log('--------------unsubscribe-----------' + topic);
  this.topicSet.remove(topic);
  this.send(obj);
}
//方法回调
WebsocketClient.prototype.callService = function(service: string,callback: Function,...param: any) {
  let obj: any = {
    topic: service,
    type: WSCONSTANTS.WS_TYPE_CALLSERVICE,
    data: [...param],
  };
  if (callback && typeof callback === 'function') {
    obj.callbackFlag = true;
    this.callbackMap.set(service, callback);
  }
  console.log('--------------callService-----------' + service);
  this.send(obj);
};
//心跳维持
WebsocketClient.prototype.touch = function (){
  clearTimeout(this.wsTimeOut)
  this.wsTimeOut = setTimeout(() => {
      if (this.pongFlag) {
      // if (this.websocket?.readyState === 1) {
          // console.log('--------------ping-----------');
          this.pongFlag = false;
          this.websocket.send("ping#");
          this.touch();
      } else {
          console.log('--------------reconnect-----------');
          this.websocket?.close();
          // this.websocket = null;
          this.connect();
      }
  }, 5000);
}
WebsocketClient.prototype.close = function (){
  this.websocket?.close();
}
//注册消息回调方法
WebsocketClient.prototype.register = function (callback:Function) {
  this.onMsgReceive = callback;
};

export default WebsocketClient;
