const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require('tapable');

/**
 *      SyncHook,                出没出错都往下走
        SyncBailHook,            有返回值(非undefined)就会退出,无返回值继续
        SyncWaterfallHook,         瀑布流钩子,可以注册很多钩子,上一个钩子结果会给下一个       
        SyncLoopHook,            同步,遇到某个不返回undefined的监听函数,就重复执行
        AsyncParallelHook,        并行执行
        AsyncParallelBailHook,    并行中有返回值就会终止
        AsyncSeriesHook,        会等待上一个钩子执行完后才执行,异步串行
        AsyncSeriesBailHook,
        AsyncSeriesWaterfallHook
 */
/**
 * 
 * 
 * (1)生成钩子:
        const {指定Hook}=require('tapable');   webpack5不需下载,webpack4可能需要下载
        new 指定Hook([’参数‘,...])   参数个数即为触发时可传入的个数


        tap:可以绑定到同步和异步上,无约束向下执行
            指定Hook实例.tap('绑定事件名',(形参,形参个数和定义钩子时的参数个数相同)=>{
                如果SyncWaterfallHook是这样的需要传递结果的钩子
                return 数据;    绑定的下一个tap的回调函数第一个参数即为传递结果
            })

          tapAsync:只能绑定异步,调用了callback才会向下执行
          指定Hook实例.tap('绑定事件名',(形参,形参个数和定义钩子时的参数个数相同,callback)=>{
              ...
              callback();
              如果AsyncSeriesWaterfallHook是这样的需要传递结果的钩子
                  callback(null,数据);    绑定的下一个tapAsync的回调函数第一个参数即为传递结果
                      第一个参数为错误信息
          })

          tapPromise:只能绑定异步,return一个Promise并且调用了resolve/reject方法才会向下执行
            指定Hook实例.tap('绑定事件名',(形参,形参个数和定义钩子时的参数个数相同)=>{
                return new Promise((resovle,reject)=>{
                    ...
                })
            })


            (3)触发钩子(会触发绑定到钩子上的所有事件):
              call:触发同步钩子
                  指定Hook实例.call('参数1','可传参数个数和定义钩子时的参数个数相同')
              callAsync:触发异步钩子
                  指定Hook实例.callAsync('参数1','可传参数个数和定义钩子时的参数个数相同',(err)=>{
                      等到该钩子所有事件触发完毕才会执行
                  })
              promise:触发异步钩子
                  指定Hook实例.promise('参数1','可传参数个数和定义钩子时的参数个数相同').then((res)=>{
                      等到该钩子所有事件触发完毕才会执行,只能拿到第一个Promise的resolve结果,
                      并行无法获取
                  }).catch((e)=>{
                      等到该钩子所有事件触发完毕才会执行,只能拿到第一个Promise的reject结果
                  })



                  (4)钩子拦截器(所有钩子都提供额外的拦截器API)
                  指定Hook实例.intercept({
                    call: (source, target, routesList) => {
                          console.log("call",source,target,routesList);
                    },
                    tap: (tap) => {    tap = { type: "钩子类型,如sync", name: "注册钩子的名称", fn: 函数体 }
                          console.log('tap', tap);
                    },  
                    register: (tapInfo) => { tapInfo = { type: "钩子类型,如sync", name: "注册钩子的名称", fn: 函数体 }
                          console.log('tapInfo',tapInfo);
                          return tapInfo; // may return a new tapInfo object
                    }
                  })
                  call:(...args) => void当你的钩子触发之前,(就是call()之前),就会触发这个函数,你可以访问钩子的参数.多个钩子执行一次
                  tap: (tap: Tap) => void 每个钩子执行之前(多个钩子执行多个),就会触发这个函数
                  loop:(...args) => void 这个会为你的每一个循环钩子(LoopHook, 就是类型到Loop的)触发,具体什么时候没说
                  register:(tap: Tap) => Tap | undefined 每添加一个Tap都会触发 你interceptor上的register,你下一个拦截器的register 函数得到的参数 取决于你上一个register返回的值,所以你最好返回一个 tap 钩子.


                   (5)指定上下文context
         当指定上下文后相当于拥有一个可传递数据的全局唯一变量,即钩子和拦截器共享该上下文(一方修改另一方也修改)
         钩子:
             指定Hook实例.tap({context:true,name:'钩子注册名称'},(context,其他参数)=>{
                 共享context
             })
         拦截器:
             hook.intercept({
                 context:true,
                 tap:(context,tap)=>{
                     context.name='jack'    可以修改context
                 },
                  call: ( context,source, target, routesList,) => {
                      ...
                  },    
                  loop:(context)=>{...}
             })


             compiler
    官网的compiler钩子,从上到下依次执行
        run            AsyncSeriesHook在开始读取records之前调用。回调参数：compiler
        thisCompilation    SyncHook,初始化compilation时调用,在触发compilation事件之前调用。回调参数：compilation, compilationParams
        emit        AsyncSeriesHook,输出asset到output目录之前执行。回调参数：compilation
        afterEmit     AsyncSeriesHook,输出asset到output目录之后执行。回调参数：compilation
        done        AsyncSeriesHook,在compilation完成时执行。回调参数：compilation
 */
class P {
  constructor() {
    this.hooks = {
      // h1: new SyncHook(['jeff']), //[]内的参数个数将和事件中回调函数的有效参数个数对应(即定义了才会有)
      // h1: new SyncBailHook(['jeff']), //定义的时候传递参数只有一个，那么接收的时候也只会获取一个
      h1: new SyncBailHook(['jeff', 'a', 'b']), //接收三个参数

      h2: new AsyncParallelHook(['jefffff', 'jackkk'])
    };
  }
  tap() {
    //给钩子绑定事件,同步钩子只能tap绑定
    this.hooks.h1.tap('h1', (source, target, routesList) => {
      //只会触发一个参数接收 即source
      console.log('h1', source);
      console.log(target);
      console.log(routesList);
      // return 'gg';
      return undefined;
    });
    this.hooks.h1.tap('h11', (source, target, routesList) => {
      console.log('h11', source);
      console.log(target);
      console.log(routesList);
    });
    //异步钩子可以tap、tapAsync、tapPromise绑定
    //tapAsync在定义时钩子的参数数量上再增加一个为callback,如:定义时3个参数,则第4个为callback
    this.hooks.h2.tapAsync('h2', (source, target, callback) => {
      setTimeout(() => {
        console.log(source, target);
        callback();
      }, 1000);
    });
    this.hooks.h2.tapAsync('h222', (source, target, callback) => {
      setTimeout(() => {
        console.log(source, target, 'h2 wait');
        callback();
      }, 3000);
    });
    this.hooks.h2.tapPromise('h22222', (source, target) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(source, target, 'h2 promise');
          resolve('hhs');
        }, 4000);
      });
    });
    // this.hooks.h2.tapPromise('h222223', (source, target) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       console.log(source, target, 'h233 promise');
    //       resolve('hhww');
    //     }, 5000);
    //   });
    // });
  }
  start() {
    //触发钩子(会触发钩子的所有事件)
    this.hooks.h1.call('h1111111', 'hhhh', 'yyyy');
    // this.hooks.h2.callAsync('jefff', 'qqq', (err) => {
    //   //该钩子所有事件触发完了再触发
    //   console.log('结束');
    // });
    this.hooks.h2
      .promise('jefff', 'qqq')
      .then((res) => {
        console.log(res, 'wdddd');
      })
      .catch((e) => {
        console.log(e, 'wwwww');
      });
  }
}
const p = new P();
p.tap();
p.start();
