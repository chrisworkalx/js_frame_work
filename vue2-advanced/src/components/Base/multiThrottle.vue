<script>
export default {
  name: 'MultiThrottle',
  props: {
    // eventKeys = 'click,blur'
    // eventKeys = {
    //   click: {
    //     time: 2000,
    //     ...args
    //   },
    //   blur: {
    //     time: 5000,
    //     ...args
    //   }
    // }
    events: {
      type: [Object, String],
      default: ''
    },
    time: Number
  },
  created() {
    this.throttledEventsMap = {};
  },
  computed: {
    _eventKeys() {
      let eventKeyNames = '';
      if (typeof this.events === 'string') {
        eventKeyNames = this.events;
      } else {
        eventKeyNames = Object.keys(this.events).join(',');
      }
      // console.log('eventKeyNames', eventKeyNames);
      return eventKeyNames.split(',');
    }
  },
  mounted() {
    console.log('this.throttledEventsMap', this.throttledEventsMap);
  },
  methods: {
    isOriginHtmlNode(vnode) {
      return !vnode?.tag?.includes('vue-component');
    },
    getRestTime(key, time) {
      if (typeof this.events === 'object') {
        return this.events[key] || {};
      }
      return {
        time
      };
    },
    _throttle(fn, wait = 50, ctx, key) {
      const self = this;
      let lastCall = 0;
      return function (...params) {
        const now = new Date().getTime();
        if (now - lastCall < self.getRestTime(key, wait).time) return;
        lastCall = now;
        fn.apply(ctx, params);
      };
    }
  },
  // render函数直接返回slot的vnode，避免外层添加包裹元素
  render() {
    const vnode = this.$slots.default; //遍历所有子节点
    // console.log('vnode', vnode);
    this._eventKeys?.forEach((key) => {
      //获取当前vnode 自身的事件
      if (vnode && vnode.length) {
        //如果节点存在
        vnode.forEach((n) => {
          // console.log('n', n);
          const getTagetEvents = this.isOriginHtmlNode(n)
            ? n.data.on
            : n.componentOptions.listeners;
          const target = this.isOriginHtmlNode(n)
            ? n.data.on[key]
            : n.componentOptions.listeners[key];
          if (this.throttledEventsMap[key]) {
            // 默认存储一个表类型
            // this.throttledEventsMap = {
            //   originEvent: target,
            //   transEvent: fn,
            // }
            const getTransEventObj = this.throttledEventsMap[key].find(
              (fn) => fn.originEvent === target
            );
            if (getTransEventObj) {
              getTagetEvents[key] = getTransEventObj.transEvent;
            } else if (target) {
              this.throttledEventsMap[key].push({
                key,
                originEvent: target,
                transEvent: this._throttle(target, this.time, n, key)
              });
              getTagetEvents[key] = this.throttledEventsMap[key].find(
                (item) => item.originEvent === target
              ).transEvent;
            }
          } else if (target) {
            this.throttledEventsMap[key] = [
              {
                key,
                originEvent: target,
                transEvent: this._throttle(target, this.time, n, key)
              }
            ];
            getTagetEvents[key] = this.throttledEventsMap[key].find(
              (item) => item.originEvent === target
            ).transEvent;
          }
        });
      }
    });
    return <div>{vnode}</div>;
  }
};
</script>
