<template>
  <div class="app">
    <h2 class="app-h2">{{ title }}</h2>
    <SlotDemo>
      <component :is="slotContent" />
      <template #slot2>
        <div class="slot2">{{ getSlotTwoOptions }}</div>
      </template>
    </SlotDemo>
    <SlotDemoTwo @update="(params) => (slotContent = params)" />
  </div>
</template>

<script>
import Vue from 'vue';
import SlotDemo from './components/slot-demo.vue';
import SlotDemoTwo from './components/slot-demo2.vue';
import PortalVue from 'portal-vue';

Vue.use(PortalVue);
export default {
  name: 'App',
  data() {
    return {
      title: `我们需要让SlotDemoTwo可以控制到SlotDemo里面的slot传值`,
      slotContent: '',
      getSlotTwoOptions: SlotDemoTwo.sendToSlotOne
    };
  },
  components: {
    SlotDemo,
    SlotDemoTwo
  }
};
</script>

<style lang="scss" scoped>
.app {
  padding: 20px;
  .app-h2 {
    color: #00f;
    box-shadow: 0 0 5px #000;
  }
  .slot2 {
    background-color: skyblue;
    color: #fff;
  }
}
</style>
