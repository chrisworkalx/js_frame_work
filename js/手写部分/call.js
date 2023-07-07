var obj = {
  name: 'xiaoming'
};

var sayName = function () {
  console.log(arguments);
  console.log(this.name);
};

// sayName.call(obj, 1, 2, 3);

Function.prototype._call = function () {
  //截取目标对象
  const target = Array.prototype.shift.call(arguments);
  //this指向当前调用
  const _self = this;
  target.fn = _self;

  const res = target.fn(...arguments);

  delete target.fn;

  return res;
};

sayName._call(obj, 1, 2, 3);
