import * as Vue from 'vue';

//vite全局模块化引入
const pages = import.meta.globEager('./**/*.vue');

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  install.installed = true;

  Object.values(pages).forEach((d) => {
    // console.log('d', d);
    // console.log('d.default', d.default);
    // console.log('d.default.name', d.default.name);
    Vue.component(d.default.name, d.default);
  });
  //TODO: 这里可以继续拓展
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  install
};
