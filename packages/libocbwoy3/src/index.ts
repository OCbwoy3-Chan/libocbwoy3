import { _libocbwoy3Version } from "./constants";

export * from "./console";

export function libocbwoy3Greet(): void {
	console.log(`Hello from libocbwoy3! (v${_libocbwoy3Version})`);
}

