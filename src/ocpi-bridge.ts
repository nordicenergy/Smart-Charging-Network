import { IPluggableAPI, IPluggableDB } from "ocn-bridge";
import { Locations } from "./api/ocn/locations";
import { EventEmitter } from "events";
import { Tariffs } from "./api/ocn/tariffs";
import { Sessions } from "./api/ocn/sessions";
import { Cdrs } from "./api/ocn/cdrs";
import { IFeatures } from "./models/ocpi";

export class OcpiBridge implements IPluggableAPI {
    public locations: Locations
    public tariffs: Tariffs
    public sessions: Sessions
    public cdrs: Cdrs

    constructor(
        backendDb: IPluggableDB,
        country_code: string,
        party_id: string,
        publicIP: string,
        events: EventEmitter,
        features: IFeatures
    ) {
        this.locations = new Locations(backendDb, country_code, party_id, publicIP, events, features)
        this.tariffs = new Tariffs(backendDb, country_code, party_id, publicIP, events, features)
        this.sessions = new Sessions(backendDb, country_code, party_id, publicIP, events, features)
        this.cdrs = new Cdrs(backendDb, country_code, party_id, publicIP, events, features)
    }
}
