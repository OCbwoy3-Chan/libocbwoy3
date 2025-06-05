import { expect, test, describe } from "bun:test";
import { isBun } from "../src/index";

describe("JavaScript", () => {
	test("isBun", () => {
		expect(isBun()).toBe(true);
	});
});
