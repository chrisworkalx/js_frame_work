<template>
  <h1>关于Ref用法</h1>
  <left-title title="基本用法" @test="handleChangeRefCount">
    <span>{{ count }}</span>
  </left-title>
  <left-title
    title="一个包含对象类型值的 <red>ref</red>可以响应式地替换整个对象"
    @test="handleObjectRef"
  >
    <span>{{ objectRef.count }}</span>
  </left-title>
  <left-title
    title="<red>ref</red>被传递给函数，不会丢失响应性"
    @test="handleTransferFunction(obj.foo)"
  >
    <span>{{ obj.foo }}</span>
  </left-title>
  <left-title
    title="从一般对象上被<red>解构时</red>，不会丢失响应性"
    @test="handleDeconstructObj"
  >
    <span>{{ _foo }}</span>
  </left-title>

  <left-title
    title="请注意，仅当 ref 是模板渲染上下文的顶层属性时才适用自动“解包”。 例如， obj 是顶层属性，但 obj.foo 不是"
  >
    <left-title title="<red>obj.foo + 1</red>有问题">
      <span>{{ obj.foo + 1 }}</span>
    </left-title>
    <left-title title="<blue>解构_foo，执行_foo+1</blue>可以">
      <span>{{ _foo + 1 }}</span>
    </left-title>
  </left-title>
  <left-title
    @test="handleChangeWrapperRef"
    title="当一个 ref 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包，因此会表现得和一般的属性一样："
  >
    <span>{{ count1 }}</span>
    ✨
    <span>{{ state1.count }}</span>
  </left-title>
  <left-title
    @test="handleChangeStateCount"
    title="如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref："
  >
    原来的：✨<span>{{ count2 }}</span>
    <br />
    state.count 绑定: ✨<span>{{ state.count }}</span>
    <br />
    state.count赋值otherCount ✨<span>{{ otherCount }}</span>
  </left-title>

  <left-title
    title="跟响应式对象不同，当 <red>ref</red> 作为响应式数组或像 <blue>Map</blue> 这种原生集合类型的元素被访问时，不会进行解包"
  >
    <left-title title="数组" @test="handleChangeObjectiveArr">
      <div v-for="(item, index) in books" :key="index">{{ item }}</div>
    </left-title>
    <left-title title="Map" @test="handleChangeMapObjectiveArr">
      <div v-for="([k, v], index) of map" :key="index">
        {{ k }}------->{{ v }}
      </div>
    </left-title>
  </left-title>
  <left-title title="Ref获取DOM">
    <left-title
      @test="handleGetStaticRefDOM"
      title="静态设置ref,只要设置一个ref(null)值<red>（注意ref不需要动态绑定，即不需要:ref=''）</red>"
    >
      <span ref="staticRef">这是一个静态ref获取DOM对象</span>
    </left-title>
    <left-title
      @test="handleFunctionRefDOM"
      title="当ref的值是一个函数的时候, 我们必须用<red>:ref</red>, 函数只有一个参数, 那就是当前元素"
    >
      <span :ref="functionRef">函数引用设置动态ref</span>
    </left-title>
    <left-title
      @test="handleDynamicArrRefDOM"
      title="当需要对一个数组通过v-for进行动态设置ref"
    >
      <span
        style="background-color: #f80; color: #fff; padding: 4px; margin: 4px"
        v-for="(item, index) in refList"
        :ref="dynamicArrRef(index)"
        :key="index"
        >{{ item + '函数引用设置动态ref' }}</span
      >
    </left-title>
  </left-title>
</template>

<script>
export default {
  name: 'Ref'
};
</script>

<script setup>
//模版中使用 不需要.value
import { ref, reactive } from 'vue';

// 基本用法
const count = ref(0);
const handleChangeRefCount = () => {
  console.log(count.value);
  count.value++;
};

const objectRef = ref({ count: 10 });
// 这是响应式的替换
objectRef.value = { count: 11 };

const handleObjectRef = () => {
  objectRef.value.count++; //有效
  // objectRef.count++; //无效
};

const handleTransferFunction = (v) => v.value++;

const obj = {
  foo: ref(1),
  bar: ref(2)
};

// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
// handleTransferFunction(obj.foo)

// 仍然是响应式的
const { foo: _foo } = obj;
const handleDeconstructObj = () => {
  _foo.value++;
};

const count1 = ref(0);
const state1 = reactive({
  count: count1
});

const handleChangeWrapperRef = () => {
  state1.count++;
};

const count2 = ref(10);
const state = {
  count: count2
};
const otherCount = ref(2);

state.count = otherCount;
// console.log(state.count); // 2
// 原始 ref 现在已经和 state.count 失去联系
// console.log(count2.value); // 10

const handleChangeStateCount = () => {
  state.count.value += 10;
};

const books = reactive([ref('Vue 3 Guide')]);
// 这里需要 .value
// console.log(books[0].value)

const handleChangeObjectiveArr = () => {
  books.splice(1, 0, 'vue3 test reactive');
  books.push(ref('哈哈哈'));
  books[0].value = 'changeVue3 guide';
  books[2].value = 'hhhh----hhhh';
};

const map = reactive(new Map([['count', ref(0)]]));

map.set('name', '小明'); //普通值会响应吗？
// 这里需要 .value
// console.log(map.get('count').value);

const handleChangeMapObjectiveArr = () => {
  const name = '小刚' + Math.random().toFixed(2);
  map.get('count').value++; //这种支持响应的
  map.set('name', name);
  // console.log("map.get('name')", map.get('name')); // ${name}
  // console.log("map.get('name').value", map.get('name').value); //undefined
};

//=========设置ref获取DOM=============/

const staticRef = ref(null);
const handleGetStaticRefDOM = () => {
  // console.log('staticRef.value.innerHTML', staticRef.value.innerHTML);
};

//函数动态设置ref

const funRef = ref(null);
const functionRef = (el) => {
  funRef.value = el;
};

const handleFunctionRefDOM = () => {
  funRef.value.innerHTML = '我是后来通过ref动态设置节点内容';
};

//数组动态设置ref

const refList = ref([1, 2, 3]);

const recieveRefList = reactive(new Map());

const lenIndex = ref(0);

const handleDynamicArrRefDOM = () => {
  const refListLen = refList.value.length;
  const randomContent = '我是随机动态被修改的内容';
  const getRandomIndex = () => Math.floor(Math.random() * refListLen);

  function setTargetNodeInnerHTML() {
    const curIndex = getRandomIndex();
    const getTargetNodeContent = recieveRefList.get(curIndex).innerHTML;
    if (lenIndex.value >= refListLen - 1) return;
    if (getTargetNodeContent === randomContent) {
      return setTargetNodeInnerHTML();
    }
    lenIndex.value++;
    recieveRefList.get(curIndex).innerHTML = randomContent;
  }
  setTargetNodeInnerHTML();
};

const dynamicArrRef = (index) => (el) => {
  // console.log('index', index);
  // console.log('el.innerHTML', el.innerHTML);
  recieveRefList.set(index, el);
};
</script>

<style lang="scss" scoped></style>
