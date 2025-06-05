import assert from "assert";
import axios from "axios";

export type CreateProperties = {
	apiHost?: string;
	apiKey: string;
	defaultHeaders?: { [header: string]: string };
};

/**
 * Base Script Loader
 * @abstract
 * @class
 */
export abstract class ScriptLoader {
	protected apiKey: string | null;
	protected apiHost: string | null;
	protected defaultHeaders: { [header: string]: string } = {};

	constructor(createProperties: CreateProperties) {
		assert(!!createProperties.apiHost, "No API Host!");
		assert(!!createProperties.apiKey, "No API Key!");
		this.apiKey = createProperties.apiKey;
		this.apiHost = createProperties.apiHost;
		this.defaultHeaders = createProperties.defaultHeaders || {}
	}

	protected post<T>({
		path,
		headers,
		content
	}: {
		path: string;
		headers?: { [header: string]: string };
		content?: string;
	}): Promise<T> {
		return axios.post(this.apiHost + path, content || "", {
			headers: { ...(this.defaultHeaders), ...(headers || {}) }
		}).then(a=>a.data).catch(a=>{
			throw new Error("Request Error: "+JSON.stringify(a.response.data))
		})
	}

	public async generateKey({
		scriptName, username
	}: { scriptName: string, username: string }): Promise<{ require: string }> {
		throw new Error("Not implemented in base class")
	}

	public async updateSource({
		scriptName, newSource
	}: { scriptName: string, newSource: string }): Promise<any> {
		throw new Error("Not implemented in base class")
	}

}
