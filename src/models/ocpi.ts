import { IPluggableDB } from "ocn-bridge"
import { IBusinessDetails } from "ocn-bridge/dist/models/ocpi/common"

export interface IOcpiBackendConfig {
    registration: {
        versionsURL: string
        tokenA: string
    }
    publicURL: string
    party_id: string
    country_code: string
    business_details: IBusinessDetails
    pluggableDB: IPluggableDB
}

export interface IResponse<T> {
    status_code: number
    status_message?: string
    data?: T
}

export class OcpiResponse implements IResponse<any> {

    public static basicSuccess(): OcpiResponse {
        return new OcpiResponse({status_code: 1000})
    }

    public static withData(data: any): OcpiResponse {
        return new OcpiResponse({status_code: 1000, data})
    }

    public static withMessage(status_code: number, status_message: string): OcpiResponse {
        return new OcpiResponse({status_code, status_message})
    }

    public status_code: number
    public status_message?: string
    public data?: any
    public timestamp: Date

    constructor(options: IResponse<any>) {
        this.status_code = options.status_code
        this.status_message = options.status_message
        this.data = options.data
        this.timestamp = new Date()

    }

}