import { iec, si } from './format.js';

export interface Option {
	space?: boolean; // Whether to insert a space between the number and the unit. The default is `false`.
	byte?: string; // Byte notation when the file size is less than 1Kib or 1kB. The default is `'byte'`.
	digits?: number; // Number of digits after the decimal point to round. The default is `0`, and the decimal point is always rounded to an integer. In the case of BigInt, the value specified here has no effect because the language specification does not allow decimals to be expressed.
}

export { iec, si };
