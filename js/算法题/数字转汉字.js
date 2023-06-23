/**
 * @description:  写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字
 *  trans(123456) —— 十二万三千四百五十六
    trans（100010001）—— 一亿零一万零一
 * @param {*} money 是数字
 * @return {*}
 */

function trans(money) {
  let chineseCurrencyName = '';
  if (!money && typeof money === 'number') {
    throw new Error('不能为空');
  }

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

  const moneyList = [...money.toString()];

  const interceptChineseUpperCurrency = chineseUpperCurrency
    .slice(0, moneyList.length)
    .reverse();

  moneyList.forEach((m, index) => {
    let n = mapNumberToChineseNames.get(m);
    let unit = n === '零' ? '' : interceptChineseUpperCurrency[index];

    if (
      /[十百千万](万|亿)/g.test(chineseCurrencyName) &&
      /[十百千万]?(万|亿)/.test(unit)
    ) {
      // console.log('unit', unit);
      // console.log('chineseCurrencyName', chineseCurrencyName);
      chineseCurrencyName = chineseCurrencyName.replace(
        /(?<=[十百千万])(万|亿)/g,
        ''
      );
    }
    chineseCurrencyName += n + unit;
  });

  // return chineseCurrencyName;
  // .replace(/^(一)([十].*?)$/, '$2')
  // .replace(/个/g, '')
  // // .replace(/零[百十千万亿](?!一)/g, '')
  // .replace(/(?<=零)[百十千](万|亿)$/g, '')
  // .replace(/(.*)零$/, '$1')

  return chineseCurrencyName
    .replace(/^(一)([十].*?)$/, '$2')
    .replace(/(?<!零)(零)+(?!零)/g, '零');
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
// const initMoney = 12345601001;
// const initMoney = 123456;
const initMoney = 100010001;

console.log('trans(initMoney)', trans(initMoney));
