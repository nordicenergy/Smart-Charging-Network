import { Forwarder } from "./forwarder";
import { ISession } from "ocn-bridge/dist/models/ocpi/session";
import { Session } from "../../models/translators/session";
import { IPaginationParams } from "ocn-bridge/dist/models/ocpi/common";

export class Sessions extends Forwarder {

    public sender = {

        getList: async (params: IPaginationParams): Promise<ISession[]> => {
            let endpoint = await this.backendDb.getEndpoint("sessions", "SENDER")
            endpoint += `?date_from=${params.date_from}`
            const result = await this.makeOcpiRequest("GET", endpoint)
            if (!result) {
                return []
            }
            return result.map((session: any) => new Session(session, this.country_code, this.party_id))
        }

    }

}
