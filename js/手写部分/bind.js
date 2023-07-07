var obj = {
  name: '小明',
  getName(...args) {
    console.log(this.name + '/' + [...args].join('/'));
  }
};

var sayName = function () {
  console.log(this.getName(...arguments));
};

Function.prototype._bind = function (target, ...args) {
  const self = this;

  return function () {
    //参数合并
    args = Array.prototype.concat.call(args, [...arguments]);

    // this指向
    const res = self.call(target, ...args);

    return res;
  };
};

var s = sayName._bind(obj, 'good');

s('hello');
