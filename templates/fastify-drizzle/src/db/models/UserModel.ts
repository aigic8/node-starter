import { DB_ERR_NOT_EXISTS } from "../errors"
import * as schema from "../schema"
import { eq } from "drizzle-orm"
import { NodePgDatabase } from "drizzle-orm/node-postgres"

export type UserModel = ReturnType<typeof UserModel>

export default function UserModel(db: NodePgDatabase<typeof schema>) {
	const create = (user: schema.NewUser) => {
		return db.insert(schema.UsersTable).values(user)
	}

	const get = async (username: string) => {
		const users = await db
			.select()
			.from(schema.UsersTable)
			.where(eq(schema.UsersTable.username, username))
		if (users.length === 0) throw DB_ERR_NOT_EXISTS
		return users[0]
	}

	return { get, create }
}
