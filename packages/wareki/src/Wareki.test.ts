import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import Wareki from './Wareki.ts';

await test('日付フォーマット', async (t) => {
	await t.test('文字列・YYYY-MM-DD', () => {
		const wareki = new Wareki('2000-01-01');

		assert.equal(wareki.getYear(), '平成12');
	});

	await t.test('文字列・YYYY-MM', () => {
		const wareki = new Wareki('2000-01');

		assert.equal(wareki.getYear(), '平成12');
	});

	await t.test('文字列・YYYY', () => {
		const wareki = new Wareki('2000');

		assert.equal(wareki.getYear(), '平成12');
	});

	await t.test('文字列・不正', () => {
		assert.throws(
			() => {
				new Wareki('2000/01/01');
			},
			{
				name: 'Error',
				message: 'Date must be in the format `YYYY-MM-DD`, `YYYY-MM`, or `YYYY`',
			},
		);
	});

	await t.test('Date オブジェクト', () => {
		const wareki = new Wareki(new Date('2000-01-01'));

		assert.equal(wareki.getYear(), '平成12');
	});
});

await test('era オプション', async (t) => {
	const wareki = new Wareki('2019-12-31');

	await t.test('無指定', () => {
		assert.equal(wareki.getYear(), '令和元');
	});

	await t.test('long', () => {
		assert.equal(wareki.getYear({ era: 'long' }), '令和元');
	});

	await t.test('short', () => {
		assert.equal(wareki.getYear({ era: 'short' }), '令和元');
	});

	await t.test('narrow', () => {
		assert.equal(wareki.getYear({ era: 'narrow' }), 'R元');
	});
});

await test('元号の境目', async (t) => {
	await t.test('YYYY-MM', () => {
		const wareki = new Wareki('1989-01'); // 昭和最終日

		assert.equal(wareki.getYear(), undefined);
	});

	await t.test('YYYY', () => {
		const wareki = new Wareki('2019'); // 平成最終日

		assert.equal(wareki.getYear(), undefined);
	});
});
