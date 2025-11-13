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

/**
 * Prepared statement for SELECT
 *
 * @param where - An object with the table column names as keys and the values to be stored in the columns as values
 *
 * @returns The string used in the WHERE clause and the object used with bind
 */
export const prepareSelect = (where: Readonly<Record<string, JSType>>): { sqlWhere: string; bindParams: Record<string, SQLiteType> } => {
	const whereArray = Object.entries(where);

	const sqlWhere = whereArray
		.map(([key, value]) => {
			if (value === undefined) {
				return `${key} IS NULL`;
			}
			return `${key} = :${key}`;
		})
		.join(' AND ');

	const bindParams = Object.fromEntries(whereArray.filter(([, value]) => value !== undefined).map(([key, value]) => [`:${key}`, jsToSQLiteAssignment(value)]));

	return {
		sqlWhere: sqlWhere,
		bindParams: bindParams,
	};
};

/**
 * Prepared statement for INSERT
 *
 * @param into - An object with the table column names as keys and the values to be stored in the columns as values
 *
 * @returns Object used with bind
 */
export const prepareInsert = (into: Readonly<Record<string, JSType>>): { sqlInto: string; sqlValues: string; bindParams: Record<string, SQLiteType> } => {
	const intoArray = Object.entries(into);

	const sqlInto = `(${intoArray.map(([key]) => key).join(', ')})`;
	const sqlValues = `(${intoArray.map(([key]) => `:${key}`).join(', ')})`;

	const bindParams = Object.fromEntries(intoArray.map(([key, value]) => [`:${key}`, jsToSQLiteAssignment(value)]));

	return {
		sqlInto: sqlInto,
		sqlValues: sqlValues,
		bindParams: bindParams,
	};
};

/**
 * Prepared statement for UPDATE
 *
 * @param set - An object with the table column names as keys and the values to be stored in the columns as values
 * @param where - An object with the table column names as keys and the values to be stored in the columns as values
 *
 * @returns Object used with bind
 */
export const prepareUpdate = (
	set: Readonly<Record<string, JSType>>,
	where: Readonly<Record<string, JSType>>,
): { sqlSet: string; sqlWhere: string; bindParams: Record<string, SQLiteType> } => {
	const setArray = Object.entries(set);
	const whereArray = Object.entries(where);

	const sqlSet = setArray.map(([key]) => `${key} = :${key}`).join(', ');

	const sqlWhere = whereArray
		.map(([key, value]) => {
			if (value === undefined) {
				return `${key} IS NULL`;
			}
			return `${key} = :${key}`;
		})
		.join(' AND ');

	const bindParams = Object.fromEntries([...setArray, ...whereArray].map(([key, value]) => [`:${key}`, jsToSQLiteAssignment(value)]));

	return {
		sqlSet: sqlSet,
		sqlWhere: sqlWhere,
		bindParams: bindParams,
	};
};

/**
 * Prepared statement for DELETE
 *
 * @param where - An object with the table column names as keys and the values to be stored in the columns as values
 *
 * @returns The string used in the WHERE clause and the object used with bind
 */
export const prepareDelete = (where: Readonly<Record<string, JSType>>): { sqlWhere: string; bindParams: Record<string, SQLiteType> } => prepareSelect(where);
