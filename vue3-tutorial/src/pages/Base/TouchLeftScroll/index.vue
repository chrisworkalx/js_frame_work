<template>
  <div
    class="box"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
  >
    <div
      class="content"
      ref="contentRef"
      :class="{ 'menu-active': menuActive }"
    >
      <div class="title">
        新华社报道：江海大道，南通水产现在报价500元,啥空间的哈萨克打开后看到撒电话
      </div>
      <div class="article">
        撒u的贺卡上的卡上的健康撒都很少看见阿迪和刷卡机挥洒的健康撒谎的空间啥剧都看傻空间
      </div>
    </div>
    <div class="hide-block">
      <div class="shop-car-button" @click="handleBuyShopCar">购物车</div>
      <div class="shop-save" @click="handleShopSave">收藏</div>
    </div>
  </div>
  <!-- <slide-menu></slide-menu> -->
</template>

<script>
import slideMenu from './slideMenu.vue';
export default {
  name: 'TouchLeftScroll',
  components: {
    slideMenu
  },
  data() {
    return {
      startX: 0,
      endX: 0,
      isDragging: false,
      menuActive: false,
      cacheTouchDistance: 0
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
      this.endX = diffX;

      if (diffX < 0) {
        // 超出值会给边界限定 初始化就清除类名
        this.menuActive = false;
      }
      this.$refs.contentRef.style.transform = `translateX(-${
        this.cacheTouchDistance + diffX > 160
          ? 160
          : this.cacheTouchDistance + diffX
      }px)`;
    },
    endDrag() {
      this.cacheTouchDistance = this.endX + this.cacheTouchDistance;

      if (this.endX < 0) {
        //touchend 时候重置所有的参数
        this.endX = 0;
        this.cacheTouchDistance = 0;
        this.$refs.contentRef.style.transform = 'translateX(0px)';
      } else {
        // 超出值会给边界限定
        this.menuActive = true;
      }
      this.isDragging = false;
    },
    closeMenu() {
      if (this.menuActive) {
        this.menuActive = false;
      }
    },
    handleShopSave() {
      console.log('收藏');
    },
    handleBuyShopCar() {
      console.log('购物车');
      this.menuActive = false;
      this.$refs.contentRef.style.transform = 'translateX(0px)';
    }
  }
};
</script>

<script setup></script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  margin: 100px auto;
  position: relative;
  overflow: hidden;
  .content {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    background: #f99;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    // transform: translateX(-100px);
    transition: transform 0.3s ease;
    &.menu-active {
      transform: translateX(-50vw) !important;
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .article {
      text-indent: 1em;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
    }
  }
  .hide-block {
    width: 100%;
    height: 100%;
    display: flex;
    background: #ccc;
    position: absolute;
    padding-left: 50vw;
    box-sizing: border-box;
    left: 0;
    top: 0;
    .shop-car-button {
      flex: 3;
      background-color: #f40;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #fff;
    }
    .shop-save {
      flex: 4;
      background-color: aquamarine;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: beige;
    }
  }
}
</style>
