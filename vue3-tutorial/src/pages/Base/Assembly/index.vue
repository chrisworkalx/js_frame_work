<template>
  <h1>组件使用</h1>

  <component
    v-for="item in components"
    :is="item.name"
    :key="item.value"
    :title="item.title"
    @updateComp="(v) => handleUpdateComp(v, item)"
  >
    <template #default>
      <span>{{ item.children }}</span>
    </template>
  </component>
</template>

<script>
import Test from './Test.vue';
import SetUpFun from './setUpFun.vue';

export default {
  name: 'Assembly',
  components: { test: Test, setupFun: SetUpFun }
};
</script>

<script setup>
import { ref } from 'vue';

const handleUpdateComp = (v, item) => {
  item.title = v;
};

const components = ref([
  {
    name: 'leftTitle',
    value: 1,
    title: '组件1',
    children: '字符串001'
  },
  {
    name: 'test',
    value: 2,
    title: '组件2',
    children: '字符串002'
  },
  {
    name: 'setupFun',
    value: 3,
    title: '组件3',
    children: '字符串003'
  }
]);
</script>

<style lang="scss" scoped></style>
