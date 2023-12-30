# Parsing a MIME type

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fmime-parser.svg)](https://www.npmjs.com/package/%40saekitominaga%2Fmime-parser)
[![test status](https://github.com/SaekiTominaga/npm/actions/workflows/mime-type-parser-test.yml/badge.svg)](https://github.com/SaekiTominaga/npm/actions/workflows/mime-type-parser-test.yml)

## Examples

```JavaScript
import MIMETypeParser from '@saekitominaga/mime-parser';

const mimeTypeParser = new MIMETypeParser('Text/HTML; Charset=utf-8');
mimeTypeParser.toString(); // 'text/html;charset=utf-8'
mimeTypeParser.getType(); // 'text'
mimeTypeParser.getSubtype(); // 'html'
mimeTypeParser.getEssence(); // 'text/html'
mimeTypeParser.getParameters(); // Map(1) { 'charset' => 'utf-8' }
mimeTypeParser.getParameter('charset'); // 'utf-8'
mimeTypeParser.getParameter('foo'); // undefined
```

## Constructor

```TypeScript
new MIMETypeParser(inputMimeType: string)
```

### Parameters

<dl>
<dt><code>inputMimeType</code></dt>
<dd>MIME type value</dd>
</dl>

## Methods

<dl>
<dt><code>toString(): string</code></dt>
<dd>Get the entire serialized <a href="https://mimesniff.spec.whatwg.org/#mime-type">MIME type</a> string.</dd>
<dt><code>getType(): string</code></dt>
<dd>Get the <a href="https://mimesniff.spec.whatwg.org/#type">type</a> part of MIME type.</dd>
<dt><code>getSubtype(): string</code></dt>
<dd>Get the <a href="https://mimesniff.spec.whatwg.org/#subtype">subtype</a> part of MIME type.</dd>
<dt><code>getEssence(): string</code></dt>
<dd>Get the <a href="https://mimesniff.spec.whatwg.org/#mime-type-essence">essence</a> part (type/subtype) of MIME type.</dd>
<dt><code>getParameters(): Map&lt;string, string&gt;</code></dt>
<dd>Get the <a href="https://mimesniff.spec.whatwg.org/#parameters">parameters</a> part of MIME type.</dd>
<dt><code>getParameter(key: string): string | undefined</code></dt>
<dd>Get the value of <a href="https://mimesniff.spec.whatwg.org/#parameters">parameters</a> associated with the specified key of MIME type.</dd>
</dl>
