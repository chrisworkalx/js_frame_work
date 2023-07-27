<template>
  <h1>这是Template引用页面</h1>
  <Base />
  <List />
  <FunRef />
  <RefComp ref="childRef" />
  <left-title title="通过ref获取子组件暴露出来的属性和方法">
    <h4>父组件：{{ count }}</h4>
    <el-button type="primary" @click="addCount">count++</el-button>
  </left-title>
</template>

<script>
export default {
  name: 'Template'
};
</script>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import Base from './Base.vue';
import List from './List.vue';
import FunRef from './FunRef.vue';
import RefComp from './RefComp.vue';

const childRef = ref(null);
const count = ref('');

const addCount = ref(() => {});

console.log('childRef.value', childRef.value); //拿不到

onMounted(() => {
  console.log('childRef.value---mounted', childRef.value); //可以拿到
});

//侦测有变化去动态获取
watchEffect(() => {
  if (childRef.value) {
    count.value = childRef.value.count;
    addCount.value = childRef.value.addCount;
  }
});
</script>

<style lang="scss" scoped></style>
