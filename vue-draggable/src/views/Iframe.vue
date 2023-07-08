<template>
  <iframe
    width="100%"
    height="100%"
    :src="currentUrl"
    title="测试iframe"
    frameborder="0"
    seamless
  ></iframe>
</template>

<script>
import { getUrlParam } from '../utils';

export default {
  name: 'I-frame',
  data() {
    return {
      currentUrl: 'http://localhost:5173/'
    };
  },
  methods: {},
  mounted() {
    const listenMessage = (e) => {
      console.log('hello-开启监听');
      const { data, type } = e.data || {};
      const { location } = window;
      if (type === 'afterHistoryChange' && data?.url) {
        // 这里先采用一个兜底的URL承接任意地址
        const entry = `/iframe?entry=${encodeURIComponent(data.url)}`;
        this.currentUrl = data.url;
        // 地址不一样才需要更新
        if (location.pathname + location.search !== entry) {
          window.history.replaceState(null, '', entry);
        }
      }
    };
    this.$once('hook:beforeDestroy', () => {
      console.log('销毁事件');
      window.removeEventListener('message', listenMessage, false);
    });
    window.addEventListener('message', listenMessage, false);
  },
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped></style>
