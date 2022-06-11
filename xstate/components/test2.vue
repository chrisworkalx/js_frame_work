<template>
  <app-two>
    <template #test1>
      <div style="margin: 30px">
        <TestOne>
          <!-- 给Testone默认插槽传递参数 -->
          <div class="test1-slot-box">{{ sendParams }}</div>
        </TestOne>
      </div>
    </template>
    <template #default="{ list }">
      <div class="test-two-box">
        <div v-for="(item, index) in list" :key="index">
          {{ item }}
        </div>
      </div>
    </template>
  </app-two>
</template>

<script>
import AppTwo from '../app2.vue';
import TestOne from './test1.vue';
export default {
  data() {
    return {
      title: 'test2',
      sendParams: 'hello, guy, this is test2.vue insert your default slot'
    };
  },
  components: {
    AppTwo,
    TestOne
  }
};
</script>

<style lang="scss" scoped>
.test-two-box {
  padding: 20px;
  background-color: aquamarine;
  color: #fff;
  font-size: 20px;
}
.test1-slot-box {
  padding: 20px;
  background-color: #f40;
  color: #fff;
  font-size: 20px;
}
</style>
