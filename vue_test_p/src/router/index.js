/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-29 15:35:09
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-29 15:48:30
 * @FilePath     : \\js_frame_work\\vue_test_p\\src\\router\\index.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/todo",
    name: "todo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ToDo.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
