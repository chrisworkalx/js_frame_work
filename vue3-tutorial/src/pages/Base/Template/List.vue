<template>
  <left-title title="列表获取引用ref,可以绑定一个数组">
    <ul>
      <li v-for="item in list" ref="itemRefs">
        {{ item }}
      </li>
    </ul>
  </left-title>
</template>
<script>
export default { name: 'List' };
</script>
<script setup>
import { ref, onMounted } from 'vue';

const list = ref([
  {
    title: '篮球',
    value: 1
  },
  {
    title: '足球',
    value: 2
  }
]);

const itemRefs = ref([]);

// onMounted(() => console.log(itemRefs.value));
</script>

<style lang="scss" scoped></style>
