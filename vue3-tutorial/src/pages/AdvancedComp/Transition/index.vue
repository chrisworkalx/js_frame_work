<template>
  <h1>这是关于transition、transitionGroup内置组件</h1>
  <basic></basic>
  <name-transition></name-transition>
  <transtion-demo-one></transtion-demo-one>
  <Animation />
  <CustomDefineClass />
  <Nest />
  <TranstionHook />
  <VIFTranstion />
</template>

<script>
export default { name: 'Transition' };
</script>

<script setup>
import Basic from './Base.vue';
import NameTransition from './NameTransition.vue';
import TranstionDemoOne from './TranstionDemoOne.vue';
import Animation from './Animation.vue';
import CustomDefineClass from './CustomDefineClass.vue';
import Nest from './Nest.vue';
import TranstionHook from './TranstionHook.vue';
import VIFTranstion from './VIFTranstion.vue';
</script>

<style lang="scss" scoped></style>
