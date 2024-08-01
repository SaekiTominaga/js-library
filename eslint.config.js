// @ts-check

import w0sConfig from '@w0s/eslint-config';

/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
export default [
	...w0sConfig,
	{
		ignores: ['@types', 'packages/*/dist'],
	},
	{
		files: ['packages/*/__tests__/**/*.test.js'],
		rules: {
			'import/no-unresolved': 'off', // Github Actions 環境では /dist/ ファイルが存在しないためテスト不可
		},
	},
	{
		files: ['packages/*/src/**/*.ts'],
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off',
		},
	},
	{
		files: ['packages/console-locale-timestamp/src/ConsoleLocaleTimestamp.ts'],
		rules: {
			'class-methods-use-this': 'off',
			'no-console': 'off',
		},
	},
	{
		files: ['packages/html-escape/__tests__/HtmlEscape.test.js', 'packages/html-escape/src/HtmlEscape.ts'],
		rules: {
			'no-underscore-dangle': [
				'error',
				{
					allow: ['__'],
				},
			],
		},
	},
	{
		files: ['packages/wareki/src/Wareki.ts'],
		rules: {
			'class-methods-use-this': 'off',
		},
	},
];
