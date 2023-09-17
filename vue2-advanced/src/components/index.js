// true表示深层遍历
const requireComponent = require.context('./', true, /\.vue$/);
const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;

  requireComponent
    .keys()
    //先过滤掉 MessageBox和toast组件的注册
    .filter((k) => ['MessageBox', 'toast'].every((key) => !k.includes(key)))
    .forEach((element) => {
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
