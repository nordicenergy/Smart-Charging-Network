import { ILocation, IGeoLocation, IEvse, IHours, IAdditionalGeoLocation, IEnergyMix, IConnector, connectorStandard, connectorFormat, connectorPowerType } from "ocn-bridge/dist/models/ocpi/locations"
import { IBusinessDetails, IDisplayText, IImage } from "ocn-bridge/dist/models/ocpi/common"

export class Location implements ILocation {

    public country_code: string
    public party_id: string
    public id: string
    public type: "ON_STREET" | "PARKING_GARAGE" | "UNDERGROUND_GARAGE" | "PARKING_LOT" | "OTHER" | "UNKNOWN"
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

    constructor(country_code: string, party_id: string, input: any) {
        this.country_code = country_code
        this.party_id = party_id
        this.id = input.id
        this.type = input.type
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
        this.operator = this.owner = {
            name: "Innogy eMobility Solutions GmbH"
        }
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
    public tariff_ids: string[]
    public terms_and_conditions?: string
    public last_updated: string

    constructor(input: any) {
        this.id = input.id
        this.standard = input.standard
        this.format = input.format
        this.power_type = input.power_type
        this.max_voltage = input.voltage
        this.max_amperage = input.amperage
        this.tariff_ids = [input.tariff_id]
        this.terms_and_conditions = input.terms_and_conditions
        this.last_updated = input.last_updated
    }
}