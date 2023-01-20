/**
 * @Description  :测试是否打包重构
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-20 11:47:27
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-20 12:23:53
 * @FilePath     : \\js_frame_work\\vue-draggable\\src\\utils\\update.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */

// eslint-disable-next-line import/prefer-default-export
export class Updater {
  // oldScript //存储第一次值也就是script 的hash 信息
  // newScript //获取新的值 也就是新的script 的hash信息
  // dispatch //小型发布订阅通知用户更新了
  constructor(options) {
    this.oldScript = [];
    this.newScript = [];
    this.dispatch = {};
    this.init(); // 初始化
    this.timing(options?.timer); // 轮询
  }

  async init() {
    const html = await this.getHtml();
    this.oldScript = this.parserScript(html);
  }

  // eslint-disable-next-line class-methods-use-this
  async getHtml() {
    const html = await fetch('http://47.100.90.213/').then(
      (res) => res.text()
      // eslint-disable-next-line function-paren-newline
    ); // 读取index html
    return html;
  }

  // eslint-disable-next-line class-methods-use-this
  parserScript(html) {
    // eslint-disable-next-line prefer-regex-literals
    const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi); // script正则
    return html.match(reg); // 匹配script标签
  }

  // 发布订阅通知
  on(key, fn) {
    (this.dispatch[key] || (this.dispatch[key] = [])).push(fn);
    return this;
  }

  compare(oldArr, newArr) {
    const base = oldArr.length;
    const arr = Array.from(new Set(oldArr.concat(newArr)));
    // 如果新旧length 一样无更新
    if (arr.length === base) {
      this.dispatch['no-update'].forEach((fn) => {
        fn();
      });
    } else {
      // 否则通知更新
      this.dispatch.update.forEach((fn) => {
        fn();
      });
    }
  }

  timing(time = 10000) {
    // 轮询
    setInterval(async () => {
      const newHtml = await this.getHtml();
      this.newScript = this.parserScript(newHtml);
      console.log('this.newScript', this.newScript);
      this.compare(this.oldScript, this.newScript);
    }, time);
  }
}
