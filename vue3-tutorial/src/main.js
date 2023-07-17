import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import Router from './router';
import Store from './store';
import 'element-plus/dist/index.css';
import './style.css';

//=============自定义的全局组件 start =================/
import BaseComponents from './components/install';
//=============自定义的全局组件  over  =================/

import App from './App.vue';

createApp(App)
  .use(ElementPlus)
  .use(Router)
  .use(Store)
  .use(BaseComponents)
  .mount('#app');
