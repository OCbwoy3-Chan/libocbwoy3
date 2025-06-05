export type CacheEntry<V> = {
	value: V;
	expiry: number;
};

export type AllowedDataCacheKeyType = string | number;

/**
 * Represents a cache that stores key-value pairs with a time-to-live (TTL) for each entry.
 * Automatically removes expired entries at regular intervals.
 *
 * @template K - The type of keys allowed in the cache (string or number).
 * @template V - The type of values stored in the cache.
 */
export class TimedDataCache<K extends AllowedDataCacheKeyType, V> {
	protected cache = new Map<K, CacheEntry<V>>();
	protected expiryCheckInterval: number;

	/**
	 * Creates an instance of TimedDataCache.
	 *
	 * @param {number} [expiryCheckInterval=120000] - The interval (in milliseconds) at which a check for expired entries is performed.
	 */
	constructor(expiryCheckInterval: number = 120000) {
		this.expiryCheckInterval = expiryCheckInterval;
		setInterval(
			() => this.removeExpiredEntries(),
			this.expiryCheckInterval
		);
	}

	/**
	 * Converts all cached objects to a JSON-serializable object.
	 *
	 * @returns {{ [key: string]: CacheEntry<V> }} A JSON representation of the cache.
	 */
	toJSON(): { [key: string]: CacheEntry<V> } {
		const result: { [a: string]: CacheEntry<V> } = {};
		for (const [key, entry] of this.cache.entries()) {
			if (entry.expiry > Date.now()) {
				result[String(key)] = entry;
			}
		}
		return result;
	}

	/**
	 * Adds a KV pair to the cache with a specified TTL.
	 *
	 * @param {K} key - The key to store the value under.
	 * @param {V} value - The value to store.
	 * @param {number} ttl - The time-to-live (in milliseconds) for the entry.
	 */
	set(key: K, value: V, ttl: number): void {
		const expiry = Date.now() + ttl;
		this.cache.set(key, { value, expiry });
	}

	/**
	 * Gets the value associated with the given key.
	 *
	 * @param {K} key - The key to retrieve the value for.
	 * @returns {V | undefined} The value if it exists and has not expired, otherwise undefined.
	 */
	get(key: K): V | undefined {
		const entry = this.cache.get(key);
		if (entry && entry.expiry > Date.now()) {
			return entry.value;
		} else {
			this.cache.delete(key);
			return undefined;
		}
	}

	/**
	 * Deletes the entry associated with the given key.
	 *
	 * @param {K} key - The key to delete.
	 * @returns {boolean} True if the entry was deleted, false otherwise.
	 */
	delete(key: K): boolean {
		return this.cache.delete(key);
	}

	/**
	 * Clears all entries from the cache.
	 */
	clear(): void {
		this.cache.clear();
	}

	/**
	 * Checks if a key exists.
	 *
	 * @param {K} key - The key to check.
	 * @returns {boolean} True if the key exists and has not expired, false otherwise.
	 */
	has(key: K): boolean {
		const entry = this.cache.get(key);
		if (entry && entry.expiry > Date.now()) {
			return true;
		} else {
			this.cache.delete(key);
			return false;
		}
	}

	/**
	 * Removes all expired keys from the cache. Automatic.
	 *
	 * @private
	 */
	private removeExpiredEntries(): void {
		const now = Date.now();
		for (const [key, entry] of this.cache.entries()) {
			if (entry.expiry <= now) {
				this.cache.delete(key);
			}
		}
	}
}
