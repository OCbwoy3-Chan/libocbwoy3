/**
 * Represents a simple mutex (mutual exclusion) lock mechanism.
 * Ensures that only one async operation can proceed at a time.
 *
 * Usage:
 * ```typescript
 * const mutex = new Mutex();
 *
 * async function someFunction() {
 *   await mutex.lock();
 *   try {
 *     // Your code
 *   } finally {
 *     mutex.unlock();
 *   }
 * }
 * ```
 */
export class Mutex {
	private promise: Promise<void> = Promise.resolve();
	private resolve: () => void = () => {};

	async lock(): Promise<void> {
		const oldPromise = this.promise;
		this.promise = new Promise((resolve) => (this.resolve = resolve));
		await oldPromise;
	}

	unlock(): void {
		this.resolve();
	}
}
