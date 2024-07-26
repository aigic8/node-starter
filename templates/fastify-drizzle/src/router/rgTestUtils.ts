import { _appFastify } from "../app"
import { FastifyPluginCallbackZod } from "fastify-type-provider-zod"

export async function newTestAppForRg(rg: FastifyPluginCallbackZod, log = false) {
	const testApp = await _appFastify(log, "test")
	testApp.register(rg, { prefix: "/" })
	return testApp
}
