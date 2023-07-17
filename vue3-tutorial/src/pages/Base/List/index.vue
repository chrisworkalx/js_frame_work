<template>
  <h1>这是列表页面</h1>

  <left-title title="v-for='item in arr'">
    <div v-for="(item, index) in arr" :key="index">
      {{ item.name + '/' + item.value + '🌟' + index }}
      <el-checkbox v-model="item.isSelected"></el-checkbox>
      <el-button @click="deleteItem(item)">删除</el-button>
    </div>
  </left-title>
  <left-title title="v-for='item in arr' 解构赋值">
    <div v-for="({ name, value }, index) in arr">
      {{ name + '/' + value + '🌟' + index }}
    </div>
  </left-title>
  <left-title title="v-for='item of arr'">
    <div v-for="(item, index) of arr">
      {{ item.name + '/' + item.value + '🌟' + index }}
    </div>
  </left-title>
  <left-title title="v-for='item in obj' 遍历对象">
    <div v-for="(value, key, index) in obj">
      {{ key + '🌟' + value + '🐒' + index }}
    </div>
  </left-title>
  <left-title title="v-for='n in 10'">
    <div v-for="n in 10">
      {{ n }}
    </div>
  </left-title>
  <left-title title="涉及到可变数组操作，需要规定key值">
    <template #default>
      <el-button @click="addCar">添加car</el-button>

      <ul>
        <li v-for="(car, index) in cars" :key="index">
          {{ car.brand }}--{{ car.price }}
          <input type="text" :value="car.brand" />
        </li>
      </ul>
    </template>
  </left-title>
</template>

<script>
export default { name: 'List' };
</script>

<script setup>
import { ref, reactive, computed } from 'vue';

const arr = ref([
  {
    name: 'aa',
    value: 10,
    isSelected: false
  },
  {
    name: 'bb',
    value: 12,
    isSelected: true
  },
  {
    name: 'cc',
    value: 14,
    isSelected: false
  }
]);

const obj = reactive({
  name: '小明',
  age: '10',
  score: 90
});

const deleteItem = (item) => {
  arr.value = arr.value.filter((i) => i.value !== item.value);
};

const cars = ref([
  { id: '01', brand: '奔驰', price: '45W' },
  { id: '02', brand: '奥迪', price: '50W' },
  { id: '03', brand: '宝马', price: '55W' }
]);

const addCar = () => {
  cars.value.unshift({
    id: '04',
    brand: '大众',
    price: '15W'
  });
};
</script>

<style lang="scss" scoped></style>
