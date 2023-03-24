<template>
  <div>
    <h1>测试vue特性测试</h1>
    <div>
      <h2>1. v-on:[eventName]动态事件绑定测试</h2>
      <input
        :autocomplete="false"
        :aria-autocomplete="false"
        type="text"
        v-model="test"
        v-on:[eventName]="log"
        name="username"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'testVueProperty',
  data() {
    return {
      test: '',
      eventName: 'focus'
    };
  },
  methods: {
    log() {
      console.log('event is focus');
    }
  }
};
</script>
