/**
 * Parsing a PA-API 5.0 Item Image URL
 */
export default class {
	readonly #url: URL;

	readonly #dir: string;

	readonly #fileId: string;

	#fileSize: number | null;

	readonly #fileExtension: string;

	/**
	 * @param inputUrl - Image URL (e.g. new URL('https://m.media-amazon.com/images/I/5198TOs+rnL._SL160_.jpg') )
	 */
	constructor(inputUrl: URL) {
		this.#url = inputUrl;

		const matchGroups = /(?<dir>\/images\/[A-Z])\/(?<id>[a-zA-Z0-9\-_+%]+)(\._SL(?<size>[0-9]+)_)?(?<ext>\.[a-zA-Z0-9]+)$/.exec(inputUrl.pathname)?.groups;
		if (matchGroups === undefined) {
			throw new Error('The format of the URL does not seem to be that of an Amazon product image.');
		}

		const { dir, id, size, ext } = matchGroups;

		this.#dir = dir!;
		this.#fileId = id!;
		this.#fileSize = size !== undefined ? Number(size) : null;
		this.#fileExtension = ext!;
	}

	/**
	 * Get the entire Image URL string.
	 *
	 * @returns Image URL
	 */
	toString(): string {
		if (this.#fileSize === null) {
			this.#url.pathname = `${this.#dir}/${this.#fileId}${this.#fileExtension}`;
		} else {
			this.#url.pathname = `${this.#dir}/${this.#fileId}._SL${this.#fileSize}_${this.#fileExtension}`;
		}

		return this.#url.toString();
	}

	/**
	 * Get the ID part of URL
	 *
	 * @returns ID of the image file name (e.g. '5198TOs+rnL')
	 */
	getId(): string {
		return this.#fileId;
	}

	/**
	 * Get the size part of URL
	 *
	 * @returns Image size (e.g. 160)
	 */
	getSize(): number | null {
		return this.#fileSize;
	}

	/**
	 * Set the image size (Used to get images of different sizes)
	 *
	 * @param size - Image size (e.g. 160)
	 */
	setSize(size: number): void {
		if (!Number.isInteger(size)) {
			throw new TypeError('The image size must be specified as an integer.');
		}
		if (size < 1) {
			throw new RangeError('The image size must be a value greater than or equal to 1 (px).');
		}

		this.#fileSize = size;
	}

	/**
	 * Remove the image size (Used to get the original size image)
	 */
	removeSize(): void {
		this.#fileSize = null;
	}

	/**
	 * Multiply the size of the image (Used to get images of different sizes)
	 *
	 * @param multiply - Numerical value to multiply the image size
	 */
	setSizeMultiply(multiply: number): void {
		if (multiply <= 0) {
			throw new RangeError('The value to be multiply must be greater than zero.');
		}
		if (this.#fileSize === null) {
			throw new Error('It is not possible to multiply the size of an image whose size is not specified. Please execute the `setSize()` method before this.');
		}

		const size = Math.round(this.#fileSize * multiply);
		this.#fileSize = size < 1 ? 1 : size;
	}

	/**
	 * Division the size of the image (Used to get images of different sizes)
	 *
	 * @param division - Numerical value to division the image size
	 */
	setSizeDivision(division: number): void {
		if (division <= 0) {
			throw new RangeError('The value to be division must be greater than zero.');
		}
		if (this.#fileSize === null) {
			throw new Error('It is not possible to division the size of an image whose size is not specified. Please execute the `setSize()` method before this.');
		}

		const size = Math.round(this.#fileSize / division);
		this.#fileSize = size < 1 ? 1 : size;
	}

	/**
	 * Get the extension part of URL
	 *
	 * @returns Image file extension (e.g. '.jpg')
	 */
	getExtension(): string {
		return this.#fileExtension;
	}
}
