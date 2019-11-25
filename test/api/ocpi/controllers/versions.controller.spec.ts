import "mocha"
import { assert } from "chai"
import request from "supertest"
import { Server } from "http"
import { startOcpiApi, stopOcpiApi } from "../../../../src/api/ocpi/ocpi"

describe("OCPI 2.1.1 versions controller", () => {

    let server: Server

    beforeEach(async () => {
        server = await startOcpiApi()
    })

    afterEach(async () => {
        await stopOcpiApi(server)
    })

    it("get versions", (done) => {
        request(server)
            .get("/ocpi/versions")
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                assert.equal(res.body.status_code, 1000)
                assert.equal(res.body.data[0].version, "2.1.1")
                assert.equal(res.body.data[0].url, "http://localhost:3001/ocpi/versions/2.1.1")
                done()
            })
    })

    it("get 2.1.1", (done) => {
        request(server)
            .get("/ocpi/versions/2.1.1")
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                assert.equal(res.body.status_code, 1000)
                assert.equal(res.body.data.version, "2.1.1")
                assert.deepEqual(res.body.data.endpoints, [
                    {
                        identifier: "credentials",
                        url: "http://localhost:3001/ocpi/2.1.1/credentials"
                    }
                ])
                done()
            })
    })

})