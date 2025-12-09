/**
 * Support characters other than "&" as URL query separator
 */
export default class {
	readonly #search: URLSearchParams; // e.g. foo=1&bar=2&baz=3

	/**
	 * @param url - URL object, or full string of URL or substring of URL
	 * @param separators - List of URL query separator
	 */
	constructor(url: URL | string, separators: readonly string[]) {
		let search = '';
		if (typeof url === 'string') {
			const searchIndex = url.indexOf('?');
			if (searchIndex !== -1) {
				search = url.substring(searchIndex + 1);
			}
		} else {
			search = url.search.substring(1);
		}

		if (search !== '') {
			separators.forEach((separator) => {
				search = search.replaceAll(separator, '&');
			});
		}

		this.#search = new URLSearchParams(search);
	}

	/**
	 * Returns a `URLSearchParams` object.
	 *
	 * @returns `URLSearchParams` object
	 */
	get searchParams(): URLSearchParams {
		return this.#search;
	}

	/**
	 * Returns a URL query with the separator unified to "&". (e.g. ?foo=1&bar=2;baz=3 → foo=1&bar=2&baz=3)
	 *
	 * @returns URL query
	 */
	toString(): string {
		return this.#search.toString();
	}
}
