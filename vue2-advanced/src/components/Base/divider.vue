<template>
  <div
    style="margin: 20px; color: #fff; font-weight: 700; background-color: #f99"
  >
    <span>标题：</span>
    <span>
      {{ dividerTitle }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'divider',
  props: {
    title: {
      default: '-',
      type: String
    }
  },
  computed: {
    dividerTitle() {
      const repeatLen = this.title !== '-' ? 1 : 40;
      return (this.title + '：').repeat(repeatLen);
    }
  }
};
</script>

<style lang="scss" scoped></style>
