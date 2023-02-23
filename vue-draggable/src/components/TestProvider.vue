<!--
 * @Description  : 测试provider inject父子组件传值
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-02-22 18:46:10
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-22 19:06:41
 * @FilePath     : \\vue-draggable\\src\\components\\TestProvider.vue
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 -->
<template>
  <div>
    <h1>test Provider</h1>
    <h1>msg: {{ msg }}</h1>
    <h1>msg2: {{ msg2() }}</h1>
    <h1>msg3: {{ msg3 }}</h1>
    <h1>msg3: {{ msg4 }}</h1>
    <el-button type="primary" @click="changeValue">改变父组件</el-button>
  </div>
</template>

<script>
export default {
  name: 'T-estProvider',
  inject: {
    msg: {
      type: String,
      default: ''
    },
    msg2: {
      type: Function,
      default: () => ''
    },
    msg3: {
      type: Object,
      default: () => {}
    },
    msg4: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    changeValue() {
      this.$emit('changeProvide', '哈哈，我是子组件');
    }
  }
};
</script>

<style lang="scss" scoped></style>
