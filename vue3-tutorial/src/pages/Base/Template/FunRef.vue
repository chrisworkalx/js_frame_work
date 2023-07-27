<template>
  <left-title title="函数模板引用">
    <input :ref="iptFunRef" v-model="val" />
    <left-title title="注意1">
      除了使用字符串值作名字，ref attribute
      还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数：
    </left-title>
    <left-title title="注意2">
      注意我们这里需要使用动态的 :ref
      绑定才能够传入一个函数。当绑定的元素被卸载时，函数也会被调用一次，此时的
      el 参数会是 null。你当然也可以绑定一个组件方法而不是内联函数。
    </left-title>
  </left-title>
</template>

<script>
export default { name: 'FunRef' };
</script>

<script setup>
import { ref } from 'vue';

const val = ref('123');

const iptFunRef = (el) => {
  //初始化挂载、销毁都会触发
  //更新都会触发
  if (el) {
    console.log('el-----', el.value);
  }
};
</script>

<style lang="scss" scoped></style>
