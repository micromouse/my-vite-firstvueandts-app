module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    //使用推荐的eslint
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false
    }
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {}
}
