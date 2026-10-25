// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    '@stylistic/space-before-function-paren': ['error', 'always'],
    '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before', '|>': 'before' } }],
    '@stylistic/quote-props': ['error', 'as-needed'],
    // 原本的 .vue 檔 template、script、style 之間不空行
    'vue/padding-line-between-blocks': 'off'
  }
})
