/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-29 15:35:09
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-29 18:05:00
 * @FilePath     : \\js_frame_work\\vue_test_p\\jest.config.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 * jest 无法识别babel中解析的esmodule语法需要这里忽略编译 这里因为需要调用axios所以无法识别
 */
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
  testURL: 'http://localhost:8080',
  // collectCoverage: true,
  // 注意  testMatch 和 testRegex不能同时使用
  // testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ], //默认配置
  // testRegex: '(/test/.*\\.(test|spec))\\.[tj]sx?$', //默认配置
  testMatch: [
    // '**/tests/**/demo.*.[jt]s?(x)',
    '**/tests/**/function.*.[jt]s?(x)'
  ]
};
