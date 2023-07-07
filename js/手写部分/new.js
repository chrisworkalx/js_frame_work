function _New() {
  const obj = {};

  const [_mainConstructor, ...rest] = Array.prototype.slice.call(arguments);

  obj.__proto__ = _mainConstructor.prototype;

  const res = _mainConstructor.call(obj, ...rest);

  return typeof res === 'object' ? res : obj;
}

function People(name, age) {
  this.name = name;
  this.age = age;
}
People.prototype.sayName = function () {
  console.log(this.name);
};

const p1 = _New(People, '小明', 12);

p1.sayName();
