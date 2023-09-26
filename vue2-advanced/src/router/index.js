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
  },
  {
    path: '/regular-export-large-file',
    name: 'regularExportLargeFile',
    component: () =>
      import(
        /* webpackChunkName: "regularExportLargeFile" */ '../views/Worker/regular-export-large.vue'
      )
  },
  {
    path: '/worker-export-large-file',
    name: 'workerExportLargeFile',
    component: () =>
      import(
        /* webpackChunkName: "workerExportLargeFile" */ '../views/Worker/worker-export-large.vue'
      )
  },
  {
    path: '/base-worker',
    name: 'baseWorker',
    component: () =>
      import(
        /* webpackChunkName: "baseWorker" */ '../views/Worker/baseWorker.vue'
      )
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
