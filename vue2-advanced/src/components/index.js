// true表示深层遍历
const requireComponent = require.context('./', true, /\.vue$/);
// console.log('requireComponent', requireComponent);
const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;

  // console.log(requireComponent.keys(), '---keys'); // 拿到了所有组件
  requireComponent.keys().forEach((element) => {
    // 第i个组件
    const config = requireComponent(element);
    const componentName = config.default.name;
    // console.log('componentName', componentName);
    // console.log('config.default', config.default);
    Vue.component(componentName, config.default || config);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
