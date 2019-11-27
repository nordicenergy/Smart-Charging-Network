import { Router } from "express";
import { OcpiResponse } from "ocn-bridge/dist/models/ocpi/common";
import { EventEmitter } from "events";

export class CommandsController {
    public static getRoutes(events: EventEmitter): Router {
        const router = Router()

        router.post("/ocpi/2.1.1/commands/:command/:uid", async (req, res) => {
            events.emit(`${req.params.command}/${req.params.uid}`, req.body)
            res.send(OcpiResponse.basicSuccess())
        })

        return router
    }
}