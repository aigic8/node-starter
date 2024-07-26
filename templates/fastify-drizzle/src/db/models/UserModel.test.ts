import { errors } from "../db"
import { newTestDB } from "../dbTestUtils"
import { faker } from "@faker-js/faker"
import assert from "node:assert/strict"
import test from "node:test"

test("userModel", async (t) => {
	await t.test("get, not exists", async () => {
		const testDB = newTestDB()
		let errored = false
		// TODO: find a cleaner way
		try {
			const res = await testDB.user.get(faker.string.uuid())
			console.log(res)
		} catch (e) {
			assert.equal(
				e,
				errors.DB_ERR_NOT_EXISTS,
				"getting user which does not exist should throw a NOT_EXIST error",
			)
			errored = true
		}
		assert.equal(errored, true, "getting user which does not exist should throw an error")
		await testDB.close()
	})
})
