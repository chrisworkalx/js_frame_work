import * as VueRouter from 'vue-router';
import Main from '../pages/Main/index.vue';
import Home from '../pages/Home/index.vue';
import Login from '../pages/Login/index.vue';
// import RefPage from '../pages/Base/Ref/index.vue';
// import ReactivePage from '../pages/Base/ReactTive/index.vue';
// import ComputedPage from '../pages/Base/Computed/index.vue';
import NotFound from '../pages/NotFound/index.vue';
import DeepComp from '../pages/DeepComponent/index.vue';
import store from '../store';

// TODO:
/**
 * 1. 后期需要做一个路由映射表
 * 2. 后期路由懒加载
 * 3. 路由全局校验
 */

//vite全局模块化引入

//基础页面获取
const basePages = import.meta.globEager('../pages/Base/**/*index.vue');
//高级页面获取
const advancedPages = import.meta.globEager(
  '../pages/AdvancedComp/**/*index.*'
);

function getTargetRoutePage(pages, type, cb) {
  return Object.entries(pages).reduce((prev, [_, d]) => {
    prev.push({
      path: d.default.name.toLowerCase(),
      component: d.default
    });
    store.dispatch('collectMeuns', {
      path: d.default.name.toLowerCase(),
      type
    });
    if (cb && typeof cb === 'function') {
      cb(d);
    }
    return prev;
  }, []);
}

const BaseRouters = getTargetRoutePage(basePages, 'base');

const AdvancedRouters = getTargetRoutePage(advancedPages, 'advance');

// Object.entries(basePages).forEach(([k, d]) => {
// console.log('d', d);
// console.log('d.default', d.default);
// console.log('k', k);
// console.log('d.default.name', d.default.name);
// BaseRouters.push({
//   path: d.default.name.toLowerCase(),
//   component: d.default
// });

// store.dispatch('collectMeuns', { path: d.default.name.toLowerCase() });
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
      ...BaseRouters,
      ...AdvancedRouters,
      {
        path: 'deepComp',
        component: DeepComp
      }
    ]
  },
  { path: '/login', component: Login },
  { path: '/hcp360', component: () => import('../pages/Hcp360/index.vue') },
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
