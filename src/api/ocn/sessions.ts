import { Forwarder } from "./forwarder";
import { ISession } from "ocn-bridge/dist/models/ocpi/session";
import { Session } from "../../models/translators/session";

export class Sessions extends Forwarder {

    public sender = {

        getList: async (): Promise<ISession[]> => {
            const endpoint = await this.backendDb.getEndpoint("sessions", "SENDER")
            const result = await this.makeOcpiRequest("GET", endpoint)
            return result.map((session: any) => new Session(session, this.country_code, this.party_id))
        }

    }

}
