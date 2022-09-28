

let data = [
  {
    t: 1664189397531,
    name: 'a'
  },
  {
    t: 1664189411398,
    name: 'b'
  },
  {
    t: 1664189426744,
    name: 'c'
  },
  {
    t: 1664582400000,
    name: 'd'
  },
  {
    t: 1664668800000,
    name: 'e'
  }
];

function compare(p){ //这是比较函数
  return function(m,n){
      var a = m[p];
      var b = n[p];
      return a - b; //升序
  }
}



function dataFilterByTime(data) {
  data = data.sort(compare('t'));
  let arr = [];
  //每五分钟收集留言元素
  const five_miniutes_time_interval = 5 * 60 * 1000;
  for(let i = 0,arrIndex = 0, j = 0, len = data.length; j < len; j++) {
    if(data[j].t - data[i].t > five_miniutes_time_interval) {
      i = j;
      arrIndex++;
      arr[arrIndex] = [data[j]];
    } else {
      arr[arrIndex] ? arr[arrIndex].push(data[j]) : (arr[arrIndex] = [data[j]])
    }
  }
  return arr;
}

const s = dataFilterByTime(data)

console.log('s',s, s.length)
