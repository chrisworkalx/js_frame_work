module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/babel-preset-jsx'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    allowImportExportEverywhere: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-components': 'off'
  }
};
