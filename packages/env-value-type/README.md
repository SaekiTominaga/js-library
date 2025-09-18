# Get the value of `process.env` with specified types

[![npm version](https://badge.fury.io/js/%40w0s%2Fenv-value-type.svg)](https://www.npmjs.com/package/@w0s/env-value-type)
[![Workflow status](https://github.com/SaekiTominaga/js-library/actions/workflows/package-env-value-type.yml/badge.svg)](https://github.com/SaekiTominaga/js-library/actions/workflows/package-env-value-type.yml)

## Examples

```Dotenv
# .env

SAMPLE_STRING = foo
SAMPLE_STRINGS = foo bar baz

SAMPLE_NUMBER = 1
SAMPLE_NUMBERS = 1,2,3

SAMPLE_BOOLEAN_TRUE = true
SAMPLE_BOOLEAN_FALSE = false
```

```JavaScript
import { env } from '@w0s/env-value-type';

env('SAMPLE_STRING'); // 'foo'
env('SAMPLE_STRING', 'string'); // 'foo'
env('SAMPLE_STRINGS', 'string[]'); // ['foo', 'bar', 'baz']
env('SAMPLE_STRINGS', 'string[]', { separator: ' ' }); // ['foo', 'bar', 'baz']

env('SAMPLE_NUMBER'); // '1'
env('SAMPLE_NUMBER', 'number'); // 1
env('SAMPLE_NUMBERS', 'number[]', { separator: ',' }); // [1, 2, 3]

env('SAMPLE_BOOLEAN_TRUE'); // 'true'
env('SAMPLE_BOOLEAN_TRUE', 'boolean'); // true
env('SAMPLE_BOOLEAN_FALSE', 'boolean'); // false

try {
  env('XXX'); // Error
} catch {
}
```

## Functions

- `function getValue(key: string, type?: 'string', option?: Readonly<Option>): string`
- `function getValue(key: string, type: 'string[]', option?: Readonly<Option>): string[]`
- `function getValue(key: string, type: 'number', option?: Readonly<Option>): number`
- `function getValue(key: string, type: 'number[]', option?: Readonly<Option>): number[]`
- `function getValue(key: string, type: 'boolean', option?: Readonly<Option>): boolean`

### Option

```TypeScript
interface Option {
  separator: string; // Separator text. The default is ` ` (U+0020).
}
```
