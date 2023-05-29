// 遵循hashMap实现原理
// 可以跳过一些key
// 遵循链表缓存相同的值
//简单模拟数字值如Map.set(1, 'a')
//本例中模仿开辟8个房间

function HashMap() {
  this.initStore();
}

HashMap.prototype.initStore = function () {
  this.storeList = new Array(8);

  for (let i = 0; i < this.storeList.length; i++) {
    //空的链表头
    this.storeList[i] = {};
    this.storeList[i].next = null;
  }
};

HashMap.prototype.hash = function (key) {
  return key % this.storeList.length;
};

//设置
HashMap.prototype.set = function (key, value) {
  //先获取房间索引
  let index = this.hash(key);
  // 先获取房间 -> 链表头
  let quene = this.storeList[index];

  // 找表头下面的对象 覆盖 否则返回 undefined
  // 有两种情况 空表头后有数据， 之前set过
  // 空表头后无数据， 直接连到空表头

  while (quene.next) {
    if (quene.next.key) {
      quene.next.value = value;
      return true;
    } else {
      //下移指针 指向下一个
      quene = quene.next;
    }
  }
  quene.next = {
    key,
    value,
    next: null
  };
};

//获取
HashMap.prototype.get = function (key) {
  let index = this.hash(key);

  //获取链表头
  let quene = this.storeList[index];

  //下移到非空表头
  queue = quene.next; //null

  while (quene) {
    if (quene.key === key) {
      return quene.value;
    } else {
      quene = quene.next;
    }
  }

  //如果都没有找到
  return undefined;
};
let hashMap = new HashMap();

hashMap.set(1, 123);
console.log(hashMap.get(1));

let obj = {};
let mapObj = new Map();
for (let i = 0; i < 100000; i++) {
  obj[`a${i}`] = i;
  mapObj.set(`a${i}`, i);
}

console.time();

// for (let key in obj) {
//   if (key === 'a99999') {
//     console.log(obj[key]);
//     console.timeEnd();
//   }
// }

for (let key of mapObj.keys()) {
  if (key === 'a99999') {
    console.log(mapObj.get(key));
    console.timeEnd();
  }
}
