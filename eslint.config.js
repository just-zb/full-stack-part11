const globals = require('globals')
const plugin = require('@stylistic/eslint-plugin-js')

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        sourceType: 'commonjs'
      },
      globals: globals.browser
    },
    plugins: {
      '@stylistic/js': plugin
    },
    ignores: ['dist/**', 'client/dist/**', 'eslint.config.js'],

    rules: {
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0,
    }
  }
]
