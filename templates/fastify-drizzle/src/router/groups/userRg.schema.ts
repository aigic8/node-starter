import { AppResponse, SZT } from "../../common/router"
import { z } from "zod"

export const SUserHome = {
	querystring: z.object({
		name: z.string(),
	}),
}
export type SUserHomeT = SZT<typeof SUserHome>
export type UserHomeRD = { hello: string }
export type UserHomeR = AppResponse<UserHomeRD>

export const SUserCreate = {
	body: z.object({
		username: z.string(),
	}),
}
export type SUserCreateT = SZT<typeof SUserCreate>
export type UserCreateRD = Record<string, never>
export type UserCreateR = AppResponse<UserCreateRD>
