<template>
  <div class="wapper">
    <Menu v-if="isShowMenu" />
    <div class="router-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import Menu from '../../Layout/Menu.vue';

const isShowMenu = ref(true);
const route = useRoute();
watch(
  () => route.path,
  (newVal) => {
    const _isShow = newVal && newVal.includes('touchleftscroll');
    console.log('_isShow', _isShow);
    isShowMenu.value = !_isShow;
  }
);
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
