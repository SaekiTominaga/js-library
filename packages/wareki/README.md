# 西暦データから和暦を取得

[![npm version](https://badge.fury.io/js/%40w0s%2Fwareki.svg)](https://www.npmjs.com/package/@w0s/wareki)
[![Workflow status](https://github.com/SaekiTominaga/js-library/actions/workflows/package-wareki.yml/badge.svg)](https://github.com/SaekiTominaga/js-library/actions/workflows/package-wareki.yml)

西暦データから和暦を取得します。正確な日付の場合はもちろん、「2000年1月」など曖昧なデータの場合も極力特定を試みます。

内部的には [`Intl.DateTimeFormat`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) を使用しており、元号の日付範囲のハードコーディングはしていません。このため将来的に新しい元号に切り替わっても JavaScript ランタイムのアップデートにより自動的に対応されるはずです。また「明治」より前の元号（「慶応」以前）にも対応しています。

## 例

```JavaScript
import Wareki from '@w0s/wareki';

const wareki1 = new Wareki(new Date(2000, 0, 1));
wareki1.getYear(); // 平成12
wareki1.getYearParts(); // [ { type: 'era', value: '平成' }, { type: 'year', value: '12' }, { type: 'literal', value: '年' } ]

const wareki2 = new Wareki('2000'); // 年月または年のみのデータでも極力特定を試みます
wareki2.getYear({ era: 'narrow' }); // H12
wareki2.getYearParts({ era: 'narrow' }); // [ { type: 'era', value: 'H' }, { type: 'year', value: '12' }, { type: 'literal', value: '年' } ]

const wareki3 = new Wareki('1989-01'); // 1989年1月は昭和64年と平成元年の両方が考えられるため、特定が不可能です
wareki3.getYear(); // undefined
wareki3.getYearParts(); // undefined

try {
  new Wareki('2000/01/01'); // 指定外のフォーマットは `Error` がスローされます
} catch {
}
```

## コンストラクター

```TypeScript
constructor(date: Date | string)
```

### パラメーター

<dl>
<dt><code>date</code> [必須]</dt>
<dd>西暦による日付データ</dd>
</dl>

### 日付データの注意点

- 第一引数の日付データは `Date` オブジェクトまたは `String` 型で指定することができます。ごくわずかですが `Date` オブジェクトの方が処理効率は高いです。
- `String` 型の場合、指定できるフォーマットは YYYY-MM-DD, YYYY-MM, YYYY のいずれかとなります。
- `String` 型で指定外のフォーマットを指定した場合は `Error` がスローされます。

## メソッド

<dl>
<dt><code>getYear(options?: Readonly&lt;FormatOption&gt;): string | undefined</code></dt>
<dd>和暦年の文字列を取得する</dd>
<dt><code>getYearParts(options?: Readonly&lt;FormatOption&gt;): Intl.DateTimeFormatPart[] | undefined</code></dt>
<dd>和暦年をパートごとに分解されたデータを取得する（<a href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts"><code>Intl.DateTimeFormat.prototype.formatToParts()</code></a> の返値をそのまま利用）</dd>
</dl>

### Option

```TypeScript
interface FormatOption {
	era?: 'long' | 'short' | 'narrow'; // 元号の表現方法（`Intl.DateTimeFormat()` コンストラクターの `era` オプションと同等）
}
```
