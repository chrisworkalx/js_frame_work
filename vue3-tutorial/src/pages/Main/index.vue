<template>
  <div class="wapper">
    <Menu />
    <div class="router-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Menu from '../../Layout/Menu.vue';
</script>

<style lang="scss" scoped>
.wapper {
  width: 100vw;
  height: 100vh;
  background-color: gainsboro;
  display: flex;
  .router-box {
    flex: 1;
    overflow: auto;
    padding: 0 10px;
  }
}
</style>
