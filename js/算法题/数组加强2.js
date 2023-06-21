class Cls extends Array {
  sum() {
    return this.reduce((cur, prev) => cur + prev, 0);
  }
}
// eg1
// const cls = [...new Cls(3)].map((_, index) => index); //这里相当于被外层Array.from()延展一次，那么就不是原Cls原型上没有sum这个方法

// console.log(cls);

// console.log('cls.sum()', cls.sum()); //抛错

//eg2
// const cls2 = new Cls(3).fill(1); //继承自新继承的Cls构造器 cls === [1,1,1]
// console.log('cls2.sum()', cls2.sum()); //3

//eg3
// const cls3 = Array(3).fill(1);
// console.log('cls3.sum', cls3.sum()); //报错 报错同1

//eg4
const cls4 = Cls.of(5); //ok
console.log('cls4.sum()', cls4.sum()); // 5
