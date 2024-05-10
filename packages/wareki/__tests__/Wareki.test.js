import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import Wareki from '../dist/Wareki.js';

test('日付フォーマット', async (t) => {
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
			{ name: 'Error', message: 'Date must be in the format `YYYY-MM-DD`, `YYYY-MM`, or `YYYY`' },
		);
	});

	await t.test('Date オブジェクト', () => {
		const wareki = new Wareki(new Date('2000-01-01'));

		assert.equal(wareki.getYear(), '平成12');
	});
});

test('era オプション', async (t) => {
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

test('元号の境目・YYYY-MM-DD', async (t) => {
	await t.test('明治初日の前日', () => {
		const wareki = new Wareki('1868-09-07');

		assert.equal(wareki.getYear(), '慶応4');
	});

	await t.test('明治初日', () => {
		const wareki = new Wareki('1868-09-08');

		assert.equal(wareki.getYear(), '明治元');
	});

	await t.test('明治最終日', () => {
		const wareki = new Wareki('1912-07-29');

		assert.equal(wareki.getYear(), '明治45');
	});

	await t.test('大正初日', () => {
		const wareki = new Wareki('1912-07-30');

		assert.equal(wareki.getYear(), '大正元');
	});

	await t.test('大正最終日', () => {
		const wareki = new Wareki('1926-12-24');

		assert.equal(wareki.getYear(), '大正15');
	});

	await t.test('昭和初日', () => {
		const wareki = new Wareki('1926-12-25');

		assert.equal(wareki.getYear(), '昭和元');
	});

	await t.test('昭和最終日', () => {
		const wareki = new Wareki('1989-01-07');

		assert.equal(wareki.getYear(), '昭和64');
	});

	await t.test('平成初日', () => {
		const wareki = new Wareki('1989-01-08');

		assert.equal(wareki.getYear(), '平成元');
	});

	await t.test('平成最終日', () => {
		const wareki = new Wareki('2019-04-30');

		assert.equal(wareki.getYear(), '平成31');
	});

	await t.test('令和初日', () => {
		const wareki = new Wareki('2019-05-01');

		assert.equal(wareki.getYear(), '令和元');
	});
});

test('元号の境目・YYYY-MM', async (t) => {
	await t.test('明治初日の前月', () => {
		const wareki = new Wareki('1868-08');

		assert.equal(wareki.getYear(), '慶応4');
	});

	await t.test('明治初日', () => {
		const wareki = new Wareki('1868-09');

		assert.equal(wareki.getYear(), undefined);
	});

	await t.test('明治初日の翌月', () => {
		const wareki = new Wareki('1868-10');

		assert.equal(wareki.getYear(), '明治元');
	});

	await t.test('明治最終日の前月', () => {
		const wareki = new Wareki('1912-06');

		assert.equal(wareki.getYear(), '明治45');
	});

	await t.test('明治最終日', () => {
		const wareki = new Wareki('1912-07');

		assert.equal(wareki.getYear(), undefined);
	});

	await t.test('大正初日の翌月', () => {
		const wareki = new Wareki('1912-08');

		assert.equal(wareki.getYear(), '大正元');
	});

	await t.test('大正最終日の前月', () => {
		const wareki = new Wareki('1926-11');

		assert.equal(wareki.getYear(), '大正15');
	});

	await t.test('大正最終日', () => {
		const wareki = new Wareki('1926-12');

		assert.equal(wareki.getYear(), undefined);
	});

	await t.test('昭和初日の翌月', () => {
		const wareki = new Wareki('1927-01');

		assert.equal(wareki.getYear(), '昭和2');
	});

	await t.test('昭和最終日の前月', () => {
		const wareki = new Wareki('1988-12');

		assert.equal(wareki.getYear(), '昭和63');
	});

	await t.test('昭和最終日', () => {
		const wareki = new Wareki('1989-01');

		assert.equal(wareki.getYear(), undefined);
	});

	await t.test('平成初日の翌月', () => {
		const wareki = new Wareki('1989-02');

		assert.equal(wareki.getYear(), '平成元');
	});

	await t.test('平成最終日の前月', () => {
		const wareki = new Wareki('2019-03');

		assert.equal(wareki.getYear(), '平成31');
	});

	await t.test('平成最終日', () => {
		const wareki = new Wareki('2019-04');

		assert.equal(wareki.getYear(), '平成31');
	});

	await t.test('令和初日', () => {
		const wareki = new Wareki('2019-05');

		assert.equal(wareki.getYear(), '令和元');
	});

	await t.test('令和初日の翌月', () => {
		const wareki = new Wareki('2019-06');

		assert.equal(wareki.getYear(), '令和元');
	});
});

test('元号の境目・YYYY', async (t) => {
	await t.test('明治初日の前年', () => {
		const wareki = new Wareki('1867');

		assert.equal(wareki.getYear(), '慶応3');
	});

	await t.test('明治初日', () => {
		const wareki = new Wareki('1868');

		assert.equal(wareki.getYear(), undefined);
	});

	await t.test('明治初日の翌年', () => {
		const wareki = new Wareki('1869');

		assert.equal(wareki.getYear(), '明治2');
	});

	await t.test('明治最終日の前年', () => {
		const wareki = new Wareki('1911');

		assert.equal(wareki.getYear(), '明治44');
	});

	await t.test('明治最終日', () => {
		const wareki = new Wareki('1912');

		assert.equal(wareki.getYear(), undefined);
	});

	await t.test('大正初日の翌年', () => {
		const wareki = new Wareki('1913');

		assert.equal(wareki.getYear(), '大正2');
	});

	await t.test('大正最終日の前年', () => {
		const wareki = new Wareki('1925');

		assert.equal(wareki.getYear(), '大正14');
	});

	await t.test('大正最終日', () => {
		const wareki = new Wareki('1926');

		assert.equal(wareki.getYear(), undefined);
	});

	await t.test('昭和初日の翌年', () => {
		const wareki = new Wareki('1927');

		assert.equal(wareki.getYear(), '昭和2');
	});

	await t.test('昭和最終日の前年', () => {
		const wareki = new Wareki('1988');

		assert.equal(wareki.getYear(), '昭和63');
	});

	await t.test('昭和最終日', () => {
		const wareki = new Wareki('1989');

		assert.equal(wareki.getYear(), undefined);
	});

	await t.test('平成初日の翌年', () => {
		const wareki = new Wareki('1990');

		assert.equal(wareki.getYear(), '平成2');
	});

	await t.test('平成最終日の前年', () => {
		const wareki = new Wareki('2018');

		assert.equal(wareki.getYear(), '平成30');
	});

	await t.test('平成最終日', () => {
		const wareki = new Wareki('2019');

		assert.equal(wareki.getYear(), undefined);
	});

	await t.test('令和初日の翌年', () => {
		const wareki = new Wareki('2020');

		assert.equal(wareki.getYear(), '令和2');
	});
});
