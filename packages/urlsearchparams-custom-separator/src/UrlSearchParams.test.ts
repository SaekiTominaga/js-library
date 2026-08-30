import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import UrlSearchParamsCustomSeparator from './UrlSearchParams.ts';

await test('URL オブジェクト', async (t) => {
	await t.test('区切り文字の設定', () => {
		const urlSearchParams = new UrlSearchParamsCustomSeparator(new URL('https://example.com/path/to?foo=1&bar=2;baz=3;qux=4:quux=5'), [';', ':']);

		assert.equal(urlSearchParams.searchParams.toString(), 'foo=1&bar=2&baz=3&qux=4&quux=5');
		assert.equal(urlSearchParams.toString(), 'foo=1&bar=2&baz=3&qux=4&quux=5');
	});

	await t.test('クエリー空', () => {
		const urlSearchParams = new UrlSearchParamsCustomSeparator(new URL('https://example.com/path/to?'), [';']);

		assert.equal(urlSearchParams.searchParams.toString(), '');
		assert.equal(urlSearchParams.toString(), '');
	});

	await t.test('クエリーなし', () => {
		const urlSearchParams = new UrlSearchParamsCustomSeparator(new URL('https://example.com/path/to'), [';']);

		assert.equal(urlSearchParams.searchParams.toString(), '');
		assert.equal(urlSearchParams.toString(), '');
	});
});

await test('文字列', async (t) => {
	await t.test('区切り文字の設定', () => {
		const urlSearchParams = new UrlSearchParamsCustomSeparator('/path/to?foo=1&bar=2;baz=3;qux=4:quux=5', [';', ':']);

		assert.equal(urlSearchParams.searchParams.toString(), 'foo=1&bar=2&baz=3&qux=4&quux=5');
		assert.equal(urlSearchParams.toString(), 'foo=1&bar=2&baz=3&qux=4&quux=5');
	});

	await t.test('クエリー空', () => {
		const urlSearchParams = new UrlSearchParamsCustomSeparator('/path/to?', [';']);

		assert.equal(urlSearchParams.searchParams.toString(), '');
		assert.equal(urlSearchParams.toString(), '');
	});

	await t.test('クエリーなし', () => {
		const urlSearchParams = new UrlSearchParamsCustomSeparator('/path/to', [';']);

		assert.equal(urlSearchParams.searchParams.toString(), '');
		assert.equal(urlSearchParams.toString(), '');
	});
});
