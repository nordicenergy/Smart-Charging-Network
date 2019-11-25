import { Router } from "express";
import { OcpiResponse } from "ocn-bridge/dist/models/ocpi/common";
import { IOcpiBackendConfig } from "../../../models/ocpi";

export class VersionsController {

    public static getRoutes(config: IOcpiBackendConfig): Router {
        const router = Router()

        router.get("/ocpi/versions", async (_, res) => {
            res.send(OcpiResponse.withData([
                {
                    "version": "2.1.1",
                    "url": `${config.publicURL}/ocpi/versions/2.1.1`
                }
            ]))
        })

        router.get("/ocpi/versions/2.1.1", async (_, res) => {
            res.send(OcpiResponse.withData({
                version: "2.1.1",
                endpoints: [
                    {
                        identifier: "credentials",
                        url: `${config.publicURL}/ocpi/2.1.1/credentials`
                    }
                ]
            }))
        })

        return router
    }

}