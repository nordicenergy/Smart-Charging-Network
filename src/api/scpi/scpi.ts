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
import express from "express"
import * as bodyParser from "body-parser"
import morgan from "morgan"
import { Server } from "http"

import { VersionsController } from "./controllers/versions.controller"
import { IScpiBackendConfig } from "../../models/scpi"
import { isAuthorized } from "./middleware/middleware"
import { CommandsController } from "./controllers/commands.controller"

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(morgan("dev"))

export const startScpiApi = async (config: IScpiBackendConfig): Promise<Server> => {
    app.use(
        "/backend",
        isAuthorized(config.pluggableDB),
        VersionsController.getRoutes(config),
        CommandsController.getRoutes(config.events)
    )
    return new Promise((resolve, _) => {
        const server = app.listen(3001, () => resolve(server))
    })
}

export const stopScpiApi = async (server: Server): Promise<void> => {
    return new Promise((resolve, _) => {
        server.close(() => resolve())
    })
}
