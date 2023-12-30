# Converts newlines in a string, `trim()`, half-width / full-width conversion, etc

[![npm version](https://badge.fury.io/js/%40w0s%2Fstring-convert.svg)](https://www.npmjs.com/package/@w0s/string-convert)
[![test status](https://github.com/SaekiTominaga/npm/actions/workflows/string-convert-test.yml/badge.svg)](https://github.com/SaekiTominaga/npm/actions/workflows/string-convert-test.yml)

## Examples

```JavaScript
import StringConvert from '@w0s/string-convert';

StringConvert.convert('foo\r\nbar', {
  newline: 'LF',
}); // foo\nbar

StringConvert.convert('  foo  \r\n  bar  ', {
  trim: true,
}); // foo  \r\n  bar

StringConvert.convert('  Ｆｏｏ  \r\n\r\n  Ｂａｒ　　　　　　Ｂａｚ💖  ', {
  newline: 'LF',
  trimMultiLine: true,
  noBlankLine: true,
  toHankakuEisu: true,
  toHankakuSpace: true,
  combineSpace: true,
  toLowerCase: true,
  table: {
    '💖': '⭐',
  },
}); // foo\nbar baz⭐

try {
  StringConvert.convert('foo \r\n bar \n baz', {});
} catch {
  // A string with mixed newline codes are not supported
}

```

\* Newline codes `CR`, `LF`, and `CR+LF` are supported.

## Methods

<dl>
<dt><code>static convert(text: string, options: Option): string</code></dt>
<dd>Convert execution</dd>
</dl>

```TypeScript
/* Converts newline */
type Newline = 'CR' | 'LF' | 'CRLF';

/* Proprietary conversion table */
type Table = Record<string, string>;

/* Convert options */
interface Option {
  newline?: Newline; // Converts newline
  trim?: boolean; // Remove whitespace at both ends (Only one of `trim` and `trimMultiLine` can be specified)
  trimMultiLine?: boolean; // Remove whitespace at both ends of each line (Only one of `trim` and `trimMultiLine` can be specified)
  noBlankLine?: boolean; // Delete blank lines
  toHankakuEisu?: boolean; // Make alphanumeric characters half-width (Only one of `toHankakuEisu` and toZenkakuEisu` can be specified)
  toZenkakuEisu?: boolean; // Make alphanumeric characters full-width (Only one of `toHankakuEisu` and toZenkakuEisu` can be specified)
  toHankakuSpace?: boolean; // Make full-width space half-width (IDEOGRAPHIC SPACE: U+3000 → SPACE: U+0020)
  combineSpace?: boolean; // Consolidate contiguous spaces
  toLowerCase?: boolean; // Make the alphabet lowercase (Only one of `toLowerCase` and `toUpperCase` can be specified)
  toUpperCase?: boolean; // Make the alphabet uppercase (Only one of `toLowerCase` and `toUpperCase` can be specified)
  table?: Table; // Proprietary conversion table (An associative array that specifies the character string before conversion as the key and the character string after conversion as the value)
}
```
