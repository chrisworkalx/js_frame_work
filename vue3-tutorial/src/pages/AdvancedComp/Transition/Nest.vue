<script setup>
import { ref } from 'vue';

const show = ref(true);
const show1 = ref(true);
</script>

<template>
  <left-title title="监听深层次节点动画">
    <left-title title="duration是动画和延迟时间之和">
      <button @click="show = !show">Toggle</button>
      <Transition duration="550" name="nested">
        <div v-if="show" class="outer">
          <div class="inner">Hello</div>
        </div>
      </Transition>
    </left-title>
    <left-title
      title="动态详细设置duration, 如:<blue>duration={ enter: 600, leave: 600 }</blue>"
    >
      <button @click="show1 = !show1">Toggle</button>
      <Transition :duration="{ enter: 600, leave: 600 }" name="nested-two">
        <div v-if="show1" class="outer">
          <div class="inner">Hello</div>
        </div>
      </Transition>
    </left-title>
  </left-title>
</template>

<style scoped>
.outer,
.inner {
  background: #eee;
  padding: 30px;
  min-height: 100px;
}

.inner {
  background: #ccc;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/*
* 动画2
*/

.nested-two-enter-active,
.nested-two-leave-active {
  transition: all 0.3s ease-in-out;
}

/* delay leave of parent element */
.nested-two-leave-active {
  transition-delay: 0.3s;
}

.nested-two-enter-from,
.nested-two-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/*==========over=======*/

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner,
.nested-two-enter-active .inner,
.nested-two-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner,
.nested-two-enter-active .inner {
  transition-delay: 0.3s;
}

.nested-enter-from .inner,
.nested-leave-to .inner,
.nested-two-enter-from .inner,
.nested-two-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}
</style>
