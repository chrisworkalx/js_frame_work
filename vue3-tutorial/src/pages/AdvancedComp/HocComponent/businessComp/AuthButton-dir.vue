<template>
  <left-title title="指令版">
    <div v-permission="permission">
      <el-button type="primary">
        {{ title }}
      </el-button>
    </div>
  </left-title>
</template>

<script setup>
defineProps({
  permission: {
    type: String,
    default: 'NO_PERMISSION'
  },
  title: {
    default: '',
    type: String
  }
});
</script>

<style lang="scss" scoped></style>
