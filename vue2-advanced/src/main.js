import Vue from 'vue';
// ==========引入element start ===============/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// ==========引入element over ===============/

import App from './App.vue';
import router from './router';
import store from './store';
import './style/base.css';

// ==========自定义组件全局注册 start ===============/
import BaseComponents from './components/index';
// ==========自定义组件全局注册 over ===============/

Vue.config.productionTip = false;

Vue.use(BaseComponents);

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
