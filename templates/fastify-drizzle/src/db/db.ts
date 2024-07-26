import UserModel from "./models/UserModel"
import * as schema from "./schema"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

export * as errors from "./errors"

export interface AppDBOptions {
	dbURL: string
}
export type AppDB = ReturnType<typeof NewAppDB>

export default function NewAppDB({ dbURL: URL }: AppDBOptions) {
	const pool = new Pool({
		connectionString: URL,
	})

	const db = drizzle(pool, { schema })
	const user = UserModel(db)

	const close = () => {
		return pool.end()
	}

	return { _db: db, user, close }
}
