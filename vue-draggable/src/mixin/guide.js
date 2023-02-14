/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-02-10 18:53:30
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-10 19:15:05
 * @FilePath     : \\vue-draggable\\src\\mixin\\guide.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */

import introJs from 'intro.js';
import 'intro.js/introjs.css';

export default {
  // 定义方法
  methods: {
    //   [{
    //     element: document.querySelectorAll('#step2')[0],
    //     intro: "Ok, wasn't that fun?",
    //     position: 'right'
    // }]
    guide(list) {
      introJs()
        .setOptions({
          steps: list
        })
        // .setOptions({
        //   nextLabel: '下一个', // 下一个按钮文字
        //   prevLabel: '上一个', // 上一个按钮文字
        //   skipLabel: '跳过', // 跳过按钮文字
        //   doneLabel: '立即体验', // 完成按钮文字
        //   hidePrev: true, // 在第一步中是否隐藏上一个按钮
        //   hideNext: true, // 在最后一步中是否隐藏下一个按钮
        //   exitOnOverlayClick: false, // 点击叠加层时是否退出介绍
        //   // showStepNumbers: false, // 是否显示红色圆圈的步骤编号
        //   showStepNumbers: true, // 是否显示红色圆圈的步骤编号
        //   disableInteraction: true, // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
        //   showBullets: false // 是否显示面板指示点
        // })
        // .addSteps(list)
        .start();

      // introJs().oncomplete(() => {
      //   alert('end of introduction');
      // });

      // introJs().onexit(() => {
      //   alert('exit of introduction');
      // });

      // introJs().onbeforeexit(() => {
      //   console.log('on before exit');

      //   // returning false means don't exit the intro
      //   return false;
      // });

      // introJs().onchange((targetElement) => {
      //   alert('new step');
      // });
    }
  }
};
