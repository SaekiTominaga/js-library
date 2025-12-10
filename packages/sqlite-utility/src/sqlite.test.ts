import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { jsToSQLiteComparison, jsToSQLiteAssignment, sqliteToJS } from './sqlite.ts';

await test('jsToSQLiteComparison', async (t) => {
	await t.test('string', () => {
		assert.equal(jsToSQLiteComparison('text'), 'text');
	});

	await t.test('number', () => {
		assert.equal(jsToSQLiteComparison(123), 123);
	});

	await t.test('true', () => {
		assert.equal(jsToSQLiteComparison(true), 1);
	});

	await t.test('false', () => {
		assert.equal(jsToSQLiteComparison(false), 0);
	});

	await t.test('Date', () => {
		assert.equal(jsToSQLiteComparison(new Date('2000-01-01')), 946684800);
	});

	await t.test('URL', () => {
		assert.equal(jsToSQLiteComparison(new URL('http://example.com/foo?bar#baz')), 'http://example.com/foo?bar#baz');
	});
});

await test('jsToSQLiteAssignment', async (t) => {
	await t.test('string', () => {
		assert.equal(jsToSQLiteAssignment('text'), 'text');
	});

	await t.test('number', () => {
		assert.equal(jsToSQLiteAssignment(123), 123);
	});

	await t.test('true', () => {
		assert.equal(jsToSQLiteAssignment(true), 1);
	});

	await t.test('false', () => {
		assert.equal(jsToSQLiteAssignment(false), 0);
	});

	await t.test('Date', () => {
		assert.equal(jsToSQLiteAssignment(new Date('2000-01-01')), 946684800);
	});

	await t.test('URL', () => {
		assert.equal(jsToSQLiteAssignment(new URL('http://example.com/foo?bar#baz')), 'http://example.com/foo?bar#baz');
	});

	await t.test('undefined', () => {
		assert.equal(jsToSQLiteAssignment(undefined), null);
	});
});

await test('sqliteToJS', async (t) => {
	await t.test('string', () => {
		assert.equal(sqliteToJS('text'), 'text');
	});

	await t.test('number', () => {
		assert.equal(sqliteToJS(123), 123);
	});

	await t.test('true', () => {
		assert.equal(sqliteToJS(1, 'boolean'), true);
	});

	await t.test('false', () => {
		assert.equal(sqliteToJS(0, 'boolean'), false);
	});

	await t.test('Date', () => {
		const result = sqliteToJS(946684800, 'date');

		assert.equal(result instanceof Date, true);
		assert.equal(result.getTime(), 946684800000);
	});

	await t.test('URL', () => {
		const result = sqliteToJS('http://example.com/foo?bar#baz', 'url');

		assert.equal(result instanceof URL, true);
		assert.equal(result.toString(), 'http://example.com/foo?bar#baz');
	});

	await t.test('undefined', () => {
		assert.equal(sqliteToJS(null), undefined);
	});

	await t.test('type mismatch', async (t2) => {
		await t2.test('boolean', () => {
			assert.throws(
				() => {
					// @ts-expect-error: ts(2769)
					sqliteToJS('text', 'boolean');
				},
				{
					name: 'Error',
					message: 'Database columns must be a 0 or 1 when convert to a boolean type',
				},
			);
		});

		await t2.test('Date', () => {
			assert.throws(
				() => {
					// @ts-expect-error: ts(2769)
					sqliteToJS('text', 'date');
				},
				{
					name: 'Error',
					message: 'Database columns must be a integer when convert to a Date type',
				},
			);
		});

		await t2.test('URL', () => {
			assert.throws(
				() => {
					// @ts-expect-error: ts(2769)
					sqliteToJS(123, 'url');
				},
				{
					name: 'Error',
					message: 'Database columns must be a string type when convert to a URL type',
				},
			);
		});
	});
});
