# Expressing file size in a unit system

[![npm version](https://badge.fury.io/js/%40w0s%2Ffile-size-format.svg)](https://www.npmjs.com/package/@w0s/file-size-format)
[![Workflow status](https://github.com/SaekiTominaga/js-library/actions/workflows/file-size-format.yml/badge.svg)](https://github.com/SaekiTominaga/js-library/actions/workflows/file-size-format.yml)

Expresses the size of a file in human-readable units such as `KiB` or `MB`.

- Supports IEC prefix (Byte, KiB, MiB, ...) and SI prefixes (Byte, kB, MB, ...).
- Support for huge file sizes of `PiB` and above by using `BigInt`.
- The notation can be customized by specifying a few options.

## Examples

```JavaScript
import { iec, si } from '@w0s/file-size-format';

iec(1024); // 1KiB
si(1000); // 1kB

iec(512, { byte: 'B' }); // 512B
iec(1280, { digits: 1, space: true }); // 1.3 KiB

iec(1208925819614629174706176n); // 1YiB
iec(BigInt('1208925819614629174706176')); // 1YiB

iec(-1); // RangeError: The file size must be a number greater than or equal to 0
iec(1208925819614629174706176); // RangeError: `BigInt` should be used when specifying huge numbers
```

## Functions

<dl>
<dt><code>const iec = (size: number | bigint, options?: Readonly&lt;Option&gt;): string</code></dt>
<dd>Expressed with a binary prefix (Byte, KiB, MiB, ...)</dd>
<dt><code>const si = (size: number | bigint, options?: Readonly&lt;Option&gt;): string</code></dt>
<dd>Expressed with a SI prefix (Byte, kB, MB, ...)</dd>
</dl>

### Option

```TypeScript
interface Option {
    space?: boolean; // Whether to insert a space between the number and the unit. The default is `false`.
    byte?: string; // Byte notation when the file size is less than 1Kib or 1kB. The default is `'byte'`.
    digits?: number; // Number of digits after the decimal point to round. The default is `0`, and the decimal point is always rounded to an integer. In the case of BigInt, the value specified here has no effect because the language specification does not allow decimals to be expressed.
}
```
