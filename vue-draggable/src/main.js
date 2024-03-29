/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2022-11-11 11:20:19
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-03-23 10:32:12
 * @FilePath     : \\vue-draggable\\src\\main.js
 * @Copyright (C) 2022 mingfei.yao. All rights reserved.
 */
import Vue from 'vue';
import ElementUI, { MessageBox } from 'element-ui';
// eslint-disable-next-line import/no-unresolved
import VueMsgXiaoXiaoBoJue from 'vue-msg-xiaoxiaobojue/lib/vue-msg-xiaoxiaobojue.umd';
import lazyScroll from '@/directives/lazy-scroll-load';
import { Updater } from './utils/update';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
// import { useSocket } from './websocket';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueMsgXiaoXiaoBoJue);
Vue.use(lazyScroll);

// useSocket();

const up = new Updater({
  timer: 2000
});
// 未更新通知
up.on('no-update', () => {
  // console.log('未更新');
});
// 更新通知
up.on('update', () => {
  // console.log('更新了');
  setTimeout(() => {
    MessageBox({
      title: '版本跟新了',
      type: 'warning',
      message: '当前版本已经重构',
      callback: () => {
        window.location.reload();
      }
    });
  }, 2000);
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
