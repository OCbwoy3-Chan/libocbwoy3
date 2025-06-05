import { expect, test, describe } from "bun:test";
import { TimedDataCache, TimedOneUseDataCache } from "../src/index";

describe("data cache", () => {
	test("get", () => {
		const d = new TimedDataCache(900_000);
		d.set("1","2",900_000)
		expect(d.get("1")).toBe("2");
	});
	test("clear", () => {
		const d = new TimedDataCache(900_000);
		d.set("1","2",900_000)
		d.clear();
		expect(JSON.stringify(d.toJSON())).toBe(`{}`);
	});
	test("delete", () => {
		const d = new TimedDataCache(900_000);
		d.set("1","2",900_000)
		expect(d.delete("1")).toBe(true);
	});
});

describe("one-time data cache", () => {
	test("get", () => {
		const d = new TimedOneUseDataCache(900_000);
		d.set("1","2",900_000)
		expect(d.get("1")).toBe("2");
		expect(d.get("1")).toBe(undefined);
	});
});
