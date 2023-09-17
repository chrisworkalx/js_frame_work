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
      import(/* webpackChunkName: "jsxSlot" */ '../views/BaseJsxSlot/index.vue')
  },
  {
    path: '/throttle',
    name: 'Throttle',
    component: () =>
      import(/* webpackChunkName: "throttle" */ '../views/Throttle/index.vue')
  },
  {
    path: '/dynamic-form',
    name: 'DynamicForm',
    component: () =>
      import(/* webpackChunkName: "dynamicForm" */ '../views/Form/index.vue')
  },
  {
    path: '/pop-over',
    name: 'PopOver',
    component: () =>
      import(/* webpackChunkName: "popOver" */ '../views/PopOver/index.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
