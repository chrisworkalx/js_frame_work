<template>
  <div class="bread-wrapper">
    <el-button type="primary" @click="show">点击出现弹框</el-button>
  </div>
</template>

<script>
export default {
  name: 'B-read',
  methods: {
    show() {
      this.$messageBox.show({
        title: 'App',
        content: 'This is Content for App',
        callback: () => {
          console.log('hello, 我打开了弹框');
        },
        cancelCb: () => {
          console.log('关闭弹框');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bread-wrapper {
  padding-bottom: 4px;
  border-bottom: 1px skyblue solid;
}
</style>
