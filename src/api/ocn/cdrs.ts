import { Forwarder } from "./forwarder";
import { IChargeDetailRecord } from "ocn-bridge/dist/models/ocpi/cdrs";
import { Cdr } from "../../models/translators/cdr";

export class Cdrs extends Forwarder {

    public sender = {

        getList: async (): Promise<IChargeDetailRecord[]> => {
            const endpoint = await this.backendDb.getEndpoint("cdrs", "SENDER")
            const result = await this.makeOcpiRequest("GET", endpoint)
            return result.map((cdr: any) => new Cdr(cdr, this.country_code, this.party_id))
        }

    }

}
