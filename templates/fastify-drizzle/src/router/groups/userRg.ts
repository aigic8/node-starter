import { respWithData, respWithErrs } from "../../common/router"
import { AppDB } from "../../db/db"
import {
	UserCreateR,
	UserHomeR,
	SUserCreate,
	SUserCreateT,
	SUserHome,
	SUserHomeT,
} from "./userRg.schema"
import { FastifyPluginCallbackZod } from "fastify-type-provider-zod"

interface UserRGOptions {
	appDB: AppDB
}

export default function UserRG({ appDB }: UserRGOptions): FastifyPluginCallbackZod {
	return function (fastify, _, done) {
		fastify.get<SUserHomeT>("/", { schema: SUserHome }, function (req, reply) {
			const resp: UserHomeR = respWithData({ hello: req.query.name })
			reply.send(resp)
		})

		fastify.post<SUserCreateT>("/create", { schema: SUserCreate }, async function (req, reply) {
			try {
				await appDB.user.create({ username: req.body.username, passwordHash: "1234" })
			} catch (e) {
				// TODO: find a better error handling method
				if ("code" in e && e.code === "23505") {
					return reply.status(400).send(respWithErrs("username already exists"))
				} else {
					throw e
				}
			}
			const resp: UserCreateR = respWithData({})
			reply.send(resp)
		})

		done()
	}
}
