<template>
  <div>
    <!-- <Base /> -->
    <!-- <TransitionBase /> -->
    <TransitionCollapse />
    <!-- <el-button type="primary" @click="open = !open">open/close</el-button> -->
    <!-- <cst-collapse-transition @afterEnter="handleAfterEnter">
      <div v-if="open">
        <h1>A</h1>
        <h1>B</h1>
        <h1>C</h1>
        <h1>D</h1>
      </div>
    </cst-collapse-transition> -->
    <!-- <my-collapse-transition @afterEnter="handleAfterEnter">
      <div v-if="open">
        <h1>A</h1>
        <h1>B</h1>
        <h1>C</h1>
        <h1>D</h1>
      </div>
    </my-collapse-transition> -->

    <TestTransition />
  </div>
</template>

<script>
import Base from './base.vue';
import TransitionBase from './transition/base';
import TransitionCollapse from './transition/transition-collapse';
import CstCollapseTransition from './transition/MyExtendCollapse.vue';
// import MyCollapseTransition from './transition/ExtendTransition.vue';
import TestTransition from './transition/TestTransition.vue';
export default {
  name: 'Transition-use',
  components: {
    Base,
    TransitionBase,
    TransitionCollapse,
    CstCollapseTransition,
    TestTransition
  },
  watch: {
    open(n) {
      console.log('n', n);
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    handleAfterEnter(el) {
      console.log(el);
      console.log('after');
    }
  }
};
</script>
