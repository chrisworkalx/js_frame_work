/* eslint-disable arrow-body-style */
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
      // eslint-disable-next-line prefer-rest-params
      func.apply(this, arguments);
    }, delay);
  };
}

const config = { attributes: true, childList: true, subtree: true };

const shadowBox = document.createElement('div');

const walkBindingValue = (bindingValue = {}) => {
  return Object.keys(bindingValue).reduce((target, nextKey) => {
    // console.log('nextKey', nextKey);
    target[nextKey] = bindingValue[nextKey];
    return target;
  }, {});
};

function handleScroll(domProps) {
  if (domProps.disabled) return;
  let topHeightNumber;
  const transformStr = domProps.transformContainer.style.transform;
  if (transformStr && domProps.isAutoScroll) {
    const getTranslateYNumber = transformStr?.match(/(\d+)/)[1];
    topHeightNumber = getTranslateYNumber;
  } else {
    topHeightNumber = domProps.scrollContainer.scrollTop;
  }

  const hiddenChildNumbers = Math.round(topHeightNumber / domProps.rowHeight);
  console.log('hiddenChildNumbers', hiddenChildNumbers);
  if (domProps.callback) {
    domProps.callback(hiddenChildNumbers, domProps, (str) => {
      const topHight = domProps.isAutoScroll
        ? domProps.transformContainer.style.transform
        : `translateY(${domProps.scrollContainer.scrollTop}px)`;

      setTimeout(() => {
        domProps.transformContainer.style.transform = topHight;
        domProps.isAutoScroll = false;
      });
    });
  }
  const wrapperLoadData =
    (domProps.loadData && debounce(domProps.loadData)) || null;
  const scrollBottom =
    domProps.scrollContainer.scrollTop + domProps.scrollContainer.clientHeight;
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
    const domProps = {
      ...walkBindingValue(binding.value),
      shadowBoxContainer: shadowBox,
      rowHeight: 34,
      mark: 0
    };
    if (domProps.scrollBody) {
      domProps.scrollContainer = el.querySelector(domProps.scrollBody) || el;
      domProps.scrollContainer.style.cssText = 'position: relative';
    }
    if (domProps.transformBody) {
      domProps.transformContainer = el.querySelector(domProps.transformBody);
      domProps.transformContainer.style.cssText =
        'position: absolute; width: 100%; left: 0; top: 0;';
    }
    if (domProps.childNode) {
      domProps.childContainer = el.querySelector(domProps.childNode);
      domProps.rowHeight = domProps.childContainer.offsetHeight || 34;
    }
    observer = new MutationObserver((mutationList, observers) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          if (mutation.target.className.includes('el-select-dropdown')) {
            if (
              domProps.childContainer &&
              domProps.childContainer.offsetHeight
            ) {
              console.log('初始化');
              domProps.rowHeight = domProps.childContainer.offsetHeight || 34;
              domProps.scrollContainer.style.height = `${
                domProps.options.length * domProps.rowHeight
              }px`;
              domProps.shadowBoxContainer.style.height = `${
                domProps.bigList.length * domProps.rowHeight
              }px`;
              domProps.scrollContainer.insertBefore(
                domProps.shadowBoxContainer,
                domProps.transformContainer
              );
            }
          } else {
            // console.log('mutation--else', mutation);
          }
        } else if (mutation.type === 'attributes') {
          if (domProps.transformContainer) {
            const transformStr = domProps.transformContainer.style.transform;
            if (
              transformStr &&
              mutation.target.className.includes('is-reverse')
            ) {
              const getTranslateYNumber = transformStr.match(/(\d+)/)[1];

              domProps.disabled = false;
              domProps.isAutoScroll = true;
              setTimeout(() => {
                domProps.scrollContainer.scrollTo(0, getTranslateYNumber);
              });
            }
          }
        }
      }
    });
    observer.observe(el, config);

    // 滚动事件监听
    const onScroll = throttle(handleScroll.bind(this, domProps), 500);

    // eslint-disable-next-line no-param-reassign
    el[scope] = {
      el,
      vm,
      container: domProps.scrollContainer,
      onScroll,
      domProps
    };
    console.log('domProps----初始化', domProps);

    if (domProps.scrollContainer && !domProps.disabled) {
      domProps.scrollContainer.addEventListener('scroll', onScroll);
    }
  },
  update(el, binding) {
    const {
      bigList,
      isFiltered,
      filterList,
      options,
      mark,
      start,
      disabled,
      value
    } = binding.value;
    const { domProps } = el[scope];
    domProps.disabled = disabled;
    domProps.value = value;
    const filterModeRowNumber = filterList.length > 8 ? filterList.length : 8;
    const bigModeRowNumber = bigList.length > 8 ? bigList.length : 8;
    const minHeight = options.length > 8 ? options.length : 8;
    if (
      isFiltered &&
      domProps.filterList.length !== filterList.length &&
      domProps.mark !== mark
    ) {
      // console.log('domProps.shadowBoxContainer', domProps.shadowBoxContainer);
      // console.log('filterModeRowNumber', filterModeRowNumber);
      // console.log('domProps.shadowBoxContainer', domProps.shadowBoxContainer);
      // console.log('domProps', domProps);

      setTimeout(() => {
        console.log('查询变化');
        domProps.mark = mark;
        domProps.filterList = filterList;
        domProps.shadowBoxContainer.style.height = `${
          filterModeRowNumber * domProps.rowHeight
        }px`;
        domProps.scrollContainer.style.height = `${
          minHeight * domProps.rowHeight
        }px`;
        domProps.scrollContainer.scrollTop = 0;
      });
    } else if (domProps.mark !== mark) {
      setTimeout(() => {
        domProps.mark = mark;
        // 正常搜索
        const len = filterList.length ? filterModeRowNumber : bigModeRowNumber;
        domProps.shadowBoxContainer.style.height = `${
          len * domProps.rowHeight
        }px`;
        domProps.scrollContainer.style.height = `${
          minHeight * domProps.rowHeight
        }px`;
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
