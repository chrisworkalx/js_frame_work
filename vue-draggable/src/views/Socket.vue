<template>
  <div>
    <h1>留言板</h1>
    <!--  eslint-disable-next-line vuejs-accessibility/label-has-for -->
    <label for="msg">请输入信息:</label>
    <input type="text" v-model="iptMsg" name="msg" @keyup.enter="handleEnter" />
    <ul class="text-board">
      <li v-for="item in list" :key="item.id">
        {{ item.msg }}
      </li>
    </ul>
  </div>
</template>

<script>
import { socketBus, debugEvent } from '../websocket';

export default {
  name: 'S-ocket',
  data() {
    return {
      iptMsg: '',
      list: []
    };
  },
  mounted() {
    socketBus.$on(debugEvent, this.dealResult); // sockeBus绑定debugEvent事件
  },
  beforeDestroy() {
    console.log('destoryed');
    socketBus.$off(debugEvent); // sockeBus解绑debugEvent事件
  },
  watch: {
    list: {
      handler(n) {
        console.log('n', n);
      },
      deep: true
    }
  },
  methods: {
    dealResult(res) {
      console.log('res', res);
      this.list.push({
        ...res
        // msg: JSON.stringify(res.msg)
      });
    },
    handleEnter() {
      // console.log(this, '===this');
      socketBus.$socket.send(this.iptMsg);
      // console.log(e.target.value);
      // console.dir('socketBus.$options.sockets', socketBus.$options.sockets);
      // console.log('socketBus', socketBus);
    }
  }
};
</script>

<style lang="scss" scoped>
.text-board {
  list-style: none;
  li {
    background-color: #ccc;
    color: #fff;
    padding: 10px;
    margin: 10px;
  }
}
</style>
