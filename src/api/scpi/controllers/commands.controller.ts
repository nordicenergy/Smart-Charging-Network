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
import { EventEmitter } from "events";

export class CommandsController {
    public static getRoutes(events: EventEmitter): Router {
        const router = Router()

        router.post("/scpi/2.1.1/commands/:command/:uid", async (req, res) => {
            events.emit(`${req.params.command}/${req.params.uid}`, req.body)
            res.send(ScpiResponse.basicSuccess())
        })

        return router
    }
}
