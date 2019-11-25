import express from "express"
import * as bodyParser from "body-parser"
import { Server } from "http"

import { ocpiConfig } from "../../config/ocpi"
import { VersionsController } from "./controllers/versions.controller"

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(VersionsController.getRoutes(ocpiConfig))

export const startOcpiApi = async (): Promise<Server> => {
    return new Promise((resolve, _) => {
        const server = app.listen(3001, () => resolve(server))
    })
}

export const stopOcpiApi = async (server: Server): Promise<void> => {
    return new Promise((resolve, _) => {
        server.close(() => resolve())
    })
}
