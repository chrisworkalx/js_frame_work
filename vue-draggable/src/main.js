import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import { useSocket } from './websocket';

Vue.config.productionTip = false;
Vue.use(ElementUI);

useSocket();

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
