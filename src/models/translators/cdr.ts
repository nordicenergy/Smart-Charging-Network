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
import { IChargeDetailRecord, ICdrLocation, ISignedData } from "scn-bridge/dist/models/scpi/cdrs"
import { ICdrToken, authMethod, IChargingPeriod, IPrice } from "scn-bridge/dist/models/scpi/session"
import { ITariff } from "scn-bridge/dist/models/scpi/tariffs"
import { Tariff } from "./tariffs"

export class Cdr implements IChargeDetailRecord {

    public country_code: string
    public party_id: string
    public id: string
    public start_date_time: string
    public end_date_time: string
    public session_id?: string
    public cdr_token: ICdrToken
    public auth_method: authMethod
    public authorization_reference?: string
    public cdr_location: ICdrLocation
    public meter_id?: string
    public currency: string
    public tariffs?: ITariff[]
    public charging_periods: IChargingPeriod[]
    public signed_data?: ISignedData
    public total_cost: IPrice
    public total_fixed_cost?: IPrice
    public total_energy: number
    public total_energy_cost?: IPrice
    public total_time: number
    public total_time_cost?: IPrice
    public total_parking_time?: number
    public total_parking_cost?: IPrice
    public total_reservation_cost?: IPrice
    public remark?: string
    public invoice_reference_id?: string
    public credit?: boolean
    public credit_reference_id?: string
    public last_updated: string

    constructor(input: any, country_code: string, party_id: string) {
        this.country_code = country_code
        this.party_id = party_id
        this.id = input.id
        this.start_date_time = input.start_date_time
        this.end_date_time = input.stop_date_time
        this.cdr_token = {
            uid: "",
            type: input.auth_method === "RFID" ? "RFID" : "APP_USER",
            contract_id: input.auth_id
        }
        this.auth_method = input.auth_method
        this.cdr_location = {
            id: input.location.id,
            name: input.location.name,
            address: input.location.address,
            city: input.location.city,
            postal_code: input.location.postal_code,
            country: input.location.country,
            coordinates: input.location.coordinates,
            evse_uid: input.location.evses[0].uid,
            evse_id: input.location.evses[0].evse_id,
            connector_id: input.location.evses[0].connector[0].id,
            connector_format: input.location.evses[0].connector[0].format,
            connector_standard: input.location.evses[0].connector[0].standard,
            connector_power_type: input.location.evses[0].connector[0].power_type
        }
        this.currency = input.currency
        this.tariffs = input.tariffs.map((tariff: any) => new Tariff(tariff, country_code, party_id))
        this.charging_periods = input.charging_periods.map((period: any) => period.dimensions.filter((dimension: any) => dimension.type !== "FLAT"))
        this.total_cost = {
            excl_vat: input.total_cost,
            incl_vat: input.total_cost
        }
        this.total_energy = input.total_energy
        this.total_time = input.total_time
        this.total_parking_time = input.total_parking_time
        this.remark = input.remark
        this.last_updated = input.last_updated
    }

}
