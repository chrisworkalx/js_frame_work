<!--
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2022-11-11 11:20:19
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-22 18:51:53
 * @FilePath     : \\vue-draggable\\src\\App.vue
 * @Copyright (C) 2022 mingfei.yao. All rights reserved.
 -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/socket">Socket</router-link> |
      <router-link to="/form">Form</router-link> |
      <router-link to="/formTwo">formTwo</router-link> |
      <router-link to="/process">进度条</router-link> |
      <router-link to="/guide">引导页</router-link> |
      <router-link to="/drag">VueDraggable测试</router-link>|
      <router-link to="/elSelect">elSelect</router-link> |
      <router-link to="/elDrag">可拖拽的el-tree</router-link> |
      <router-link to="/testProps">testProps</router-link> |
      <router-link to="/testVueProperty">testVueProperty</router-link>
    </nav>
    <error-boundary>
      <router-view />
    </error-boundary>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
