import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { escape, unescape, template } from './escape.ts';

await test('escape()', async (t) => {
	await t.test('empty', () => {
		assert.equal(escape(''), '');
	});

	await t.test('normal text', () => {
		assert.equal(escape('hoge'), 'hoge');
	});

	await t.test('escape target text', () => {
		assert.equal(
			escape('<x-x data-piyo1="fuga&fuga" data-piyo2=\'fuga&fuga\'>'),
			'&lt;x-x data-piyo1=&quot;fuga&amp;fuga&quot; data-piyo2=&#39;fuga&amp;fuga&#39;&gt;',
		);
	});
});

await test('unescape()', async (t) => {
	await t.test('empty', () => {
		assert.equal(unescape(''), '');
	});

	await t.test('normal text', () => {
		assert.equal(unescape('hoge'), 'hoge');
	});

	await t.test('escape target text', () => {
		assert.equal(
			unescape('&lt;x-hoge data-piyo1=&quot;fuga&amp;fuga&quot; data-piyo2=&#39;fuga&amp;fuga&#39;&gt;'),
			'<x-hoge data-piyo1="fuga&fuga" data-piyo2=\'fuga&fuga\'>',
		);
	});

	await t.test('check for double unescapes', () => {
		assert.equal(unescape('&amp;lt;'), '&lt;');
	});
});

await test('template``', async (t) => {
	await t.test('empty', () => {
		assert.equal(template``, '');
	});

	await t.test('escape', () => {
		const html = '<x-x/>';
		assert.equal(template`<p>text ${html} text</p>`, '<p>text &lt;x-x/&gt; text</p>');
	});

	await t.test('types', () => {
		const htmlString = '<x-x/>';
		const htmlNumber = 123;
		const htmlArray = ['<x-x1/>', '<x-x2/>'];
		const htmlObject = { key1: '<x-x1/>', key2: '<x-x2/>' };
		assert.equal(
			template`<p>text ${htmlString} ${htmlNumber} ${htmlArray} ${htmlObject} text</p>`,
			'<p>text &lt;x-x/&gt; 123 &lt;x-x1/&gt;,&lt;x-x2/&gt; [object Object] text</p>',
		);
	});
});
