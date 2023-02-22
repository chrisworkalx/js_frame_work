<!--
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-02-14 14:12:21
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-14 14:12:23
 * @FilePath     : \\vue-draggable\\src\\components\\rawDisplayer.vue
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 -->
<template>
  <div>
    <h3>{{ title }}</h3>
    <pre>{{ valueString }}</pre>
  </div>
</template>
<script>
const props = {
  name: 'raw-displayer',
  title: {
    required: true,
    type: String
  },
  value: {
    required: true
  }
};
export default {
  props,
  computed: {
    valueString() {
      return JSON.stringify(this.value, null, 2);
    }
  }
};
</script>
<style lang="scss" scoped>
pre {
  text-align: start;
}
</style>
