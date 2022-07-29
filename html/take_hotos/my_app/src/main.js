import Vue from 'vue'
import App from './App.vue'

import { Uploader, Dialog } from 'vant'


Vue.use(Uploader)
Vue.use(Dialog)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
