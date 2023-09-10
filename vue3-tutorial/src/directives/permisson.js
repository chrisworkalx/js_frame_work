import Store from '../store';

export default {
  created() {
    // console.log('created');
  },
  beforeMount(el, bindings) {
    // console.log('beforeMount', el);
  },
  mounted(el, bindings) {
    const value = bindings.value;
    const permissions = Store.getters.permissions;
    // console.log('mounted', el, bindings);
    if (!permissions.includes(value)) {
      el.parentNode.remove();
    }
  },
  beforeUpdated() {
    // console.log('beforeUpdated');
  },
  updated() {
    // console.log('updated');
  },
  beforeUnmount() {
    // console.log('beforeUnmount');
  },
  unmounted() {
    // console.log('unmounted');
  }
};
