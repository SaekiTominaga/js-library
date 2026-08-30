import config from '@w0s/oxlint-config/node';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [config],
	options: {
		typeAware: true,
		typeCheck: true,
	},
	overrides: [
		{
			files: ['packages/env-value-type/src/**/*.ts'],
			rules: {
				'node/no-process-env': 'off',
			},
		},
		{
			files: ['packages/env-value-type/src/env.ts', 'packages/sqlite-utility/src/sqlite.ts'],
			rules: {
				'import/group-exports': 'off',
			},
		},
		{
			files: ['packages/file-size-format/src/format.ts', 'packages/paapi-item-image-url-parser/src/PaapiItemImageUrl.ts'],
			rules: {
				'typescript/no-non-null-assertion': 'off',
			},
		},
	],
});
