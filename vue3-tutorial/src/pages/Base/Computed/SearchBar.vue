<template>
  <el-input
    :modelValue="modelValue.keyword"
    @update:modelValue="handleKeywordChange"
    :placeholder="modelValue.placeholder"
  >
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
import { Search } from '@element-plus/icons-vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

function handleKeywordChange(val) {
  console.log('val >>> ', val);
  // 触发子组件的 update:modelValue 事件
  emit('update:modelValue', {
    // 因为这里我们只是修改了 keyword 的值
    // 所以我们将 props.modelValue 展开之后，单独将 keyword 的值赋值为新的值
    ...props.modelValue,
    keyword: val
  });
}
</script>

<style lang="scss" scoped></style>
