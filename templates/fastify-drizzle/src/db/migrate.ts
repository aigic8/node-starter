import { getDbURL, loadConfig } from "../common/config"
import NewAppDB from "./db"
import appRootPath from "app-root-path"
import { migrate } from "drizzle-orm/node-postgres/migrator"

async function main() {
	const c = loadConfig()
	const appDB = NewAppDB({ dbURL: getDbURL(c) })
	await migrate(appDB._db, { migrationsFolder: appRootPath.resolve("/src/db/migrations") })
	await appDB.close()
}

main()
