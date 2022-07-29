<template>
  <div class="app">
    <h2 class="app-h2">{{ title }}</h2>
    <!-- test1插槽 -->
    <slot name="test1">
      <TestOne />
    </slot>
    <!-- 默认插槽 -->
    <slot :list="list">
      {{ defaultSlotContent }}
    </slot>
  </div>
</template>

<script>
import TestOne from './components/test1.vue';

export default {
  name: 'AppTwo',
  data() {
    return {
      title: `使用状态提升实现子组件访问父组件插槽内容`,
      defaultSlotContent: '默认插槽的内容',
      list: ['a', 'b', 'c', 'd']
    };
  },
  components: {
    TestOne
  }
};
</script>

<style lang="scss" scoped>
.app {
  padding: 20px;
}
</style>
