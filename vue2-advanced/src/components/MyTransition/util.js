export default {
  addClass(ele, cls) {
    const name = ele.className;
    const blank = name !== '' ? ' ' : '';
    ele.className = name + blank + cls;
  },
  removeClass(ele, cls) {
    let name = ` ${ele.className} `;
    name = name.replace(/(\s+)/gi, ' ');
    let removed = name.replace(` ${cls} `, ' ');
    ele.className = removed.replace(/(^\s+)|(\s+$)/g, '');
  }
};
