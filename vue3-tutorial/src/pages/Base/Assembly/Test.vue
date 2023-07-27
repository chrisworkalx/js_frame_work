<template>
  <h2>{{ title }}</h2>
  <slot></slot>
</template>

<script>
export default { name: 'Test' };
</script>

<script setup>
import { onMounted } from 'vue';
defineProps(['title']);
const emits = defineEmits(['updateComp']);
onMounted(() => {
  console.log('mounted');
  emits('updateComp', Math.random().toFixed(2));
});
</script>

<style lang="scss" scoped></style>
