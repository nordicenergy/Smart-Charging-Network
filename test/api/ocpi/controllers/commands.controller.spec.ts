import "mocha"
import { assert } from "chai"
import request from "supertest"
import { Server } from "http"
import { startOcpiApi, stopOcpiApi } from "../../../../src/api/ocpi/ocpi"
import { backendTestConfig } from "../../../config/backend"

describe("OCPI 2.1.1 commands controller", () => {

    let server: Server

    beforeEach(async () => {
        server = await startOcpiApi(backendTestConfig)
    })

    afterEach(async () => {
        await stopOcpiApi(server)
    })

    it("post async command result", (done) => {

        backendTestConfig.events.once("START_SESSION/123", (result) => {
            assert.equal(result, "ACCEPTED")
            done()
        })

        request(server)
            .post("/backend/ocpi/2.1.1/commands/START_SESSION/123")
            .set("Authorization", "Token token-b")
            .set("Content-Type", "text/plain")
            .send("ACCEPTED")
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                assert.equal(res.body.status_code, 1000)
            })
    })

})