<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
});

const emit = defineEmits(['update:modelValue']);

function emitValue(e) {
  let value = e.target.value;
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }
  emit('update:modelValue', value);
}

const complexValue = computed({
  get() {
    return props.modelValue.charAt(0).toUpperCase() + props.modelValue.slice(1);
  },
  set(value) {
    emitValue({ target: { value } });
  }
});
</script>

<template>
  <input type="text" v-model="complexValue" />
</template>
