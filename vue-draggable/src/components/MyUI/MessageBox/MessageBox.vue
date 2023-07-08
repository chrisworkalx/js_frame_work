<template>
  <div :class="['message-box', type]">
    <div class="inner">
      <header class="header">
        <h1 class="title">{{ title }}</h1>
        <div class="close-btn" @click="hide" @keydown="void 0">
          <span>+</span>
        </div>
      </header>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBox',
  props: {
    title: {
      type: String,
      default: 'This is Title'
    },
    content: {
      type: String,
      default: 'This is Content'
    },
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'success', 'warn', 'danger'].includes(value);
      }
    },
    cancelCb: {
      type: Function,
      default: () => {}
    }
  },
  mounted() {
    const { isCreateByExtend } = this.$messageBox.hide();
    if (!isCreateByExtend) {
      const el = this.$mount().$el;
      document.body.appendChild(el);
    }
  },
  methods: {
    hide() {
      console.log(this.$messageBox, '===this.$messageBox');
      const { isCreateByExtend, createExtendsFun } = this.$messageBox.hide();
      if (isCreateByExtend) {
        createExtendsFun(() => {
          this.cancelCb();
        });
      } else {
        const el = this.$mount().$el;
        el.remove();
      }
      // this.$messageBox.hide(() => {
      //   this.cancelCb();
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: normal;
}
.message-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .inner {
    position: absolute;
    background-color: #fff;
    left: 50%;
    top: 200px;
    width: 500px;
    margin-left: -250px;
    box-shadow: 1px 3px 5px #ededed;
    border-radius: 5px;
    overflow: hidden;
    .header {
      width: 100%;
      height: 44px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 16px;
      }
      .close-btn {
        cursor: pointer;
        font-size: 20px;
        width: 24px;
        height: 24px;
        line-height: 20px;
        text-align: center;
        // display: flex;
        // vertical-align: middle;
        // justify-content: center;
        // align-items: center;
        border-radius: 50%;
        border: solid 1px #ccc;
        box-sizing: border-box;
        transition: all ease 0.5s;
        transform: rotate(44deg);
        &:hover {
          transform: rotate(224deg);
        }
      }
    }
    .content {
      padding: 20px;
      box-sizing: border-box;
    }
  }
  &.primary {
    header {
      background-color: blue;
      color: #fff;
    }
  }
  &.success {
    header {
      background-color: green;
      color: #fff;
    }
  }
  &.danger {
    header {
      background-color: orangered;
      color: #fff;
    }
  }
  &.warn {
    header {
      background-color: orange;
      color: #fff;
    }
  }
}
</style>
