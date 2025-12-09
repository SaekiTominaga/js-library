type JSType = string | number | boolean | Date | URL | undefined;
type SQLiteType = string | number | null; // https://www.sqlite.org/datatype3.html

type JsToSQLiteComparison<T> = T extends string
	? string
	: T extends number
		? number
		: T extends boolean
			? 0 | 1
			: T extends Date
				? number
				: T extends URL
					? string
					: never;

type JsToSQLiteAssignment<T> = T extends string
	? string
	: T extends number
		? number
		: T extends boolean
			? 0 | 1
			: T extends Date
				? number
				: T extends URL
					? string
					: T extends undefined
						? null
						: never;

/**
 * Converting JavaScript types to SQLite types for comparison context (e.g. WHERE / HAVING / ON / CASE clause)
 *
 * @param value - JavaScript value
 *
 * @returns SQLite value
 */
export const jsToSQLiteComparison = <T extends Exclude<JSType, undefined>>(value: T): JsToSQLiteComparison<T> => {
	if (typeof value === 'string' || typeof value === 'number') {
		return value as unknown as JsToSQLiteComparison<T>;
	}

	if (typeof value === 'boolean') {
		return (value ? 1 : 0) as JsToSQLiteComparison<T>;
	}

	if (value instanceof Date) {
		return Math.round(value.getTime() / 1000) as JsToSQLiteComparison<T>; // Unix Time, the number of seconds
	}

	if (value instanceof URL) {
		return value.toString() as JsToSQLiteComparison<T>;
	}

	throw new TypeError('Unsupported JavaScript type');
};

/**
 * Converting JavaScript types to SQLite types for assignment context (e.g. SET / VALUES clause)
 *
 * @param value - JavaScript value
 *
 * @returns SQLite value
 */
export const jsToSQLiteAssignment = <T extends JSType>(value: T): JsToSQLiteAssignment<T> => {
	if (value === undefined) {
		return null as JsToSQLiteAssignment<T>;
	}

	return jsToSQLiteComparison(value);
};

export function sqliteToJS(value: string): string;
export function sqliteToJS(value: string | null): string | undefined;
export function sqliteToJS(value: number): number;
export function sqliteToJS(value: number | null): number | undefined;
export function sqliteToJS(value: number, type: 'boolean'): boolean;
export function sqliteToJS(value: number | null, type: 'boolean'): boolean | undefined;
export function sqliteToJS(value: number, type: 'date'): Date;
export function sqliteToJS(value: number | null, type: 'date'): Date | undefined;
export function sqliteToJS(value: string, type: 'url'): URL;
export function sqliteToJS(value: string | null, type: 'url'): URL | undefined;

/**
 * Converting SQLite types to JavaScript types
 *
 * @param value - SQLite value
 * @param type - Type to convert
 *
 * @returns JavaScript value
 */
export function sqliteToJS(value: SQLiteType, type?: 'boolean' | 'date' | 'url'): JSType {
	if (value === null) {
		return undefined;
	}

	switch (type) {
		case 'boolean': {
			if (typeof value !== 'number' || (value !== 0 && value !== 1)) {
				throw new Error('Database columns must be a 0 or 1 when convert to a boolean type');
			}

			return Boolean(value);
		}
		case 'date': {
			if (typeof value !== 'number' || !Number.isInteger(value)) {
				throw new Error('Database columns must be a integer when convert to a Date type');
			}

			return new Date(value * 1000);
		}
		case 'url': {
			if (typeof value !== 'string') {
				throw new Error('Database columns must be a string type when convert to a URL type');
			}

			return new URL(value);
		}
		default:
	}

	return value;
}
