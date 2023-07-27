<!-- MyComponent.vue -->
<script setup>
defineProps(['title']);
defineEmits(['update:title']);
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
