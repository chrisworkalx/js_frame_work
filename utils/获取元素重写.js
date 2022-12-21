// 复写获取元素的方法
// 可能有人觉得上边的每次都要new一个BaseEvent才能使用比较繁琐。那么有没有其他更简单的方法。我们试想一下我们是怎么获取对应元素的呢？不就是通过浏览器上的那几个方法嘛（getElementById等），那我们直接复写这些方法就好了，每次在获取对应元素的时候给它们加上一个BaseEvent实例，这样拿到元素之后不就可以直接使用了嘛。

function extendElement(ele) {
  if (!ele) {
    return null;
  }
  if (!ele._extends) {
    ele._extends = new BaseEvent(ele);
    return ele;
  }
}

const getElementById = document.getElementById;
document.getElementById = function () {
  const elem = getElementById.call(document, arguments[0]);
  return extendElement(elem);
};


// 对于getElementById、querySelector而言，获取的只是单个元素，很容易处理。但是对于其他API来讲，获取的是元素数组，这个需要进行额外的处理。

const getElementsByTagName = document.getElementsByTagName;
document.getElementsByTagName = function () {
  const elem = getElementsByTagName.call(document, arguments[0]);
  if (!elem) {
    return new HTMLAllCollection();
  }
  return proxyObject(elem);
};

function proxyObject(obj) {
  const hanlder = {
    get: (obj, prop) => {
      return extendElement(obj[prop]);
    }
  }
  const proxyObject = new Proxy(obj, hanlder);
  return proxyObject;
}
// 采用Proxy代理拦截对数组的访问，当访问具体元素时候再添加上一个BaseEvent。

// 监听赋值事件
// 对于document.onclick = function(){}这些事件而已，这边的处理就是监听这些事件，当事件被赋值时，使用addEventListener进行监听。当document.onclick = null时取消监听该事件。

observeAssignmentEvent() {
  const _ = this;
  eventList.forEach((item) => {
    Object.defineProperty(_.element, `on${item}`, {
      set(fn) {
        let i =  _.isAlreadyListenedByAssignment(item);
        if(fn) {
          if( i !== -1) {
            _.element.removeEventListener(item, _._events[item][i])
          }
          _.element.addEventListener(item, {value: fn, intro: 'add by assignment'});
            return;
          }
          if(i !== -1) {
            _.element.removeEventListener(item, _._events[item][i])
          }
        }
      })
   })
 }
isAlreadyListenedByAssignment(item) {
  if(!this._events[item] || this._events[item].length === 0) {
    return -1;
  }
  let idx = -1;
  this._events[item].forEach((item, i) => {
    if(typeof item === 'object') {
      if(item.intro === 'add by assignment') {
        idx = i;
        return;
      }
    }
  })
  return idx;
}
