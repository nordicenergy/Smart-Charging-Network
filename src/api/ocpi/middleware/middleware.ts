import { NextFunction, Request, Response } from "express"
import { OcpiResponse } from "../../../models/ocpi"
import { IPluggableDB } from "ocn-bridge"

export const isAuthorized = (backendDB: IPluggableDB) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const storedToken = await backendDB.getTokenB()
        if (req.headers.authorization !== `Token ${storedToken}`) {
            return res.status(401).send(OcpiResponse.withMessage(4001, "Unauthorized"))
        }
        return next()
    }
}
