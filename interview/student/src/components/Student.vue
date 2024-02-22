<template>
  <h1>学生列表</h1>
  <div>
    <el-button type="primary" @click="sortByBirthDay"
      >按照生日降序排序</el-button
    >
    <el-button type="primary" @click="sortByScore">按照成绩降序排序</el-button>
  </div>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="score" label="score" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const fillZero = (n) => (n >= 10 ? n : '0' + n);
const randomDate = () => {
  const month = Math.ceil(Math.random() * 12);
  const day = Math.ceil(Math.random() * 28);
  return `2000-${fillZero(month)}-${fillZero(day)}`;
};

const randomCreateTableData = () =>
  Array(10)
    .fill('')
    .map((_index) => {
      return {
        date: randomDate(),
        name: 'Tom' + _index,
        score: Math.floor(Math.random() * 100)
      };
    });

const tableData = ref(randomCreateTableData());

const sortFun = (target, key, type = '1') => {
  target.value.sort(function (a, b) {
    let state = a[key] - b[key];
    switch (type) {
      case '1': //生序
        state = a[key] - b[key];
        break;
      case '2': //降序
        state = b[key] - a[key];
        break;
      default:
        state = a[key] - b[key];
        break;
    }
    return state;
  });
};

const sortByBirthDay = () => {
  tableData.value.forEach((item) => {
    item.compareDate = new Date(item.date).getTime();
  });
  sortFun(tableData, 'compareDate', '2');
  // tableData.value = randomCreateTableData(); //也是可以响应的
};

const sortByScore = () => {
  sortFun(tableData, 'score', '2');
};
</script>

<style lang="scss" scoped></style>
