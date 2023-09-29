<template>
  <div class="transition-wrapper">
    <button @click="isShow = !isShow">{{ isShow ? 'close' : 'open' }}</button>
    <easy-used-collapse-transition
      @beforeEnter="handleBeforeEnter"
      @afterEnter="handleAfterEnter"
      @beforeLeave="handleBeforeLeave"
      v-if="false"
    >
      <!-- direction="horizon"
      :duration="5000"
      :easing="cubic" -->
      <!-- direction="horizon | vertical" -->
      <div v-show="isShow" class="list">
        <div v-for="i in 8" :key="i" class="list-item">{{ i }}</div>
      </div>
    </easy-used-collapse-transition>

    <br />
    <!-- dimension="width | height" -->
    <!-- <perfect-collapse-transition dimension="width" :duration="1000">
      <div v-show="isShow" class="list">
        <div v-for="i in 8" :key="i" class="list-item">{{ i }}</div>
      </div>
    </perfect-collapse-transition> -->

    <easy-used-collapse-transition
      @beforeEnter="handleBeforeEnter"
      @afterEnter="handleAfterEnter"
      @beforeLeave="handleBeforeLeave"
      direction="horizon"
      :duration="5000"
    >
      <!-- direction="horizon"
      :duration="5000"
      :easing="cubic" -->
      <!-- direction="horizon | vertical" -->
      <div v-show="isShow" class="list">
        <div v-for="i in 8" :key="i" class="list-item">{{ i }}</div>
      </div>
    </easy-used-collapse-transition>
  </div>
</template>
<script>
export default {
  name: 'TestTransition',
  data() {
    return {
      isShow: false,
      paddingLeft: '0px',
      cubic: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)'
    };
  },
  methods: {
    handleAfterEnter(el) {
      // console.log('after-enter', el);
      this.paddingLeft = '10px';
    },

    handleBeforeLeave(el) {
      // console.log('before-leave', el);
    },
    handleBeforeEnter() {
      console.log('--传入handleBeforeEnter');
    }
  }
};
</script>

<style lang="scss">
.list {
  width: 500px;
  background-color: #f40;
  box-sizing: border-box;
  padding: 10px;
  transform: translate(calc((100vw - 500px) / 2), 40px);
  .list-item {
    margin-bottom: 10px;
    background-color: yellow;
    color: #000;
    // width: 480px;
    width: 100%;
  }
}
</style>
