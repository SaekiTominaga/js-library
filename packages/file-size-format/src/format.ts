import { option as optionValidator } from './validator.ts';
import type { Option } from './index.ts';

type UnitTable = Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, string>;

/**
 * ファイルサイズを整形する
 *
 * @param size - ファイルサイズ
 * @param base - k → M → G のように単位が変わるまでの差分バイト数
 * @param unitTable - 単位情報
 * @param options - オプション
 *
 * @returns 整形されたファイルサイズ
 */
const format = (size: number | bigint, base: number, unitTable: Readonly<UnitTable>, options: Readonly<Required<Option>>): string => {
	if (size < 0) {
		throw new RangeError('The file size must be a number greater than or equal to 0.');
	}

	const space = options.space ? ' ' : '';

	if (typeof size === 'number') {
		/* Number */
		if (Number.isNaN(size) || !Number.isFinite(size)) {
			throw new RangeError('The file size must be a number greater than or equal to 0.');
		}
		if (!Number.isSafeInteger(size)) {
			throw new RangeError(`\`BigInt\` should be used when specifying huge numbers (Value greater than ${String(Number.MAX_SAFE_INTEGER)}).`);
		}

		const chusu = 10 ** options.digits;

		const findUnitTable = Object.entries(unitTable).find(([exponent]) => size < base ** Number(exponent));
		if (findUnitTable === undefined) {
			throw new RangeError();
		}
		const [exponent, unit] = findUnitTable;
		return `${String(Math.round((size / base ** (Number(exponent) - 1)) * chusu) / chusu)}${space}${unit}`;
	}

	/* BigInt */
	const findUnitTable = Object.entries(unitTable).find(([exponent]) => size < BigInt(base) ** BigInt(exponent));
	if (findUnitTable !== undefined) {
		const [exponent, unit] = findUnitTable;
		const denominator = BigInt(base) ** (BigInt(exponent) - 1n);
		return `${String((size + denominator / 2n) / denominator)}${space}${unit}`;
	}

	/* 1024YiB or 1000YB より大きなサイズの場合 */
	const exponent = Object.keys(unitTable).at(-1)!;
	const unit = Object.values(unitTable).at(-1)!;

	return `${String(size / BigInt(base) ** (BigInt(exponent) - 1n))}${space}${unit}`;
};

/**
 * Expressed with a IEC prefix (Byte, KiB, MiB, ...)
 *
 * @param size - File size
 * @param options - Option
 *
 * @returns File size formatted with a IEC prefix
 */
export const iec = (size: number | bigint, options?: Readonly<Option>): string => {
	const optionsValidated = optionValidator(options);

	const BASE = 1024;
	const UNIT_TABLE: Readonly<UnitTable> = {
		1: optionsValidated.byte,
		2: 'KiB',
		3: 'MiB',
		4: 'GiB',
		5: 'TiB',
		6: 'PiB',
		7: 'EiB',
		8: 'ZiB',
		9: 'YiB',
	};

	return format(size, BASE, UNIT_TABLE, optionsValidated);
};

/**
 * Expressed with a SI prefix (Byte, kB, MB, ...)
 *
 * @param size - File size
 * @param options - Option
 *
 * @returns File size formatted with a SI prefix
 */
export const si = (size: number | bigint, options?: Readonly<Option>): string => {
	const optionsValidated = optionValidator(options);

	const BASE = 1000;
	const UNIT_TABLE: Readonly<UnitTable> = {
		1: optionsValidated.byte,
		2: 'kB',
		3: 'MB',
		4: 'GB',
		5: 'TB',
		6: 'PB',
		7: 'EB',
		8: 'ZB',
		9: 'YB',
	};

	return format(size, BASE, UNIT_TABLE, optionsValidated);
};
