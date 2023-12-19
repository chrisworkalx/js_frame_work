class Pool {
  /**
   * @des 并发池 | 最大并发量 | 请求参数之类的
   */
  config;
  paused;
  constructor(param) {
    let BaseConfig = {
      // 最大尝试次数
      MaxRetryCount: 1,
      // 分组数量
      SplitNumber: 20,
      FailTask: [],
      ConcurrentFn: () => {
        console.log('utilmonorepo默认提示:并发中');
      },
      RetryFn: (data) => {
        console.log('utilmonorepo默认提示:重试次数-', data.Retry);
      }
    };
    this.config = Object.assign({}, BaseConfig, param);
    this.execute(
      this.config.PromiseArr,
      this.config.MaxConcurrentCount,
      this.config.MaxRetryCount
    );
    this.paused = false;
    // this.paused = true;
  }
  /**
   * @des 实现任务队列的暂停恢复
   */
  async pauseIfNeeded() {
    while (this.paused) {
      // 当暂停状态为 true 时，等待恢复
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  pauseStatus(pause) {
    this.paused = pause;
  }
  /**
   * @des 执行
   * @param PromiseArr promise数组
   * @param ParamArr 参数数组
   * @param Retry 重试次数
   */
  async execute(PromiseArr, Concurrent, Retry) {
    if (!Retry && PromiseArr.length) {
      throw new Error('utilmonorepo默认提示:重试次数达到上限.停止重试');
    }
    let that = this;
    //完成的数量
    let finish = 0;
    // 并发池
    let pool = [];
    // 失败列表
    let FailPromiselList = [];
    let successPromiseList = [];
    for (let i = 0; i < PromiseArr.length; i++) {
      // 实现暂停效果
      await this.pauseIfNeeded();
      console.log('i', i);
      let task = PromiseArr[i];
      task()
        .then((data) => {
          successPromiseList.push(task);
          // 重点:这里可以emit 东西出去
          let index = pool.findIndex((t) => t === task);
          //请求结束后将该Promise任务从并发池中移除
          pool.splice(index);
        })
        .catch((err) => {
          console.log('err', err);
          FailPromiselList.push(PromiseArr[i]);
        })
        .finally(() => {
          finish++; // console.log("进度：" + i / PromiseArr.length)
          //所有请求都请求完成
          if (finish === PromiseArr.length) {
            if (FailPromiselList.length) {
              that.config.RetryFn({ Retry });
              that.execute(FailPromiselList, Concurrent, Retry - 1);
            }
            console.log(successPromiseList, '===成功的请求');
            that.emit('finish', 'utilmonorepo默认提示:并发池完成');
          }
        });
      pool.push(task);
      if (pool.length === Concurrent) {
        console.log('pool------length');
        // 用Promise.race 实现并发
        try {
          that.config.ConcurrentFn({ Pool: pool });
          //相当于优先执行这里的promise数组
          //后面执行promise.then.catch.finally
          await Promise.race(pool);
        } catch {
          console.log('utilmonorepo默认提示:报错');
        }
      }
    }
  }
  /**
   * @des 触发某一个事件
   * @param name
   * @param data 给function的值
   */
  emit = (name, data) => {
    if (this.config.eventBus) {
      if (this.config.eventBus[name]) {
        this.config.eventBus[name].forEach((element) => {
          element(data);
        });
      } else {
        throw new Error('utilmonorepo默认提示:没有这个事件');
      }
    }
  };
}
export { Pool };
