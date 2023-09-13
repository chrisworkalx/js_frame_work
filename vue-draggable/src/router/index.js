/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2022-11-11 11:20:19
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-03-23 10:30:07
 * @FilePath     : \\vue-draggable\\src\\router\\index.js
 * @Copyright (C) 2022 mingfei.yao. All rights reserved.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ElSelect from '../views/El-Select.vue';
import ElSelectDirective from '../views/el-select-directive.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
    // component: ElSelect
    component: ElSelectDirective
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/socket',
    name: 'socket',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "socket" */ '../views/Socket.vue')
  },
  {
    path: '/form',
    name: 'form',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "form" */ '../views/Form.vue')
  },
  {
    path: '/formTwo',
    name: 'formTwo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "formTwo" */ '../views/FormTwo.vue')
  },
  {
    path: '/process',
    name: 'process',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "process" */ '../views/Process.vue')
  },
  {
    path: '/guide',
    name: 'guide',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "guide" */ '../views/Guide.vue')
  },
  {
    path: '/drag',
    name: 'drag',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "drag" */ '../views/Vue-Dragable.vue')
  },
  {
    path: '/elSelect',
    name: 'el-select',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "'el-select" */ '../views/El-Select.vue')
  },
  {
    path: '/elDrag',
    name: 'el-drag',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "el-drag" */ '../views/El-Dragger-tree.vue')
  },
  {
    path: '/testProps',
    name: 'testProps',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "testProps" */ '../views/TestProps.vue')
  },
  {
    path: '/testVueProperty',
    name: 'testVueProperty',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "testVueProperty" */ '../views/vue-property.vue'
      )
  },
  {
    path: '/iframe',
    name: 'iframe',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "iframe" */ '../views/Iframe.vue')
  },
  {
    path: '/watch',
    name: 'watch',
    props: {
      text1: 'basketball',
      text2: 'apple'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "watch" */ '../views/watch.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const rewritesRouterMethods = {
  push: VueRouter.prototype.push,
  replace: VueRouter.prototype.replace
};

['push', 'replace'].forEach((k) => {
  VueRouter.prototype[k] = function rewrite(
    location,
    onComplete = () => {},
    onError = () => {}
  ) {
    // const name = `route${k.replace(/(\w)(\w+)/g, (_, $1, $2, ...rest) => {
    //   console.log($1, '==$1');
    //   return $1.toUpperCase() + $2;
    // })}`;

    // console.log(name, '===name');
    // routerPush.call(this, location)默认返回promise
    return rewritesRouterMethods[k]
      .call(this, location)
      .then((res) => {
        onComplete(res);
      })
      .catch((err) => {
        onError(err);
        return null;
      });
  };

  console.log('VueRouter', VueRouter);
});

export default router;
