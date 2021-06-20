/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'eslint-config-prettier', 'eslint-config-airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    // quotes: ["error", "single"],
    'default-case': ['error', { commentPattern: '^skip\\sdefault' }],
    'keyword-spacing': ['error', { after: true }],
    eqeqeq: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'linebreak-style': 'off',
  },
  plugins: ['prettier'],
};
