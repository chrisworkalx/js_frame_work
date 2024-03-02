const reg1 = /(?<!Math\.)sqrt/g;
const reg2 = /(?<=\.\w*(?=\/)).*/;

const s = `4+6*sqrt(5)*Math.sqrt(5)`.replace(reg1, (func, $1, $2) => {
  console.log('func', func);
  console.log('$1', $1);
  console.log('$2', $2);
  return `Math.${func}`;
});

console.log('s', s);
console.log('eval(s)', eval(s));

const pathUrl = 'https://www.google.com/api/v1?username=lisi'.match(reg2);

console.log('pathUrl', pathUrl);

const n = 20240301;
const tReg = /(\d{4})(\d{4})/g;

const ff = n.toString().replace(tReg, function (a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
  return `${b}-${c}`;
});

console.log('ff', ff);

const digitalReg = /\B(?=(\d{3})+(?!\d))/g; //表示千分位加逗号处理
