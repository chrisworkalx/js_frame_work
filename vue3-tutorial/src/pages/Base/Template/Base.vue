<template>
  <left-title title="基本用法">
    <input ref="iptRef" />
  </left-title>
</template>

<script>
export default { name: 'Base' };
</script>

<script setup>
import { ref, onMounted } from 'vue';

const iptRef = ref(null);
onMounted(() => {
  iptRef.value.focus();
});
</script>

<style lang="scss" scoped></style>
