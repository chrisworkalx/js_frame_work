<template>
  <div class="menu-box">
    <router-link to="/home" active-class="active-menu"
      >跳转到->Home</router-link
    >
    <router-link
      active-class="active-menu"
      v-for="item in menus"
      :to="'/' + item.path"
      :key="item.path"
      >{{ '跳转到->' + item.path }}</router-link
    >
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();

const menus = store.state.menus;
</script>

<style lang="scss" scoped>
.menu-box {
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  .active-menu {
    color: red;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
