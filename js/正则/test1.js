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
