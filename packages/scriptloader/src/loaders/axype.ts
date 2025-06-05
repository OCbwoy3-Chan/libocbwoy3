import { CreateProperties, ScriptLoader } from "../_proto";

type generatePasteResponse = {

	// new Date().toISOString()

    registration: string, // js iso string
    expiration: string, // js iso string

    source: {
        raw: string,
        assetId: string,
        key: string,
        username: string
    }
}

type updateSourceResponse = {
	success: boolean,
	name: string,
	sizeInMegabytes: number
}

/**
 * AxyPE Script Loader API
 * @class
 */
export class AxyPE extends ScriptLoader {
	constructor(createProperties: CreateProperties) {
		createProperties.apiHost = createProperties.apiHost || "https://axype-pasteloader.scriptlang.com/api";
		createProperties.defaultHeaders = {
			...(createProperties.defaultHeaders || {}),
			authentication: createProperties.apiKey
		};
		super(createProperties);
	}

	public override async generateKey({ scriptName }: { scriptName: string }): Promise<{ require: string, expiresAt: Date }> {
		const res = await this.post<generatePasteResponse>({
			path: "/generate",
			headers: {
				script: scriptName
			}
		})
		return {
			require: res.source.raw,
			expiresAt: new Date(res.expiration)
		};
	}

	public override async updateSource({ scriptName, newSource }: { scriptName: string, newSource: string }): Promise<updateSourceResponse> {
		const res = await this.post<updateSourceResponse>({
			path: "/setSource",
			content: JSON.stringify({
				source: newSource
			}),
			headers: {
				"Content-Type": "application/json",
				script: scriptName
			}
		})
		return res;
	}
}
