import type { NewlineSequence } from '../index.ts';

/**
 * 改行コードを判定する
 *
 * @param text 判定対象の文字列
 *
 * @returns 改行コード
 */
export const getSequence = (text: string): NewlineSequence | undefined => {
	const CR = '\r';
	const LF = '\n';
	const CRLF = `${CR}${LF}`;

	const existCr = new RegExp(`${CR}(?!${LF})`).test(text);
	const existLf = new RegExp(`(?<!${CR})${LF}`).test(text);
	const existCrlf = text.includes(CRLF);

	if (existCr && existLf) {
		throw new Error('Multiple newline codes are mixed (CR, LF)');
	}
	if (existCr && existCrlf) {
		throw new Error('Multiple newline codes are mixed (CR, CR+LF)');
	}
	if (existLf && existCrlf) {
		throw new Error('Multiple newline codes are mixed (LF, CR+LF)');
	}

	if (existCr) {
		return CR;
	} else if (existLf) {
		return LF;
	} else if (existCrlf) {
		return CRLF;
	}

	return undefined;
};
