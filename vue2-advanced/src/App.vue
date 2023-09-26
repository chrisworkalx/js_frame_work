<template>
  <div id="app">
    <my-menu></my-menu>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import menu from './layout/menu.vue';
export default {
  name: 'app',
  components: {
    myMenu: menu
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
