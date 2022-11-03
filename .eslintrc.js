module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // 使用vue3推荐规则
    'plugin:vue/vue3-recommended',
    // 使用prettier推荐规则
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
