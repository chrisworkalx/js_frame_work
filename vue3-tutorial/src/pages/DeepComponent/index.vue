<template>
  <h1>深入组件</h1>
  <left-title title="关于<red>props</red>定义">
    <validate-prop
      :propA="10"
      propB="我是传入的propB"
      propC="我是传入的propC"
      propD="其实我可以不用传，因为有默认值"
      :propE="{ name: '我也可以不应传的--->Andy' }"
      propF="danger"
      :propG="() => console.log('自定义propG')"
    ></validate-prop>
  </left-title>
  <left-title title="接受事件的类型定义">
    <Event @submit="handleSubmit" />
  </left-title>
  <left-title title="v-model">
    <VModel />
  </left-title>
</template>

<script>
export default { name: 'Deep-Component' };
</script>

<script setup>
import ValidateProp from './validateProps.vue';
import Event from './Event.vue';
import VModel from './vModel/index.vue';

function handleSubmit({ email, password }) {
  console.log('email', email);
  console.log('password', password);
}
</script>

<style lang="scss" scoped></style>
