<template>
  <label class="form-item">
    <div class="form-item_label">{{ label }}</div>
    <div class="form-item_mn">
      <slot></slot>
    </div>
    <div class="form-item_error" v-if="errorMsg">{{ errorMsg }}</div>
  </label>
</template>
<script>
export default {
  name: 'xm-form-item',
  props: {
    label: String,
    prop: String
  },
  data() {
    return {
      errorMsg: ''
    };
  },
  methods: {
    showError(msg) {
      this.errorMsg = msg;
    }
  }
};
</script>
<style scoped>
.form-item_error {
  color: red;
}
</style>
