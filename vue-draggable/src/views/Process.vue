<!--
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-06 13:48:06
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-06 15:55:51
 * @FilePath     : \\vue-draggable\\src\\views\\Process.vue
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 -->
<template>
  <div>
    <h1>进度条展示</h1>
    <el-progress :percentage="percentage"></el-progress>
    <div class="btns-box">
      <el-button @click="changePercentage(30)" type="primary">30%</el-button>
      <el-button @click="changePercentage(60)" type="primary">60%</el-button>
      <el-button @click="changePercentage(80)" type="primary">80%</el-button>
      <el-button @click="changePercentage(100)" type="primary">100%</el-button>
      <el-button @click="reset" type="primary">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'p-rocess',
  data() {
    return {
      percentage: 0,
      timer: null
    };
  },
  mounted() {
    this.initTimer();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;
  },
  // watch: {
  //   percentage(n) {
  //     if (!this.timer && n < 100) {
  //       this.initTimer();
  //     }
  //   }
  // },
  methods: {
    initTimer(step = 0.01, total = 100, scale = 1000) {
      this.timer = setInterval(() => {
        const addPercentage = parseFloat((this.percentage + step).toFixed(2));
        const isExceed = addPercentage >= total;
        this.percentage = isExceed
          ? parseFloat(total.toFixed(2))
          : addPercentage;
        if (isExceed && this.timer) {
          clearInterval(this.timer);
          // 方案三
          if (total < 100) {
            this.initTimer();
          }
        }
      }, scale);
    },
    // eslint-disable-next-line consistent-return
    changePercentage(n) {
      if (this.timer) {
        const cachedPercentage = this.percentage; // 缓存已经加载的进度
        if (cachedPercentage >= n) {
          this.$message.warning(`进度已经加载${this.percentage}`);
          return false;
        }
        // 进度条还没有加载目标这么多
        clearInterval(this.timer);
        const interval = n - cachedPercentage;
        let step;
        switch (true) {
          case interval < 10:
            step = 0.5;
            break;
          case interval >= 10 && interval < 60:
            step = 1;
            break;
          case interval >= 60:
            step = 2;
            break;
          default:
            step = 1;
            break;
        }
        // this.timer = setInterval(() => {
        //   const addPercentage = parseFloat((this.percentage + 1).toFixed(2));
        //   // eslint-disable-next-line operator-linebreak
        //   this.percentage =
        //     addPercentage >= n ? parseFloat(n.toFixed(2)) : addPercentage;
        //   console.log('addPercentage', addPercentage);
        //   if (addPercentage >= n) {
        //     clearInterval(this.timer);
        //     // this.initTimer(); // 方案一
        //     // 方案二 通过watch
        //     this.timer = null;
        //   }
        // }, 200);

        this.initTimer(step, n, 200);
      }
    },
    reset() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.percentage = 0;
      this.initTimer();
    }
  }
};
</script>

<style lang="scss" scoped>
.btns-box {
  margin-top: 40px;
}
</style>
