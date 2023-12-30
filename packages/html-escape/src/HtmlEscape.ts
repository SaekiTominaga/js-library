/**
 * Escapes and unescapes the characters for HTML
 */
export default class StringEscapeHtml {
	/**
	 * Escapes the characters in a string using character references
	 *
	 * @param input - String to escape
	 *
	 * @returns Escaped string
	 */
	static escape(input: string): string {
		let escaped = input;
		for (const [char, ref] of new Map([
			['&', '&amp;'], // & の変換は最初に行う必要がある
			['<', '&lt;'],
			['>', '&gt;'],
			['"', '&quot;'],
			["'", '&#39;'],
		])) {
			escaped = escaped.replaceAll(char, ref);
		}

		return escaped;
	}

	/**
	 * Alias of `escape()`
	 *
	 * @param input - String to escape
	 *
	 * @returns Escaped string
	 */
	static _(input: string): string {
		return StringEscapeHtml.escape(input);
	}

	/**
	 * Unescape characters for which character references are used
	 *
	 * @param input - String to unescape
	 *
	 * @returns Unescaped string
	 */
	static unescape(input: string): string {
		let unescaped = input;
		for (const [char, ref] of new Map([
			['&lt;', '<'],
			['&gt;', '>'],
			['&quot;', '"'],
			['&#39;', "'"],
			['&amp;', '&'], // & の変換は最後に行う必要がある
		])) {
			unescaped = unescaped.replaceAll(char, ref);
		}

		return unescaped;
	}

	/**
	 * Alias of `unescape()`
	 *
	 * @param input - String to unescape
	 *
	 * @returns Unescaped string
	 */
	static $(input: string): string {
		return StringEscapeHtml.unescape(input);
	}

	/**
	 * Escapes for the placeholder in template literals
	 *
	 * @param input - Characters in template literals
	 * @param placeholders - Placeholders in template literals (`${expression}`)
	 *
	 * @returns Escaped string
	 */
	static template(input: TemplateStringsArray, ...placeholders: unknown[]): string {
		return input.reduce((previous, current, index) => {
			const placeholder = String(placeholders.at(index - 1));
			return `${previous}${StringEscapeHtml.escape(placeholder)}${current}`;
		});
	}

	/**
	 * Alias of `template()`
	 *
	 * @param input - String to escape
	 * @param placeholders - Placeholders in template literals (`${expression}`)
	 *
	 * @returns Escaped string
	 */
	static __(input: TemplateStringsArray, ...placeholders: unknown[]): string {
		return StringEscapeHtml.template(input, placeholders);
	}
}
