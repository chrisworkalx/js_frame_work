import * as VueRouter from 'vue-router';
import Main from '../pages/Main/index.vue';
import Home from '../pages/Home/index.vue';
import Login from '../pages/Login/index.vue';
import RefPage from '../pages/Base/Ref/index.vue';
import ReactivePage from '../pages/Base/ReactTive/index.vue';
import ComputedPage from '../pages/Base/Computed/index.vue';
import NotFound from '../pages/NotFound/index.vue';

// TODO:
/**
 * 1. 后期需要做一个路由映射表
 * 2. 后期路由懒加载
 * 3. 路由全局校验
 */

//vite全局模块化引入
// const pages = import.meta.globEager('../pages/**/*.vue');

// console.log('pages', pages);

// Object.values(pages).forEach((d) => {
//   console.log('d', d);
//   // d.default
//   console.log('d.default.name', d.default.name);
// });

//这里需要做一个鉴权登陆

// 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'ref',
        component: RefPage
      },
      {
        path: 'reactive',
        component: ReactivePage
      },
      {
        path: 'computed',
        component: ComputedPage
      }
    ]
  },
  { path: '/login', component: Login },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

// 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes // `routes: routes` 的缩写
});

export default router;
