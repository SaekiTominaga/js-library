import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import IsbnVerify from './ISBN.js';

await test('ISBN-13（ハイフンあり）', async (t) => {
	const isbnVerify = new IsbnVerify('978-4-06-519981-7');

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), true);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), true);
	});
	await t.test('13桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn13({ check_digit: true }), true);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), false);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), true);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), true);
	});
});

await test('ISBN-13（ハイフンあり・Strictモード）', async (t) => {
	const isbnVerify = new IsbnVerify('978-4-06-519981-7', { strict: true });

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), true);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), true);
	});
	await t.test('13桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn13({ check_digit: true }), true);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), false);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), true);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), true);
	});
});

await test('ISBN-13（ハイフンなし）', async (t) => {
	const isbnVerify = new IsbnVerify('9784065199817');

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), true);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), true);
	});
	await t.test('13桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn13({ check_digit: true }), true);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), false);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), true);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), true);
	});
});

await test('ISBN-13（ハイフンなし・Strictモード）', async (t) => {
	const isbnVerify = new IsbnVerify('9784065199817', { strict: true });

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), false);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), false);
	});
	await t.test('13桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn13({ check_digit: true }), false);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), false);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), false);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), false);
	});
});

await test('ISBN-10（ハイフンあり）', async (t) => {
	const isbnVerify = new IsbnVerify('4-06-519981-6');

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), true);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), false);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), true);
	});
	await t.test('10桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn10({ check_digit: true }), true);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), true);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), true);
	});
});

await test('ISBN-10（ハイフンあり・Strictモード）', async (t) => {
	const isbnVerify = new IsbnVerify('4-06-519981-6', { strict: true });

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), true);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), false);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), true);
	});
	await t.test('10桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn10({ check_digit: true }), true);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), true);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), true);
	});
});

await test('ISBN-10（ハイフンなし）', async (t) => {
	const isbnVerify = new IsbnVerify('4065199816');

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), true);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), false);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), true);
	});
	await t.test('10桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn10({ check_digit: true }), true);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), true);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), true);
	});
});

await test('ISBN-10（ハイフンなし・Strictモード）', async (t) => {
	const isbnVerify = new IsbnVerify('4065199816', { strict: true });

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), false);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), false);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), false);
	});
	await t.test('10桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn10({ check_digit: true }), false);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), false);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), false);
	});
});

await test('ISBN-13（ハイフンあり）、チェックデジットが違う', async (t) => {
	const isbnVerify = new IsbnVerify('978-4-06-519981-0');

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), false);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), true);
	});
	await t.test('13桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn13({ check_digit: true }), false);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), false);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), true);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), false);
	});
});

await test('ISBN-13（ハイフンなし）、チェックデジットが違う', async (t) => {
	const isbnVerify = new IsbnVerify('9784065199810');

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), false);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), true);
	});
	await t.test('13桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn13({ check_digit: true }), false);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), false);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), true);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), false);
	});
});

await test('ISBN-10（ハイフンあり）、チェックデジットが違う', async (t) => {
	const isbnVerify = new IsbnVerify('4-06-519981-X');

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), false);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), false);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), true);
	});
	await t.test('10桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn10({ check_digit: true }), false);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), true);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), false);
	});
});

await test('ISBN-10（ハイフンなし）、チェックデジットが違う', async (t) => {
	const isbnVerify = new IsbnVerify('406519981X');

	await t.test('正当', () => {
		assert.equal(isbnVerify.isValid(), false);
	});
	await t.test('13桁', () => {
		assert.equal(isbnVerify.isIsbn13(), false);
	});
	await t.test('10桁', () => {
		assert.equal(isbnVerify.isIsbn10(), true);
	});
	await t.test('10桁・チェックデジット', () => {
		assert.equal(isbnVerify.isIsbn10({ check_digit: true }), false);
	});
	await t.test('フォーマットのみ', () => {
		assert.equal(isbnVerify.verify(), true);
	});
	await t.test('チェックデジット', () => {
		assert.equal(isbnVerify.verify({ check_digit: true }), false);
	});
});

await test('ハイフンのパターン', async (t) => {
	await t.test('ISBN-13（ハイフン中途半端）', () => {
		const isbnVerify = new IsbnVerify('978-4065199817');
		assert.equal(isbnVerify.isIsbn13(), true);
	});
	await t.test('ISBN-13（ハイフン中途半端・Strictモード）', () => {
		const isbnVerify = new IsbnVerify('978-4065199817', { strict: true });
		assert.equal(isbnVerify.isIsbn13(), false);
	});
	await t.test('ISBN-13（先頭ハイフン）', () => {
		const isbnVerify = new IsbnVerify('-9784065199817');
		assert.equal(isbnVerify.verify(), false);
	});
	await t.test('ISBN-13（末尾ハイフン）', () => {
		const isbnVerify = new IsbnVerify('978-4065199817-');
		assert.equal(isbnVerify.verify(), false);
	});
	await t.test('ISBN-13（連続ハイフン）', () => {
		const isbnVerify = new IsbnVerify('978--4065199817');
		assert.equal(isbnVerify.verify(), false);
	});
	await t.test('ISBN-13（ハイフン多すぎ）', () => {
		const isbnVerify = new IsbnVerify('978-4-06-519-981-7');
		assert.equal(isbnVerify.verify(), false);
	});
	await t.test('ISBN-10（ハイフン中途半端）', () => {
		const isbnVerify = new IsbnVerify('406-5199816');
		assert.equal(isbnVerify.isIsbn10(), true);
	});
	await t.test('ISBN-10（ハイフン中途半端・Strictモード）', () => {
		const isbnVerify = new IsbnVerify('406-5199816', { strict: true });
		assert.equal(isbnVerify.isIsbn10(), false);
	});
	await t.test('ISBN-10（先頭ハイフン）', () => {
		const isbnVerify = new IsbnVerify('-4065199816');
		assert.equal(isbnVerify.verify(), false);
	});
	await t.test('ISBN-10（末尾ハイフン）', () => {
		const isbnVerify = new IsbnVerify('4065199816-');
		assert.equal(isbnVerify.verify(), false);
	});
	await t.test('ISBN-10（連続ハイフン）', () => {
		const isbnVerify = new IsbnVerify('406--5199816');
		assert.equal(isbnVerify.verify(), false);
	});
	await t.test('ISBN-10（ハイフン多すぎ）', () => {
		const isbnVerify = new IsbnVerify('4-06-519-981-6');
		assert.equal(isbnVerify.verify(), false);
	});
});

await test('いろいろな文字列を入れてみる', async (t) => {
	await t.test('13桁のチェックデジットが 0', () => {
		const isbnVerify = new IsbnVerify('978-4-8356-3517-0');
		assert.equal(isbnVerify.isValid(), true);
	});
	await t.test('10桁のチェックデジットが X', () => {
		const isbnVerify = new IsbnVerify('409126719X');
		assert.equal(isbnVerify.isValid(), true);
	});
	await t.test('10桁のチェックデジットが 0', () => {
		const isbnVerify = new IsbnVerify('4091233090');
		assert.equal(isbnVerify.isValid(), true);
	});
	await t.test('桁数少ない', () => {
		const isbnVerify = new IsbnVerify('978-4-06-519981');
		assert.equal(isbnVerify.isValid(), false);
	});
	await t.test('桁数多い', () => {
		const isbnVerify = new IsbnVerify('978-4-06-519981-70');
		assert.equal(isbnVerify.isValid(), false);
	});
	await t.test('不正な文字列', () => {
		const isbnVerify = new IsbnVerify('hoge');
		assert.equal(isbnVerify.isValid(), false);
	});
});
