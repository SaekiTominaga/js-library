import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { iec, si } from './format.ts';

await test('2進接頭辞', async (t) => {
	await t.test('Byte - min', () => {
		assert.equal(iec(0), '0byte');
	});

	await t.test('Byte - max', () => {
		assert.equal(iec(1024 ** 1 - 1), '1023byte');
	});

	await t.test('KiB - min', () => {
		assert.equal(iec(1024 ** 1), '1KiB');
	});

	await t.test('KiB - max', () => {
		assert.equal(iec(1024 ** 2 - 1), '1024KiB');
	});

	await t.test('MiB - min', () => {
		assert.equal(iec(1024 ** 2), '1MiB');
	});

	await t.test('MiB - max', () => {
		assert.equal(iec(1024 ** 3 - 1), '1024MiB');
	});

	await t.test('GiB - min', () => {
		assert.equal(iec(1024 ** 3), '1GiB');
	});

	await t.test('GiB - max', () => {
		assert.equal(iec(1024 ** 4 - 1), '1024GiB');
	});

	await t.test('TiB - min', () => {
		assert.equal(iec(1024 ** 4), '1TiB');
	});

	await t.test('TiB - max', () => {
		assert.equal(iec(1024 ** 5 - 1), '1024TiB');
	});

	await t.test('PiB - min', () => {
		assert.equal(iec(1024 ** 5), '1PiB');
	});

	await t.test('PiB - max', () => {
		assert.equal(iec(BigInt('1152921504606846975')), '1024PiB');
	});

	await t.test('EiB - min', () => {
		assert.equal(iec(BigInt('1152921504606846976')), '1EiB');
	});

	await t.test('EiB - max', () => {
		assert.equal(iec(BigInt('1180591620717411303423')), '1024EiB');
	});

	await t.test('ZiB - min', () => {
		assert.equal(iec(BigInt('1180591620717411303424')), '1ZiB');
	});

	await t.test('ZiB - max', () => {
		assert.equal(iec(BigInt('1208925819614629174706175')), '1024ZiB');
	});

	await t.test('YiB - min', () => {
		assert.equal(iec(BigInt('1208925819614629174706176')), '1YiB');
	});

	await t.test('YiB - max', () => {
		assert.equal(iec(BigInt('1237940039285380274899124223')), '1024YiB');
	});

	await t.test('YiB - over', () => {
		assert.equal(iec(BigInt('1237940039285380274899124224')), '1024YiB');
	});
});

await test('SI接頭辞', async (t) => {
	await t.test('Byte - min', () => {
		assert.equal(si(0), '0byte');
	});

	await t.test('Byte - max', () => {
		assert.equal(si(1000 ** 1 - 1), '999byte');
	});

	await t.test('KB - min', () => {
		assert.equal(si(1000 ** 1), '1kB');
	});

	await t.test('KB - max', () => {
		assert.equal(si(1000 ** 2 - 1), '1000kB');
	});

	await t.test('MB - min', () => {
		assert.equal(si(1000 ** 2), '1MB');
	});

	await t.test('MB - max', () => {
		assert.equal(si(1000 ** 3 - 1), '1000MB');
	});

	await t.test('GB - min', () => {
		assert.equal(si(1000 ** 3), '1GB');
	});

	await t.test('GB - max', () => {
		assert.equal(si(1000 ** 4 - 1), '1000GB');
	});

	await t.test('TB - min', () => {
		assert.equal(si(1000 ** 4), '1TB');
	});

	await t.test('TB - max', () => {
		assert.equal(si(1000 ** 5 - 1), '1000TB');
	});

	await t.test('PB - min', () => {
		assert.equal(si(1000 ** 5), '1PB');
	});

	await t.test('PB - max', () => {
		assert.equal(si(BigInt('999999999999999999')), '1000PB');
	});

	await t.test('EB - min', () => {
		assert.equal(si(BigInt('1000000000000000000')), '1EB');
	});

	await t.test('EB - max', () => {
		assert.equal(si(BigInt('999999999999999999999')), '1000EB');
	});

	await t.test('ZB - min', () => {
		assert.equal(si(BigInt('1000000000000000000000')), '1ZB');
	});

	await t.test('ZB - max', () => {
		assert.equal(si(BigInt('999999999999999999999999')), '1000ZB');
	});

	await t.test('YB - min', () => {
		assert.equal(si(BigInt('1000000000000000000000000')), '1YB');
	});

	await t.test('YB - max', () => {
		assert.equal(si(BigInt('999999999999999999999999999')), '1000YB');
	});

	await t.test('YB - over', () => {
		assert.equal(si(BigInt('1000000000000000000000000000')), '1000YB');
	});
});

await test('オプション', async (t) => {
	await t.test('byte (IEC・Number)', () => {
		assert.equal(iec(512, { byte: 'B' }), '512B');
	});

	await t.test('byte (SI・BigInt)', () => {
		assert.equal(si(BigInt(512), { byte: 'B' }), '512B');
	});

	await t.test('space (IEC・Number)', () => {
		assert.equal(iec(1024, { space: true }), '1 KiB');
	});

	await t.test('space (SI・BigInt)', () => {
		assert.equal(si(BigInt(1024), { space: true }), '1 kB');
	});

	await t.test('digits (IEC・Number)', () => {
		assert.equal(iec(1280, { digits: 1 }), '1.3KiB');
	});

	await t.test('digits (IEC・Number)', () => {
		assert.equal(iec(1280, { digits: 3 }), '1.25KiB');
	});

	await t.test('digits (SI・BigInt)', () => {
		assert.equal(si(BigInt(1280), { digits: 2 }), '1kB'); // BigInt なので効果なし
	});
});

await test('不正な値', async (t) => {
	await t.test('マイナス (Number)', () => {
		assert.throws(
			() => {
				iec(-1);
			},
			{
				name: 'RangeError',
				message: 'The file size must be a number greater than or equal to 0.',
			},
		);
	});

	await t.test('マイナス (BigInt)', () => {
		assert.throws(
			() => {
				iec(BigInt(-1));
			},
			{
				name: 'RangeError',
				message: 'The file size must be a number greater than or equal to 0.',
			},
		);
	});

	await t.test('NaN', () => {
		assert.throws(
			() => {
				iec(NaN);
			},
			{
				name: 'RangeError',
				message: 'The file size must be a number greater than or equal to 0.',
			},
		);
	});

	await t.test('Infinity', () => {
		assert.throws(
			() => {
				iec(Infinity);
			},
			{
				name: 'RangeError',
				message: 'The file size must be a number greater than or equal to 0.',
			},
		);
	});

	await t.test('unsafe', () => {
		assert.throws(
			() => {
				iec(9007199254740992);
			},
			{
				name: 'RangeError',
				message: '`BigInt` should be used when specifying huge numbers (Value greater than 9007199254740991).',
			},
		);
	});
});
