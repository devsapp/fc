module.exports = {
  extends: 'eslint-config-ali/typescript',
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'max-len': 'off',
    'no-param-reassign': 'off',
    'no-await-in-loop': 'off',
    'require-atomic-updates': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-console': 'off',
    'no-async-promise-executor': 'off',
  },
};
