import util from './util';
//其实这就是el-collapse源码
export const collapse = {
  beforeEnter(ele) {
    util.addClass(ele, 'collapse-transition');
    if (!ele.dataset) ele.dataset = {};

    ele.dataset.oldPaddingTop = ele.style.paddingTop;
    ele.dataset.oldPaddingBottom = ele.style.paddingBottom;

    ele.style.height = '0';
    ele.style.paddingTop = '0';
    ele.style.paddingBottom = '0';
  },

  enter(ele) {
    ele.dataset.oldOverflow = ele.style.overflow;
    if (ele.scrollHeight !== 0) {
      ele.style.height = ele.scrollHeight + 'px';
      ele.style.paddingTop = ele.dataset.oldPaddingTop;
      ele.style.paddingBottom = ele.dataset.oldPaddingBottom;
    } else {
      ele.style.height = '';
      ele.style.paddingTop = ele.dataset.oldPaddingTop;
      ele.style.paddingBottom = ele.dataset.oldPaddingBottom;
    }

    ele.style.overflow = 'hidden';
  },

  afterEnter(ele) {
    // for safari: remove class then reset height is necessary
    util.removeClass(ele, 'collapse-transition');
    ele.style.height = '';
    ele.style.overflow = ele.dataset.oldOverflow;
  },

  beforeLeave(ele) {
    if (!ele.dataset) ele.dataset = {};
    ele.dataset.oldPaddingTop = ele.style.paddingTop;
    ele.dataset.oldPaddingBottom = ele.style.paddingBottom;
    ele.dataset.oldOverflow = ele.style.overflow;

    ele.style.height = ele.scrollHeight + 'px';
    ele.style.overflow = 'hidden';
  },

  leave(ele) {
    if (ele.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      util.addClass(ele, 'collapse-transition');
      ele.style.height = '0';
      ele.style.paddingTop = '0';
      ele.style.paddingBottom = '0';
    }
  },

  afterLeave(ele) {
    util.removeClass(ele, 'collapse-transition');
    ele.style.height = '';
    ele.style.overflow = ele.dataset.oldOverflow;
    ele.style.paddingTop = ele.dataset.oldPaddingTop;
    ele.style.paddingBottom = ele.dataset.oldPaddingBottom;
  }
};
