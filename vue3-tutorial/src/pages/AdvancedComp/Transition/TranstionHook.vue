<template>
  <left-title title="各种钩子">
    <left-title title="性能考虑<red>:css=false</red>">
      <div>添加:css="false"</div>
    </left-title>
    <el-button @click="show = !show">toggle</el-button>
    <Transition
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @enter-cancelled="onEnterCancelled"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
      @leave-cancelled="onLeaveCancelled"
    >
      <p v-show="show">Hooks</p>
    </Transition>
  </left-title>
</template>

<script setup>
const delay = (time = 2000) => new Promise((res) => setTimeout(res, time));
import { ref } from 'vue';

const show = ref(false);

// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el) {
  console.log('onBeforeEnter');
}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
async function onEnter(el, done) {
  console.log('onEnter');
  //可以处理一些事情
  await delay();
  const isredColor = window.getComputedStyle(el).color;

  //FIXME: 好像有问题
  // //注意getAttribute获取字段需要转驼峰 如backgroundColor
  // console.log(
  //   window.getComputedStyle(el, null).getAttribute('color'),
  //   '-----getAttribute'
  // );

  //注意getPropertyValue获取字段不需要转驼峰 如background-color
  console.log(
    window.getComputedStyle(el, null).getPropertyValue('color'),
    '---getComputedStyle'
  );
  console.log('isredColor', isredColor);
  el.style.cssText = 'font-size: 20px; color: red;';
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done();
}

// 当进入过渡完成时调用。
function onAfterEnter(el) {
  console.log('onAfterEnter');
}
function onEnterCancelled(el) {
  // 触发的条件是 因为快速使得元素销毁，并且进入动画还没有结束
  console.log('onEnterCancelled');
}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) {
  console.log('onBeforeLeave');
}

// 在离开过渡开始时调用
// 用这个来开始离开动画
async function onLeave(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  await delay();
  console.log('onLeave');
  done();
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) {
  console.log('onAfterLeave');
}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) {
  console.log('onLeaveCancelled');
}
</script>

<style lang="scss" scoped></style>
