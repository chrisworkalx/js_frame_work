import alert from './alert.js';
// 直接使用
// alert.info({content: '消息提示', duration: 2})

export default {
  // 或者挂载到Vue原型上

  // 然后在组件中使用
  // this.$Alert.info({content: '消息提示', duration: 2})
  install(Vue) {
    Vue.prototype.$Alert = alert;
  }
};
