<template>
  <div>
    <a-space>
      姓名：
      <a-input v-model:value="computedInfo.name"></a-input>
    </a-space>
    <a-space>
      年龄：
      <a-input v-model:value="computedInfo.age"></a-input>
    </a-space>
  </div>
</template>

<script setup>
import { computed, unref } from 'vue';

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
});

const computedInfo = computed(() => {
  const aa = unref(props.info);
  console.log('aa', aa);
  console.log('props.info', props.info);
  return props.info;
});
</script>

<style lang="scss" scoped></style>
