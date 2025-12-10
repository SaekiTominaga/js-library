/**
 * 元号を取得する
 *
 * @param date - 日時データ
 *
 * @returns 元号
 */
export const getEra = (date: Date): string =>
	new Intl.DateTimeFormat('ja-JP-u-ca-japanese')
		.formatToParts(date)
		.filter((part) => part.type === 'era')
		.map((part) => part.value)
		.join('');

/**
 * 元号を比較する
 *
 * @param date1 - 元号
 * @param date2 - 元号
 *
 * @returns 元号が同じなら true
 */
export const compareEra = (date1: Date, date2: Date): boolean => getEra(date1) === getEra(date2);
