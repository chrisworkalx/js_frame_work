<template>
  <div>
    <div>
      时间戳：<el-tag>{{ dateTime }}</el-tag>
    </div>
    <div>
      斐波那契计算的金额：<el-tag>{{ total }}</el-tag>
    </div>
    <div class="flex-wrapper">
      <el-button type="primary" @click="testWorker"
        >主线程worker主动关闭</el-button
      >
      <el-button type="primary" @click="testWorker2"
        >worker子线程主动关闭</el-button
      >
      <el-button type="primary" @click="createWorker" :loading="loading"
        >原生worker</el-button
      >

      <div class="p-relative">
        <el-button type="primary" @click="notWorker(40)" :loading="loading1"
          >非worker计算
          <el-tooltip
            class="item"
            effect="dark"
            content="会阻塞页面渲染"
            placement="top-start"
          >
            <i class="el-icon-warning el-icon--right"></i> </el-tooltip
        ></el-button>
        <el-alert
          v-if="loading1"
          title="主线程会因此一直被js执行阻塞，导致时间戳停滞"
          type="warning"
          class="alert-box"
        >
        </el-alert>
      </div>
    </div>
  </div>
</template>

<script>
import TestWorker from './base.worker';
import TestWorkerTwo from './base2.worker';
export default {
  name: 'BaseWorker',
  data() {
    return {
      worker: new TestWorker(),
      worker2: new TestWorkerTwo(),
      dateTime: Date.now(),
      total: 0,
      loading: false,
      loading1: false,
      collection: []
    };
  },
  created() {
    this.startTime();
  },
  methods: {
    caculateFibo(n) {
      return n < 2 ? n : this.caculateFibo(n - 2) + this.caculateFibo(n - 1);
    },
    fibo(n) {
      //FIXME:使用递归验证比较缓慢的情况
      // console.log('n', n);
      if (n < 2) {
        this.collection.push(Promise.resolve(n));
      } else {
        this.fibo(n - 2) + this.fibo(n - 1);
      }
    },
    startTime() {
      this.dateTime = Date.now();
      requestAnimationFrame(this.startTime);
    },
    testWorker() {
      console.log('this.worker', this.worker);
      this.worker.addEventListener('message', (e) => {
        console.log(e.data);
        //打印结果如下
        // Loop run
        // Greeting from Worker
        // Promise run
        // setTimeout run
        this.worker.terminate(); // 主线程主动关闭 关闭 worker
      });
      this.worker.postMessage('Greeting from Main.js');
    },
    testWorker2() {
      this.worker2.addEventListener('message', (e) => {
        console.log(e.data);
        //打印结果如下
      });
      this.worker2.postMessage('Greeting from Main.js');
    },
    createWorker() {
      this.loading = true;
      const worker = new Worker('/originWorker.js', { type: 'module' });

      worker.addEventListener('message', (e) => {
        this.loading = false;
        this.total = e.data.fiboTotal;
      });

      worker.postMessage({ count: 40 });
    },
    async notWorker(n) {
      // this.collection = [];
      this.loading1 = true;
      // this.fibo(n);
      // const getAllCalculateLines = await Promise.all(this.collection);
      // console.log('getAllCalculateLines', getAllCalculateLines);
      // this.total = getAllCalculateLines.reduce((pre, cur) => pre + cur, 0);
      // console.log('------', this.total);
      // this.$nextTick(() => {
      //   this.loading1 = false;
      // });
      setTimeout(() => {
        this.total = this.caculateFibo(n);
        this.loading1 = false;
      }, 50);
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-wrapper {
  display: flex;
  gap: 10px;
  .p-relative {
    position: relative;
    .alert-box {
      position: absolute;
      top: 44px;
      left: 0;
    }
  }
}
</style>
./base2.worker
