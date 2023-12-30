import { describe, test, expect } from '@jest/globals';
import HtmlEscape from '../dist/HtmlEscape.js';

describe('escape()', () => {
	test('empty', () => {
		expect(HtmlEscape.escape('')).toBe('');
	});

	test('normal text', () => {
		expect(HtmlEscape.escape('hoge')).toBe('hoge');
	});

	test('escape target text', () => {
		expect(HtmlEscape.escape('<x-x data-piyo1="fuga&fuga" data-piyo2=\'fuga&fuga\'>')).toBe(
			'&lt;x-x data-piyo1=&quot;fuga&amp;fuga&quot; data-piyo2=&#39;fuga&amp;fuga&#39;&gt;',
		);
	});

	test('alias', () => {
		expect(HtmlEscape._('<x-x data-piyo1="fuga&fuga" data-piyo2=\'fuga&fuga\'>')).toBe(
			'&lt;x-x data-piyo1=&quot;fuga&amp;fuga&quot; data-piyo2=&#39;fuga&amp;fuga&#39;&gt;',
		);
	});
});

describe('unescape()', () => {
	test('empty', () => {
		expect(HtmlEscape.unescape('')).toBe('');
	});

	test('normal text', () => {
		expect(HtmlEscape.unescape('hoge')).toBe('hoge');
	});

	test('escape target text', () => {
		expect(HtmlEscape.unescape('&lt;x-hoge data-piyo1=&quot;fuga&amp;fuga&quot; data-piyo2=&#39;fuga&amp;fuga&#39;&gt;')).toBe(
			'<x-hoge data-piyo1="fuga&fuga" data-piyo2=\'fuga&fuga\'>',
		);
	});

	test('check for double unescapes', () => {
		expect(HtmlEscape.unescape('&amp;lt;')).toBe('&lt;');
	});

	test('alias', () => {
		expect(HtmlEscape.$('&lt;x-hoge data-piyo1=&quot;fuga&amp;fuga&quot; data-piyo2=&#39;fuga&amp;fuga&#39;&gt;')).toBe(
			'<x-hoge data-piyo1="fuga&fuga" data-piyo2=\'fuga&fuga\'>',
		);
	});
});

describe('template``', () => {
	test('empty', () => {
		expect(HtmlEscape.template``).toBe('');
	});

	test('escape', () => {
		const html = '<x-x/>';
		expect(HtmlEscape.template`<p>text ${html} text</p>`).toBe('<p>text &lt;x-x/&gt; text</p>');
	});

	test('types', () => {
		const htmlString = '<x-x/>';
		const htmlNumber = 123;
		const htmlArray = ['<x-x1/>', '<x-x2/>'];
		const htmlObject = { key1: '<x-x1/>', key2: '<x-x2/>' };
		expect(HtmlEscape.template`<p>text ${htmlString} ${htmlNumber} ${htmlArray} ${htmlObject} text</p>`).toBe(
			'<p>text &lt;x-x/&gt; 123 &lt;x-x1/&gt;,&lt;x-x2/&gt; [object Object] text</p>',
		);
	});

	test('alias', () => {
		const html = '<x-x/>';
		expect(HtmlEscape.__`<p>text ${html} text</p>`).toBe('<p>text &lt;x-x/&gt; text</p>');
	});
});
