#!/usr/bin/env zx
import fs from "fs/promises";

const DEPS = [
  "app-root-path",
  "cross-env",
  "dotenv",
  "drizzle-orm",
  "fastify",
  "fastify-type-provider-zod",
  "pg",
  "tsx",
  "zod",
];

const DEV_DEPS = [
  "@faker-js/faker",
  "@fastify/swagger",
  "@fastify/swagger-ui",
  "@trivago/prettier-plugin-sort-imports",
  "@types/node",
  "@types/pg",
  "drizzle-kit",
  "pino-pretty",
  "prettier",
  "typescript",
];

const SHARED_PATH = "./templates/shared";
const TEMPLATE_PATH = "./templates/fastify-drizzle";
const SHOULD_CLEAN_UP = true;
const CLEAN_UP_PATHS = [TEMPLATE_PATH, "./*.mjs"];
const SCRIPTS = {
  start: "cross-env NODE_ENV=development tsx src/main.ts",
  "start:prod": "cross-env NODE_ENV=production tsx src/main.ts",
  test: "cross-env NODE_ENV=test node --import tsx --test src/**/*.test.ts",
  "migrate:gen": "pnpm drizzle-kit generate",
  "migrate:up": "tsx src/db/migrate.ts",
  "migrate:run":
    "cross-env NODE_ENV=development pnpm migrate:gen && cross-env NODE_ENV=development pnpm migrate:up",
  "migrate:run:prod":
    "cross-env NODE_ENV=production pnpm migrate:gen && cross-env NODE_ENV=production pnpm migrate:up",
};

console.log("Deleting old git and initializing new one...");
await $`rm -rf .git`;
await $`git init`;

console.log("Initializing...");
await $`pnpm init`;

if (DEPS.length > 0) {
  console.log(`Installing dependencies...\n${DEPS.join("\n")}`);
  await $`pnpm install ${DEPS}`;
}

if (DEV_DEPS.length > 0) {
  console.log(`Installing dev dependencies...\n${DEV_DEPS.join("\n")}`);
  await $`pnpm i -D ${DEV_DEPS}`;
}

console.log("Modifying package.json...");
const packageJsonStr = await fs.readFile("./package.json", {
  encoding: "utf8",
});
const packageJsonData = JSON.parse(packageJsonStr);
packageJsonData.scripts = { ...SCRIPTS };
await fs.writeFile("./package.json", JSON.stringify(packageJsonData, null, 2));

console.log("Copying template...");
await $`cp -rT ${SHARED_PATH} .`;
await $`cp -rT ${TEMPLATE_PATH} .`;

if (SHOULD_CLEAN_UP) {
  console.log("Cleaning up...");
  await $`rm -rf ${CLEAN_UP_PATHS}`;
}

console.log("Do the following tasks:");
console.log("\tcopy sample.env to .env and set the values to correct ones");
console.log("\tedit db/src/schema.ts to match your own schema");
console.log("\trun 'pnpm migrate:run' to run the migrations");
console.log(
  "\tfor more information check: https://github.com/aigic8/node-starter",
);
console.log("\trun 'pnpm run start' to run the application");
console.log("Happy Coding :)");
