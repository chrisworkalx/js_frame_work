// 实现一个方法可以使得
// calculator(1) ===> 1
// .add(3) ===> 4
// .div(2) ===> 2

class Calculator {
  constructor(n) {
    this.result = n;
  }
  add(a) {
    this.result += a;
    return this;
  }
  div(d) {
    this.result = this.result / d;
    return this;
  }
}

const res = new Calculator(1).add(3).div(2).result;
console.log('res', res);

function calculator(n) {
  let result;
  if (typeof n !== 'number') return;
  result = n;
  return result;
}

Number.prototype.add = function (n) {
  return n + this;
};

Number.prototype.div = function (n) {
  return this / n;
};

const finalResult = calculator(1).add(3).div(2);
console.log('finalResult', finalResult);
