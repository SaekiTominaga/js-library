import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { option } from './validator.ts';

await test('digits', async (t) => {
	await t.test('decimal', () => {
		assert.throws(
			() => {
				option({ digits: 1.1 });
			},
			{ name: 'RangeError', message: 'The options `digits` must be an integer greater than or equal to 0.' },
		);
	});

	await t.test('minus', () => {
		assert.throws(
			() => {
				option({ digits: -1 });
			},
			{ name: 'RangeError', message: 'The options `digits` must be an integer greater than or equal to 0.' },
		);
	});
});

await test('undefined', () => {
	assert.deepEqual(option(), { space: false, byte: 'byte', digits: 0 });
});

await test('all properties', () => {
	assert.deepEqual(option({ space: true, byte: 'xxx', digits: 1 }), { space: true, byte: 'xxx', digits: 1 });
});
