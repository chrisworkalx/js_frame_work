<template>
  <div>
    <h2 style="background-color: #ccc; color: #fff">{{ title }}</h2>
    <slot />
    <!-- 传送门接受 也是一种可以解决的方法 -->
    <portal-target name="destination"></portal-target>
    <!-- 接受自定义$option获取 -->
    <slot name="slot2" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: `首先来思考一个问题：是否有一种方法可以从子组件填充父组件的插槽？最近一位同事问我这个问题，答案很简单：可以的。但我的解决方案可能和你想的完全不一样，这是涉及一个棘手的vue架构问题，但也是一个非常有趣的问题。`
    };
  },
  created() {
    console.log(this, '===slotdemo1');
  }
};
</script>

<style lang="scss" scoped></style>
