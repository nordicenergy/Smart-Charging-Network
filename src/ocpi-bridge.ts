import { IPluggableAPI, IPluggableDB } from "ocn-bridge";
import { Locations } from "./api/ocn/locations";

export class OcpiBridge implements IPluggableAPI {
    public locations: Locations

    constructor(backendDb: IPluggableDB, country_code: string, party_id: string) {
        this.locations = new Locations(backendDb, country_code, party_id)
    }
}