function getDeepKey(obj, key) {
  /**
   * obj = {
   *  key: []
   *
   * }
   */

  let result;
  if (!key || key === null) {
    throw new Error('key 不能为空');
  }

  let args = key.split('.');

  result = args.reduce((prev, next) => {
    return prev[next];
  }, obj);

  return result;
}

let obj = {
  a: {
    b: {
      f: 99
    }
  },
  c: 10,
  d: [
    {
      name: 'hello'
    }
  ]
};

// console.log(getDeepKey(obj, 'a'));
// console.log(getDeepKey(obj, 'a.b'));
console.log(getDeepKey(obj, 'a.b.f'));
