type LogLevel = 'log' | 'info' | 'warn' | 'error'; // https://console.spec.whatwg.org/#loglevel-severity

/**
 * Console with locale timestamp
 */
export default class ConsoleLocaleTimestamp {
	readonly #locales?: string;

	readonly #options?: Intl.DateTimeFormatOptions;

	readonly #openQuote: string = '';

	readonly #closeQuote: string = '';

	readonly #separator: string = ' ';

	readonly #LOG_LEVEL: { log: LogLevel; info: LogLevel; warn: LogLevel; error: LogLevel } = {
		log: 'log',
		info: 'info',
		warn: 'warn',
		error: 'error',
	}; // https://console.spec.whatwg.org/#loglevel-severity

	/**
	 * @param locales - The specified value will be used as the first argument of `Date.prototype.toLocaleTimeString()`. (e.g. 'en-US' => '12:00:00 AM', 'ja-JP' => '0:00:00' )
	 * @param options - The specified value will be used as the second argument of `Date.prototype.toLocaleTimeString()`. (e.g. { minute: '2-digit', second: '2-digit' } => '00:00')
	 * @param quote - The characters that surround the timestamp. If you omit the second value, the same characters as the first are applied. (e.g. [''] => '0:00:00' , ['[', ']'] => '[0:00:00]' )
	 * @param separator - Delimiter between the timestamp and the message that follows. (e.g. ' - ' => '0:00:00 - Log message.' )
	 */
	constructor(locales?: string, options?: Intl.DateTimeFormatOptions, quote?: [string, string?], separator?: string) {
		if (locales !== undefined) {
			if (Object.prototype.toString.call(locales) !== '[object String]') {
				throw new TypeError('The argument `locales` must be an String.');
			}

			this.#locales = locales;
		}

		if (options !== undefined) {
			if (Object.prototype.toString.call(options) !== '[object Object]') {
				throw new TypeError('The argument `options` must be an Object.');
			}

			this.#options = options;
		}

		if (quote !== undefined) {
			if (Object.prototype.toString.call(quote) !== '[object Array]') {
				throw new TypeError('The argument `quote` must be an Array.');
			} else if (quote.length < 1 || quote.length > 2) {
				throw new RangeError('The argument `quote` must be an Array of length 1 or 2.');
			} else if (!quote.every((val) => Object.prototype.toString.call(val) === '[object String]')) {
				throw new TypeError('The contents of the Array of arguments `quote` must be a String.');
			}

			// eslint-disable-next-line prefer-destructuring
			this.#openQuote = quote[0];
			this.#closeQuote = quote.length === 1 ? quote[0] : quote[1]!;
		}

		if (separator !== undefined) {
			if (Object.prototype.toString.call(separator) !== '[object String]') {
				throw new TypeError('The argument `separator` must be an String.');
			}

			this.#separator = separator;
		}
	}

	/**
	 * Print a timestamp to the console.
	 *
	 * @param logLevel - Grouping name of logLevel
	 * @param separator - Delimiter between the timestamp and the message that follows
	 */
	#printTimestamp(logLevel: LogLevel, separator: string = this.#separator): void {
		const timestamp = `${this.#openQuote}${new Date().toLocaleTimeString(this.#locales, this.#options)}${this.#closeQuote}${separator}`;

		switch (logLevel) {
			case this.#LOG_LEVEL.log:
			case this.#LOG_LEVEL.info:
			case this.#LOG_LEVEL.warn: {
				process.stdout.write(timestamp);
				break;
			}
			case this.#LOG_LEVEL.error: {
				process.stderr.write(timestamp);
				break;
			}
			default: {
				throw new Error(
					'An undefined `logLevel` was specified as an argument. `logLevel` must be one of the groups defined below. <https://console.spec.whatwg.org/#loglevel-severity>',
				);
			}
		}
	}

	/**
	 * Print a timestamp to the console. A line break is performed immediately after the timestamp.
	 *
	 * @param logLevel - Grouping name of logLevel
	 */
	#printlnTimestamp(logLevel: LogLevel): void {
		this.#printTimestamp(logLevel, '\n');
	}

	/**
	 * Wrapper of console.assert()
	 *
	 * @param condition - First argument of console.assert()
	 * @param data - Second and subsequent arguments of console.assert()
	 *
	 * @see console.assert() <https://console.spec.whatwg.org/#assert>
	 */
	assert(condition?: boolean, ...data: unknown[]): void {
		if (!condition) {
			this.#printTimestamp(this.#LOG_LEVEL.error);
		}
		console.assert(condition, ...data);
	}

	/**
	 * Wrapper of console.clear()
	 *
	 * @see console.clear() <https://console.spec.whatwg.org/#clear>
	 */
	clear(): void {
		console.clear();
	}

	/**
	 * Wrapper of console.debug()
	 *
	 * @param data - Argument of console.debug()
	 *
	 * @see console.debug() <https://console.spec.whatwg.org/#debug>
	 */
	debug(...data: unknown[]): void {
		this.#printTimestamp(this.#LOG_LEVEL.log);
		console.debug(...data);
	}

	/**
	 * Wrapper of console.error()
	 *
	 * @param data - Argument of console.error()
	 *
	 * @see console.error() <https://console.spec.whatwg.org/#error>
	 */
	error(...data: unknown[]): void {
		this.#printTimestamp(this.#LOG_LEVEL.error);
		console.error(...data);
	}

	/**
	 * Wrapper of console.info()
	 *
	 * @param data - Argument of console.info()
	 *
	 * @see console.info() <https://console.spec.whatwg.org/#info>
	 */
	info(...data: unknown[]): void {
		this.#printTimestamp(this.#LOG_LEVEL.info);
		console.info(...data);
	}

	/**
	 * Wrapper of console.log()
	 *
	 * @param data - Argument of console.log()
	 *
	 * @see console.log() <https://console.spec.whatwg.org/#log>
	 */
	log(...data: unknown[]): void {
		this.#printTimestamp(this.#LOG_LEVEL.log);
		console.log(...data);
	}

	/**
	 * Wrapper of console.table()
	 *
	 * @param tabularData - First argument of console.table()
	 * @param properties - Second and subsequent arguments of console.table()
	 *
	 * @see console.table() <https://console.spec.whatwg.org/#table>
	 */
	table(tabularData?: unknown, properties?: string[]): void {
		this.#printlnTimestamp(this.#LOG_LEVEL.log);
		console.table(tabularData, properties);
	}

	/**
	 * Wrapper of console.trace()
	 *
	 * @param data - Argument of console.trace()
	 *
	 * @see console.trace() <https://console.spec.whatwg.org/#trace>
	 */
	trace(...data: unknown[]): void {
		this.#printTimestamp(this.#LOG_LEVEL.log);
		console.trace(...data);
	}

	/**
	 * Wrapper of console.warn()
	 *
	 * @param data - Argument of console.warn()
	 *
	 * @see console.warn() <https://console.spec.whatwg.org/#warn>
	 */
	warn(...data: unknown[]): void {
		this.#printTimestamp(this.#LOG_LEVEL.warn);
		console.warn(...data);
	}

	/**
	 * Wrapper of console.dir()
	 *
	 * @param item - First argument of console.dir()
	 * @param options - Second and subsequent arguments of console.dir()
	 *
	 * @see console.dir() <https://console.spec.whatwg.org/#dir>
	 */
	dir(item?: unknown, options?: unknown): void {
		this.#printTimestamp(this.#LOG_LEVEL.log);
		console.dir(item, options);
	}

	/**
	 * Wrapper of console.dirxml()
	 *
	 * @param data - Argument of console.dirxml()
	 *
	 * @see console.dirxml() <https://console.spec.whatwg.org/#dirxml>
	 */
	dirxml(...data: unknown[]): void {
		this.#printTimestamp(this.#LOG_LEVEL.log);
		console.dirxml(...data);
	}

	/**
	 * Wrapper of console.count()
	 *
	 * @param label - Argument of console.count()
	 *
	 * @see console.count() <https://console.spec.whatwg.org/#count>
	 */
	count(label?: string): void {
		this.#printTimestamp(this.#LOG_LEVEL.info);
		console.count(label);
	}

	/**
	 * Wrapper of console.countReset()
	 *
	 * @param label - Argument of console.countReset()
	 *
	 * @see console.countReset() <https://console.spec.whatwg.org/#countreset>
	 */
	countReset(label?: string): void {
		console.countReset(label);
	}

	/**
	 * Wrapper of console.group()
	 *
	 * @param label - Argument of console.group()
	 *
	 * @see console.group() <https://console.spec.whatwg.org/#group>
	 */
	group(...label: unknown[]): void {
		if (label.length > 0) {
			this.#printTimestamp(this.#LOG_LEVEL.log);
		}
		console.group(...label);
	}

	/**
	 * Wrapper of console.groupCollapsed()
	 *
	 * @param label - Argument of console.groupCollapsed()
	 *
	 * @see console.groupCollapsed() <https://console.spec.whatwg.org/#groupcollapsed>
	 */
	groupCollapsed(...label: unknown[]): void {
		if (label.length > 0) {
			this.#printTimestamp(this.#LOG_LEVEL.log);
		}
		console.groupCollapsed(...label);
	}

	/**
	 * Wrapper of console.groupEnd()
	 *
	 * @see console.groupEnd() <https://console.spec.whatwg.org/#groupend>
	 */
	groupEnd(): void {
		console.groupEnd();
	}

	/**
	 * Wrapper of console.time()
	 *
	 * @param label - Argument of console.time()
	 *
	 * @see console.time() <https://console.spec.whatwg.org/#time>
	 */
	time(label?: string): void {
		console.time(label);
	}

	/**
	 * Wrapper of console.timeLog()
	 *
	 * @param label - First argument of console.timeLog()
	 * @param data - Second and subsequent arguments of console.timeLog()
	 *
	 * @see console.timeLog() <https://console.spec.whatwg.org/#timelog>
	 */
	timeLog(label?: string, ...data: unknown[]): void {
		this.#printTimestamp(this.#LOG_LEVEL.log);
		console.timeLog(label, ...data);
	}

	/**
	 * Wrapper of console.timeEnd()
	 *
	 * @param label - Argument of console.timeEnd()
	 *
	 * @see console.timeEnd() <https://console.spec.whatwg.org/#timeend>
	 */
	timeEnd(label?: string): void {
		this.#printTimestamp(this.#LOG_LEVEL.info);
		console.timeEnd(label);
	}
}
