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
import { ILocation, IGeoLocation, IEvse, IHours, IAdditionalGeoLocation, IEnergyMix, IConnector, connectorStandard, connectorFormat, connectorPowerType } from "ocn-bridge/dist/models/ocpi/locations"
import { IBusinessDetails, IDisplayText, IImage } from "ocn-bridge/dist/models/ocpi/common"

export class Location implements ILocation {

    public country_code: string
    public party_id: string
    public id: string
    public publish: boolean
    public name?: string
    public address: string
    public city: string
    public postal_code: string
    public country: string
    public coordinates: IGeoLocation
    public related_locations?: IAdditionalGeoLocation[]
    public evses: IEvse[]
    public directions?: IDisplayText[]
    public operator?: IBusinessDetails
    public suboperator?: IBusinessDetails
    public owner?: IBusinessDetails
    public facilities?: string[]
    public time_zone?: string
    public opening_times?: IHours
    public charging_when_closed?: boolean
    public images?: IImage[]
    public energy_mix?: IEnergyMix
    public last_updated: string

    constructor(input: any, country_code: string, party_id: string) {
        this.country_code = country_code
        this.party_id = party_id
        this.id = input.id
        this.publish = true
        this.name = input.name
        this.address = input.address
        this.city = input.city
        this.postal_code = input.postal_code
        this.country = input.country
        this.coordinates = input.coordinates
        this.related_locations = input.related_locations
        this.evses = input.evses.map((evse: any) => {
            evse.connectors = evse.connectors.map((connector: any) => new Connector(connector))
            return evse
        })
        this.directions = input.directions
        this.operator = input.operator
        this.suboperator = input.suboperator
        this.owner = input.owner
        this.facilities = input.facilities
        this.time_zone = input.time_zone
        this.opening_times = input.opening_times
        this.charging_when_closed = input.charging_when_closed
        this.images = input.images
        this.energy_mix = input.energy_mix
        this.last_updated = input.last_updated
    }

}

export class Connector implements IConnector {
    public id: string
    public standard: connectorStandard
    public format: connectorFormat
    public power_type: connectorPowerType
    public max_voltage: number
    public max_amperage: number
    public tariff_ids?: string[]
    public terms_and_conditions?: string
    public last_updated: string

    constructor(input: any) {
        this.id = input.id
        this.standard = input.standard
        this.format = input.format
        this.power_type = input.power_type
        this.max_voltage = input.voltage
        this.max_amperage = input.amperage
        this.tariff_ids = input.tariff_id ? [input.tariff_id] : undefined
        this.terms_and_conditions = input.terms_and_conditions
        this.last_updated = input.last_updated
    }
}