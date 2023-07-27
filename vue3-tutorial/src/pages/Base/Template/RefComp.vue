<template>
  <left-title title="组件引用ref">
    <h2>可以在这里处理一些子组件暴露出来的方法</h2>
    <h3>子组件：{{ count }}</h3>
  </left-title>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const addCount = () => count.value++;

defineExpose({
  addCount,
  count
});
</script>

<style lang="scss" scoped></style>
