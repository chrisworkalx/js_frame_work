<template>
  <h1>这是watch、watchEffect侦测页面</h1>
  <left-title title="基本用法">
    <el-button @click="x++">{{ x }}</el-button>
  </left-title>
  <left-title title="基本用法2">
    <el-button @click="changeXAndY">{{ x }}</el-button>
  </left-title>
  <left-title title="不能机构reactive定义的对象值去侦测">
    <el-button @click="obj.count++">{{ obj.count }}</el-button>
  </left-title>
  <left-title
    title="深层次监听reactive定义的对象，通过getter访问即() => obj.res 增加配置<red>deep: true</red>"
  >
    <el-button @click="obj.res.name++">{{ obj.res.name }}</el-button>
  </left-title>
  <left-title title="立即访问<red>immediate: true</red>">
    <el-button @click="title++">{{ title }}</el-button>
  </left-title>
  <left-title title="watch <red>Vs</red> watchEffect">
    watch 和 watchEffect
    都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：
    watch
    只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch
    会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
    watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。
  </left-title>

  <left-title title="触发时机">
    <left-title title="flush: 'post'配置可以响应并访问更新后的dom">
      <el-button @click="flushData.text++">flushData.text++</el-button>
      <br />
      <span ref="spanRef">{{ flushData }}</span>
    </left-title>
  </left-title>
  <left-title title="watchPostEffect 别名"> watchPostEffect使用 </left-title>
  <left-title title="停止侦测器">
    <el-button @click="nn++">{{ nn }}</el-button>
    <el-button @click="unwatch">停用watch</el-button>
    <el-button @click="unwatchEffect">停用watchEffect</el-button>
  </left-title>
</template>

<script>
export default {
  name: 'Watch'
};
</script>

<script setup>
import { ref, watch, reactive, watchEffect, watchPostEffect } from 'vue';

const x = ref(0);
const y = ref(0);

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});

const changeXAndY = () => {
  (x.value += 10), (y.value += 2);
};

const obj = reactive({ count: 0, res: { name: 123 } });

// 错误，因为 watch() 得到的参数是一个 number
// watch(obj.count, (count) => {
//   console.log(`count is: ${count}`);
// });

watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`);
  }
);

//深层次侦测
watch(obj, (newValue, oldValue) => {
  console.log('newValue', newValue);
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
});

//注意() => obj.res 返回的是一个引用对象，如果对其中的属性或者其他修改，没有配置deep: true是侦测不到的
watch(
  () => obj.res,
  (n) => {
    console.log('变化了');
  },
  {
    deep: true //加上deep解决
  }
);

const title = ref(0);

watch(
  title,
  (n) => {
    console.log('n', n);
  },
  { immediate: true }
);

const todoId = ref(1);
const data = ref(null);

//watch去处理
// watch(todoId, async () => {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
//   )
//   data.value = await response.json()
// }, { immediate: true })

watchEffect(async () => {
  //会自动侦测依赖
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  data.value = await response.json();
});

const spanRef = ref(null);
const flushData = reactive({
  text: 10
});

watch(
  () => flushData.text,
  () => {
    console.log('spanRef.value.innerHTML', spanRef.value.innerHTML);
  },
  {
    flush: 'post' //没有这个配置会获取之前的节点dom内容，更新之后拿不到
  }
);

watchPostEffect(() => {
  console.log('flushData.text', flushData.text);
  console.log(
    'watchPostEffect->spanRef.value.innerHTML',
    spanRef.value.innerHTML
  );
});

const nn = ref(0);

const unwatch = watch(nn, (n) => console.log(n));
const unwatchEffect = watchEffect(() => console.log(nn.value, 'changed'));
</script>

<style lang="scss" scoped></style>
