import { expect, test, describe } from "bun:test";
import { AxyPE } from "../src/index";

describe.if(!!process.env.AXYPE_KEY)("AxyPE", () => {
	test("Script creation / key generation", async() => {
		const axy = new AxyPE({
			apiKey: process.env.AXYPE_KEY!
		})

		await (async()=>{
			const response = await axy.updateSource({ scriptName: "ocbwoy3scriptloaderlibtest", newSource: "print('test')" })
			expect(response.name).toBe("ocbwoy3scriptloaderlibtest");
			expect(response.success).toBe(true);
		})()

		await (async()=>{
			const response = await axy.generateKey({ scriptName: "ocbwoy3scriptloaderlibtest" })
			expect(response.require).toBeString();
			expect(response.expiresAt).toBeValidDate();
		})()
	});
});
