# Escapes and unescapes the characters for HTML

[![npm version](https://badge.fury.io/js/%40w0s%2Fhtml-escape.svg)](https://www.npmjs.com/package/@w0s/html-escape)
[![Workflow status](https://github.com/SaekiTominaga/js-library/actions/workflows/html-escape.yml/badge.svg)](https://github.com/SaekiTominaga/js-library/actions/workflows/html-escape.yml)

- Escapes and unescapes the characters for HTML
- Tagged templates (Template literals) can also be used to escape only certain parts of the string.

## Examples

```JavaScript
import HtmlEscape from '@w0s/html-escape';

HtmlEscape.escape('<span data-foo="hoge&hoge">text</span>'); // &lt;span data-foo=&quot;hoge&amp;hoge&quot;&gttext&lt;/span&gt;
HtmlEscape.unescape('&lt;span data-foo=&quot;hoge&amp;hoge&quot;&gttext&lt;/span&gt;'); // <span data-foo="hoge&hoge">text</span>

const span = '<span>text</span>';
HtmlEscape.template`<p>${span}</p>`; // <p>&lt;span&gt;text&lt;span&gt;</p>
```

```JavaScript
/* Short method name */
import Html from '@w0s/html-escape';

Html._('<span data-foo="hoge&hoge">text</span>');
Html.$('&lt;span data-foo=&quot;hoge&amp;hoge&quot;&gttext&lt;/span&gt;');

const span = '<span>text</span>';
Html.__`<p>${span}</p>`;
```

## Methods

<dl>
<dt><code>static escape(input: string): string</code></dt>
<dd>Escapes the characters in a string using character references</dd>
<dt><code>static _(input: string): string</code></dt>
<dd>Alias of <code>escape()</code></dd>
<dt><code>static unescape(input: string): string</code></dt>
<dd>Unescape characters for which character references are used</dd>
<dt><code>static $(input: string): string</code></dt>
<dd>Alias of <code>unescape()</code></dd>
<dt><code>static template(input: TemplateStringsArray, ...placeholders: unknown[]): string</code></dt>
<dd>Escapes for the placeholder in template literals</dd>
<dt><code>static __(input: TemplateStringsArray, ...placeholders: unknown[]): string</code></dt>
<dd>Alias of <code>template()</code></dd>
</dl>
