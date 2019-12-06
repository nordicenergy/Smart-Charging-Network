import { IPluggableAPI, IPluggableDB } from "ocn-bridge";
import { Locations } from "./api/ocn/locations";
import { EventEmitter } from "events";
import { Tariffs } from "./api/ocn/tariffs";
import { Sessions } from "./api/ocn/sessions";
import { Cdrs } from "./api/ocn/cdrs";
import { Commands } from "./api/ocn/commands";

export class OcpiBridge implements IPluggableAPI {
    public locations: Locations
    public tariffs: Tariffs
    public sessions: Sessions
    public cdrs: Cdrs
    public commands: Commands

    constructor(
        backendDb: IPluggableDB,
        country_code: string,
        party_id: string,
        publicIP: string,
        events: EventEmitter
    ) {
        this.locations = new Locations(backendDb, country_code, party_id, publicIP, events)
        this.tariffs = new Tariffs(backendDb, country_code, party_id, publicIP, events)
        this.sessions = new Sessions(backendDb, country_code, party_id, publicIP, events)
        this.cdrs = new Cdrs(backendDb, country_code, party_id, publicIP, events)
        this.commands = new Commands(backendDb, country_code, party_id, publicIP, events)
    }
}
