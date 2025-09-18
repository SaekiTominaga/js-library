import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { getValue } from './env.ts';

process.env['TEST_STRING'] = 'foo';
process.env['TEST_STRINGS1'] = 'foo bar baz';
process.env['TEST_STRINGS2'] = 'foo,bar,baz';
process.env['TEST_NUMBER'] = '1';
process.env['TEST_NUMBERS1'] = '1 2 3';
process.env['TEST_NUMBERS2'] = '1,2,3';
process.env['TEST_BOOLEAN1'] = 'true';
process.env['TEST_BOOLEAN2'] = 'false';

await test('exist key', async (t) => {
	await t.test('no type', () => {
		assert.equal(getValue('TEST_STRING'), 'foo');
	});

	await t.test('string', () => {
		assert.equal(getValue('TEST_STRING', 'string'), 'foo');
	});

	await t.test('string[]', () => {
		assert.deepEqual(getValue('TEST_STRINGS1', 'string[]'), ['foo', 'bar', 'baz']);
	});

	await t.test('number', () => {
		assert.equal(getValue('TEST_NUMBER', 'number'), 1);
	});

	await t.test('number (NaN)', () => {
		assert.equal(getValue('TEST_STRING', 'number'), NaN);
	});

	await t.test('number[]', () => {
		assert.deepEqual(getValue('TEST_NUMBERS1', 'number[]'), [1, 2, 3]);
	});

	await t.test('true', () => {
		assert.equal(getValue('TEST_BOOLEAN1', 'boolean'), true);
	});

	await t.test('false', () => {
		assert.equal(getValue('TEST_BOOLEAN2', 'boolean'), false);
	});
});

await test('separator', async (t) => {
	await t.test('type undefined', () => {
		assert.throws(
			() => {
				getValue('TEST_STRING', undefined, { separator: ' ' });
			},
			{ name: 'Error', message: 'If the type is not an array format, the optional `separator` cannot be specified' },
		);
	});

	await t.test('not array', () => {
		assert.throws(
			() => {
				getValue('TEST_STRING', 'string', { separator: ' ' });
			},
			{ name: 'Error', message: 'If the type is not an array format, the optional `separator` cannot be specified' },
		);
	});

	await t.test('string[]', () => {
		assert.deepEqual(getValue('TEST_STRINGS2', 'string[]', { separator: ' ' }), ['foo,bar,baz']);
	});

	await t.test('string[]', () => {
		assert.deepEqual(getValue('TEST_STRINGS2', 'string[]', { separator: ',' }), ['foo', 'bar', 'baz']);
	});

	await t.test('number[]', () => {
		assert.deepEqual(getValue('TEST_NUMBERS2', 'number[]', { separator: ' ' }), [NaN]);
	});

	await t.test('number[]', () => {
		assert.deepEqual(getValue('TEST_NUMBERS2', 'number[]', { separator: ',' }), [1, 2, 3]);
	});
});

await test('non exist key', () => {
	assert.throws(
		() => {
			getValue('TEST_XXX');
		},
		{ name: 'Error', message: 'process.env["TEST_XXX"] not defined' },
	);
});
