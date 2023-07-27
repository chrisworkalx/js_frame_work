<template>
  <left-title title="定义使用">
    <div v-pre>
      &lt;Transition&gt;
      是一个内置组件，这意味着它在任意别的组件中都可以被使用，无需注册。它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。进入或离开可以由以下的条件之一触发：
      由 v-if 所触发的切换 由 v-show 所触发的切换 由特殊元素&lt;component&gt;
      切换的动态组件 改变特殊的 key 属性 以下是最基本用法的示例
    </div>
  </left-title>
  <left-title title="基本用法">
    <el-button type="primary" @click="show = !show">Toggle</el-button>
    <Transition>
      <p v-if="show">hello</p>
    </Transition>
  </left-title>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>

<style lang="scss" scoped>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
