<template>
  <left-title title="条件渲染">
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.type }}</li>
    </ul>
  </left-title>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    default: () => []
  }
});
</script>

<style lang="scss" scoped></style>
