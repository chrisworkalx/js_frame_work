import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import Router from './router';
import 'element-plus/dist/index.css';
import './style.css';
import App from './App.vue';

createApp(App).use(ElementPlus).use(Router).mount('#app');
