function digitUppercase(n) {
  const saveInitNumber = n;
  const startWithNegativeReg = /^\-(.*)?/g;
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  n = Math.abs(
    startWithNegativeReg.test(n)
      ? String(n).replace(startWithNegativeReg, '$1')
      : n
  );

  let s = '';

  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);

  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  s = s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');

  return String(saveInitNumber).indexOf('-') > -1 ? `负${s}` : s;
}

// let n = 1234.34;
// let n = 1234.034;
let n = 123408888199.034;

console.log('digitUppercase(n)', digitUppercase(n));
