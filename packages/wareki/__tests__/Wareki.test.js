import { describe, test, expect } from '@jest/globals';
import Wareki from '../dist/Wareki.js';

describe('日付フォーマット', () => {
	test('文字列・YYYY-MM-DD', () => {
		const wareki = new Wareki('2000-01-01');
		expect(wareki.getYear()).toBe('平成12');
	});

	test('文字列・YYYY-MM', () => {
		const wareki = new Wareki('2000-01');
		expect(wareki.getYear()).toBe('平成12');
	});

	test('文字列・YYYY', () => {
		const wareki = new Wareki('2000');
		expect(wareki.getYear()).toBe('平成12');
	});

	test('文字列・不正', () => {
		expect(() => {
			new Wareki('2000/01/01');
		}).toThrow('Date must be in the format `YYYY-MM-DD`, `YYYY-MM`, or `YYYY`');
	});

	test('Date オブジェクト', () => {
		const wareki = new Wareki(new Date('2000-01-01'));
		expect(wareki.getYear()).toBe('平成12');
	});
});

describe('era オプション', () => {
	const wareki = new Wareki('2019-12-31');

	test('無指定', () => {
		expect(wareki.getYear()).toBe('令和元');
	});

	test('long', () => {
		expect(wareki.getYear({ era: 'long' })).toBe('令和元');
	});

	test('short', () => {
		expect(wareki.getYear({ era: 'short' })).toBe('令和元');
	});

	test('narrow', () => {
		expect(wareki.getYear({ era: 'narrow' })).toBe('R元');
	});
});

describe('元号の境目・YYYY-MM-DD', () => {
	test('明治初日の前日', () => {
		const wareki = new Wareki('1868-09-07');
		expect(wareki.getYear()).toBe('慶応4');
	});

	test('明治初日', () => {
		const wareki = new Wareki('1868-09-08');
		expect(wareki.getYear()).toBe('明治元');
	});

	test('明治最終日', () => {
		const wareki = new Wareki('1912-07-29');
		expect(wareki.getYear()).toBe('明治45');
	});

	test('大正初日', () => {
		const wareki = new Wareki('1912-07-30');
		expect(wareki.getYear()).toBe('大正元');
	});

	test('大正最終日', () => {
		const wareki = new Wareki('1926-12-24');
		expect(wareki.getYear()).toBe('大正15');
	});

	test('昭和初日', () => {
		const wareki = new Wareki('1926-12-25');
		expect(wareki.getYear()).toBe('昭和元');
	});

	test('昭和最終日', () => {
		const wareki = new Wareki('1989-01-07');
		expect(wareki.getYear()).toBe('昭和64');
	});

	test('平成初日', () => {
		const wareki = new Wareki('1989-01-08');
		expect(wareki.getYear()).toBe('平成元');
	});

	test('平成最終日', () => {
		const wareki = new Wareki('2019-04-30');
		expect(wareki.getYear()).toBe('平成31');
	});

	test('令和初日', () => {
		const wareki = new Wareki('2019-05-01');
		expect(wareki.getYear()).toBe('令和元');
	});
});

describe('元号の境目・YYYY-MM', () => {
	test('明治初日の前月', () => {
		const wareki = new Wareki('1868-08');
		expect(wareki.getYear()).toBe('慶応4');
	});

	test('明治初日', () => {
		const wareki = new Wareki('1868-09');
		expect(wareki.getYear()).toBeUndefined();
	});

	test('明治初日の翌月', () => {
		const wareki = new Wareki('1868-10');
		expect(wareki.getYear()).toBe('明治元');
	});

	test('明治最終日の前月', () => {
		const wareki = new Wareki('1912-06');
		expect(wareki.getYear()).toBe('明治45');
	});

	test('明治最終日', () => {
		const wareki = new Wareki('1912-07');
		expect(wareki.getYear()).toBeUndefined();
	});

	test('大正初日の翌月', () => {
		const wareki = new Wareki('1912-08');
		expect(wareki.getYear()).toBe('大正元');
	});

	test('大正最終日の前月', () => {
		const wareki = new Wareki('1926-11');
		expect(wareki.getYear()).toBe('大正15');
	});

	test('大正最終日', () => {
		const wareki = new Wareki('1926-12');
		expect(wareki.getYear()).toBeUndefined();
	});

	test('昭和初日の翌月', () => {
		const wareki = new Wareki('1927-01');
		expect(wareki.getYear()).toBe('昭和2');
	});

	test('昭和最終日の前月', () => {
		const wareki = new Wareki('1988-12');
		expect(wareki.getYear()).toBe('昭和63');
	});

	test('昭和最終日', () => {
		const wareki = new Wareki('1989-01');
		expect(wareki.getYear()).toBeUndefined();
	});

	test('平成初日の翌月', () => {
		const wareki = new Wareki('1989-02');
		expect(wareki.getYear()).toBe('平成元');
	});

	test('平成最終日の前月', () => {
		const wareki = new Wareki('2019-03');
		expect(wareki.getYear()).toBe('平成31');
	});

	test('平成最終日', () => {
		const wareki = new Wareki('2019-04');
		expect(wareki.getYear()).toBe('平成31');
	});

	test('令和初日', () => {
		const wareki = new Wareki('2019-05');
		expect(wareki.getYear()).toBe('令和元');
	});

	test('令和初日の翌月', () => {
		const wareki = new Wareki('2019-06');
		expect(wareki.getYear()).toBe('令和元');
	});
});

describe('元号の境目・YYYY', () => {
	test('明治初日の前年', () => {
		const wareki = new Wareki('1867');
		expect(wareki.getYear()).toBe('慶応3');
	});

	test('明治初日', () => {
		const wareki = new Wareki('1868');
		expect(wareki.getYear()).toBeUndefined();
	});

	test('明治初日の翌年', () => {
		const wareki = new Wareki('1869');
		expect(wareki.getYear()).toBe('明治2');
	});

	test('明治最終日の前年', () => {
		const wareki = new Wareki('1911');
		expect(wareki.getYear()).toBe('明治44');
	});

	test('明治最終日', () => {
		const wareki = new Wareki('1912');
		expect(wareki.getYear()).toBeUndefined();
	});

	test('大正初日の翌年', () => {
		const wareki = new Wareki('1913');
		expect(wareki.getYear()).toBe('大正2');
	});

	test('大正最終日の前年', () => {
		const wareki = new Wareki('1925');
		expect(wareki.getYear()).toBe('大正14');
	});

	test('大正最終日', () => {
		const wareki = new Wareki('1926');
		expect(wareki.getYear()).toBeUndefined();
	});

	test('昭和初日の翌年', () => {
		const wareki = new Wareki('1927');
		expect(wareki.getYear()).toBe('昭和2');
	});

	test('昭和最終日の前年', () => {
		const wareki = new Wareki('1988');
		expect(wareki.getYear()).toBe('昭和63');
	});

	test('昭和最終日', () => {
		const wareki = new Wareki('1989');
		expect(wareki.getYear()).toBeUndefined();
	});

	test('平成初日の翌年', () => {
		const wareki = new Wareki('1990');
		expect(wareki.getYear()).toBe('平成2');
	});

	test('平成最終日の前年', () => {
		const wareki = new Wareki('2018');
		expect(wareki.getYear()).toBe('平成30');
	});

	test('平成最終日', () => {
		const wareki = new Wareki('2019');
		expect(wareki.getYear()).toBeUndefined();
	});

	test('令和初日の翌年', () => {
		const wareki = new Wareki('2020');
		expect(wareki.getYear()).toBe('令和2');
	});
});
