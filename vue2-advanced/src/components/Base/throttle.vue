<script>
export default {
  name: 'MyThrottle',
  // 在组件配置项中添加一个abstract的选项设置为true，就可以让组件成为一个抽象组件，抽象组件它自身不会渲染一个DOM元素，也不会出现在组件的父组件链中。
  // 在抽象组件的生命周期过程中，我们可以对包裹的子组件监听的事件进行拦截，也可以对子组件进行Dom 操作，从而可以对我们需要的功能进行封装，而不需要关心子组件的具体实现。
  abstract: true,
  props: {
    time: Number,
    events: {
      deafult: '',
      type: String
    }
  },
  created() {
    this.eventKeys = this.events.split(',');
    this.originMap = {};
    this.throttledMap = {};
  },
  methods: {
    _throttle(fn, wait = 50, ctx) {
      let lastCall = 0;
      return function (...params) {
        const now = new Date().getTime();
        if (now - lastCall < wait) return;
        lastCall = now;
        fn.apply(ctx, params);
      };
    },
    isOriginHtmlNode(vnode) {
      return !vnode.tag.includes('vue-component');
    }
  },
  // render函数直接返回slot的vnode，避免外层添加包裹元素
  render() {
    const vnode = this.$slots.default[0]; //遍历单个节点
    const getTagetEvents = this.isOriginHtmlNode(vnode)
      ? vnode.data.on
      : vnode.componentOptions.listeners;
    this.eventKeys.forEach((key) => {
      //获取当前vnode 自身的事件
      const target = this.isOriginHtmlNode(vnode)
        ? vnode.data.on[key]
        : vnode.componentOptions.listeners[key];
      if (target === this.originMap[key] && this.throttledMap[key]) {
        //如果存在则直接赋值
        getTagetEvents[key] = this.throttledMap[key];
      } else if (target) {
        // 将原本的事件处理函数替换成throttle节流后的处理函数
        this.originMap[key] = target;
        this.throttledMap[key] = this._throttle(target, this.time, vnode);
        //重写vnode 节点的绑定事件
        getTagetEvents[key] = this.throttledMap[key];
      }
    });
    return vnode;
  }
};
</script>
