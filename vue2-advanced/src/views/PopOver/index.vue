<template>
  <div>
    <!-- <message-box :show="isShow" type="danger"></message-box> -->
    <el-button type="primary" @click="show">出现弹框</el-button>
    <el-button type="primary" @click="handleShowToast">出现Toast</el-button>
  </div>
</template>

<script>
export default {
  name: 'PopOver',
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 2000);
  },
  methods: {
    show() {
      this.$messageBox.info({
        title: 'App',
        content: 'This is Content for App',
        callback: () => {
          console.log('hello, 我打开了弹框');
        },
        cancelCb: () => {
          console.log('关闭弹框');
        }
      });
    },
    handleShowToast() {
      this.$Alert.info({ content: '消息提示', duration: 4 });
    }
  }
};
</script>

<style lang="scss" scoped></style>
