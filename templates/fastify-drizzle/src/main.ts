import { newApp } from "./app"
import { getDbURL, loadConfig } from "./common/config"
import NewAppDB from "./db/db"

async function main() {
	const c = loadConfig()
	const appDB = NewAppDB({ dbURL: getDbURL(c) })
	const app = await newApp(c, appDB)
	app.run()
}

main()
