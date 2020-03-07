import "mocha"
import { assert } from "chai"
import request from "supertest"
import { Server } from "http"
import { startScpiApi, stopScpiApi } from "../../../../src/api/scpi/scpi"
import { backendTestConfig } from "../../../config/backend"

describe("SCPI 2.1.1 versions controller", () => {

    let server: Server

    beforeEach(async () => {
        server = await startScpiApi(backendTestConfig)
    })

    afterEach(async () => {
        await stopScpiApi(server)
    })

    it("get versions", (done) => {
        request(server)
            .get("/backend/scpi/versions")
            .set("Authorization", "Token token-b")
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                assert.equal(res.body.status_code, 1000)
                assert.equal(res.body.data[0].version, "2.1.1")
                assert.equal(res.body.data[0].url, "http://localhost:3001/backend/scpi/versions/2.1.1")
                done()
            })
    })

    it("get 2.1.1", (done) => {
        request(server)
            .get("/backend/scpi/versions/2.1.1")
            .set("Authorization", "Token token-b")
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                assert.equal(res.body.status_code, 1000)
                assert.equal(res.body.data.version, "2.1.1")
                assert.deepEqual(res.body.data.endpoints, [
                    {
                        identifier: "credentials",
                        url: "http://localhost:3001/backend/scpi/2.1.1/credentials"
                    }
                ])
                done()
            })
    })

})
