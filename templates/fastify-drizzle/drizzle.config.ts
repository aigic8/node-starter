import { loadConfig } from "./src/common/config"
import { defineConfig } from "drizzle-kit"

const c = loadConfig()

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./src/db/migrations",
	dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
	dbCredentials: {
		url: c.dbURL,
	},
})
