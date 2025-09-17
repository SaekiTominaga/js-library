interface Option {
	strict?: boolean; // If `true`, syntax without hyphens is an error
}

interface VerifyOption {
	check_digit?: boolean; // Verify format including check digit
}

/**
 * Verify ISBN string format and check digit
 */
export default class {
	readonly #isbnNormalization: string; // ISBN (without hyphen)

	readonly #isbn13: boolean = false; // Whether the specified ISBN is a current standard (13 digit) ISBN or not

	readonly #isbn10: boolean = false; // Whether the specified ISBN is a old standard (10 digit) ISBN or not

	/**
	 * @param isbn - ISBN value to check
	 * @param options - Characteristics related to the handling of ISBN values
	 */
	constructor(isbn: string, options?: Readonly<Option>) {
		const isbnNormalization = isbn.replace(/-/gu, '');
		this.#isbnNormalization = isbnNormalization;

		if (options?.strict) {
			const { length } = isbn;

			if (length === 17 /* performance */ && /^(978|979)-[0-9]{1,5}-[0-9]{1,7}-[0-9]{1,7}-[0-9]$/u.test(isbn)) {
				this.#isbn13 = true;
			} else if (length === 13 /* performance */ && /^[0-9]{1,5}-[0-9]{1,7}-[0-9]{1,7}-[0-9X]$/u.test(isbn)) {
				this.#isbn10 = true;
			}
		} else if (!isbn.includes('--')) {
			if (/^(978|979)[0-9]{10}$/u.test(isbnNormalization)) {
				if (/^[0-9][-0-9]{11,15}[0-9]$/u.test(isbn)) {
					this.#isbn13 = true;
				}
			} else if (/^[0-9]{9}[0-9X]$/u.test(isbnNormalization)) {
				if (/^[0-9][-0-9]{8,11}[0-9X]$/u.test(isbn)) {
					this.#isbn10 = true;
				}
			}
		}
	}

	/**
	 * Alias of `verify({ check_digit: true })`
	 *
	 * @returns `true` if both format and check digit are correct
	 */
	isValid(): boolean {
		return this.verify({ check_digit: true });
	}

	/**
	 * Whether it is a current standard (13 digit) ISBN or not
	 *
	 * @param options - Characteristics about the check item
	 *
	 * @returns `true` for current standard (13 digit) ISBN
	 */
	isIsbn13(options?: Readonly<VerifyOption>): boolean {
		return this.#isbn13 && this.verify(options);
	}

	/**
	 * Whether it is a old standard (10 digit) ISBN or not
	 *
	 * @param options - Characteristics about the check item
	 *
	 * @returns `true` for old standard (10 digit) ISBN
	 */
	isIsbn10(options?: Readonly<VerifyOption>): boolean {
		return this.#isbn10 && this.verify(options);
	}

	/**
	 * Verify format, optionally check digit
	 *
	 * @param options - Characteristics about the check item
	 *
	 * @returns `true` if format are correct
	 */
	verify(options?: Readonly<VerifyOption>): boolean {
		if (options?.check_digit) {
			if (this.#isbn13) {
				return this.#isbnNormalization.substring(12) === this.#getCheckDigit13();
			} else if (this.#isbn10) {
				return this.#isbnNormalization.substring(9) === this.#getCheckDigit10();
			}

			return false;
		}

		return this.#isbn13 || this.#isbn10;
	}

	/**
	 * Get ISBN-13 check digit
	 *
	 * @returns Check digit
	 */
	#getCheckDigit13(): string {
		const isbnNormalization = this.#isbnNormalization;

		const checkDigit =
			10 -
			((Number(isbnNormalization.substring(0, 1)) +
				Number(isbnNormalization.substring(1, 2)) * 3 +
				Number(isbnNormalization.substring(2, 3)) +
				Number(isbnNormalization.substring(3, 4)) * 3 +
				Number(isbnNormalization.substring(4, 5)) +
				Number(isbnNormalization.substring(5, 6)) * 3 +
				Number(isbnNormalization.substring(6, 7)) +
				Number(isbnNormalization.substring(7, 8)) * 3 +
				Number(isbnNormalization.substring(8, 9)) +
				Number(isbnNormalization.substring(9, 10)) * 3 +
				Number(isbnNormalization.substring(10, 11)) +
				Number(isbnNormalization.substring(11, 12)) * 3) %
				10);

		switch (checkDigit) {
			case 10:
				return '0';
			default:
		}

		return String(checkDigit);
	}

	/**
	 * Get ISBN-10 check digit
	 *
	 * @returns Check digit
	 */
	#getCheckDigit10(): string {
		const isbnNormalization = this.#isbnNormalization;

		const checkDigit =
			11 -
			((Number(isbnNormalization.substring(0, 1)) * 10 +
				Number(isbnNormalization.substring(1, 2)) * 9 +
				Number(isbnNormalization.substring(2, 3)) * 8 +
				Number(isbnNormalization.substring(3, 4)) * 7 +
				Number(isbnNormalization.substring(4, 5)) * 6 +
				Number(isbnNormalization.substring(5, 6)) * 5 +
				Number(isbnNormalization.substring(6, 7)) * 4 +
				Number(isbnNormalization.substring(7, 8)) * 3 +
				Number(isbnNormalization.substring(8, 9)) * 2) %
				11);

		switch (checkDigit) {
			case 10:
				return 'X';
			case 11:
				return '0';
			default:
		}

		return String(checkDigit);
	}
}
