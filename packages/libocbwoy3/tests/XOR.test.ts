import { expect, test, describe } from "bun:test";
import { xor } from "../src/index";

describe("XOR", () => {
	test("encryption", () => {
		expect(btoa(xor("hello", "key"))).toBe("AwAVBwo=");
	});
	test("decryption", () => {
		expect(xor(atob("AwAVBwo="), "key")).toBe("hello");
	});
});
