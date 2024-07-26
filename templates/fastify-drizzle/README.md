# Fastify Drizzle

## Tasks

- [x] layout for route-groups
- [x] support for typed routes
- [x] drizzle
- [x] use env
- [x] create a config module to load the config once with type safety (ZOD)
- [x] create a type called SZod for fastify schema with zod with types being `{ querystring: zod, response: zod ... }`
- [ ] add reply support for zod types
- [x] handle 404, and errors with the structure of replies
- [x] separate dev and production code based on env
- [x] testing
- [x] logging
- [x] swagger support
- [x] Dockerfile
- [x] custom standardized types and structure for reply like `{ ok: bool, data: .... }` and `{ ok: false, errors: []string }`
- [ ] fix the tests
- [ ] add Kubernetes configuration snippet in the main README
