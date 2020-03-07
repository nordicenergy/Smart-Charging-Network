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
import { ILocation, IEvse, IConnector } from "scn-bridge/dist/models/scpi/locations"
import { Forwarder } from "./forwarder"
import { Location, Connector } from "../../models/translators/location"

export class Locations extends Forwarder {

    public sender = {

        getList: async (): Promise<ILocation[]> => {
            try {
                const endpoint = await this.backendDb.getEndpoint("locations", "SENDER")
                const result = await this.makeScpiRequest("GET", endpoint)
                const locations = result.map((location: any) => new Location(location, this.country_code, this.party_id))
                return locations
            } catch (err) {
                return []
            }
        },

        getObject: async (id: string): Promise<ILocation> => {
            const endpoint = await this.backendDb.getEndpoint("locations", "SENDER")
            const result = await this.makeScpiRequest("GET", `${endpoint}/${id}`)
            const location = new Location(result, this.country_code, this.party_id)
            return location
        },

        getEvse: async (locationId: string, evseUid: string): Promise<IEvse> => {
            const endpoint = await this.backendDb.getEndpoint("locations", "SENDER")
            const result = await this.makeScpiRequest("GET", `${endpoint}/${locationId}/${evseUid}`)
            result.connectors.map((connector: any) => new Connector(connector))
            return result
        },

        getConnector: async (locationId: string, evseUid: string, connectorId: string): Promise<IConnector> => {
            const endpoint = await this.backendDb.getEndpoint("locations", "SENDER")
            const result = await this.makeScpiRequest("GET", `${endpoint}/${locationId}/${evseUid}/${connectorId}`)
            const connector = new Connector(result)
            return connector
        }

    }

}
