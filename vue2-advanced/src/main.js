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

// ==========特殊几个组件注册 start ===============/
import MessageBox from './components/MessageBox';
import Toast from './components/Toast';
// ==========特殊几个组件注册 over ===============/

// ==========web第三方好用的封装的组件 start ===============/
import Tui from '@wocwin/t-ui';
// webUrl： https://wocwin.github.io/t-ui/baseComponents/
// ==========web第三方好用的封装的组件 over ===============/

import 'animate.css';

//引入第三方好用的 折叠展示
// import vueCollapseTransition from 'vue-collapse-transition';

//引入tailwind.css
/**
 * 1. npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 安装
 * 2. npx tailwindcss init　　　创建配置文件
 * 3. postcss.config.js
 * 4. 在main.js中引入tainwind css
 */
import 'tailwindcss/tailwind.css';

import myCollapseTransition from '@/components/MyTransition';

import CstCollapseTransition from '@/components/MyCollapseTransition';

Vue.use(Tui);

Vue.config.productionTip = false;

Vue.use(BaseComponents);

Vue.use(MessageBox);

Vue.use(Toast);

Vue.use(ElementUI);

// Vue.use(vueCollapseTransition);

Vue.use(myCollapseTransition);

Vue.use(CstCollapseTransition);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
