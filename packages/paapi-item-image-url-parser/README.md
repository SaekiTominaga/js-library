# Parsing a PA-API 5.0 Item Image URL

[![npm version](https://badge.fury.io/js/%40w0s%2Fpaapi-item-image-url-parser.svg)](https://www.npmjs.com/package/@w0s/paapi-item-image-url-parser)
[![Workflow status](https://github.com/SaekiTominaga/js-library/actions/workflows/paapi-item-image-url-parser.yml/badge.svg)](https://github.com/SaekiTominaga/js-library/actions/workflows/paapi-item-image-url-parser.yml)

## Examples

```JavaScript
import PaapiItemImageUrlParser from '@w0s/paapi-item-image-url-parser';

const imageUrl = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg');
const paapiItemImageUrlParser = new PaapiItemImageUrlParser(imageUrl);

paapiItemImageUrlParser.getId(); // '5198TOs+rnL'
paapiItemImageUrlParser.getSize(); // 160
paapiItemImageUrlParser.getExtension(); // '.jpg'
paapiItemImageUrlParser.toString(); // 'https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg'

paapiItemImageUrlParser.setSizeMultiply(2);
paapiItemImageUrlParser.getSize(); // 320

paapiItemImageUrlParser.setSizeDivision(3);
paapiItemImageUrlParser.getSize(); // 107

paapiItemImageUrlParser.setSize(320);
paapiItemImageUrlParser.getSize(); // 320

paapiItemImageUrlParser.removeSize();
paapiItemImageUrlParser.getSize(); // null
paapiItemImageUrlParser.toString(); // 'https://m.media-amazon.com/images/I/5198TOs+rnL.jpg'
```

```JavaScript
import PaapiItemImageUrlParser from '@w0s/paapi-item-image-url-parser';

const imageUrl = new URL('https://m.media-amazon.com/images/I/5198TOs+rnL.jpg');
const paapiItemImageUrlParser = new PaapiItemImageUrlParser(imageUrl);

paapiItemImageUrlParser.getId(); // '5198TOs+rnL'
paapiItemImageUrlParser.getSize(); // null
paapiItemImageUrlParser.getExtension(); // '.jpg'
paapiItemImageUrlParser.toString(); // 'https://m.media-amazon.com/images/I/5198TOs+rnL.jpg'

try {
  paapiItemImageUrlParser.setSizeMultiply(2); // Error
} catch {
}

try {
  paapiItemImageUrlParser.setSizeDivision(3); // Error
} catch {
}

paapiItemImageUrlParser.setSize(320);
paapiItemImageUrlParser.getSize(); // 320
```

## Constructor

```TypeScript
constructor(inputUrl: URL)
```

### Parameters

<dl>
<dt><code>inputUrl</code></dt>
<dd>Image URL</dd>
</dl>

## Methods

<dl>
<dt><code>toString(): string</code></dt>
<dd>Get the entire Image URL string.</dd>
<dt><code>getId(): string</code></dt>
<dd>Get the ID part of URL</dd>
<dt><code>getSize(): number | null</code></dt>
<dd>Get the size part of URL</dd>
<dt><code>setSize(size: number): void</code></dt>
<dd>Set the image size (Used to get images of different sizes)</dd>
<dt><code>removeSize(): void</code></dt>
<dd>Remove the image size (Used to get the original size image)</dd>
<dt><code>setSizeMultiply(multiply: number): void</code></dt>
<dd>Multiply the size of the image (Used to get images of different sizes)</dd>
<dt><code>setSizeDivision(division: number): void</code></dt>
<dd>Division the size of the image (Used to get images of different sizes)</dd>
<dt><code>getExtension(): string</code></dt>
<dd>Get the extension part of URL</dd>
</dl>
