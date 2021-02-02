module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 'off',
    'promise/param-names': 'off',
    'dot-notation': 'off',
    'no-trailing-spaces': 'off',
    'prefer-const': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': 'off',
    'no-unused-vars': 'off',
    'comma-dangle': 'off',
    'object-curly-spacing': 'off',
    'vue/no-unused-components': 'off',
    'indent': 'off'
  }
}
