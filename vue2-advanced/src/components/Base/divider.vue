<template>
  <div
    style="margin: 20px; color: #fff; font-weight: 700; background-color: #f99"
  >
    {{ dividerTitle }}
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
      const repeatLen = this.title !== '-' ? 10 : 40;
      return (this.title + '-').repeat(repeatLen);
    }
  }
};
</script>

<style lang="scss" scoped></style>
