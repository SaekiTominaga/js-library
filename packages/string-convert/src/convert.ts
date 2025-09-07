import { getSequence as getNewlineSequence } from './util/newline.ts';
import type { Option } from './index.ts';

/**
 * Convert execution
 *
 * @param text - Text to be converted
 * @param options - Conversion options
 *
 * @returns Converted text
 */
export const convert = (text: string, options: Readonly<Option>): string => {
	const SPACE = '\u0020'; // 半角スペース
	const IDEOGRAPHIC_SPACE = '\u3000'; // 全角スペース

	const newlineSequence = getNewlineSequence(text);

	let convertedText = text;

	let replacedNewlineSequence = newlineSequence;
	if (options.newline !== undefined && newlineSequence !== undefined) {
		switch (options.newline) {
			case 'CR': {
				replacedNewlineSequence = '\r';
				break;
			}
			case 'LF': {
				replacedNewlineSequence = '\n';
				break;
			}
			case 'CRLF': {
				replacedNewlineSequence = `\r\n`;
				break;
			}
			default:
		}

		/* 改行コードを変換 */
		if (replacedNewlineSequence !== undefined && newlineSequence !== replacedNewlineSequence) {
			convertedText = convertedText.replaceAll(newlineSequence, replacedNewlineSequence);
		}
	}

	if (options.trim) {
		/* 両端の空白を削除 */
		convertedText = convertedText.trim();
	} else if (options.trimMultiLine) {
		/* 行ごとに両端の空白を削除 */
		convertedText = convertedText.trim();

		if (replacedNewlineSequence !== undefined) {
			convertedText = convertedText
				.split(replacedNewlineSequence)
				.map((currentValue) => currentValue.trim())
				.join(replacedNewlineSequence);
		}
	}

	if (options.noBlankLine && replacedNewlineSequence !== undefined) {
		/* 空行を削除 */
		convertedText = convertedText.replaceAll(new RegExp(`[${replacedNewlineSequence}]+`, 'g'), replacedNewlineSequence);
	}

	if (options.toHankakuEisu) {
		/* 英数字を半角化 */
		convertedText = convertedText.replaceAll(/[ａ-ｚＡ-Ｚ０-９]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0xfee0));
	} else if (options.toZenkakuEisu) {
		/* 英数字を全角化 */
		convertedText = convertedText.replaceAll(/[a-zA-Z0-9]/g, (str) => String.fromCharCode(str.charCodeAt(0) + 0xfee0));
	}

	if (options.toHankakuSpace) {
		/* 全角スペースを半角化 */
		convertedText = convertedText.replaceAll(IDEOGRAPHIC_SPACE, SPACE);
	}

	if (options.combineSpace) {
		/* 連続したスペースを統合 */
		convertedText = convertedText.replaceAll(new RegExp(`${SPACE}+`, 'g'), SPACE);
	}

	if (options.toLowerCase) {
		/* 小文字化 */
		convertedText = convertedText.toLowerCase();
	} else if (options.toUpperCase) {
		/* 大文字化 */
		convertedText = convertedText.toUpperCase();
	}

	if (options.table !== undefined) {
		/* 変換テーブルによる変換 */
		for (const [search, replace] of Object.entries(options.table)) {
			convertedText = convertedText.replaceAll(search, replace);
		}
	}

	return convertedText;
};
