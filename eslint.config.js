// @ts-check

import w0sConfig from '@w0s/eslint-config';

/** @type {import("eslint").Linter.Config[]} */
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
				project: './packages/*/tsconfig.lint.json',
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
		files: ['packages/html-escape/src/escape.ts'],
		rules: {
			'functional/functional-parameters': 'off',
			'functional/no-loop-statements': 'off',
		},
	},
];
