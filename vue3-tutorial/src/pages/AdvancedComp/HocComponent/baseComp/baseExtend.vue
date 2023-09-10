<template>
  <left-title title="extend复用">
    <slot></slot>
    <el-button :type="type" @click="handleDangerClick">点击</el-button>
    <h1>{{ list[startIndex] }}</h1>
    <div style="border: solid red 1px; padding: 4px">
      <slot name="dynamic"></slot>
    </div>
  </left-title>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const type = ref('primary');

const startIndex = ref(0);

const list = ref(['primary', 'info', 'success', 'danger', 'warning']);

const handleDangerClick = () => {
  if (startIndex.value === list.value.length - 1) {
    startIndex.value = 0;
  } else {
    startIndex.value++;
  }
  nextTick(() => {
    type.value = list.value[startIndex.value];
  });
};
</script>

<style lang="scss" scoped></style>
