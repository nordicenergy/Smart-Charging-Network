import "mocha"
import { assert } from "chai"
import { BridgeDB } from "../src/bridge-db"

describe("Bridge Database", () => {

    let db: BridgeDB

    beforeEach(() => {
        db = new BridgeDB()
    })

    it("should get token B", async () => {
        const token = await db.getTokenB()
        assert.equal(token, "token-b")
    })

})
