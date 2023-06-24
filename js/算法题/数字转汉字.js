/**
 * @description:  写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字
 *  trans(123456) —— 十二万三千四百五十六元
 *  trans(123456.12) —— 十二万三千四百五十六元一角二分
 *  trans(123456.01) —— 十二万三千四百五十六元一分
    trans（100010001）—— 一亿零一万零一元
 * @param {*} money 是数字 
 * @param {*} isRounding 是否需要四舍五入 默认false 表示截取字符串
 * @return {*}
 */

function trans(money, isRounding = false) {
  //TODO: 这里有个问题是js数字精度问题 js最大保存数字是16位
  let intChineseCurrencyName = '';
  let floatChineseCurrencyName = '';
  if (!money && typeof money !== 'number') {
    throw new Error('不能为空');
  }

  //小数点后面的金额
  const chinesDoteUnit = ['角', '分', '厘', '毫', '微', '纳', '皮'];

  /**
   * @description:
   * @param {*} n 默认字符串
   * @return {*} 返回字符串
   */
  const substrFloatNumber = (n) => {
    let chinesDoteUnitLen = chinesDoteUnit.length;
    if (n.length > chinesDoteUnitLen && isRounding) {
      return (Number('0.' + n).toFixed(chinesDoteUnitLen) + '').split('.')[1];
    }
    return n.substr(0, chinesDoteUnitLen);
  };

  const chineseUpperCurrency = [
    '',
    '十',
    '百',
    '千',
    '万',
    '十万',
    '百万',
    '千万',
    '亿',
    '十亿',
    '百亿',
    '千亿',
    '万亿'
  ];

  const chineseNumberName = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九'
  ];

  const mapNumberToChineseNames = chineseNumberName.reduce(
    (map, nextValue, index) => {
      map.set(index.toString(), nextValue);
      return map;
    },
    new Map()
  );

  const moneyToString = money + '';

  const splitMoneyByDot = moneyToString.split('.');

  // 整数部分
  const integerPartAmount = splitMoneyByDot[0] ? [...splitMoneyByDot[0]] : '';

  //小数部分
  const floatPartAmount = splitMoneyByDot[1]
    ? splitMoneyByDot[1].length > chinesDoteUnit.length
      ? [...substrFloatNumber(splitMoneyByDot[1])]
      : [...splitMoneyByDot[1]]
    : '';

  //整数部分金额单位转换
  const interceptChineseUpperCurrency = chineseUpperCurrency
    .slice(0, integerPartAmount.length)
    .reverse();

  if (integerPartAmount) {
    integerPartAmount.forEach((m, index) => {
      let n = mapNumberToChineseNames.get(m);
      let unit = n === '零' ? '' : interceptChineseUpperCurrency[index];

      if (
        /[十百千万](万|亿)/g.test(intChineseCurrencyName) &&
        /[十百千万]?(万|亿)/.test(unit)
      ) {
        // console.log('unit', unit);
        // console.log('intChineseCurrencyName', intChineseCurrencyName);
        intChineseCurrencyName = intChineseCurrencyName.replace(
          /(?<=[十百千万])(万|亿)/g,
          ''
        );
      }
      intChineseCurrencyName += n + unit;
    });

    intChineseCurrencyName = intChineseCurrencyName
      .replace(/^(一)([十].*?)$/, '$2')
      .replace(/(?<!零)(零)+(?!零)/g, '零')
      .replace(/零$/, '');
  }

  if (floatPartAmount) {
    floatPartAmount.forEach((f, index) => {
      let floatNum = mapNumberToChineseNames.get(f);
      let floatUnit = floatNum === '零' ? '' : chinesDoteUnit[index];
      floatChineseCurrencyName += floatNum + floatUnit;
    });

    floatChineseCurrencyName = floatChineseCurrencyName.replace(/零/g, '');
  }

  return (
    intChineseCurrencyName +
    (intChineseCurrencyName ? '元' : '') +
    floatChineseCurrencyName
  );
}

// const initMoney = 1203111123056;
// const initMoney = 100000000;
// const initMoney = 10000000;
// const initMoney = 1000000;
// const initMoney = 100000;
// const initMoney = 10000;
// const initMoney = 1000;
// const initMoney = 100;
// const initMoney = 10;
// const initMoney = 1;
// const initMoney = 200113;
const initMoney = 12305601001.12345678;
// const initMoney = 1230561.12345678;
// const initMoney = 123456;
// const initMoney = 100010001.123;
// const initMoney = 100010001.010207;
// const initMoney = 100010001.002007;
// const initMoney = 100010001.01020308;
// const initMoney = 1001001.012345891;

console.log('trans(initMoney)', trans(initMoney, true));
