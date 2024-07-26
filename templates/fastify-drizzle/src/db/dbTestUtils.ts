import { getDbURL, loadConfig } from "../common/config"
import NewAppDB from "./db"

export function newTestDB() {
	const c = loadConfig()
	return NewAppDB({ dbURL: getDbURL(c) })
}
