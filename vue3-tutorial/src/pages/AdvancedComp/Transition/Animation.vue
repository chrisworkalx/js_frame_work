<template>
  <left-title title="animation组合使用">
    <el-button @click="show = !show">toggle</el-button>
    <Transition name="bounce">
      <p v-if="show" style="text-align: center">
        Hello here is some bouncy text!
      </p>
    </Transition>
  </left-title>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(true);
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
