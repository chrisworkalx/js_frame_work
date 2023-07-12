<template>
  <div class="menu-box">
    <router-link to="/">Home</router-link>
    <router-link to="/ref">Ref用法</router-link>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.menu-box {
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: skyblue;
}
</style>
