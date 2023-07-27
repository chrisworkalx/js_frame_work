<template>
  <div class="menu-box">
    <app-link to="/home">跳转到->Home</app-link>
    <app-link to="/deepComp">跳转到->deepcomp</app-link>
    <render-base-route type="base" sub-title="基础组件"></render-base-route>
    <render-base-route type="advance" sub-title="高级组件"></render-base-route>
  </div>
</template>

<script setup>
import RenderBaseRoute from './RenderBaseRoute.vue';
</script>

<style lang="scss" scoped>
.menu-box {
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  text-indent: 1em;
}
</style>
