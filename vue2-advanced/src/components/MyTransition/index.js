import collapse from './collapse';

// 导出模块
export default collapse;

//global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(collapse);
}
