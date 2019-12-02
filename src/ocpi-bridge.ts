import { IPluggableAPI, IPluggableDB } from "ocn-bridge";
import { Locations } from "./api/ocn/locations";
import { EventEmitter } from "events";
import { Tariffs } from "./api/ocn/tariffs";

export class OcpiBridge implements IPluggableAPI {
    public locations: Locations
    public tariffs: Tariffs

    constructor(
        backendDb: IPluggableDB,
        country_code: string,
        party_id: string,
        publicIP: string,
        events: EventEmitter
    ) {
        this.locations = new Locations(backendDb, country_code, party_id, publicIP, events)
        this.tariffs = new Tariffs(backendDb, country_code, party_id, publicIP, events)
    }
}