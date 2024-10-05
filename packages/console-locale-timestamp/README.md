# Console with locale timestamp

[![npm version](https://badge.fury.io/js/console-locale-timestamp.svg)](https://www.npmjs.com/package/console-locale-timestamp)
[![Workflow status](https://github.com/SaekiTominaga/npm/actions/workflows/console-locale-timestamp.yml/badge.svg)](https://github.com/SaekiTominaga/npm/actions/workflows/console-locale-timestamp.yml)

Provides a console debugging facilities with a timestamp. Timestamps are written using `Date.prototype.toLocaleTimeString()`.

All public methods have the same functionality as the [`Console`](https://console.spec.whatwg.org/).

## Sample

### JavaScript

```JavaScript
import Console from 'console-locale-timestamp';

const console1 = new Console();
console1.debug('Hello World!');
console1.table({
	1001: { name: 'John Smith', age: '20' },
	1002: { name: 'Taro Yamada', age: '25' },
});

const console2 = new Console('en-US', { minute: '2-digit', second: '2-digit' }, ['[', ']'], ' - ');
console2.debug('Hello World!');
console2.table({
	1001: { name: 'John Smith', age: '20' },
	1002: { name: 'Taro Yamada', age: '25' },
});
```

### Console

```
0:00:00 Hello World!
0:00:01
┌─────────┬───────────────┬──────┐
│ (index) │     name      │ age  │
├─────────┼───────────────┼──────┤
│  1001   │ 'John Smith'  │ '20' │
│  1002   │ 'Taro Yamada' │ '25' │
└─────────┴───────────────┴──────┘
[00:02] - Hello World!
[00:03]
┌─────────┬───────────────┬──────┐
│ (index) │     name      │ age  │
├─────────┼───────────────┼──────┤
│  1001   │ 'John Smith'  │ '20' │
│  1002   │ 'Taro Yamada' │ '25' │
└─────────┴───────────────┴──────┘
```

## Constructor arguments

```TypeScript
constructor(locales?: string, options?: object, quote?: string[], separator?: string)
```

| name      | type     | deault    | example                                  | Description                                                                                                             |
| --------- | -------- | --------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| locales   | string   | undefined | 'en-US'                                  | The specified value will be used as the first argument of `Date.prototype.toLocaleTimeString()`.                        |
| options   | object   | undefined | { minute: '2-digit', second: '2-digit' } | The specified value will be used as the second argument of `Date.prototype.toLocaleTimeString()`.                       |
| quote     | string[] | ['']      | ['[', ']']                               | The characters that surround the timestamp. If you omit the second value, the same characters as the first are applied. |
| separator | string   | ''        | ' - '                                    | Delimiter between the timestamp and the message that follows.                                                           |

## Methods

- [assert(condition?: boolean, ...data: any[])](https://console.spec.whatwg.org/#assert)
- [clear()](https://console.spec.whatwg.org/#clear)
- [debug(...data: any[])](https://console.spec.whatwg.org/#debug)
- [error(...data: any[])](https://console.spec.whatwg.org/#error)
- [info(...data: any[])](https://console.spec.whatwg.org/#info)
- [log(...data: any[])](https://console.spec.whatwg.org/#log)
- [table(tabularData?: any, properties?: string[])](https://console.spec.whatwg.org/#table)
- [trace(...data: any[])](https://console.spec.whatwg.org/#trace)
- [warn(...data: any[])](https://console.spec.whatwg.org/#warn)
- [dir(item?: any, options?: any)](https://console.spec.whatwg.org/#dir)
- [dirxml(...data: any[])](https://console.spec.whatwg.org/#dirxml)
- [count(label?: string)](https://console.spec.whatwg.org/#count)
- [countReset(label?: string)](https://console.spec.whatwg.org/#countreset)
- [group(...data: any[])](https://console.spec.whatwg.org/#group)
- [groupCollapsed(...data: any[])](https://console.spec.whatwg.org/#groupcollapsed)
- [groupEnd()](https://console.spec.whatwg.org/#groupend)
- [time(label?: string)](https://console.spec.whatwg.org/#time)
- [timeLog(label?: string, ...data: any[])](https://console.spec.whatwg.org/#timelog)
- [timeEnd(label?: string)](https://console.spec.whatwg.org/#timeend)
