#!/usr/bin/env zx
import fs from "fs/promises";

const DEPS = [];
const DEV_DEPS = [
  "@trivago/prettier-plugin-sort-imports",
  "@types/node",
  "prettier",
  "tsx",
  "typescript",
];

const SHARED_PATH = "./templates/shared";
const TEMPLATE_PATH = "./templates/simple";
const SHOULD_CLEAN_UP = true;
const CLEAN_UP_PATHS = [TEMPLATE_PATH, "./*.mjs"];
const SCRIPTS = {
  test: "node --import tsx --test **/*.test.ts",
  start: "tsx src/main.ts",
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

console.log("Done. Happy Coding... :)");
