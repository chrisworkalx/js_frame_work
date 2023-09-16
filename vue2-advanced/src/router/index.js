import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/jsx-slot'
  },
  {
    path: '/jsx-slot',
    name: 'JsxSlot',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/JsxSlot.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
