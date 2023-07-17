<template>
  <h1>这是Computed用法</h1>
  <left-title title="基本用法">
    <span>{{ isLenMoreThanFive }}</span>
  </left-title>
  <left-title
    title="<red>computed(() => Date.now())</red>注意如果是非响应数据不会频繁触发"
  >
    <span>{{ currentTime }}</span>
    <left-title title="如果被响应式包一层可以惰性加载">{{
      refComputedCurrentTime
    }}</left-title>
  </left-title>
  <left-title title="支持getter、setter写法-ref" @test="handleChangeFullName">
    {{ fullName }}
  </left-title>
  <left-title
    title="支持getter、setter写法-reactive"
    @test="handleChangeReactiveFullName"
  >
    {{ lucyInfo }}
  </left-title>
  <left-title title="computed 高级用法">
    <template #default>
      <SearchBar v-model="searchData" />
    </template>
  </left-title>
  <left-title title="computed 高级用法二">
    <SearchBarTwo v-model="searchData" />
  </left-title>
  <left-title title="computed 高级用法三">
    <SearchBarThree v-model="searchData" />
  </left-title>
  <left-title title="computed封装hooks">
    <SearchBarFour v-model="searchData" />
  </left-title>
</template>

<script>
export default { name: 'Computed' };
</script>

<script setup>
import { ref, reactive, computed } from 'vue';
import SearchBar from './SearchBar.vue';
import SearchBarTwo from './SearchBarTwo.vue';
import SearchBarThree from './SearchBarThree.vue';
import SearchBarFour from './SearchBarFour.vue';

const list = ref([1, 2, 3]);

const isLenMoreThanFive = computed(() => list.value.length > 5);

const currentTime = computed(() => Date.now());

const refTime = ref(Date.now());

const refComputedCurrentTime = computed(() => refTime.value);

setInterval(() => {
  refTime.value = Date.now();
}, 1000);

const firstName = ref('John');
const lastName = ref('Doe');

let obj = ref({
  name: 'lucy',
  age: 18
});
let fullName = computed({
  // getter
  get() {
    return firstName.value + ' 谁 ' + lastName.value;
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ');
  }
});

const handleChangeFullName = () => {
  console.log('change computed');
  fullName.value = 'Danel Willsion';
};

let lucyInfo = computed({
  // getter
  get() {
    return obj.value.name + '🌟' + obj.value.age;
  },
  // setter
  set(newValue) {
    obj.value = {
      ...obj.value,
      ...newValue
    };
  }
});

const handleChangeReactiveFullName = () => {
  lucyInfo.value = {
    age: 20
  };
};

const searchData = ref({
  keyword: '',
  placeholder: '请输入你要查询的关键字',
  options: [
    { label: '视频', value: 'video' },
    { label: '文章', value: 'article' },
    { label: '用户', value: 'user' }
  ],
  selectedValue: 'video'
});
</script>

<style lang="scss" scoped></style>
