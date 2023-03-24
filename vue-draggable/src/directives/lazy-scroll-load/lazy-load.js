/* eslint-disable no-param-reassign */
/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-03-23 10:31:21
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-03-24 14:03:05
 * @FilePath     : \\vue-draggable\\src\\directives\\lazy-scroll-load\\lazy-load.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
import { throttle } from 'lodash';
import Vue from 'vue';

const scope = 'lazyScrollLoad';
let timer = null;
let observer = null;

export function debounce(func, delay = 1000) {
  // let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

const config = { attributes: true, childList: true, subtree: true };

const shadowBox = document.createElement('div');

const domProps = Vue.observable({
  shadowBoxContainer: shadowBox,
  rowHeight: 34,
  mark: 0
});

const walkBindingValue = (bindingValue = {}) =>
  Object.keys(bindingValue).forEach((nextKey) => {
    domProps[nextKey] = bindingValue[nextKey];
  });

function handleScroll() {
  if (domProps.disabled) return;
  const hiddenChildNumbers = Math.round(domProps.scrollContainer.scrollTop / domProps.rowHeight);
  if (domProps.callback) {
    domProps.callback(hiddenChildNumbers, (str) => {
      domProps.transformContainer.style.transform = `translateY(${domProps.scrollContainer.scrollTop}px)`;
    });
  }
  const wrapperLoadData = (domProps.loadData && debounce(domProps.loadData)) || null;
  const scrollBottom = domProps.scrollContainer.scrollTop + domProps.scrollContainer.clientHeight;
  const remainDistance = domProps.scrollContainer.scrollHeight - scrollBottom;
  if (remainDistance <= domProps.scrollContainer.distance) {
    // 数据加载
    if (typeof wrapperLoadData === 'function') {
      wrapperLoadData();
    }
  }
}
export default {
  name: 'lazyScrollLoad',
  inserted: (el, binding, vnode) => {
    // 获取scroll 滚动的容器元素,由参数传入
    // 如果没有传入,则默认绑定指令的元素自己
    // 获取懒加载处理函数 , 以及其他参数
    const vm = vnode.context;
    walkBindingValue(binding.value);
    if (domProps.scrollBody) {
      domProps.scrollContainer = el.querySelector(domProps.scrollBody) || el;
      domProps.scrollContainer.style.cssText = 'position: relative';
    }
    if (domProps.transformBody) {
      domProps.transformContainer = el.querySelector(domProps.transformBody);
      domProps.transformContainer.style.cssText = 'position: absolute; width: 100%; left: 0; top: 0;';
    }
    if (domProps.childNode) {
      domProps.childContainer = el.querySelector(domProps.childNode);
      domProps.rowHeight = domProps.childContainer.offsetHeight;
    }
    observer = new MutationObserver((mutationList, observers) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          if (mutation.target.className.includes('el-select-dropdown')) {
            if (domProps.childContainer && domProps.childContainer.offsetHeight) {
              domProps.rowHeight = domProps.childContainer.offsetHeight;
              domProps.scrollContainer.style.height = `${domProps.options.length * domProps.rowHeight}px`;
              shadowBox.style.height = `${domProps.bigList.length * domProps.rowHeight}px`;
              domProps.scrollContainer.insertBefore(shadowBox, domProps.transformContainer);
            }
          } else {
            // console.log('mutation--else', mutation);
          }
        } else if (mutation.type === 'attributes') {
          if (domProps.transformContainer) {
            const transformStr = domProps.transformContainer.style.transform;
            if (transformStr && mutation.target.className.includes('is-reverse')) {
              console.log('展开');
              const getTranslateYNumber = transformStr.match(/(\d+)/)[1];
              domProps.disabled = false;
              domProps.transformDistance = getTranslateYNumber;
              domProps.scrollContainer.scrollTop = `${getTranslateYNumber}`;
            }
          }
        }
      }
    });
    observer.observe(el, config);

    // 滚动事件监听
    const onScroll = throttle(
      handleScroll.bind(this),
      500
    );

    // eslint-disable-next-line no-param-reassign
    el[scope] = {
      el, vm, container: domProps.scrollContainer, onScroll, domProps
    };

    if (domProps.scrollContainer && !domProps.disabled) {
      domProps.scrollContainer.addEventListener('scroll', onScroll);
    }
  },
  update(el, binding) {
    const {
      bigList, isFiltered, filterList, options, mark, start, disabled, value
    } = binding.value;
    domProps.disabled = disabled;
    domProps.value = value;
    const filterModeRowNumber = filterList.length > 8 ? filterList.length : 8;
    const bigModeRowNumber = bigList.length > 8 ? bigList.length : 8;
    const minHeight = options.length > 8 ? options.length : 8;
    if (
      isFiltered
      && domProps.filterList.length !== filterList.length
      && domProps.mark !== mark) {
      domProps.mark = mark;
      domProps.filterList = filterList;
      setTimeout(() => {
        domProps.shadowBoxContainer.style.height = `${filterModeRowNumber * domProps.rowHeight}px`;
        domProps.scrollContainer.style.height = `${minHeight * domProps.rowHeight}px`;
        domProps.scrollContainer.scrollTop = 0;
      });
    } else if (domProps.mark !== mark) {
      domProps.mark = mark;
      // 正常搜索
      setTimeout(() => {
        const len = filterList.length ? filterModeRowNumber : bigModeRowNumber;
        domProps.shadowBoxContainer.style.height = `${len * domProps.rowHeight}px`;
        domProps.scrollContainer.style.height = `${minHeight * domProps.rowHeight}px`;
      });
    }
  },
  unbind(el) {
    const { container, onScroll } = el[scope];
    if (container) {
      container.removeEventListener('scroll', onScroll);
      observer.disconnect();
    }
  }
};
