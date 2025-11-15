/**
 * Escapes the characters in a string using character references
 *
 * @param input - String to escape
 *
 * @returns Escaped string
 */
export const escape = (input: string): string => {
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
};

/**
 * Unescape characters for which character references are used
 *
 * @param input - String to unescape
 *
 * @returns Unescaped string
 */
export const unescape = (input: string): string => {
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
};

/**
 * Escapes for the placeholder in template literals
 *
 * @param input - Characters in template literals
 * @param placeholders - Placeholders in template literals (`${expression}`)
 *
 * @returns Escaped string
 */
export const template = (input: Readonly<TemplateStringsArray>, ...placeholders: readonly unknown[]): string =>
	input.reduce((previous, current, index) => {
		const placeholder = String(placeholders.at(index - 1));
		return `${previous}${escape(placeholder)}${current}`;
	});
