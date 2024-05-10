import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import URLSearchParamsCustomSeparator from '../dist/URLSearchParamsCustomSeparator.js';

test('URL オブジェクト', async (t) => {
	await t.test('区切り文字の設定', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator(new URL('https://example.com/path/to?foo=1&bar=2;baz=3;qux=4:quux=5'), [';', ':']);

		assert.equal(urlSearchParams.searchParams.toString(), 'foo=1&bar=2&baz=3&qux=4&quux=5');
		assert.equal(urlSearchParams.toString(), 'foo=1&bar=2&baz=3&qux=4&quux=5');
	});

	await t.test('クエリー空', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator(new URL('https://example.com/path/to?'), [';']);

		assert.equal(urlSearchParams.searchParams.toString(), '');
		assert.equal(urlSearchParams.toString(), '');
	});

	await t.test('クエリーなし', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator(new URL('https://example.com/path/to'), [';']);

		assert.equal(urlSearchParams.searchParams.toString(), '');
		assert.equal(urlSearchParams.toString(), '');
	});
});

test('文字列', async (t) => {
	await t.test('区切り文字の設定', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator('/path/to?foo=1&bar=2;baz=3;qux=4:quux=5', [';', ':']);

		assert.equal(urlSearchParams.searchParams.toString(), 'foo=1&bar=2&baz=3&qux=4&quux=5');
		assert.equal(urlSearchParams.toString(), 'foo=1&bar=2&baz=3&qux=4&quux=5');
	});

	await t.test('クエリー空', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator('/path/to?', [';']);

		assert.equal(urlSearchParams.searchParams.toString(), '');
		assert.equal(urlSearchParams.toString(), '');
	});

	await t.test('クエリーなし', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator('/path/to', [';']);

		assert.equal(urlSearchParams.searchParams.toString(), '');
		assert.equal(urlSearchParams.toString(), '');
	});
});
