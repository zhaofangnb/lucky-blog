/*
1.  https://www.wangt.cc/2021/02/eslint%E9%85%8D%E7%BD%AEeslintrc-js%E6%96%87%E4%BB%B6%E4%BB%A5%E5%8F%8Avscode%E6%A0%BC%E5%BC%8F%E5%8C%96%E7%BB%93%E5%B0%BE%E4%B8%8D%E5%8A%A0%E9%80%97%E5%8F%B7/
2.  https://zhuanlan.zhihu.com/p/421869811
*/
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  globals: {
    ga: true,
    chrome: true,
    __DEV__: true,
  },
  // 解析.vue文件
  parser: 'vue-eslint-parser',
  extends: ['plugin:json/recommended', 'plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser', // 解析 .ts 文件
  },
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'warn',
  },
}
