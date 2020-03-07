/*
    Copyright 2020 Smart Charging Solutions

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
import { ScpiResponse } from "scn-bridge/dist/models/scpi/common";
import { IScpiBackendConfig } from "../../../models/scpi";

export class VersionsController {

    public static getRoutes(config: IScpiBackendConfig): Router {
        const router = Router()

        router.get("/scpi/versions", async (_, res) => {
            res.send(ScpiResponse.withData([
                {
                    "version": "2.1.1",
                    "url": `${config.publicURL}/backend/scpi/versions/2.1.1`
                }
            ]))
        })

        router.get("/scpi/versions/2.1.1", async (_, res) => {
            res.send(ScpiResponse.withData({
                version: "2.1.1",
                endpoints: [
                    {
                        identifier: "credentials",
                        url: `${config.publicURL}/backend/scpi/2.1.1/credentials`
                    }
                ]
            }))
        })

        return router
    }

}
