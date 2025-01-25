import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import StringConvert from './StringConvert.js';

await test('README.md', async (t) => {
	await t.test('Sample 1', () => {
		assert.equal(
			StringConvert.convert('foo\r\nbar', {
				newline: 'LF',
			}),
			'foo\nbar',
		);
	});
	await t.test('Sample 2', () => {
		assert.equal(
			StringConvert.convert('  foo  \r\n  bar  ', {
				trim: true,
			}),
			'foo  \r\n  bar',
		);
	});
	await t.test('Sample 3', () => {
		assert.equal(
			StringConvert.convert('  Ｆｏｏ  \r\n\r\n  Ｂａｒ　　　　　　Ｂａｚ💖  ', {
				newline: 'LF',
				trimMultiLine: true,
				noBlankLine: true,
				toHankakuEisu: true,
				toHankakuSpace: true,
				combineSpace: true,
				toLowerCase: true,
				table: {
					'💖': '⭐',
				},
			}),
			'foo\nbar baz⭐',
		);
	});
});

await test('変換', async (t) => {
	await t.test('newline (CR → LF)', () => {
		assert.equal(
			StringConvert.convert('  hoge  \r\r\r  piyo  \r\r\r  fuga  ', {
				newline: 'LF',
			}),
			'  hoge  \n\n\n  piyo  \n\n\n  fuga  ',
		);
	});
	await t.test('newline (CRLF → CR)', () => {
		assert.equal(
			StringConvert.convert('  hoge  \r\n\r\n\r\n  piyo  \r\n\r\n\r\n  fuga  ', {
				newline: 'CR',
			}),
			'  hoge  \r\r\r  piyo  \r\r\r  fuga  ',
		);
	});
	await t.test('newline (LF → CRLF)', () => {
		assert.equal(
			StringConvert.convert('  hoge  \n\n\n  piyo  \n\n\n  fuga  ', {
				newline: 'CRLF',
			}),
			'  hoge  \r\n\r\n\r\n  piyo  \r\n\r\n\r\n  fuga  ',
		);
	});
	await t.test('newline (不正な改行コード指定)', () => {
		// @ts-expect-error: ts(2322)
		assert.equal(StringConvert.convert('  hoge  \n\n\n  piyo  \n\n\n  fuga  ', { newline: 'foo' }), '  hoge  \n\n\n  piyo  \n\n\n  fuga  ');
	});
	await t.test('trim', () => {
		assert.equal(
			StringConvert.convert('  hoge  \n\n\n  piyo    \n\n\n  fuga  ', {
				trim: true,
			}),
			'hoge  \n\n\n  piyo    \n\n\n  fuga',
		);
	});
	await t.test('trimMultiLine (CR)', () => {
		assert.equal(
			StringConvert.convert('  hoge  \r\r\r  piyo    \r\r\r  fuga  ', {
				trimMultiLine: true,
			}),
			'hoge\r\r\rpiyo\r\r\rfuga',
		);
	});
	await t.test('trimMultiLine (LF)', () => {
		assert.equal(
			StringConvert.convert('  hoge  \n\n\n  piyo    \n\n\n  fuga  ', {
				trimMultiLine: true,
			}),
			'hoge\n\n\npiyo\n\n\nfuga',
		);
	});
	await t.test('trimMultiLine (CRLF)', () => {
		assert.equal(
			StringConvert.convert('  hoge  \r\n\r\n\r\n  piyo    \r\n\r\n\r\n  fuga  ', {
				trimMultiLine: true,
			}),
			'hoge\r\n\r\n\r\npiyo\r\n\r\n\r\nfuga',
		);
	});
	await t.test('noBlankLine (CR)', () => {
		assert.equal(
			StringConvert.convert('  hoge  \r\r\r  piyo  \r\r\r  fuga  ', {
				noBlankLine: true,
			}),
			'  hoge  \r  piyo  \r  fuga  ',
		);
	});
	await t.test('noBlankLine (LF)', () => {
		assert.equal(
			StringConvert.convert('  hoge  \n\n\n  piyo  \n\n\n  fuga  ', {
				noBlankLine: true,
			}),
			'  hoge  \n  piyo  \n  fuga  ',
		);
	});
	await t.test('noBlankLine (CRLF)', () => {
		assert.equal(
			StringConvert.convert('  hoge  \r\n\r\n\r\n  piyo  \r\n\r\n\r\n  fuga  ', {
				noBlankLine: true,
			}),
			'  hoge  \r\n  piyo  \r\n  fuga  ',
		);
	});
	await t.test('toHankakuEisu', () => {
		assert.equal(
			StringConvert.convert(' ｈｏｇｅＨＯＧＥ１２３ ', {
				toHankakuEisu: true,
			}),
			' hogeHOGE123 ',
		);
	});
	await t.test('toZenkakuEisu', () => {
		assert.equal(
			StringConvert.convert(' hogeHOGE123 ', {
				toZenkakuEisu: true,
			}),
			' ｈｏｇｅＨＯＧＥ１２３ ',
		);
	});
	await t.test('toHankakuSpace', () => {
		assert.equal(
			StringConvert.convert('　hoge　', {
				toHankakuSpace: true,
			}),
			' hoge ',
		);
	});
	await t.test('combineSpace', () => {
		assert.equal(
			StringConvert.convert('  hoge  ', {
				combineSpace: true,
			}),
			' hoge ',
		);
	});
	await t.test('toLowerCase', () => {
		assert.equal(
			StringConvert.convert('  HOGE  ', {
				toLowerCase: true,
			}),
			'  hoge  ',
		);
	});
	await t.test('toUpperCase', () => {
		assert.equal(
			StringConvert.convert('  hoge  ', {
				toUpperCase: true,
			}),
			'  HOGE  ',
		);
	});
	await t.test('table', () => {
		assert.equal(
			StringConvert.convert('  hoge．．piyo  ', {
				table: {
					'．': '.',
				},
			}),
			'  hoge..piyo  ',
		);
	});
});

await test('改行コード', async (t) => {
	await t.test('CR + LF 混在', () => {
		assert.throws(
			() => {
				StringConvert.convert('hoge\rpiyo\nfuga', {});
			},
			{ name: 'Error', message: 'Multiple newline codes are mixed. (CR, LF)' },
		);
	});
	await t.test('CR + CRLF 混在', () => {
		assert.throws(
			() => {
				StringConvert.convert('hoge\rpiyo\r\nfuga', {});
			},
			{ name: 'Error', message: 'Multiple newline codes are mixed. (CR, CR+LF)' },
		);
	});
	await t.test('LF + CR 混在', () => {
		assert.throws(
			() => {
				StringConvert.convert('hoge\npiyo\rfuga', {});
			},
			{ name: 'Error', message: 'Multiple newline codes are mixed. (CR, LF)' },
		);
	});
	await t.test('LF + CRLF 混在', () => {
		assert.throws(
			() => {
				StringConvert.convert('hoge\npiyo\r\nfuga', {});
			},
			{ name: 'Error', message: 'Multiple newline codes are mixed. (LF, CR+LF)' },
		);
	});
	await t.test('CRLF + CR 混在', () => {
		assert.throws(
			() => {
				StringConvert.convert('hoge\r\npiyo\rfuga', {});
			},
			{ name: 'Error', message: 'Multiple newline codes are mixed. (CR, CR+LF)' },
		);
	});
	await t.test('CRLF + LF 混在', () => {
		assert.throws(
			() => {
				StringConvert.convert('hoge\r\npiyo\nfuga', {});
			},
			{ name: 'Error', message: 'Multiple newline codes are mixed. (LF, CR+LF)' },
		);
	});
});
