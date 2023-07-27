<template>
  <h2 style="color: blue">{{ title }}</h2>
  <slot></slot>
</template>

<script>
import { onMounted, onUnmounted, watchEffect, ref } from 'vue';
export default {
  name: 'setUpFun',
  props: ['title'],
  emits: ['updateComp'],
  setup(props, ctx) {
    onMounted(() => {
      // ctx.emit('updateComp', props.title + '✨' + Math.random().toFixed(4));
    });

    const timer = ref(null);

    const n = ref(0);

    timer.value = setInterval(() => {
      if (n.value >= 10) {
        clearInterval(timer.value);
        timer.value = null;
      }
      n.value++;

      ctx.emit(
        'updateComp',
        ['✨', '组件'].some((v) => props.title.includes(v))
          ? props.title.replace(/(\d|\.)+/g, Math.random().toFixed(4))
          : props.title + '✨' + Math.random().toFixed(4)
      );
    }, 1000);

    watchEffect(() => {});

    onUnmounted(() => {
      clearInterval(timer.value);
      timer.value = null;
    });
  }
};
</script>

<style lang="scss" scoped></style>
