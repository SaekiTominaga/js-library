import { compareEra } from './util.ts';

interface FormatOption {
	era?: 'long' | 'short' | 'narrow'; // 元号の表現方法（`Intl.DateTimeFormat()` コンストラクターの `era` オプションと同等）
}

/**
 * 西暦データから和暦を取得
 */
export default class {
	readonly #date: Date | undefined; // 西暦による日付データ

	/**
	 * @param date - 西暦による日付データ
	 */
	constructor(date: Date | string) {
		if (date instanceof Date) {
			this.#date = new Date(date);
			return;
		}

		if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/u.test(date)) {
			const year = Number(date.substring(0, 4));
			const month = Number(date.substring(5, 7));
			const day = Number(date.substring(8, 10));

			this.#date = new Date(year, month - 1, day);
		} else if (/^[0-9]{4}-[0-9]{2}$/u.test(date)) {
			const year = Number(date.substring(0, 4));
			const month = Number(date.substring(5, 7));

			const firstDay = new Date(year, month - 1); // その月の最初の日（1日）
			const lastDay = new Date(year, month, 0); // その月の最後の日（30日や31日）

			if (!compareEra(firstDay, lastDay)) {
				/* 元号またぎの月が指定された場合 */
				return;
			}

			this.#date = firstDay;
		} else if (/^[0-9]{4}$/u.test(date)) {
			const year = Number(date);

			const firstDay = new Date(year, 0); // その年の最初の日（1月1日）
			const lastDay = new Date(year, 11, 31); // その年の最後の日（12月31日）

			if (!compareEra(firstDay, lastDay)) {
				/* 元号またぎの年が指定された場合 */
				return;
			}

			this.#date = firstDay;
		} else {
			throw new Error('Date must be in the format `YYYY-MM-DD`, `YYYY-MM`, or `YYYY`');
		}
	}

	/**
	 * 和暦年の文字列を取得する
	 *
	 * @param options - 表記に関するオプション
	 *
	 * @returns 和暦年（e.g. 令和2）
	 */
	getYear(options?: Readonly<FormatOption>): string | undefined {
		return this.getYearParts(options)
			?.filter((part) => part.type === 'era' || part.type === 'year')
			.map((part) => part.value)
			.join('');
	}

	/**
	 * 和暦年をパートごとに分解されたデータを取得する
	 *
	 * @param options - 表記に関するオプション
	 *
	 * @returns 和暦年
	 */
	getYearParts(options?: Readonly<FormatOption>): Intl.DateTimeFormatPart[] | undefined {
		if (this.#date === undefined) {
			return undefined;
		}

		return new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
			era: options?.era,
			year: 'numeric',
		}).formatToParts(this.#date);
	}
}
