<template>
  <div class="fixedLayout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      isFixedLayout: false,
    };
  },
  watch: {
    $route() {
      console.log('route--changed');
    },
  },
  beforeRouteLeave() {
    console.log('离开路由');
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log('route-updated');
    next();
  },
  methods: {
    receiveMsg({ data }) {
      if (data.source !== 'main') {
        return;
      }
      const { name } = data;
      this.$router.push({ name }, () => {
        top.postMessage(
          {
            source: 'content',
            action: 'methodRun',
            funName: 'replaceState',
          },
          this.topOrgin,
        );
      });
    },
  },
  mounted() {
    window.addEventListener('message', this.receiveMsg);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.receiveMsg);
  },
};
</script>

<style lang="less" scoped>
.fixedLayout {
  box-sizing: border-box;
  padding-left: 230px;
  padding-top: 130px;
  width: 100vw;
  height: 100vh;
}
</style>
