# Support characters other than "&" as URL query separator

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Furlsearchparams-custom-separator.svg)](https://www.npmjs.com/package/%40saekitominaga%2Furlsearchparams-custom-separator)
[![test status](https://github.com/SaekiTominaga/npm/actions/workflows/urlsearchparams-custom-separator-test.yml/badge.svg)](https://github.com/SaekiTominaga/npm/actions/workflows/urlsearchparams-custom-separator-test.yml)

The URL query separator uses "&", but needs to be escaped in HTML and XML. [HTML 4.01 - Appendix B.2.2](https://www.w3.org/TR/html4/appendix/notes.html#h-B.2.2) had recommended support the use of ";" in place of "&".

This feature supports arbitrary separators other than "&" and allows them to be used in [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) objects, etc.

## Examples

```JavaScript
import URLSearchParamsCustomSeparator from '@saekitominaga/urlsearchparams-custom-separator';

const urlSearchParams1 = new URLSearchParamsCustomSeparator(new URL('https://example.com/path/to?foo=1&bar=2;baz=3;qux=4:quux=5'), [';', ':']);
urlSearchParams1.searchParams.get('baz'); // 3
urlSearchParams1.toString(); // foo=1&bar=2&baz=3&qux=4&quux=5

const urlSearchParams2 = new URLSearchParamsCustomSeparator('https://example.com/path/to?foo=1&bar=2;baz=3;qux=4:quux=5', [';', ':']);
urlSearchParams2.searchParams.get('baz'); // 3
urlSearchParams2.toString(); // foo=1&bar=2&baz=3&qux=4&quux=5

const urlSearchParams3 = new URLSearchParamsCustomSeparator('/path/to?foo=1&bar=2;baz=3;qux=4:quux=5', [';', ':']);
urlSearchParams3.searchParams.get('baz'); // 3
urlSearchParams3.toString(); // foo=1&bar=2&baz=3&qux=4&quux=5
```

## Constructor

```TypeScript
new URLSearchParamsCustomSeparator(url: URL | string, separators: string[])
```

### Parameters

<dl>
<dt><code>url</code></dt>
<dd>URL object, or full string of URL or substring of URL</dd>
<dt><code>separators</code></dt>
<dd>List of URL query separator</dd>
</dl>

## Properties

<dl>
<dt><code>searchParams: URLSearchParams</code></dt>
<dd>Returns a <code>URLSearchParams</code> object.</dd>
</dl>

## Methods

<dl>
<dt><code>toString(): string</code></dt>
<dd>Returns a URL query with the separator unified to "&". (e.g. <code>?foo=1&bar=2;baz=3</code> → <code>foo=1&bar=2&baz=3</code>)</dd>
</dl>
