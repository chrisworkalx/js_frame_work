/**
 * @description: 深拷贝的实现
 * @param {*}
 * @return {*}
 */

const isObject = (o) => Object.prototype.toString.call(o) === '[object Object]';

function deepClone(obj) {
  let cloneObj = {};

  if (!obj) {
    throw new Error('不能传入空值！');
  }

  //如果是数组类型
  if (Array.isArray(obj)) {
    cloneObj = obj.map((item) => {
      return deepClone(item);
    });
  } else if (isObject(obj)) {
    //正常对象
    Object.keys(obj).forEach((key) => {
      let value = obj[key];
      if (Array.isArray(value)) {
        cloneObj[key] = value.map((v) => {
          return deepClone(v);
        });
      } else if (isObject(value)) {
        cloneObj[key] = deepClone(value);
      } else {
        cloneObj[key] = value;
      }
    });
  } else {
    //常规类型
    cloneObj = obj;
  }

  return cloneObj;
}

var o1 = {
  a: 1,
  b: {
    name: 123
  },
  c: [
    {
      age: 20
    },
    'hello'
  ]
};

var o2 = deepClone(o1);

console.log('o2', o2);
