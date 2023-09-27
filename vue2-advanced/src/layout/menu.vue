<template>
  <div class="menu-wrapper">
    <div class="menu-top">
      <span>Vue2 常规总结</span>
      <img src="../assets/logo.png" class="top-img" />
    </div>
    <nav>
      <router-link to="/jsx-slot" exact-active-class="active-link"
        >jsx插槽</router-link
      >
      <router-link to="/throttle" exact-active-class="active-link"
        >Hoc_Throttle使用</router-link
      >
      <router-link to="/dynamic-form" exact-active-class="active-link"
        >Form验证</router-link
      >
      <router-link to="/pop-over" exact-active-class="active-link"
        >弹框验证</router-link
      >
      <router-link to="/base-worker" exact-active-class="active-link"
        >worker执行</router-link
      >
      <router-link
        to="/regular-export-large-file"
        exact-active-class="active-link"
        >常规导出大文件</router-link
      >
      <router-link
        to="/worker-export-large-file"
        exact-active-class="active-link"
        >worker导出大文件</router-link
      >
      <router-link to="/transition" exact-active-class="active-link"
        >动画</router-link
      >
    </nav>
  </div>
</template>

<script>
export default {
  name: 'myMenu'
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .menu-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: orange;
    color: hsl(0, 0%, 100%);
    border: solid 1px #f80;
    box-sizing: border-box;
    padding: 6px;
    height: 60px;
    font-size: 20px;
    font-weight: 700;
    .top-img {
      width: 28px;
      height: 28px;
    }
  }
  nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 200px;
    background-color: skyblue;
    overflow-y: auto;
    padding: 10px;
    a {
      color: #000;
      font-size: 16px;
    }
    .active-link {
      background-color: #f40;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      border-radius: 10px;
      padding: 10px;
      box-shadow: 2px 4px 2px 2px rgba(0, 0, 0, 0.3);
      text-decoration: none;
    }
  }
}
</style>
