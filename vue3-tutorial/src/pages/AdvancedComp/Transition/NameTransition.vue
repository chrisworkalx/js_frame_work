<template>
  <left-title title="具名用法">
    <el-button type="primary" @click="show = !show">Toggle</el-button>
    <Transition name="fade">
      <p v-if="show">hello</p>
    </Transition>
  </left-title>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>

<style lang="scss" scoped>
/* 下面我们会解释这些 class 是做什么的 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
