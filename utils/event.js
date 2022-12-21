class BaseEvent {
  constructor(ele) {
    this.element = ele;
    this._events = {};
    // 复写方法
    this.rewriteAddEventListener();
    this.rewriteRemoveEventListener();
    // 将方法绑定到元素上，即可以通过document.fn进行访问
    ele.getAllEventListeners = this.getAllEventListeners.bind(this);
    ele.getAllEvents = this.getAllEvents.bind(this);
  }
  rewriteAddEventListener() {
    const addEventListener = this.element.addEventListener;
    const _ = this;
    this.element.addEventListener = function () {
      _.addEvent(arguments[0], arguments[1]);
      addEventListener.call(_.element, arguments[0], arguments[1]);
    };
  }
  rewriteRemoveEventListener() {
    const removeEventlistener = this.element.removeEventListener;
    const _ = this;
    this.element.removeEventListener = function () {
      _.removeEvent(arguments[0]);
      removeEventlistener.call(_.element, arguments[0], arguments[1]);
    };
  }
  addEvent(eventName, callback) {
    if (this._events[eventName]) {
      this._events[eventName].push(callback);
    } else {
      this._events[eventName] = [callback];
    }
  }
  removeEvent(eventName) {
    delete this._events[eventName];
  }
  getAllEvents() {
    return Object.getOwnPropertyNames(this._events);
  }
  getAllEventListeners() {
    return this._events;
  }
}

document._extends = new BaseEvent(document);
document.getAllEventListeners()
