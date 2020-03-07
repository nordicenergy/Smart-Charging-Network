import "mocha"
import { assert } from "chai"
import request from "supertest"
import { Server } from "http"
import { startScpiApi, stopScpiApi } from "../../../../src/api/scpi/scpi"
import { backendTestConfig } from "../../../config/backend"

describe("SCPI 2.1.1 commands controller", () => {

    let server: Server

    beforeEach(async () => {
        server = await startScpiApi(backendTestConfig)
    })

    afterEach(async () => {
        await stopScpiApi(server)
    })

    it("post async command result", (done) => {

        backendTestConfig.events.once("START_SESSION/123", (result) => {
            assert.equal(result, "ACCEPTED")
            done()
        })

        request(server)
            .post("/backend/scpi/2.1.1/commands/START_SESSION/123")
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
