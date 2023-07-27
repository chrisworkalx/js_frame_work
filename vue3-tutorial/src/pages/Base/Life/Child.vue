<template>
  <div>{{ text }}</div>
  <el-button type="primary" @click="count++">{{ count }}</el-button>
  <br />
  <br />
  <el-button type="info" @click="handleEmitText">触发事件</el-button>

  <br />
  <br />

  <el-button type="danger">销毁子组件</el-button>
</template>

<script>
export default {
  name: 'Life-Child'
};
</script>

<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured
} from 'vue';

onBeforeMount(() => {
  console.log('child ----> onBeforeMount');
});
onMounted(() => {
  console.log('child ----> onMounted');
});
onBeforeUpdate(() => {
  console.log('child ----> onBeforeUpdate');
});
onUpdated(() => {
  console.log('child ----> onUpdated');
});

onBeforeUnmount(() => {
  console.log('child ----> onBeforeUnmount');
});
onUnmounted(() => {
  console.log('child ----> onUnmounted');
});
onErrorCaptured(() => {
  console.log('child ----> onErrorCaptured');
});

defineProps({
  text: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['updateText']);

const count = ref(0);

const handleEmitText = () => emits('updateText', count.value);
</script>

<style lang="scss" scoped></style>
