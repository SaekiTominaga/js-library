import { describe, test, expect } from '@jest/globals';
import IsbnVerify from '../dist/IsbnVerify.js';

describe('ISBN-13（ハイフンあり）', () => {
	const isbnVerify = new IsbnVerify('978-4-06-519981-7');

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeTruthy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn13({ check_digit: true })).toBeTruthy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeFalsy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeTruthy();
	});
});

describe('ISBN-13（ハイフンあり・Strictモード）', () => {
	const isbnVerify = new IsbnVerify('978-4-06-519981-7', { strict: true });

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeTruthy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn13({ check_digit: true })).toBeTruthy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeFalsy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeTruthy();
	});
});

describe('ISBN-13（ハイフンなし）', () => {
	const isbnVerify = new IsbnVerify('9784065199817');

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeTruthy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn13({ check_digit: true })).toBeTruthy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeFalsy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeTruthy();
	});
});

describe('ISBN-13（ハイフンなし・Strictモード）', () => {
	const isbnVerify = new IsbnVerify('9784065199817', { strict: true });

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeFalsy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn13({ check_digit: true })).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeFalsy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeFalsy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeFalsy();
	});
});

describe('ISBN-10（ハイフンあり）', () => {
	const isbnVerify = new IsbnVerify('4-06-519981-6');

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeTruthy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn10({ check_digit: true })).toBeTruthy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeTruthy();
	});
});

describe('ISBN-10（ハイフンあり・Strictモード）', () => {
	const isbnVerify = new IsbnVerify('4-06-519981-6', { strict: true });

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeTruthy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn10({ check_digit: true })).toBeTruthy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeTruthy();
	});
});

describe('ISBN-10（ハイフンなし）', () => {
	const isbnVerify = new IsbnVerify('4065199816');

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeTruthy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeTruthy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn10({ check_digit: true })).toBeTruthy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeTruthy();
	});
});

describe('ISBN-10（ハイフンなし・Strictモード）', () => {
	const isbnVerify = new IsbnVerify('4065199816', { strict: true });

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeFalsy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn10({ check_digit: true })).toBeFalsy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeFalsy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeFalsy();
	});
});

describe('ISBN-13（ハイフンあり）、チェックデジットが違う', () => {
	const isbnVerify = new IsbnVerify('978-4-06-519981-0');

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeTruthy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn13({ check_digit: true })).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeFalsy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeFalsy();
	});
});

describe('ISBN-13（ハイフンなし）、チェックデジットが違う', () => {
	const isbnVerify = new IsbnVerify('9784065199810');

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeTruthy();
	});
	test('13桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn13({ check_digit: true })).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeFalsy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeFalsy();
	});
});

describe('ISBN-10（ハイフンあり）、チェックデジットが違う', () => {
	const isbnVerify = new IsbnVerify('4-06-519981-X');

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeTruthy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn10({ check_digit: true })).toBeFalsy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeFalsy();
	});
});

describe('ISBN-10（ハイフンなし）、チェックデジットが違う', () => {
	const isbnVerify = new IsbnVerify('406519981X');

	test('正当', () => {
		expect(isbnVerify.isValid()).toBeFalsy();
	});
	test('13桁', () => {
		expect(isbnVerify.isIsbn13()).toBeFalsy();
	});
	test('10桁', () => {
		expect(isbnVerify.isIsbn10()).toBeTruthy();
	});
	test('10桁・チェックデジット', () => {
		expect(isbnVerify.isIsbn10({ check_digit: true })).toBeFalsy();
	});
	test('フォーマットのみ', () => {
		expect(isbnVerify.verify()).toBeTruthy();
	});
	test('チェックデジット', () => {
		expect(isbnVerify.verify({ check_digit: true })).toBeFalsy();
	});
});

describe('ハイフンのパターン', () => {
	test('ISBN-13（ハイフン中途半端）', () => {
		const isbnVerify = new IsbnVerify('978-4065199817');
		expect(isbnVerify.isIsbn13()).toBeTruthy();
	});
	test('ISBN-13（ハイフン中途半端・Strictモード）', () => {
		const isbnVerify = new IsbnVerify('978-4065199817', { strict: true });
		expect(isbnVerify.isIsbn13()).toBeFalsy();
	});
	test('ISBN-13（先頭ハイフン）', () => {
		const isbnVerify = new IsbnVerify('-9784065199817');
		expect(isbnVerify.verify()).toBeFalsy();
	});
	test('ISBN-13（末尾ハイフン）', () => {
		const isbnVerify = new IsbnVerify('978-4065199817-');
		expect(isbnVerify.verify()).toBeFalsy();
	});
	test('ISBN-13（連続ハイフン）', () => {
		const isbnVerify = new IsbnVerify('978--4065199817');
		expect(isbnVerify.verify()).toBeFalsy();
	});
	test('ISBN-13（ハイフン多すぎ）', () => {
		const isbnVerify = new IsbnVerify('978-4-06-519-981-7');
		expect(isbnVerify.verify()).toBeFalsy();
	});
	test('ISBN-10（ハイフン中途半端）', () => {
		const isbnVerify = new IsbnVerify('406-5199816');
		expect(isbnVerify.isIsbn10()).toBeTruthy();
	});
	test('ISBN-10（ハイフン中途半端・Strictモード）', () => {
		const isbnVerify = new IsbnVerify('406-5199816', { strict: true });
		expect(isbnVerify.isIsbn10()).toBeFalsy();
	});
	test('ISBN-10（先頭ハイフン）', () => {
		const isbnVerify = new IsbnVerify('-4065199816');
		expect(isbnVerify.verify()).toBeFalsy();
	});
	test('ISBN-10（末尾ハイフン）', () => {
		const isbnVerify = new IsbnVerify('4065199816-');
		expect(isbnVerify.verify()).toBeFalsy();
	});
	test('ISBN-10（連続ハイフン）', () => {
		const isbnVerify = new IsbnVerify('406--5199816');
		expect(isbnVerify.verify()).toBeFalsy();
	});
	test('ISBN-10（ハイフン多すぎ）', () => {
		const isbnVerify = new IsbnVerify('4-06-519-981-6');
		expect(isbnVerify.verify()).toBeFalsy();
	});
});

describe('いろいろな文字列を入れてみる', () => {
	test('13桁のチェックデジットが 0', () => {
		const isbnVerify = new IsbnVerify('978-4-8356-3517-0');
		expect(isbnVerify.isValid()).toBeTruthy();
	});
	test('10桁のチェックデジットが X', () => {
		const isbnVerify = new IsbnVerify('409126719X');
		expect(isbnVerify.isValid()).toBeTruthy();
	});
	test('10桁のチェックデジットが 0', () => {
		const isbnVerify = new IsbnVerify('4091233090');
		expect(isbnVerify.isValid()).toBeTruthy();
	});
	test('桁数少ない', () => {
		const isbnVerify = new IsbnVerify('978-4-06-519981');
		expect(isbnVerify.isValid()).toBeFalsy();
	});
	test('桁数多い', () => {
		const isbnVerify = new IsbnVerify('978-4-06-519981-70');
		expect(isbnVerify.isValid()).toBeFalsy();
	});
	test('不正な文字列', () => {
		const isbnVerify = new IsbnVerify('hoge');
		expect(isbnVerify.isValid()).toBeFalsy();
	});
});
