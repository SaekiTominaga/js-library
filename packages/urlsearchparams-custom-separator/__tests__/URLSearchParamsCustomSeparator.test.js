import { describe, test, expect } from '@jest/globals';
import URLSearchParamsCustomSeparator from '../dist/URLSearchParamsCustomSeparator.js';

describe('URL オブジェクト', () => {
	test('区切り文字の設定', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator(new URL('https://example.com/path/to?foo=1&bar=2;baz=3;qux=4:quux=5'), [';', ':']);
		expect(urlSearchParams.searchParams.toString()).toBe('foo=1&bar=2&baz=3&qux=4&quux=5');
		expect(urlSearchParams.toString()).toBe('foo=1&bar=2&baz=3&qux=4&quux=5');
	});

	test('クエリー空', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator(new URL('https://example.com/path/to?'), [';']);
		expect(urlSearchParams.searchParams.toString()).toBe('');
		expect(urlSearchParams.toString()).toBe('');
	});

	test('クエリーなし', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator(new URL('https://example.com/path/to'), [';']);
		expect(urlSearchParams.searchParams.toString()).toBe('');
		expect(urlSearchParams.toString()).toBe('');
	});
});

describe('文字列', () => {
	test('区切り文字の設定', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator('/path/to?foo=1&bar=2;baz=3;qux=4:quux=5', [';', ':']);
		expect(urlSearchParams.searchParams.toString()).toBe('foo=1&bar=2&baz=3&qux=4&quux=5');
		expect(urlSearchParams.toString()).toBe('foo=1&bar=2&baz=3&qux=4&quux=5');
	});

	test('クエリー空', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator('/path/to?', [';']);
		expect(urlSearchParams.searchParams.toString()).toBe('');
		expect(urlSearchParams.toString()).toBe('');
	});

	test('クエリーなし', () => {
		const urlSearchParams = new URLSearchParamsCustomSeparator('/path/to', [';']);
		expect(urlSearchParams.searchParams.toString()).toBe('');
		expect(urlSearchParams.toString()).toBe('');
	});
});
