/** @type {import('prettier').Config} */
export default {
  arrowParens: 'avoid',
  endOfLine: 'lf',
  printWidth: 120,
  quoteProps: 'consistent',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: ['prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
  ],
};
