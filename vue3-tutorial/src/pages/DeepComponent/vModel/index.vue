<template>
  <h1>关于v-model</h1>
  <left-title title="基本实现">
    <Base />
  </left-title>
  <left-title title="组件间实现">
    <left-title title="正常逻辑">
      <CustomInput
        :modelValue="searchText"
        @update:modelValue="(newValue) => (searchText = newValue)"
      />
    </left-title>
    <left-title title="简写">
      <CustomInput v-model="searchText" />
    </left-title>
  </left-title>
  <left-title title="基于computed实现v-model">
    <CustomInputTwo v-model="compValue" />
  </left-title>
  <left-title title="v-model别名、正常更新modelValue和触发update:modelValue">
    <AliaVModel v-model:title="bookTitle" />
  </left-title>
  <left-title title="支持绑定多个v-model">
    <MultiVModel v-model:first-name="first" v-model:last-name="last" />
    <div>{{ deepTitle }}</div>
  </left-title>
  <left-title title="v-model.capitalize修饰符自定义处理">
    <CstModifier v-model.capitalize="myText" />
  </left-title>
  <left-title
    title="类似v-model:title.capitalize=''带参数的别名修饰符自定义处理"
  >
    <AliaTItleCstModifier
      v-model:first-name.capitalize="first"
      v-model:last-name.uppercase="last"
    />
  </left-title>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import Base from './Base.vue';
import CustomInput from './CustomInput.vue';
import CustomInputTwo from './CustomInputTwo.vue';
import AliaVModel from './AliaVModel.vue';
import MultiVModel from './MultiVModel.vue';
import CstModifier from './CstModifier.vue';
import AliaTItleCstModifier from './AliaTItleCstModifier.vue';

const searchText = ref('hello');
const compValue = ref('world');
const bookTitle = ref('别名');
const first = ref('v-model1');
const last = ref('v-model2');

const myText = ref('good');

const deepTitle = computed(() => first.value + '🌟' + last.value);

watch(compValue, (n) => console.log(n, 'compValue----更新'));
watch(bookTitle, (n) => console.log(n, 'bookTitle----更新'));

watch(deepTitle, (n) => console.log(n, '====deepTitle===='));
</script>

<style lang="scss" scoped></style>
