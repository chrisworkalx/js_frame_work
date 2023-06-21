/**
 * [['a','b'],'c', [['c'], 'd']] ---> ['a', 'b', 'c', 'd']
 *
 */

function flatArr(arr) {
  return arr.reduce((target, nextItem) => {
    return target.concat(
      Array.isArray(nextItem) ? flatArr(nextItem) : nextItem
    );
  }, []);
}

const initArr = [['a', 'b'], 'c', [['c'], 'd']];

// console.log(initArr.flat(Infinity));
// console.log('flatArr(initArr)', flatArr(initArr));

Array.prototype.polyFlat = function (depth = 1) {
  return depth > 0
    ? this.reduce(
        (prev, next) =>
          prev.concat(Array.isArray(next) ? next.polyFlat(depth - 1) : next),
        []
      )
    : this;
};

console.log(initArr.polyFlat(3));

Array.prototype.polyFlatTwo = function (depth = 1) {
  return depth > 0
    ? [].concat(
        ...this.map((v) => (Array.isArray(v) ? v.polyFlatTwo(depth - 1) : v))
      )
    : this;
};

console.log(initArr.polyFlatTwo(3));
