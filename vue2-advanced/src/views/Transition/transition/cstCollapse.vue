<template>
  <div>
    <h1 class="font-semibold text-4xl text-purple-700">测试tailwind</h1>
    <el-button type="primary" @click="isShow = !isShow">{{
      isShow ? '关闭' : '展开'
    }}</el-button>
    <transition
      @beforeEnter="$collapse.beforeEnter"
      @enter="$collapse.enter"
      @afterEnter="$collapse.afterEnter"
      @beforeLeave="$collapse.beforeLeave"
      @leave="$collapse.leave"
      @afterLeave="$collapse.afterEnter"
    >
      <ul v-show="isShow" class="bg-grey">
        <li>Example!</li>
        <li>Example!</li>
        <li>Example!</li>
        <li>Example!</li>
        <li>Example!</li>
        <li>Example!</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  }
};
</script>

<style lang="scss" scoped></style>
