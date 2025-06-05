/**
 * Gets if the current process is running on Bun.
 */
export function isBun(): boolean {
	return process.isBun || false
}
