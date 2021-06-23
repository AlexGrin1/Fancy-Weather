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
    'default-case': ['error', { commentPattern: '^skip\\sdefault' }],
    'keyword-spacing': ['error', { after: true }],
    eqeqeq: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'linebreak-style': 'off',
    'import/no-cycle': 'off',
    'import/no-mutable-exports': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'no-alert': 'off',
  },
  plugins: ['prettier'],
};
