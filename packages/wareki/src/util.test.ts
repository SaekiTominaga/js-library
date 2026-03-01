import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { compareEra, getEra } from './util.ts';

await test('getEra', async (t) => {
	await t.test('明治初日の前日', () => {
		assert.equal(getEra(new Date('1868-10-22')), '慶応');
	});

	await t.test('明治初日', () => {
		assert.equal(getEra(new Date('1868-10-23')), 'M');
	});

	await t.test('明治最終日', () => {
		assert.equal(getEra(new Date('1912-07-29')), 'M');
	});

	await t.test('大正初日', () => {
		assert.equal(getEra(new Date('1912-07-30')), 'T');
	});

	await t.test('大正最終日', () => {
		assert.equal(getEra(new Date('1926-12-24')), 'T');
	});

	await t.test('昭和初日', () => {
		assert.equal(getEra(new Date('1926-12-25')), 'S');
	});

	await t.test('昭和最終日', () => {
		assert.equal(getEra(new Date('1989-01-07')), 'S');
	});

	await t.test('平成初日', () => {
		assert.equal(getEra(new Date('1989-01-08')), 'H');
	});

	await t.test('平成最終日', () => {
		assert.equal(getEra(new Date('2019-04-30')), 'H');
	});

	await t.test('令和初日', () => {
		assert.equal(getEra(new Date('2019-05-01')), 'R');
	});
});

await test('compareEra', async (t) => {
	await t.test('慶応 - 明治', () => {
		assert.equal(compareEra(new Date('1868-10-22'), new Date('1868-10-23')), false);
	});

	await t.test('明治', () => {
		assert.equal(compareEra(new Date('1868-10-23'), new Date('1912-07-29')), true);
	});
});
