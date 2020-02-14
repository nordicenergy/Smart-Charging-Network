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
import { ISession, ICdrToken, authMethod, IChargingPeriod, IPrice, sessionStatus } from "ocn-bridge/dist/models/ocpi/session";

export class Session implements ISession {

    public country_code: string
    public party_id: string
    public id: string
    public start_date_time: string
    public end_date_time?: string
    public kwh: number
    public cdr_token: ICdrToken
    public auth_method: authMethod
    public authorization_reference?: string
    public location_id: string
    public evse_uid: string
    public connector_id: string
    public meter_id?: string
    public currency: string
    public charging_periods?: IChargingPeriod[]
    public total_cost?: IPrice
    public status: sessionStatus
    public last_updated: string

    constructor(input: any, country_code: string, party_id: string) {
        this.country_code = country_code
        this.party_id = party_id
        this.id = input.id
        this.start_date_time = input.start_datetime
        this.end_date_time = input.end_datetime
        this.kwh = input.kwh
        this.cdr_token = {
            uid: "",
            type: input.auth_method === "RFID" ? "RFID" : "APP_USER",
            contract_id: input.auth_id
        }
        this.auth_method = input.auth_method
        this.location_id = input.location.id
        this.evse_uid = input.location.evses[0].uid
        this.connector_id = input.location.evses[0].connectors[0].id
        this.meter_id = input.meter_id
        this.currency = input.currency
        if (input.charging_periods) {
            // FLAT CdrDimension type doesn't exist in 2.2
            this.charging_periods = input.charging_periods.map((period: any) => period.dimensions.filter((dimension: any) => dimension.type !== "FLAT"))
        }
        this.total_cost = {
            excl_vat: input.total_cost,
            incl_vat: input.total_cost
        }
        this.status = input.status
        this.last_updated = input.last_updated
    }

}