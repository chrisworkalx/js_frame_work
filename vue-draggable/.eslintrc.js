/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-28 15:28:05
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-02-10 18:48:11
 * @FilePath     : \\vue-draggable\\.eslintrc.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'never'],
    'implicit-arrow-linebreak': 'off',
    'import/no-extraneous-dependencies': 'off'
  }
};
