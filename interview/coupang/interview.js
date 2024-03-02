// // // /**
// // //  *
// // //  Input:
// // //  const obj = {
// // //     selector: {
// // //       to: {
// // //         val: 'val to select'
// // //       }
// // //     }
// // //   };

// // //   // Usage
// // //   get(obj, 'selector.to.val'); // 'val to select'
// // //  */

// // // const obj = {
// // //   selector: {
// // //     to: {
// // //       val: 'val to select'
// // //     }
// // //   }
// // // };

// // // function getTargetValue(obj, key) {
// // //   if (!key) {
// // //     throw new Error('must not empty');
// // //   }
// // //   const keys = key.split('.');

// // //   return keys.reduce((prev, nextKey) => {
// // //     return prev[nextKey];
// // //   }, obj);
// // // }

// // // const value = getTargetValue(obj, 'selector.to.val');
// // // const value1 = getTargetValue(obj, 'selector.to');
// // // const value2 = getTargetValue(obj, 'selector');

// // // console.log('value---------->>>', value);
// // // console.log('value1---------->>>', value1);
// // // console.log('value2---------->>>', value2);

// // console.log('stack [1]');
// // setTimeout(() => console.log('macro [2]'), 0);
// // setTimeout(() => console.log('macro [3]'), 1000);
// // setTimeout(() => console.log('macro [9999]'), 0);

// // const p = Promise.resolve();
// // for (let i = 0; i < 3; i++) {
// //   p.then(() => {
// //     setTimeout(() => {
// //       console.log('stack [4]');
// //       setTimeout(() => console.log('macro [5]'), 0);
// //       p.then(() => console.log('micro [6]'));
// //     }, 0);
// //     console.log('stack [7]');
// //   });
// // }

// // console.log('stack [8]');

// // /**
// //  * stack [1]
// //  * stack [8]
// //  * stack [7]
// //  * macro [2]
// //  * macro [3]
// //  * stack [4]
// //  * micro [6]
// //  * macro [5]
// //  */

// // display: none
// // visibility: hidden

// // var bstyle = document.body.style; // cache

// // bstyle.padding = "20px";
// // bstyle.border = "10px solid red";

// // bstyle.color = "blue";
// // bstyle.backgroundColor = "#fad";

// // bstyle.fontSize = "2em";

// // document.body.appendChild(document.createTextNode('dude!'));

// // useMemo ===== [a,b]
// //  useCallback ==== [a, b]
// //  memo(comp, nextProps)

// function reducer(state, action) {
//   if (action.type === 'increment') {
//     return {
//       ...state,
//       count: state.count + 1
//     };
//   }
//   if (action.type === 'change_text') {
//     return {
//       ...state,
//       text: action.payload
//     };
//   }
//   throw Error('Unknown action.');
// }

// const App = () => {

//   const [state, dispatch] = useReducer(reducer, initialState);

//   const count  = useMemo(() => {
//     return state.count
//   }, [state.count]);

//   const text  = useMemo(() => {
//     return state.text
//   }, [state.text]);

//   css 、 js、图片 =====压缩

//   拆包 splitchunks   分包 减少主包

//   懒加载、 路由懒加载  图片懒加载 异步组件

//   happy-pack thread-loader

//   缓存 微软 DllPlugin

//   resolve module ==== extion 目录

//   node  cache  npm install

//   运行时   prefetch preload   defer async

//   body ---- script -----> env.deveopment ENV_ -----------CardForm ----------

//   return (
//     <div>
//       <header>
//         <Counter count={count} dispatch={dispatch} />
//         <TextBox text={text} dispatch={dispatch} />
//       </header>
//     </div>
//   )
// }

// const Counter = ({ count, dispatch }) => {

//   const increment = () => {
//     dispatch({type: 'increment'});
//   }

//   return (
//     <div>
//       {count}
//       =&lt;
//       <button onClick={increment} style={{width: '210px'}}>+1</button>
//       --- render: {Math.random()}
//     </div>
//   )
// }

// const TextBox = ({text, dispatch}) => {

//   const setText = (text) => {
//     dispatch({type: 'change_text', payload: text});
//   }

//   return (
//     <div>
//       {text}
//       =&lt;
//       <input type="text" value={text} onChange={e => setText(e.target.value)} />
//       --- render: {Math.random()}
//     </div>
//   )
// }


低代码 --------》〉》〉》〉》 bpmn -------》〉》〉 java + 动态表 

java + 开发   【前端、后端 + 小半年       java】 、、、、、、前端

计算机  化学工程   16上岗  java + 前端   //////////// springBoot  ======

jsp =============》〉》〉 router ========》〉》 


---------------》〉》〉》java +++++++++++++++ 前端 +++++++++++++++++++++ java基础  =========》〉》〉》 jsp ++++


jsp ===========>>>>>> handlebar ==========>>>>>> 吃力 ++++++++ 胜任不了


-------------------报名收费----------------------------- java  + 框架coupang +++++慢慢发现东西 +++++++ 


nestjs  koajs 做后端开发  pipline ---------》〉》〉健壮性 -----------》〉》〉redis -------  sql查询速度 -----mongoDB ------


花时间 -----》〉》〉》面向对象 -------》〉》〉加锁 ------+++++策略模式 +++ vue源码 mixin 函数组件 -------》〉迭代器 打补丁 扩展 ----》〉命令模式 


工厂模式 =====》〉》〉》


docker -----》〉》jenkins +++++前端 ----博客 ====github ssh@889qq0 ——————》 copy dist run 


gitLab yaml  部署


k8s deops 





宝塔 //水平 智商 造轮子太难了 大环境不好  南通 没人回应

//后端  
springBoot 

java8 jdk 中间键  设计模式 

java + springBoot + redis + sql + javaEE

javaSE 标准版 javaWeb  tomcat  

javaME



































function debounce(fn, delay) {
  
  return (...rest) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...rest);
    }, delay);
  };
}

const fn = () => {
  console.log('1');
};

btn.addEventListener('click', debounce(fn));
