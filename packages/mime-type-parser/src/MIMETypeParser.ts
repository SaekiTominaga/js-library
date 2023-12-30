/**
 * Parsing a MIME type
 */
export default class MIMETypeParser {
	readonly #SEPARATOR_TYPE_SUBTYPE = '/'; // `type` と `subtype` の区切り子

	readonly #SEPARATOR_PARAMETERS = ';'; // パラメーラーの区切り子

	readonly #SEPARATOR_PARAMETERS_KEY_VALUE = '='; // パラメーラーのキーと値の区切り子

	readonly #type: string;

	readonly #subtype: string;

	readonly #parameters: Map<string, string>;

	/**
	 * @param inputMimeType - MIME type value
	 */
	constructor(inputMimeType: string) {
		const inputMimeTypeTrim = inputMimeType.trim();

		const typeEndPosition = inputMimeTypeTrim.indexOf(this.#SEPARATOR_TYPE_SUBTYPE);
		if (typeEndPosition === -1) {
			throw new Error('The specified string does not contain a slash.');
		}

		const type = inputMimeTypeTrim.substring(0, typeEndPosition);
		if (type === '') {
			throw new Error('The `type` is the empty string.');
		} else if (!MIMETypeParser.#solelyContainHTTPTokenCodePoints(type)) {
			throw new Error('The `type` contains an invalid string.');
		}

		const subtypeStartPosition = typeEndPosition + 1;

		const subtypeEndPosition = inputMimeTypeTrim.indexOf(this.#SEPARATOR_PARAMETERS);
		const existParameters = subtypeEndPosition !== -1;
		const subtype = existParameters
			? inputMimeTypeTrim.substring(subtypeStartPosition, subtypeEndPosition).trimEnd()
			: inputMimeTypeTrim.substring(subtypeStartPosition);
		if (subtype === '') {
			throw new Error('The `subtype` is the empty string.');
		} else if (!MIMETypeParser.#solelyContainHTTPTokenCodePoints(subtype)) {
			throw new Error('The `subtype` contains an invalid string.');
		}

		const parametersMap = new Map<string, string>();
		if (existParameters) {
			const parametersStartPosition = subtypeEndPosition + 1;

			const parameters = inputMimeTypeTrim.substring(parametersStartPosition);

			parameters
				.split(this.#SEPARATOR_PARAMETERS)
				.map((parameter) => parameter.trim())
				.forEach((parameter) => {
					const parameterNameEndPosition = parameter.indexOf(this.#SEPARATOR_PARAMETERS_KEY_VALUE);
					if (parameterNameEndPosition === -1) {
						/* パラメーターにキーと値の区切り文字がない場合 */
						return;
					}

					const parameterValueStartPosition = parameterNameEndPosition + 1;

					const parameterName = parameter.substring(0, parameterNameEndPosition).toLowerCase();
					let parameterValue = parameter.substring(parameterValueStartPosition);
					if (parameterValue.startsWith('"')) {
						parameterValue = MIMETypeParser.#collectHTTPQuotedString(parameterValue);
					} else if (parameterValue === '') {
						return;
					}

					if (
						parameterName !== '' &&
						MIMETypeParser.#solelyContainHTTPTokenCodePoints(parameterName) &&
						MIMETypeParser.#solelyContainHTTPQuotedStringTokenCodePoints(parameterValue) &&
						!parametersMap.has(parameterName)
					) {
						parametersMap.set(parameterName, parameterValue);
					}
				});
		}

		this.#type = type.toLowerCase();
		this.#subtype = subtype.toLowerCase();
		this.#parameters = parametersMap;
	}

	/**
	 * Get the entire serialized MIME type string. <https://mimesniff.spec.whatwg.org/#serializing-a-mime-type>
	 *
	 * @returns MIME type (e.g. 'text/html;charset=utf-8')
	 */
	toString(): string {
		let serialization = this.getEssence();

		for (const [parameterName, parameterValue] of this.#parameters) {
			serialization += `;${parameterName}=`;

			if (parameterValue === '' || !MIMETypeParser.#solelyContainHTTPTokenCodePoints(parameterValue)) {
				serialization += `"${parameterValue.replace(/(["\\])/g, '\\$&')}"`;
			} else {
				serialization += parameterValue;
			}
		}

		return serialization;
	}

	/**
	 * Get the `type` part of MIME type
	 *
	 * @returns type (e.g. 'text')
	 */
	getType(): string {
		return this.#type;
	}

	/**
	 * Get the `subtype` part of MIME type
	 *
	 * @returns subtype (e.g. 'html')
	 */
	getSubtype(): string {
		return this.#subtype;
	}

	/**
	 * Get the `essence` part (`type`/`subtype`) of MIME type
	 *
	 * @returns essence (e.g. 'text/html')
	 */
	getEssence(): string {
		return `${this.#type}${this.#SEPARATOR_TYPE_SUBTYPE}${this.#subtype}`;
	}

	/**
	 * Get the `parameters` part of MIME type
	 *
	 * @returns parameters (e.g. Map(1) { 'charset' => 'utf-8' })
	 */
	getParameters(): Map<string, string> {
		return this.#parameters;
	}

	/**
	 * Get the value of `parameters` associated with the specified key of MIME type
	 *
	 * @param key - Key of the parameter
	 *
	 * @returns The value of parameter associated with the specified key (e.g. 'utf-8')
	 */
	getParameter(key: string): string | undefined {
		return this.#parameters.get(key);
	}

	/**
	 * 文字列が HTTP token code point <https://mimesniff.spec.whatwg.org/#http-token-code-point> のみで構成されているか
	 *
	 * @param value - 調査する文字列
	 *
	 * @returns HTTP token code point のみで構成されていれば true
	 */
	static #solelyContainHTTPTokenCodePoints(value: string): boolean {
		return /^[!#$%&'*+\-.^_`|~0-9A-Za-z]*$/.test(value);
	}

	/**
	 * 文字列が HTTP quoted-string token code point <https://mimesniff.spec.whatwg.org/#http-quoted-string-token-code-point> のみで構成されているか
	 *
	 * @param value - 調査する文字列
	 *
	 * @returns HTTP quoted-string token code point のみで構成されていれば true
	 */
	static #solelyContainHTTPQuotedStringTokenCodePoints(value: string): boolean {
		return /^[\t\u0020-\u007E\u0080-\u00FF]*$/.test(value);
	}

	/**
	 * HTTP quoted string <https://fetch.spec.whatwg.org/#collect-an-http-quoted-string> を収集する
	 *
	 * @param input - 調査する文字列
	 *
	 * @returns HTTP quoted string
	 */
	static #collectHTTPQuotedString(input: string): string {
		const inputLength = input.length;
		let position = 1;
		let output = '';

		while (position < inputLength) {
			while (position < inputLength && input[position] !== '"' && input[position] !== '\\') {
				output += input[position];
				position += 1;
			}

			const quoteOrBackslash = input[position];
			position += 1;

			if (quoteOrBackslash === '\\') {
				if (position >= inputLength) {
					output += '\\';
					break;
				}

				output += input[position];
				position += 1;
			} else {
				break;
			}
		}

		return output;
	}
}
