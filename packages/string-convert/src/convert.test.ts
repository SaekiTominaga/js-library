import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { convert } from './convert.js';

await test('newline', async (t) => {
	await t.test('CR → LF', () => {
		assert.equal(
			convert('hoge\r\rpiyo\r\rfuga', {
				newline: 'LF',
			}),
			'hoge\n\npiyo\n\nfuga',
		);
	});

	await t.test('CRLF → CR', () => {
		assert.equal(
			convert('hoge\r\n\r\npiyo\r\n\r\nfuga', {
				newline: 'CR',
			}),
			'hoge\r\rpiyo\r\rfuga',
		);
	});

	await t.test('LF → CRLF', () => {
		assert.equal(
			convert('hoge\n\npiyo\n\nfuga', {
				newline: 'CRLF',
			}),
			'hoge\r\n\r\npiyo\r\n\r\nfuga',
		);
	});

	await t.test('invalid value', () => {
		assert.equal(
			convert('hoge\n\npiyo\n\nfuga', {
				// @ts-expect-error: ts(2322)
				newline: 'foo',
			}),
			'hoge\n\npiyo\n\nfuga',
		);
	});
});

await test('trim', () => {
	assert.equal(
		convert('  hoge  \n\n  piyo    \n\n  fuga  ', {
			trim: true,
		}),
		'hoge  \n\n  piyo    \n\n  fuga',
	);
});

await test('trimMultiLine', async (t) => {
	await t.test('CR', () => {
		assert.equal(
			convert('  hoge  \r\r  piyo    \r\r  fuga  ', {
				trimMultiLine: true,
			}),
			'hoge\r\rpiyo\r\rfuga',
		);
	});

	await t.test('LF', () => {
		assert.equal(
			convert('  hoge  \n\n  piyo    \n\n  fuga  ', {
				trimMultiLine: true,
			}),
			'hoge\n\npiyo\n\nfuga',
		);
	});

	await t.test('CRLF', () => {
		assert.equal(
			convert('  hoge  \r\n\r\n  piyo    \r\n\r\n  fuga  ', {
				trimMultiLine: true,
			}),
			'hoge\r\n\r\npiyo\r\n\r\nfuga',
		);
	});
});

await test('noBlankLine', async (t) => {
	await t.test('CR', () => {
		assert.equal(
			convert('hoge\r\r\rpiyo', {
				noBlankLine: true,
			}),
			'hoge\rpiyo',
		);
	});

	await t.test('LF', () => {
		assert.equal(
			convert('hoge\n\n\npiyo', {
				noBlankLine: true,
			}),
			'hoge\npiyo',
		);
	});

	await t.test('CRLF', () => {
		assert.equal(
			convert('hoge\r\n\r\npiyo', {
				noBlankLine: true,
			}),
			'hoge\r\npiyo',
		);
	});
});

await test('toHankakuEisu', () => {
	assert.equal(
		convert('ｈｏｇｅＨＯＧＥ１２３', {
			toHankakuEisu: true,
		}),
		'hogeHOGE123',
	);
});

await test('toZenkakuEisu', () => {
	assert.equal(
		convert('hogeHOGE123', {
			toZenkakuEisu: true,
		}),
		'ｈｏｇｅＨＯＧＥ１２３',
	);
});

await test('toHankakuSpace', () => {
	assert.equal(
		convert('　hoge　', {
			toHankakuSpace: true,
		}),
		' hoge ',
	);
});

await test('combineSpace', () => {
	assert.equal(
		convert('  hoge  ', {
			combineSpace: true,
		}),
		' hoge ',
	);
});

await test('toLowerCase', () => {
	assert.equal(
		convert('HOGE', {
			toLowerCase: true,
		}),
		'hoge',
	);
});

await test('toUpperCase', () => {
	assert.equal(
		convert('hoge', {
			toUpperCase: true,
		}),
		'HOGE',
	);
});

await test('table', () => {
	assert.equal(
		convert('hoge．．piyo', {
			table: {
				'．': '.',
			},
		}),
		'hoge..piyo',
	);
});
