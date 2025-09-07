// @ts-check

import w0sConfig from '@w0s/eslint-config';

/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
export default [
	...w0sConfig,
	{
		ignores: ['@types', 'packages/*/dist'],
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ['packages/*/src/**/*.ts'],
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off',
		},
	},
	{
		files: ['packages/*/src/**/*.test.ts'],
		rules: {
			'import/no-unresolved': 'off', // Github Actions 環境では /dist/ ファイルが存在しないためテスト不可
		},
	},
	{
		files: ['packages/console-locale-timestamp/src/Console.ts'],
		rules: {
			'class-methods-use-this': 'off',
			'no-console': 'off',
		},
	},
	{
		files: ['packages/wareki/src/Wareki.ts'],
		rules: {
			'class-methods-use-this': 'off',
		},
	},
];
