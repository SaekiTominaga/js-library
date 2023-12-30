import { describe, test, expect } from '@jest/globals';
import MIMETypeParser from '../dist/MIMETypeParser.js';

describe('パラメーターなし', () => {
	const mimeTypeParser = new MIMETypeParser('text/html');

	test('type', () => {
		expect(mimeTypeParser.getType()).toBe('text');
	});
	test('subtype', () => {
		expect(mimeTypeParser.getSubtype()).toBe('html');
	});
	test('essence', () => {
		expect(mimeTypeParser.getEssence()).toBe('text/html');
	});
	test('parameters', () => {
		expect(mimeTypeParser.getParameters().size).toBe(0);
	});
	test('parameter', () => {
		expect(mimeTypeParser.getParameter('foo')).toBeUndefined();
	});
	test('MIME Type', () => {
		expect(mimeTypeParser.toString()).toBe('text/html');
	});
});

describe('パラメーターあり', () => {
	const mimeTypeParser = new MIMETypeParser('text/html; charset=utf-8');

	test('type', () => {
		expect(mimeTypeParser.getType()).toBe('text');
	});
	test('subtype', () => {
		expect(mimeTypeParser.getSubtype()).toBe('html');
	});
	test('essence', () => {
		expect(mimeTypeParser.getEssence()).toBe('text/html');
	});
	test('parameters', () => {
		const parameters = new Map();
		parameters.set('charset', 'utf-8');
		expect(mimeTypeParser.getParameters()).toEqual(parameters);
	});
	test('parameter', () => {
		expect(mimeTypeParser.getParameter('charset')).toBe('utf-8');
	});
	test('parameter （存在しないキー）', () => {
		expect(mimeTypeParser.getParameter('foo')).toBeUndefined();
	});
	test('MIME Type', () => {
		expect(mimeTypeParser.toString()).toBe('text/html;charset=utf-8');
	});
});

describe('パラメーター複数', () => {
	const mimeTypeParser = new MIMETypeParser('TEXT/HTML ; CHARSET=UTF-8; foo=hoge;bar="piyo\\@" ; baz=;qux; charset=shift_jis ; ');

	test('type', () => {
		expect(mimeTypeParser.getType()).toBe('text');
	});
	test('subtype', () => {
		expect(mimeTypeParser.getSubtype()).toBe('html');
	});
	test('essence', () => {
		expect(mimeTypeParser.getEssence()).toBe('text/html');
	});
	test('parameters', () => {
		const parameters = new Map();
		parameters.set('charset', 'UTF-8');
		parameters.set('foo', 'hoge');
		parameters.set('bar', 'piyo@');
		expect(mimeTypeParser.getParameters()).toEqual(parameters);
	});
	test('parameter', () => {
		expect(mimeTypeParser.getParameter('charset')).toBe('UTF-8');
	});
	test('MIME Type', () => {
		expect(mimeTypeParser.toString()).toBe('text/html;charset=UTF-8;foo=hoge;bar="piyo@"');
	});
});

describe('invalid', () => {
	test('/ なし', () => {
		expect(() => {
			new MIMETypeParser('text');
		}).toThrow('The specified string does not contain a slash.');
	});

	test('/ のみ', () => {
		expect(() => {
			new MIMETypeParser('/');
		}).toThrow('The `type` is the empty string.');
	});

	test('type なし', () => {
		expect(() => {
			new MIMETypeParser('/html; charset=utf-8');
		}).toThrow('The `type` is the empty string.');
	});

	test('type に不正な文字列', () => {
		expect(() => {
			new MIMETypeParser('text@/html; charset=utf-8');
		}).toThrow('The `type` contains an invalid string.');
	});

	test('subtype なし', () => {
		expect(() => {
			new MIMETypeParser('text/');
		}).toThrow('The `subtype` is the empty string.');
	});

	test('subtype に不正な文字列', () => {
		expect(() => {
			new MIMETypeParser('text/html@; charset=utf-8');
		}).toThrow('The `subtype` contains an invalid string.');
	});
});

describe('HTTP quoted string', () => {
	test('1', () => {
		const mimeTypeParser = new MIMETypeParser('*/*; foo="\\');
		expect(mimeTypeParser.getParameters().get('foo')).toBe('\\');
	});
	test('2', () => {
		const mimeTypeParser = new MIMETypeParser('*/*; foo="Hello" World');
		expect(mimeTypeParser.getParameters().get('foo')).toBe('Hello');
	});
	test('3', () => {
		const mimeTypeParser = new MIMETypeParser('*/*; foo="Hello \\\\ World\\""');
		expect(mimeTypeParser.getParameters().get('foo')).toBe('Hello \\ World"');
	});
});
