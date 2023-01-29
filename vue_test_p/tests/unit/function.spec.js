/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-29 17:59:35
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-29 18:16:40
 * @FilePath     : \\js_frame_work\\vue_test_p\\tests\\unit\\function.spec.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
// functions.test.js

import events from '../../src/http/events.js';
import fetch from '../../src/http/fetch.js';

jest.mock('../../src/http/fetch.js');

test('mock 整个 fetch.js模块', async () => {
  expect.assertions(2);
  await events.getPostList();
  expect(fetch.fetchPostsList).toHaveBeenCalled();
  expect(fetch.fetchPostsList).toHaveBeenCalledTimes(1);
});

test('使用jest.spyOn()监控fetch.fetchPostsList被正常调用', async () => {
  expect.assertions(2);
  const spyFn = jest.spyOn(fetch, 'fetchPostsList');
  await events.getPostList();
  expect(spyFn).toHaveBeenCalled();
  expect(spyFn).toHaveBeenCalledTimes(2);
});
