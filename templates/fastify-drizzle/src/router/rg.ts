import { AppDB } from "../db/db"
import UserRG from "./groups/userRg"
import { FastifyPluginCallback } from "fastify"

interface RGOptions {
	appDB: AppDB
}

export default function RG({ appDB }: RGOptions): FastifyPluginCallback {
	return (fastify, _, done) => {
		fastify.register(UserRG({ appDB }), { prefix: "/user" })

		done()
	}
}
