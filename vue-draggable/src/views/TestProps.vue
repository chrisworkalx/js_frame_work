<!--
 * @Description  : 父子传值
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-02-22 18:48:44
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-22 19:07:44
 * @FilePath     : \\vue-draggable\\src\\views\\TestProps.vue
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 -->
<template>
  <div>
    <TestProvider @changeProvide="changeProvide"/>
  </div>
</template>

<script>
import TestProvider from '@/components/TestProvider.vue';

export default {
  data() {
    return {
      text: 'hi 我是provider提供',
      obj: {
        text: 123
      }
    };
  },
  provide() {
    return {
      msg: this.text, // 这种非响应式的
      msg2: () => this.text, // 方法返回是响应的
      msg3: {
        text: this.text // 不可行非响应
      },
      msg4: this.obj // 这种响应的可行
    };
  },
  methods: {
    changeProvide(v) {
      this.text = v;
      this.obj.text = v;
    }
  },
  components: {
    TestProvider
  }
};
</script>

<style lang="scss" scoped></style>
