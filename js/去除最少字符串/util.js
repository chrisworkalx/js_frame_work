/**
 * 去除字符串中出现次数最少的字符，不改变原字符串的顺序。
 * 
 *  “ababac” —— “ababa”
    “aaabbbcceeff” —— “aaabbb”
*/

exports.removeMiniumStr = function removeMiniumStr(str) {
  //存储正则集合
  const regs = [];
  // 计算每个字符出现的次数
  const combineKeyLength = str.split('').reduce((target, nextKey) => {
    if (nextKey in target) {
      target[nextKey]++;
    } else {
      target[nextKey] = 1;
    }
    return target;
  }, {});

  //TODO: 开始比较少的字符
  /***
   * 1. 正好有一个最少的次数str出现
   * 2. 有可能有相同长度的str出现
   * 3. 如果每个都只出现相同次数保留原字符串 - 优先级最高
   */

  const lengthArr = Object.values(combineKeyLength);

  // 3. 如果每个都只出现相同次数保留原字符串
  if (new Set(lengthArr).size === 1) {
    return str;
  }

  const selectMinLengthStrValue = Math.min(...lengthArr);

  for (strKey in combineKeyLength) {
    if (combineKeyLength[strKey] == selectMinLengthStrValue) {
      regs.push(new RegExp(`${strKey}`, 'g'));
    }
  }

  return regs.reduce((s, reg) => {
    str = str.replace(reg, '');
    return str;
  }, str);
};
