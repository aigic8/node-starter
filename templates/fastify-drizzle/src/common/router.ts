import { z } from "zod"

// fastify schema with zod
export interface SZ {
	querystring?: z.SomeZodObject
	body?: z.SomeZodObject
	response?: z.SomeZodObject
}

// fastify schema type using zod
export type SZT<G extends SZ> = {
	Querystring: G["querystring"] extends z.SomeZodObject ? z.infer<G["querystring"]> : undefined
	Body: G["body"] extends z.SomeZodObject ? z.infer<G["body"]> : undefined
}

export type AppOKResponse<T> = { ok: true; data: T }
export type AppErrResponse = { ok: false; errors: string[] }
export type AppResponse<T> = AppOKResponse<T> | AppErrResponse

export function respWithData<T>(data: T): AppOKResponse<T> {
	return { ok: true, data }
}

export function respWithErrs(errs: string | string[]): AppErrResponse {
	if (typeof errs === "string") {
		return { ok: false, errors: [errs] }
	}
	return { ok: false, errors: errs }
}
