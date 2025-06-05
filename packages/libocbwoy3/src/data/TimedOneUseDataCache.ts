import { AllowedDataCacheKeyType, TimedDataCache } from "./TimedDataCache";

/**
 * A timed cache that only allows one-time use of cached values.
 *
 * @template K - The type of keys allowed in the cache (string or number).
 * @template V - The type of values stored in the cache.
 *
 * @extends TimedDataCache<AllowedDataCacheKeyType, any>
 */
export class TimedOneUseDataCache<K extends AllowedDataCacheKeyType,V> extends TimedDataCache<AllowedDataCacheKeyType,any> {
	/**
	 * Gets the value associated with the given key and removes it from the cache.
	 *
	 * @param {K} key - The key to retrieve the value for.
	 * @returns {V | undefined} The value if it exists and has not expired, otherwise undefined.
	 */
	public override get(key: string): V | undefined {
		// console.log(this.cache);
		const entry = this.cache.get(key);
		if (entry && entry.expiry > Date.now()) {
			this.cache.delete(key);
			return entry.value;
		} else {
			this.cache.delete(key);
			return undefined;
		}
	}
}

