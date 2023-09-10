<template>
  <left-title title="复用属性">
    <div>{{ props.text }}</div>
    <div>
      {{ props.user.username }}
    </div>
  </left-title>
</template>

<script setup>
const props = defineProps({
  text: {
    //外层包裹组件传入
    type: String,
    default: ''
  },
  user: {
    //user 是高阶组件传入
    type: [Object, Array],
    default: () => {},
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
