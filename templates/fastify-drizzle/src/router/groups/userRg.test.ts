import { _appFastify } from "../../app"
import { respWithData } from "../../common/router"
import { newTestDB } from "../../db/dbTestUtils"
import { newTestAppForRg } from "../rgTestUtils"
import UserRG from "./userRg"
import { UserHomeR } from "./userRg.schema"
import { faker } from "@faker-js/faker"
import assert from "node:assert/strict"
import test from "node:test"

test("userRg", async (t) => {
	await t.test("home, basic", async () => {
		const testDB = newTestDB()
		const userRg = UserRG({ appDB: testDB })
		const testApp = await newTestAppForRg(userRg)

		const name = faker.person.firstName()
		const resp = await testApp.inject({
			method: "GET",
			url: "/",
			query: { name },
		})

		const expectedResp: UserHomeR = respWithData({ hello: name })
		assert.deepEqual(JSON.parse(resp.body), expectedResp)

		await testDB.close()
	})
})
