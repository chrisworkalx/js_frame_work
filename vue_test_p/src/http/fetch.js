/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-29 17:58:50
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-29 17:58:50
 * @FilePath     : \\js_frame_work\\vue_test_p\\src\\http\\request.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
// fetch.js

import axios from 'axios';

export default {
  async fetchPostsList(callback) {
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        return callback(res.data);
      });
  }
};
