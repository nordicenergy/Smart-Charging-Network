import { IPluggableAPI, IPluggableDB } from "ocn-bridge";
import { Locations } from "./api/ocn/locations";
import { EventEmitter } from "events";

export class OcpiBridge implements IPluggableAPI {
    public locations: Locations

    constructor(
        backendDb: IPluggableDB,
        country_code: string,
        party_id: string,
        publicIP: string,
        events: EventEmitter
    ) {
        this.locations = new Locations(backendDb, country_code, party_id, publicIP, events)
    }
}