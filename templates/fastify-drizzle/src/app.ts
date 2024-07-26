import { AppConfig, AppConfigEnv, getHost, getPort } from "./common/config"
import { respWithErrs } from "./common/router"
import { AppDB } from "./db/db"
import RG from "./router/rg"
import Fastify, { FastifyRequest, FastifyReply, FastifyError } from "fastify"
import {
	serializerCompiler,
	validatorCompiler,
	jsonSchemaTransform,
} from "fastify-type-provider-zod"

export async function newApp(c: AppConfig, appDB: AppDB) {
	const fastify = await _appFastify(c.log, c.env)
	fastify.register(RG({ appDB }), { prefix: "/api" })

	const run = () => {
		fastify.listen({ host: getHost(c), port: getPort(c) })
	}

	return { run }
}

// creates and configures fastify for the basic app needs. Should not be used and ONLY EXPORTED FOR TESTING PURPOSES
export async function _appFastify(log: boolean, env: AppConfigEnv) {
	const logger = log ? envLogger(env) : false
	const fastify = Fastify({ logger })
	fastify.setValidatorCompiler(validatorCompiler)
	fastify.setSerializerCompiler(serializerCompiler)
	fastify.setErrorHandler(errorHandler)
	fastify.setNotFoundHandler((_req: FastifyRequest, reply: FastifyReply) => {
		return reply.status(404).send(respWithErrs("not found"))
	})

	if (env === "development" || env === "test") {
		// dynamic import is required because the build will
		// fail in production environments due to dev packages
		// not being available
		const fastifySwagger = await import("@fastify/swagger")
		const fastifySwaggerUI = await import("@fastify/swagger-ui")
		fastify.register(fastifySwagger, {
			openapi: {
				info: {
					title: "AppApi",
					description: "AppApi Backend service",
					version: "0.1.0",
				},
				servers: [],
			},
			transform: jsonSchemaTransform,
		})

		fastify.register(fastifySwaggerUI, {
			routePrefix: "/docs",
		})
	}

	return fastify
}

function envLogger(env: AppConfigEnv) {
	// source: https://fastify.dev/docs/latest/Reference/Logging/#enable-logging
	const envLoggingMap = {
		development: {
			transport: {
				target: "pino-pretty",
				options: {
					translateTime: "HH:MM:ss Z",
					ignore: "pid,hostname",
				},
			},
		},
		production: true,
		test: false,
	} as const
	return envLoggingMap[env]
}

function errorHandler(err: FastifyError, _req: FastifyRequest, reply: FastifyReply) {
	// FIXME: support cases when valuation error is important, like login
	if (err.code === "FST_ERR_VALIDATION") {
		return reply.status(400).send(respWithErrs("validation error"))
	} else {
		return reply.send(err)
	}
}
