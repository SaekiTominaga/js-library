# SQLite utility

[![npm version](https://badge.fury.io/js/%40w0s%2Fsqlite-utility.svg)](https://www.npmjs.com/package/@w0s/sqlite-utility)
[![Workflow status](https://github.com/SaekiTominaga/js-library/actions/workflows/package-sqlite-utility.yml/badge.svg)](https://github.com/SaekiTominaga/js-library/actions/workflows/package-sqlite-utility.yml)

## Examples

```JavaScript
import { jsToSQLiteComparison, jsToSQLiteAssignment, sqliteToJS, prepareSelect, prepareInsert, prepareUpdate, prepareDelete } from '@w0s/sqlite-utility';

jsToSQLiteComparison('text'); // 'text'
jsToSQLiteComparison(123); // 123
jsToSQLiteComparison(true); // 1
jsToSQLiteComparison(false); // 0
jsToSQLiteComparison(new Date('2000-01-01')); // 946684800
jsToSQLiteComparison(new URL('http://example.com/foo?bar#baz')); // 'http://example.com/foo?bar#baz'

jsToSQLiteAssignment('text'); // 'text'
...
jsToSQLiteAssignment(undefined); // null

sqliteToJS('text'); // 'text'
sqliteToJS(123); // 123
sqliteToJS(0, 'boolean'); // false
sqliteToJS(1, 'boolean'); // true
try {
  sqliteToJS(2, 'boolean'); // Error
} catch {
}
sqliteToJS(946684800, 'date'); // `Date` object
try {
  sqliteToJS(1.2, 'date'); // Error
} catch {
}
sqliteToJS('http://example.com/foo?bar#baz', 'url'); // `URL` interface
try {
  sqliteToJS(123, 'url'); // Error
} catch {
}
sqliteToJS(null); // undefined

const { sqlWhere, bindParams } = prepareSelect({
  string: 'foo',
  number: 123,
  undefined: undefined,
});
// sqlWhere: 'string = :string AND number = :number AND undefined IS NULL'
// bindParams: { ':string': 'foo', ':number': 123 }

const { sqlInto, sqlValues, bindParams } = prepareInsert({
  string: 'foo',
  undefined: undefined,
});
// sqlInto: '(string, undefined)'
// sqlValues: '(:string, :undefined)'
// bindParams: { ':string': 'foo', ':undefined': null }

const { sqlSet, sqlWhere, bindParams } = prepareUpdate(
  {
    string: 'foo',
    undefined: undefined,
  },
  {
    number: 123,
    undefined: undefined,
  },
);
// sqlSet: 'string = :string, undefined = :undefined'
// sqlWhere: 'number = :number AND undefined IS NULL'
// bindParams: { ':string': 'foo', ':undefined': null, ':number': 123 }

const { sqlWhere, bindParams } = prepareDelete({
  string: 'foo',
  number: 123,
  undefined: undefined,
});
// sqlWhere: 'string = :string AND number = :number AND undefined IS NULL'
// bindParams: { ':string': 'foo', ':number': 123 }
```

## Functions

```TypeScript
type JSType = string | number | boolean | Date | URL | undefined;
type SQLiteType = string | number | null;
```

<dl>
<dt><code>const jsToSQLiteComparison = (value: Exclude<JSType, undefined>): Exclude<SQLiteType, null></code></dt>
<dd>Converting JavaScript types to SQLite types for comparison context (e.g. <code>WHERE</code> / <code>HAVING</code> / <code>ON</code> / <code>CASE</code> clause)</dd>
<dt><code>const jsToSQLiteAssignment = (value: JSType): SQLiteType</code></dt>
<dd>Converting JavaScript types to SQLite types for assignment context (e.g. <code>SET</code> / <code>VALUES</code> clause)</dd>
<dt><code>function sqliteToJS(value: SQLiteType, type?: 'boolean' | 'date' | 'url'): JSType</code></dt>
<dd>Converting SQLite types to JavaScript types</dd>
<dt><code>const prepareSelect = (where: Readonly&lt;Record&lt;string, JSType&gt;&gt;): { sqlWhere: string; bindParams: Record&lt;string, SQLiteType&gt; }</code></dt>
<dd>Prepared statement for SELECT</dd>
<dt><code>const prepareInsert = (into: Readonly&lt;Record&lt;string, JSType&gt;&gt;): { sqlInto: string; sqlValues: string; bindParams: Record&lt;string, SQLiteType&gt; }</code></dt>
<dd>Prepared statement for INSERT</dd>
<dt><code>const prepareUpdate = (set: Readonly&lt;Record&lt;string, JSType&gt;&gt;,	where: Readonly&lt;Record&lt;string, JSType&gt;&gt;): { sqlSet: string; sqlWhere: string; bindParams: Record&lt;string, SQLiteType&gt; }</code></dt>
<dd>Prepared statement for UPDATE</dd>
<dt><code>const prepareDelete = (where: Readonly&lt;Record&lt;string, JSType&gt;&gt;): { sqlWhere: string; bindParams: Record&lt;string, SQLiteType&gt; }</code></dt>
<dd>Prepared statement for DELETE</dd>
</dl>
