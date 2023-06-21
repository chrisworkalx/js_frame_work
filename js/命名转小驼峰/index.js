/**
 *
 * A-b-cee --> aBCee
 * ca-de-ea --> caDeEa
 * f-g --> fG
 * mn --> mn
 */

/**
 * @description: 将带有分隔符的字符串转为小驼峰模式
 * @param {arrStr} 表示一组字符串集合 类似['A-b-cee','ca-de-ea']
 * @return { Array<小驼峰>} 转为小驼峰模式
 */
function transferDelimeterStrToCamelStr(arrStr) {
  let res = arr.map((e) => {
    let items = e.split('-').map((item, index) => {
      if (index) {
        let first = item.substring(0, 1);
        let rest = item.substring(1);
        return first.toUpperCase() + rest;
      } else {
        return item.toLowerCase();
      }
    });
    return items.join('');
  });
  return res;
}

console.log(
  transferDelimeterStrToCamelStr([
    'A-b-cee',
    'ca-de-ea',
    'e-fe-eaa',
    'f-g',
    'mn'
  ])
);

/**
 * @description: 采用正则匹配
 * @param {str} 字符串
 * @return {<小驼峰>} 转为小驼峰格式
 */

function turnName(str) {
  return str.replace(/-[a-zA-Z]/g, (match) =>
    match.replace('-', '').toUpperCase()
  );
}

//命名方式小驼峰改中划线
let s1 = 'aBBcdE';

let t = s1.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
console.log(t);
