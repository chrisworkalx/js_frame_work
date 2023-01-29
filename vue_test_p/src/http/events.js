/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-29 17:59:12
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-29 18:15:30
 * @FilePath     : \\js_frame_work\\vue_test_p\\src\\http\\events.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
// events.js
import fetch from './fetch';

export default {
  async getPostList() {
    return fetch.fetchPostsList((data) => {
      console.log('fetchPostsList be called!');
    });
  }
};
