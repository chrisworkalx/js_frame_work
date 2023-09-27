import MyCollapseTransition from './ExtendTransition.vue';

export default {
  install(Vue, options) {
    Vue.component('my-collapse-transition', MyCollapseTransition);
  }
};
