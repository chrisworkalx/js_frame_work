/**
 * @Description  :滚动懒加载
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-03-09 11:21:59
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-03-09 11:47:41
 * @FilePath     : \\release_2.1.5\\src\\directive\\lazy-scroll-load\\index.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
import lazyScrollLoad from './lazy-load';

const install = function (Vue) {
  if (install.installed) return;
  Vue.directive('lazy-scroll-load', lazyScrollLoad);
  install.installed = true;
};

if (window.Vue) {
  install(window.Vue);
}

lazyScrollLoad.install = install;
export default lazyScrollLoad;
