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
import * as Sentry from '@sentry/vue';
// eslint-disable-next-line import/no-unresolved
import VueMsgXiaoXiaoBoJue from 'vue-msg-xiaoxiaobojue/lib/vue-msg-xiaoxiaobojue.umd';
import { Updater } from './utils/update';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
// import { useSocket } from './websocket';
import lazyScroll from './directives/lazy-scroll-load';
import { MessageBox as ToolMessageBox } from './components/MyUI';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueMsgXiaoXiaoBoJue);
Vue.use(lazyScroll);
Vue.use(ToolMessageBox);

Vue.component('ErrorBoundary', {
  data: () => ({ error: null }),
  errorCaptured(err, vm, info) {
    this.error = `${err.stack}\n\nfound in ${info} of component`;
    return false;
  },
  render(h) {
    if (this.error) {
      return h('pre', { style: { color: 'red' } }, this.error);
    }
    // ignoring edge cases for the sake of demonstration
    return this.$slots.default[0];
  }
});

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

// eslint-disable-next-line func-names
Vue.config.errorHandler = function (err, vm, info) {
  // #处理错误信息, 进行错误上报
  // #err 错误对象
  // #vm Vue实例
  // #info 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  console.log('%c%s', 'color:red', '#err错误对象:', err);
  console.log('%c%s', 'color:blue', '#vm Vue实例:', vm);
  console.log(
    '%c%s',
    'color:green',
    '#`info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子:',
    info
  );
};

Sentry.init({
  Vue,
  dsn: 'https://8b110ffbb44e495ea18a9838a8cb53dc@o4505423527346176.ingest.sentry.io/4505423536193536',
  integrations: [
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets`
      // to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
      routingInstrumentation: Sentry.vueRouterInstrumentation(router)
    }),
    new Sentry.Replay()
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  // This sets the sample rate at 10%.
  // You may want to change it to 100% while in development
  // and then sample at a lower rate in production.
  replaysSessionSampleRate: 0.1,
  // If you're not already sampling the entire session,
  // change the sample rate to 100% when sampling sessions where errors occur.
  replaysOnErrorSampleRate: 1.0
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

window.addEventListener('error', (a, b, c) => {
  console.log(a, b, c, '====error event');
  throw new Error(a);
});
