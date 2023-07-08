import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'Cookies';
import Login from '@/views/login/index';
import main from '@/views/main';
import template from '@/views/template';
Vue.use(Router);

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

const itemA = {
  orgin:
    process.env.NODE_ENV === 'production'
      ? 'https://xxxx'
      : 'http://localhost:5001',
  pathName: '/itemA/',
};
const itemB = {
  orgin:
    process.env.NODE_ENV === 'production'
      ? 'https://xxxx'
      : 'http://localhost:5001',
  pathName: '/itemB/',
};

export const menuRouter = [
  {
    path: '/',
    component: main,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: template,
        meta: {
          ...itemA,
          name: '首页',
          title: '欢迎使用',
          icon: 'fa fa-home',
          auth: true,
        },
      },
    ],
  },
  {
    path: '/data',
    component: main,
    redirect: '/data/table',
    meta: {
      name: '数据管理',
      title: '数据管理',
      icon: 'fa fa-database',
      auth: true,
    },
    children: [
      {
        path: '/data/table',
        name: 'Table',
        component: template,
        meta: {
          ...itemA,
          name: '表格管理',
          title: '表格管理',
          icon: 'fa fa-table',
          auth: true,
        },
      },
      {
        path: '/data/chart',
        name: 'Chart',
        component: template,
        meta: {
          ...itemA,
          name: '图表管理',
          title: '图表管理',
          icon: 'fa fa-bar-chart',
          auth: true,
        },
      },
      {
        path: '/data/form',
        name: 'Form',
        component: template,
        meta: {
          ...itemA,
          name: '表单管理',
          title: '表单管理',
          icon: 'fa fa-file-text-o',
          auth: true,
        },
      },
    ],
  },
  {
    path: '/account',
    component: main,
    redirect: '/account/index',
    children: [
      {
        path: '/account/index',
        name: 'Account',
        meta: {
          ...itemB,
          name: '账户管理',
          title: '账户管理',
          icon: 'fa fa-user-plus',
          auth: true,
        },
        component: template,
      },
    ],
  },
];
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: Login,
      meta: { title: '登录' },
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'LoginIndex',
          meta: { title: '登录' },
          component: () => import('@/views/login/login.vue'),
        },
        {
          path: '/login/getpassindex',
          name: 'PassWord',
          meta: { title: '找回密码' },
          component: () => import('@/views/login/password.vue'),
        },
        {
          path: '/login/resetpwd',
          name: 'ResetPwd',
          meta: { title: '重置密码' },
          component: () => import('@/views/login/resetpwd.vue'),
        },
      ],
    },
    {
      path: '/account',
      component: main,
      children: [
        {
          path: '/account/user',
          name: 'User',
          meta: {
            ...itemB,
            name: '个人中心',
            title: '个人中心',
            auth: true,
          },
          component: template,
        },
      ],
    },
    ...menuRouter,
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && Cookies.get('auth') !== 'true') {
    next({ path: '/login' });
    return;
  }
  next();
});
export default router;
