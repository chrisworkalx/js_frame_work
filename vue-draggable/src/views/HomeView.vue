<!--
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-28 15:28:05
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-10 19:16:07
 * @FilePath     : \\vue-draggable\\src\\views\\HomeView.vue
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 -->
/
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="box red" ref="red"></div>
    <div class="box blue" ref="blue"></div>
    <div class="box orange" ref="orange"></div>
    <Draggable />
    <el-button type="primary" @click="fetchUrlTwo">请求111</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import guide from '@/mixin/guide';
import Draggable from '../components/Draggable.vue';

import $http from '@/http';

export default {
  name: 'HomeView',
  mixins: [guide],
  components: {
    Draggable
  },
  mounted() {
    //测试baseUrl动态配置
    this.testFetchBaseUrl();

    this.handleCollectGuides();
  },
  methods: {
    testFetchBaseUrl(path = '/aaa') {
      $http
        .get(path)
        .then((r) => void console.log(r, '-----response'))
        .catch((e) => {
          console.log('error', e);
        });
    },

    fetchUrlTwo() {
      this.testFetchBaseUrl('/bbb');
    },
    handleCollectGuides() {
      const arr = [
        {
          element: this.$refs.red,
          intro: 'red Box',
          position: 'right'
        },
        {
          element: this.$refs.blue,
          intro:
            '<img src="https://i.giphy.com/media/ujUdrdpX7Ok5W/giphy.webp" onerror="this.onerror=null;this.src=\'https://i.giphy.com/ujUdrdpX7Ok5W.gif\';" alt="">',
          position: 'left'
        },
        {
          element: this.$refs.orange,
          intro: 'orange Box',
          position: 'bottom'
        }
      ];

      this.guide(arr);
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  width: 300px;
  height: 100px;
  margin: 30px;
  &.red {
    background-color: red;
  }
  &.blue {
    background-color: blue;
  }
  &.orange {
    background-color: orange;
  }
}
</style>
