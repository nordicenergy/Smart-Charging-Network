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
import { IPluggableDB } from "ocn-bridge"
import { IBusinessDetails } from "ocn-bridge/dist/models/ocpi/common"
import { EventEmitter } from "events"

export interface IOcpiBackendConfig {
    registration: {
        versionsURL: string
        tokenA: string
    }
    publicURL: string
    party_id: string
    country_code: string
    business_details: IBusinessDetails
    pluggableDB: IPluggableDB,
    events: EventEmitter
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
