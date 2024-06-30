<template>
  <div class="container" ref="container">
    <div
      class="main-content"
      :class="{ 'menu-active': menuActive }"
      @click="closeMenu"
    >
      <p>主要内容区域</p>
    </div>
    <div class="side-menu" :class="{ 'menu-active': menuActive }">
      <p>侧边菜单内容</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useSwipe } from '@vueuse/core';

export default {
  setup() {
    const container = ref(null);
    const menuActive = ref(false);

    const { isSwiping, direction } = useSwipe(container, { threshold: 50 });

    watch(isSwiping, (swiping) => {
      if (swiping) {
        if (direction.value === 'LEFT') {
          menuActive.value = true;
        } else if (direction.value === 'RIGHT') {
          menuActive.value = false;
        }
      }
    });

    const closeMenu = () => {
      if (menuActive.value) {
        menuActive.value = false;
      }
    };

    return {
      container,
      menuActive,
      closeMenu
    };
  }
};
</script>

<style scoped>
.container {
  position: relative;
  overflow-x: hidden;
}

.main-content {
  padding: 20px;
  transition: transform 0.3s ease;
}

.side-menu {
  width: 250px;
  height: 100%;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  right: -250px;
  transition: right 0.3s ease;
}

.side-menu.menu-active {
  right: 0;
}

.main-content.menu-active {
  transform: translateX(-250px);
}
</style>
