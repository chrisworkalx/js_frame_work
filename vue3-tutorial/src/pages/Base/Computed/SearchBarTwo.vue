<template>
  <el-input v-model="keyword" :placeholder="modelValue.placeholder">
    <template #prepend>
      <el-select
        v-model="modelValue.selectedValue"
        placeholder="Select"
        style="width: 85px"
      >
        <el-option
          v-for="item in modelValue.options"
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
import { computed } from 'vue';

import { Search } from '@element-plus/icons-vue';
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

// 定义一个 emit 事件
const emit = defineEmits(['update:modelValue']);
// 写一个计算属性，同时提供 get 和 set
const keyword = computed({
  // 读取的时候直接返回读取的值
  get() {
    return props.modelValue.keyword;
  },
  // 当修改的时候我们执行 emit 的操作
  set(val) {
    console.log('val >>> ', val);
    emit('update:modelValue', {
      ...props.modelValue,
      keyword: val
    });
  }
});
</script>

<style lang="scss" scoped></style>
