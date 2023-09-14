<template>
  <nav class="menu">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/socket">Socket</router-link>
    <router-link to="/form">Form</router-link>
    <router-link to="/formTwo">formTwo</router-link>
    <router-link to="/process">进度条</router-link>
    <button @click="goToProcess">进度条1111</button>
    <router-link to="/guide">引导页</router-link>
    <router-link to="/drag">VueDraggable测试</router-link>
    <router-link to="/elSelect">elSelect</router-link>
    <router-link to="/elDrag">可拖拽的el-tree</router-link>
    <router-link to="/testProps">testProps</router-link>
    <router-link to="/testVueProperty">testVueProperty</router-link>
    <router-link to="/iframe">测试iframe</router-link>
    <router-link to="/watch">测试watch</router-link>
  </nav>
</template>

<script>
export default {
  name: 'M-enu',
  methods: {
    goToProcess() {
      this.$router.push('/process');
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
}
</style>
