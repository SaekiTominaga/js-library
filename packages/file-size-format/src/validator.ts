import type { Option } from './index.ts';

/**
 * オプションの初期処理
 *
 * @param options - オプション
 *
 * @returns 整形されたファイルサイズ
 */
export const option = (options?: Readonly<Option>): Readonly<Required<Option>> => {
	/* 値のチェック */
	if (options !== undefined) {
		const roundPrecision = options.digits;
		if (roundPrecision !== undefined && (!Number.isInteger(roundPrecision) || roundPrecision < 0)) {
			throw new RangeError('The options `digits` must be an integer greater than or equal to 0.');
		}
	}

	/* 初期値の設定 */
	return {
		space: options?.space ?? false,
		byte: options?.byte ?? 'byte',
		digits: options?.digits ?? 0,
	};
};
