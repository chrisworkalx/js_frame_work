<template>
  <el-input v-model="model.keyword" :placeholder="modelValue.placeholder">
    <template #prepend>
      <el-select
        v-model="model.selectedValue"
        placeholder="Select"
        style="width: 85px"
      >
        <el-option
          v-for="item in model.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </template>
    <template #append>
      <el-button :icon="Search" />
    </template>
  </el-input>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { useVModel } from './useModel.js';
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

// 定义一个 emit 事件
const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, 'modelValue', emit);
</script>

<style lang="scss" scoped></style>
