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
    <Menu />
    <error-boundary>
      <div class="main">
        <bread-cumb></bread-cumb>
        <router-view />
      </div>
    </error-boundary>
  </div>
</template>
<script>
import BreadCumb from './Layout/BreadCumb.vue';
import Menu from './Layout/Menu.vue';

export default {
  name: 'App',
  components: {
    BreadCumb,
    Menu
  }
};
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  .main {
    flex: 1;
    padding: 0 10px;
  }
}

nav {
  padding: 30px;
  width: 200px;
  background-color: grayscale($color: #ccc);
  border-radius: 4px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
