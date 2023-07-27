<script setup>
import { ref } from 'vue';

const show = ref(true);
</script>

<template>
  <left-title title="自定义<red>enter-active-class</red>等默认类名">
    <button @click="show = !show">Toggle</button>
    <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__tada"
      leave-active-class="animate__animated animate__bounceOutRight"
    >
      <p v-if="show" style="width: 300px">hello</p>
    </Transition>
  </left-title>
</template>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
</style>
