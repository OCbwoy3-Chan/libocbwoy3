/**
 * Performs an XOR (exclusive OR) operation on the input string using the provided key.
 *
 * Usage:
 * ```typescript
 * const encrypted = XOR("hello", "key");
 * console.log(encrypted); // Encoded string
 * ```
 *
 * @param input - The input string to be XOR-ed.
 * @param key - The key string used for the XOR operation.
 * @returns The encryption/decryption result.
 */
export function XOR(input: string, key: string): string {
	const inputBytes = Buffer.from(input, "utf-8");
	const keyBytes = Buffer.from(key, "utf-8");
	const result = Buffer.alloc(inputBytes.length);

	for (let i = 0; i < inputBytes.length; i++) {
		result[i] = inputBytes[i] ^ keyBytes[i % keyBytes.length];
	}

	return result.toString("utf-8");
}
