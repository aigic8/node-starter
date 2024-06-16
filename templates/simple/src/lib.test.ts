import { add } from "./lib"
import assert from "node:assert/strict"
import test from "node:test"

test("add works", () => {
	assert.equal(add(2, 3), 5)
})
