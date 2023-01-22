module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard-with-typescript'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['react', 'unused-imports'],
  rules: {
    semi: [2, 'always'],
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/semi': [2, 'always'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'multiline-ternary': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    quotes: [2, 'single', { avoidEscape: true }]
  }
};
