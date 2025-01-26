# Escapes and unescapes the characters for HTML

[![npm version](https://badge.fury.io/js/%40w0s%2Fhtml-escape.svg)](https://www.npmjs.com/package/@w0s/html-escape)
[![Workflow status](https://github.com/SaekiTominaga/js-library/actions/workflows/html-escape.yml/badge.svg)](https://github.com/SaekiTominaga/js-library/actions/workflows/html-escape.yml)

- Escapes and unescapes the characters for HTML
- Tagged templates (Template literals) can also be used to escape only certain parts of the string.

## Examples

```JavaScript
import { escape, unescape, template } from '@w0s/html-escape';

escape('<span data-foo="hoge&hoge">text</span>'); // &lt;span data-foo=&quot;hoge&amp;hoge&quot;&gttext&lt;/span&gt;
unescape('&lt;span data-foo=&quot;hoge&amp;hoge&quot;&gttext&lt;/span&gt;'); // <span data-foo="hoge&hoge">text</span>

const span = '<span>text</span>';
template`<p>${span}</p>`; // <p>&lt;span&gt;text&lt;span&gt;</p>
```

## Methods

<dl>
<dt><code>const escape = (input: string): string</code></dt>
<dd>Escapes the characters in a string using character references</dd>
<dt><code>const unescape = (input: string): string</code></dt>
<dd>Unescape characters for which character references are used</dd>
<dt><code>const template = (input: TemplateStringsArray, ...placeholders: unknown[]): string</code></dt>
<dd>Escapes for the placeholder in template literals</dd>
</dl>
