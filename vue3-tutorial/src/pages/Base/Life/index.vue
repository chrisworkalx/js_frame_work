<template>
  <h1>这是生命周期页面</h1>

  <left-title title="生命周期基本">
    <Child :text="text" @updateText="handleUpdateText" v-if="isChildDestory" />
    <left-title title="主动销毁">
      <el-button type="danger" @click="isChildDestory = false"
        >主动销毁子组件</el-button
      >
    </left-title>
  </left-title>
  <left-title title="初始化渲染">
    <div v-pre>
      parent ----> onBeforeMount <br />child ----> onBeforeMount <br />child
      ----> onMounted <br />parent ----> onMounted
    </div>
  </left-title>
  <left-title title="父组件通过props传入子组件并在更新间接触发子组件更新">
    <div v-pre>
      child ----> onBeforeUpdate <br />
      child ----> onUpdated
    </div>
  </left-title>
  <left-title title="某个子页面销毁">
    <div v-pre>
      child ----> onBeforeUnmount
      <br />child ----> onUnmounted
    </div>
  </left-title>
  <left-title title="整个父组件页面销毁">
    <div v-pre>
      parent ----> onBeforeUnmount
      <br />child ----> onBeforeUnmount <br />child ----> onUnmounted <br />
      parent ----> onUnmounted
    </div>
  </left-title>
</template>

<script>
export default { name: 'Life' };
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
  onErrorCaptured,
  getCurrentInstance
} from 'vue';
import Child from './Child.vue';

const { proxy: proxyStore } = getCurrentInstance();

console.log('proxyStore', proxyStore.$cacheGrounp);

onBeforeMount(() => {
  console.log('parent ----> onBeforeMount');
});
onMounted(() => {
  console.log('parent ----> onMounted');
});
onBeforeUpdate(() => {
  console.log('parent ----> onBeforeUpdate');
});
onUpdated(() => {
  console.log('parent ----> onUpdated');
});

onBeforeUnmount(() => {
  console.log('parent ----> onBeforeUnmount');
});

onUnmounted(() => {
  console.log('parent ----> onUnmounted');
});
onErrorCaptured(() => {
  console.log('parent ----> onErrorCaptured');
});

const text = ref('hello');

const handleUpdateText = (s) => {
  text.value = 'good' + s;
};

const isChildDestory = ref(true);
</script>

<style lang="scss" scoped></style>
