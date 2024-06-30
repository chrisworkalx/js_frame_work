<template>
  <div
    class="container"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
  >
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
export default {
  name: 'TouchLeftScroll',
  data() {
    return {
      startX: 0,
      isDragging: false,
      menuActive: false
    };
  },
  methods: {
    startDrag(event) {
      this.startX = event.touches[0].clientX;
      this.isDragging = true;
    },
    onDrag(event) {
      if (!this.isDragging) return;

      const currentX = event.touches[0].clientX;
      const diffX = this.startX - currentX;

      if (diffX > 50) {
        // 左滑阈值
        this.menuActive = true;
        this.isDragging = false;
      } else if (diffX < -50) {
        // 右滑阈值
        this.menuActive = false;
        this.isDragging = false;
      }
    },
    endDrag() {
      this.isDragging = false;
    },
    closeMenu() {
      if (this.menuActive) {
        this.menuActive = false;
      }
    }
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
