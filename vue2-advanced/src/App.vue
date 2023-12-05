<template>
  <div id="app">
    <my-menu></my-menu>
    <main>
      <easy-used-water-mark :is-show-water-mark="isShowWaterMark">
        <router-view />
      </easy-used-water-mark>
    </main>
  </div>
</template>
<script>
import menu from './layout/menu.vue';
export default {
  name: 'app',
  components: {
    myMenu: menu
  },
  computed: {
    isShowWaterMark() {
      console.log(
        'this.$route.meta.showWaterMark',
        this.$route.meta.showWaterMark
      );
      return this.$route.meta.showWaterMark || false;
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  height: 100vh;
  main {
    padding: 10px;
    flex: 1;
    overflow-x: auto;
  }
}
</style>
