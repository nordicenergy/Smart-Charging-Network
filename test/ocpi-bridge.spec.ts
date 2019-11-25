import "mocha"
import { assert } from "chai"
import { OcpiBridge } from "../src/ocpi-bridge"

describe("OCPI Bridge API", () => {

    let bridge: OcpiBridge

    beforeEach(() => {
        bridge = new OcpiBridge()
    })

    it("should not implement any OCPI modules", () => {
        assert.isEmpty(Object.getOwnPropertyNames(bridge))
    })

})