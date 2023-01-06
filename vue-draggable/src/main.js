/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2022-11-11 11:20:19
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2022-12-19 17:27:08
 * @FilePath     : \\vue-draggable\\src\\main.js
 * @Copyright (C) 2022 mingfei.yao. All rights reserved.
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
// import { useSocket } from './websocket';

Vue.config.productionTip = false;
Vue.use(ElementUI);

// useSocket();

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
