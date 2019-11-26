import { ILocation, IEvse, IConnector } from "ocn-bridge/dist/models/ocpi/locations"
import { Forwarder } from "./forwarder"
import { Location, Connector } from "../../models/translators/location"

export class Locations extends Forwarder {

    public sender = {

        getList: async (): Promise<ILocation[]> => {
            const endpoint = await this.backendDb.getEndpoint("locations", "SENDER")
            const result = await this.makeOcpiRequest("GET", endpoint)
            const locations = result.map((location: any) => new Location(location, this.country_code, this.party_id))
            return locations
        },

        getObject: async (id: string): Promise<ILocation> => {
            const endpoint = await this.backendDb.getEndpoint("locations", "SENDER")
            const result = await this.makeOcpiRequest("GET", `${endpoint}/${id}`)
            const location = new Location(result, this.country_code, this.party_id)
            return location
        },

        getEvse: async (locationId: string, evseUid: string): Promise<IEvse> => {
            const endpoint = await this.backendDb.getEndpoint("locations", "SENDER")
            const result = await this.makeOcpiRequest("GET", `${endpoint}/${locationId}/${evseUid}`)
            result.connectors.map((connector: any) => new Connector(connector))
            return result
        },

        getConnector: async (locationId: string, evseUid: string, connectorId: string): Promise<IConnector> => {
            const endpoint = await this.backendDb.getEndpoint("locations", "SENDER")
            const result = await this.makeOcpiRequest("GET", `${endpoint}/${locationId}/${evseUid}/${connectorId}`)
            const connector = new Connector(result)
            return connector
        }

    }

}
