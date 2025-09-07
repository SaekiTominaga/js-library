import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { getSequence } from './newline.ts';

await test('single line', () => {
	assert.equal(getSequence('hogepiyofuga'), undefined);
});

await test('CR', () => {
	assert.equal(getSequence('hoge\rpiyo\rfuga'), '\r');
});

await test('LF', () => {
	assert.equal(getSequence('hoge\npiyo\nfuga'), '\n');
});

await test('CRLF', () => {
	assert.equal(getSequence('hoge\r\npiyo\r\nfuga'), '\r\n');
});

await test('CR + LF', () => {
	assert.throws(
		() => {
			getSequence('hoge\rpiyo\nfuga');
		},
		{ name: 'Error', message: 'Multiple newline codes are mixed (CR, LF)' },
	);
});

await test('CR + CRLF', () => {
	assert.throws(
		() => {
			getSequence('hoge\rpiyo\r\nfuga');
		},
		{ name: 'Error', message: 'Multiple newline codes are mixed (CR, CR+LF)' },
	);
});

await test('LF + CR', () => {
	assert.throws(
		() => {
			getSequence('hoge\npiyo\rfuga');
		},
		{ name: 'Error', message: 'Multiple newline codes are mixed (CR, LF)' },
	);
});

await test('LF + CRLF', () => {
	assert.throws(
		() => {
			getSequence('hoge\npiyo\r\nfuga');
		},
		{ name: 'Error', message: 'Multiple newline codes are mixed (LF, CR+LF)' },
	);
});

await test('CRLF + CR', () => {
	assert.throws(
		() => {
			getSequence('hoge\r\npiyo\rfuga');
		},
		{ name: 'Error', message: 'Multiple newline codes are mixed (CR, CR+LF)' },
	);
});

await test('CRLF + LF', () => {
	assert.throws(
		() => {
			getSequence('hoge\r\npiyo\nfuga');
		},
		{ name: 'Error', message: 'Multiple newline codes are mixed (LF, CR+LF)' },
	);
});
