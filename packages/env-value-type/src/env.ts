interface Option {
	separator: string; // Separator text
}

export function getValue(key: string, type?: 'string', option?: Readonly<Option>): string;
export function getValue(key: string, type: 'string[]', option?: Readonly<Option>): string[];
export function getValue(key: string, type: 'number', option?: Readonly<Option>): number;
export function getValue(key: string, type: 'number[]', option?: Readonly<Option>): number[];
export function getValue(key: string, type: 'boolean', option?: Readonly<Option>): boolean;

/**
 * Get the value of `process.env` with specified types
 *
 * @param key - env key
 * @param type - env value's type
 * @param option - Option
 * @param option.separator - Separator text
 *
 * @returns The value of `process.env`
 */
export function getValue(key: string, type?: 'string' | 'string[]' | 'number' | 'number[]' | 'boolean', option?: Readonly<Option>) {
	const value = process.env[key];
	if (value === undefined) {
		throw new Error(`process.env["${key}"] not defined`);
	}

	if (option?.separator !== undefined && (type === undefined || !['string[]', 'number[]'].includes(type))) {
		throw new Error('If the type is not an array format, the optional `separator` cannot be specified');
	}
	const separator = option?.separator ?? ' ';

	switch (type) {
		case 'string': {
			return value;
		}
		case 'string[]': {
			return value.split(separator);
		}
		case 'number': {
			return Number(value);
		}
		case 'number[]': {
			return value.split(separator).map(Number);
		}
		case 'boolean': {
			return value === 'true';
		}
		default:
	}

	return value;
}
