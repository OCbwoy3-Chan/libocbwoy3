import { _libocbwoy3Version } from "./constants";

export { _libocbwoy3Version } from "./constants";
export * from "./console";
export { TimedDataCache } from "./data/TimedDataCache";
export { TimedOneUseDataCache } from "./data/TimedOneUseDataCache";
export { Mutex } from "./util/Mutex";
export { XOR as xor } from "./util/XOR";
export * from "./util/JS";

export function libocbwoy3Greet(): void {
	console.log(`Hello from libocbwoy3! (v${_libocbwoy3Version})`);
}
