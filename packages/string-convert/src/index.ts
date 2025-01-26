import { convert } from './convert.js';

export type NewlineSequence = '\r' | '\n' | '\r\n';

export interface Option {
	newline?: 'CR' | 'LF' | 'CRLF'; // Converts newline
	trim?: boolean; // Remove whitespace at both ends (Only one of `trim` and `trimMultiLine` can be specified)
	trimMultiLine?: boolean; // Remove whitespace at both ends of each line (Only one of `trim` and `trimMultiLine` can be specified)
	noBlankLine?: boolean; // Delete blank lines
	toHankakuEisu?: boolean; // Make alphanumeric characters half-width (Only one of `toHankakuEisu` and toZenkakuEisu` can be specified)
	toZenkakuEisu?: boolean; // Make alphanumeric characters full-width (Only one of `toHankakuEisu` and toZenkakuEisu` can be specified)
	toHankakuSpace?: boolean; // Make full-width space half-width (IDEOGRAPHIC SPACE: U+3000 → SPACE: U+0020)
	combineSpace?: boolean; // Consolidate contiguous spaces
	toLowerCase?: boolean; // Make the alphabet lowercase (Only one of `toLowerCase` and `toUpperCase` can be specified)
	toUpperCase?: boolean; // Make the alphabet uppercase (Only one of `toLowerCase` and `toUpperCase` can be specified)
	table?: Record<string, string>; // Proprietary conversion table (An associative array that specifies the character string before conversion as the key and the character string after conversion as the value)
}

export { convert };
