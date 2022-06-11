<template>
  <div>
    <h3>{{ title }}</h3>
    <slot> test1预留的slot插槽内容 </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'test1'
    };
  }
};
</script>

<style lang="scss" scoped>
h3 {
  color: #838989;
  box-shadow: 0 0 5px #ccc;
}
</style>
