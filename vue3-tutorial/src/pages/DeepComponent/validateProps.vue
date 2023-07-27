<template>
  <left-title title="校验props类型">
    <left-title title="propA">{{ propA }}</left-title>
    <left-title title="propB">{{ propB }}</left-title>
    <left-title title="propC">{{ propC }}</left-title>
    <left-title title="propD">{{ propD }}</left-title>
    <left-title title="propE">
      <div v-for="(v, k) in propE" :key="v">{{ k + '----->' + v }}</div>
    </left-title>
    <left-title title="propF">{{ propF }}</left-title>
    <left-title title="propG">
      <el-button @click="propG">propG</el-button>
    </left-title>
  </left-title>
</template>

<script setup>
defineProps({
  propA: Number,
  propB: [String, Number],
  propC: {
    type: String,
    required: true
  },
  propD: {
    type: [Number, String],
    default: 100
  },
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' };
    }
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value);
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      console.log('propG');
      return 'Default function';
    }
  }
});
</script>

<style lang="scss" scoped></style>
