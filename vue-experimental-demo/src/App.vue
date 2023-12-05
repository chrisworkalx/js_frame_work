<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import AGridTable from './pages/ag-grid-table.vue';
import AGridTableTwo from './pages/a-grid-table-two.vue';
import ChildVue from './pages/child.vue';

import { ref } from 'vue';

import { cloneDeep } from 'lodash-es';

const originInfo = { name: '小明', age: 18 };

const info = ref(cloneDeep(originInfo));

const reset = () => {
  info.value = cloneDeep(originInfo);
};
</script>

<template>
  <div class="app">
    <!-- <AGridTable /> -->
    <!-- <AGridTableTwo /> -->
    <ChildVue :info="info" />
    <div>
      <a-button type="primary" @click="reset">重置</a-button>
    </div>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
