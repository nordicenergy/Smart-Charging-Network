/*
    Copyright 2019-2020 eMobilify GmbH

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
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
                    "url": `${config.publicURL}/backend/ocpi/versions/2.1.1`
                }
            ]))
        })

        router.get("/ocpi/versions/2.1.1", async (_, res) => {
            res.send(OcpiResponse.withData({
                version: "2.1.1",
                endpoints: [
                    {
                        identifier: "credentials",
                        url: `${config.publicURL}/backend/ocpi/2.1.1/credentials`
                    }
                ]
            }))
        })

        return router
    }

}