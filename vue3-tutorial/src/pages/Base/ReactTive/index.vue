<template>
  <h1>vue3 响应式基础</h1>
  <div class="reactive-box">
    <left-title title="reactive用法">
      <template #default>
        <div ref="btnRef" @click="addCount">{{ state.count }}</div>
      </template>
    </left-title>
    <left-title title="深层响应性" @test="mutateDeeply">
      <template #default>
        <div>
          深层对象:
          {{ obj.nested.count }}
        </div>
        <div>
          数组:
          <span>{{ obj.arr }}</span>
        </div>
      </template>
    </left-title>

    <left-title title="侦测响应对象拷贝问题">
      <template #default>
        <div>
          <left-title title="raw === proxy">{{
            compareOne ? '是' : '否'
          }}</left-title>
          <left-title title="reactive(raw) === proxy">{{
            compareTwo ? '是' : '否'
          }}</left-title>
        </div>
        <div></div>
      </template>
    </left-title>

    <left-title title="reactive() 的局限性​">
      <left-title
        @test="handleChangeReactiveNumber"
        title="仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效。"
      >
        <div>{{ reactive_number }}</div>
      </left-title>
      <left-title
        @test="handleChangeStore"
        title="因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失"
      >
        <div>{{ store.count }}</div>
      </left-title>
      <left-title
        title="<blue>let n = store.count; n++</blue>"
        @test="handleChangeN"
      >
        <div>{{ n }}</div>
      </left-title>
      <left-title
        title="<red>let { count: deconstructCount }</red> = <random>store 会失效</random>"
        @test="handleChangeDeconstructCount"
      >
        <div>{{ deconstructCount }}</div>
      </left-title>
      <left-title
        title="<red>callSomeFunction(store3.count)</red><blue>该函数接收一个普通数字，并且将无法跟踪,store3.count</blue>的变化"
        @test="callSomeFunction(store3.count)"
      >
        <div>{{ store3.count }}</div>
      </left-title>
    </left-title>
  </div>
</template>

<script>
export default { name: 'Reactive' };
</script>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue';
const state = reactive({ count: 0 });
const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
});
const btnRef = ref(null);

const addCount = () => {
  state.count++;
  // console.log(btnRef.value.innerHTML); //注意这里dom并没有更新
  nextTick(() => {
    //可以同步最新更新
    // console.log('nextTick-btnRef.value.innerHTML', btnRef.value.innerHTML);
  });
};

const mutateDeeply = () => {
  // 以下都会按照期望工作
  obj.nested.count++;
  obj.arr.push('baz');
};

const raw = {};
const proxy = reactive(raw);

const compareOne = raw === proxy;
const compareTwo = reactive(raw) === proxy;

//局限性考量

let reactive_number = reactive(1); //warning value cannot be made reactive: 1  ===> 也就是数字不可以等常规类型赋值给reactive

const handleChangeReactiveNumber = () => {
  //点击是无效的
  reactive_number++;
};

let store = reactive({ count: 0 }); //这一层相当于失效了
store = reactive({ count: 1 });

const handleChangeStore = () => {
  store.count++;
};

let n = store.count;
n++;

const handleChangeN = () => {
  n++;
};

let store1 = reactive({ count: 100 });
let { count: deconstructCount } = store1;

const handleChangeDeconstructCount = () => {
  deconstructCount++;
};

const store3 = reactive({ count: 200 });
const callSomeFunction = (s) => {
  s++;
};

// callSomeFunction(store3.count); //无效
onMounted(() => {
  // console.log(btnRef.value);
});
</script>

<style lang="scss" scoped>
.reactive-box {
}
</style>
