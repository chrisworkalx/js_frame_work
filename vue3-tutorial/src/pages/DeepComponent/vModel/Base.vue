<template>
  <h1>基础用法</h1>
  <div>
    <input type="text" :value="text" @input="updateValue" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('');
const updateValue = ({ target: { value } }) => (text.value = value);
</script>

<style lang="scss" scoped></style>
