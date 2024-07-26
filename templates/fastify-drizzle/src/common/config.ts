import "dotenv/config"
import { z } from "zod"

const appEnvs = z.enum(["production", "development", "test"] as const)
export type AppConfigEnv = z.infer<typeof appEnvs>
const AppConfig = z.object({
	devDbURL: z.string().url(),
	testDbURL: z.string().url(),
	prodDbURL: z.string().url(),
	env: appEnvs,
	log: z.boolean({ coerce: true }).default(true),
	devHost: z.string().default("127.0.0.1"),
	devPort: z.number({ coerce: true }),
	prodHost: z.string().default("0.0.0.0"),
	prodPort: z.number({ coerce: true }),
})
export type AppConfig = z.infer<typeof AppConfig>

export function loadConfig(): AppConfig {
	return AppConfig.parse({
		env: process.env.NODE_ENV,
		devDbURL: process.env.DEV_DB_URL,
		testDbURL: process.env.TEST_DB_URL,
		prodDbURL: process.env.TEST_DB_URL,
		log: process.env.LOG,
		devHost: process.env.DEV_HOST,
		devPort: process.env.DEV_PORT,
		prodHost: process.env.PROD_HOST,
		prodPort: process.env.PROD_PORT,
	})
}

export function getDbURL(c: AppConfig): string {
	if (c.env === "development") {
		return c.devDbURL
	} else if (c.env === "test") {
		return c.testDbURL
	} else if (c.env === "production") {
		return c.prodDbURL
	} else {
		throw new Error(`unknown app environment: '${c.env}`)
	}
}

export function getHost(c: AppConfig): string {
	if (c.env === "development" || c.env === "test") {
		return c.devHost
	} else if (c.env === "production") {
		return c.prodHost
	} else {
		throw new Error(`unknown app environment: '${c.env}`)
	}
}

export function getPort(c: AppConfig): number {
	if (c.env === "development" || c.env === "test") {
		return c.devPort
	} else if (c.env === "production") {
		return c.prodPort
	} else {
		throw new Error(`unknown app environment: '${c.env}`)
	}
}
