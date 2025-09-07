import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import PaapiItemImageUrlParser from './PaapiItemImageUrl.ts';

await test('オリジナルサイズ', async (t) => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	await t.test('id', () => {
		assert.equal(paapiItemImageUrlParser.getId(), '5198TOs+rnL');
	});
	await t.test('size', () => {
		assert.equal(paapiItemImageUrlParser.getSize(), null);
	});
	await t.test('extension', () => {
		assert.equal(paapiItemImageUrlParser.getExtension(), '.jpg');
	});
	await t.test('URL', () => {
		assert.equal(paapiItemImageUrlParser.getURL().toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL.jpg');
	});
	await t.test('URL string', () => {
		assert.equal(paapiItemImageUrlParser.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL.jpg');
	});
});

await test('オリジナルサイズ URL の幅を変更（直接指定）', async (t) => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	paapiItemImageUrlParser.setSize(500);

	await t.test('size', () => {
		assert.equal(paapiItemImageUrlParser.getSize(), 500);
	});
	await t.test('URL', () => {
		assert.equal(paapiItemImageUrlParser.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL._SL500_.jpg');
	});
});

await test('オリジナルサイズ URL の幅を変更（乗算指定）', async (t) => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL_.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	await t.test('幅指定前に乗算', () => {
		assert.throws(
			() => {
				paapiItemImageUrlParser.setSizeMultiply(2);
			},
			{
				name: 'Error',
				message: 'It is not possible to multiply the size of an image whose size is not specified. Please execute the `setSize()` method before this.',
			},
		);
	});
	await t.test('幅指定前に除算', () => {
		assert.throws(
			() => {
				paapiItemImageUrlParser.setSizeDivision(2);
			},
			{
				name: 'Error',
				message: 'It is not possible to division the size of an image whose size is not specified. Please execute the `setSize()` method before this.',
			},
		);
	});
});

await test('幅指定 URL', async (t) => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	await t.test('id', () => {
		assert.equal(paapiItemImageUrlParser.getId(), '5198TOs+rnL');
	});
	await t.test('size', () => {
		assert.equal(paapiItemImageUrlParser.getSize(), 160);
	});
	await t.test('extension', () => {
		assert.equal(paapiItemImageUrlParser.getExtension(), '.jpg');
	});
	await t.test('URL', () => {
		assert.equal(paapiItemImageUrlParser.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
	});
});

await test('幅指定 URL の幅を変更（直接指定）', async (t) => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	paapiItemImageUrlParser.setSize(500);

	await t.test('size', () => {
		assert.equal(paapiItemImageUrlParser.getSize(), 500);
	});
	await t.test('URL', () => {
		assert.equal(paapiItemImageUrlParser.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL._SL500_.jpg');
	});
});

await test('幅指定 URL の幅を変更（乗算指定）', async (t) => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	paapiItemImageUrlParser.setSizeMultiply(2);

	await t.test('size', () => {
		assert.equal(paapiItemImageUrlParser.getSize(), 320);
	});
	await t.test('URL', () => {
		assert.equal(paapiItemImageUrlParser.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL._SL320_.jpg');
	});
});

await test('幅指定 URL の幅を変更（乗算指定・普通に計算すると 0 になってしまうケース）', async (t) => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	paapiItemImageUrlParser.setSizeMultiply(0.001);

	await t.test('size', () => {
		assert.equal(paapiItemImageUrlParser.getSize(), 1);
	});
	await t.test('URL', () => {
		assert.equal(paapiItemImageUrlParser.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL._SL1_.jpg');
	});
});

await test('幅指定 URL の幅を変更（除算指定）', async (t) => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	paapiItemImageUrlParser.setSizeDivision(2);

	await t.test('size', () => {
		assert.equal(paapiItemImageUrlParser.getSize(), 80);
	});
	await t.test('URL', () => {
		assert.equal(paapiItemImageUrlParser.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL._SL80_.jpg');
	});
});

await test('幅指定 URL の幅を変更（除算指定・普通に計算すると 0 になってしまうケース）', async (t) => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	paapiItemImageUrlParser.setSizeDivision(500);

	await t.test('size', () => {
		assert.equal(paapiItemImageUrlParser.getSize(), 1);
	});
	await t.test('URL', () => {
		assert.equal(paapiItemImageUrlParser.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL._SL1_.jpg');
	});
});

await test('幅指定 URL の幅を削除', async (t) => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	paapiItemImageUrlParser.removeSize();

	await t.test('size', () => {
		assert.equal(paapiItemImageUrlParser.getSize(), null);
	});
	await t.test('URL', () => {
		assert.equal(paapiItemImageUrlParser.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL.jpg');
	});
});

await test('invalid', async (t) => {
	await t.test('ID に想定外記号', () => {
		assert.throws(
			() => {
				const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL^._SL160_.jpg');
				new PaapiItemImageUrlParser(url);
			},
			{ name: 'Error', message: 'The format of the URL does not seem to be that of an Amazon product image.' },
		);
	});

	await t.test('幅なし', () => {
		assert.throws(
			() => {
				const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL_.jpg');
				new PaapiItemImageUrlParser(url);
			},
			{ name: 'Error', message: 'The format of the URL does not seem to be that of an Amazon product image.' },
		);
	});

	await t.test('拡張子なし', () => {
		assert.throws(
			() => {
				const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_');
				new PaapiItemImageUrlParser(url);
			},
			{ name: 'Error', message: 'The format of the URL does not seem to be that of an Amazon product image.' },
		);
	});

	await t.test('画像幅の直接指定で 0 を指定', () => {
		assert.throws(
			() => {
				const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
				const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);
				paapiItemImageUrlParser.setSize(0);
			},
			{ name: 'RangeError', message: 'The image size must be a value greater than or equal to 1 (px).' },
		);
	});

	await t.test('画像幅の直接指定で小数を指定', () => {
		assert.throws(
			() => {
				const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
				const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);
				paapiItemImageUrlParser.setSize(2.5);
			},
			{ name: 'TypeError', message: 'The image size must be specified as an integer.' },
		);
	});

	await t.test('画像幅の乗算で 0 を指定', () => {
		assert.throws(
			() => {
				const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
				const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);
				paapiItemImageUrlParser.setSizeMultiply(0);
			},
			{ name: 'RangeError', message: 'The value to be multiply must be greater than zero.' },
		);
	});

	await t.test('画像幅の除算で 0 を指定', () => {
		assert.throws(
			() => {
				const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
				const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);
				paapiItemImageUrlParser.setSizeDivision(0);
			},
			{ name: 'RangeError', message: 'The value to be division must be greater than zero.' },
		);
	});
});

await test('値渡し', () => {
	const url = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
	const paapiItemImageUrlParser = new PaapiItemImageUrlParser(url);

	const beforeUrl = paapiItemImageUrlParser.getURL();

	paapiItemImageUrlParser.setSize(320);

	const afterUrl = paapiItemImageUrlParser.getURL();

	assert.equal(beforeUrl.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
	assert.equal(afterUrl.toString(), 'https://m.media-amazon.com/images/I/5198TOs+rnL._SL320_.jpg');
});
