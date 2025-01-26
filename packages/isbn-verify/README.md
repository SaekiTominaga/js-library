# Verify ISBN string format and check digit

[![npm version](https://badge.fury.io/js/%40w0s%2Fisbn-verify.svg)](https://www.npmjs.com/package/@w0s/isbn-verify)
[![Workflow status](https://github.com/SaekiTominaga/js-library/actions/workflows/isbn-verify.yml/badge.svg)](https://github.com/SaekiTominaga/js-library/actions/workflows/isbn-verify.yml)

## Examples

```JavaScript
import IsbnVerify from '@w0s/isbn-verify';

const isbnVerify1 = new IsbnVerify('978-4-06-519981-0'); // ISBN with correct format but wrong check digit
isbnVerify1.isValid(); // false
isbnVerify1.isIsbn10(); // false
isbnVerify1.isIsbn10({ check_digit: true }); // false
isbnVerify1.isIsbn13(); // true
isbnVerify1.isIsbn13({ check_digit: true }); // false
isbnVerify1.verify(); // true
isbnVerify1.verify({ check_digit: true }); // false

const isbnVerify2 = new IsbnVerify('9784065199817');
isbnVerify2.isValid(); // true

const isbnVerify3 = new IsbnVerify('9784065199817', { strict: true });
isbnVerify3.isValid(); // false
```

## Constructor

```TypeScript
constructor(isbn: string, options?: Option)
```

### Parameters

<dl>
<dt><code>isbn</code> [Required]</dt>
<dd>ISBN value</dd>
<dt><code>options</code> [Optional]</dt>
<dd>See below for details</dd>
</dl>

### Option

```TypeScript
interface Option {
	strict?: boolean; // If `true`, syntax without hyphens is an error. If not specified, it defaults to `false`
}
```

## Methods

<dl>
<dt><code>isValid(): boolean</code></dt>
<dd>Verify both format and check digit (Alias of <code>verify({ check_digit: true })</code>)</dd>
<dt><code>isIsbn13(options?: VerifyOption): boolean</code></dt>
<dd>Whether it is a current standard (13 digit) ISBN or not</dd>
<dt><code>isIsbn10(options?: VerifyOption): boolean</code></dt>
<dd>Whether it is a old standard (10 digit) ISBN or not</dd>
<dt><code>verify(options?: VerifyOption): boolean</code></dt>
<dd>Verify format, optionally check digit</dd>
</dl>

### Option

```TypeScript
interface VerifyOption {
	check_digit?: boolean; // Verify format including check digit
}
```
