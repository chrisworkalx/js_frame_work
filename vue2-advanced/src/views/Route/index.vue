<template>
  <div>
    <h1>关于route应用</h1>

    <el-button type="primary" @click="refresh">go(0)</el-button>
  </div>
</template>

<script>
export default {
  name: 'RouteDemo',
  methods: {
    refresh() {
      this.$router.go(0);

      console.log(111111);
    }
  }
};
</script>

<style lang="scss" scoped></style>
