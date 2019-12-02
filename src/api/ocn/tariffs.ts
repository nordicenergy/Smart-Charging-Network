import { Forwarder } from "./forwarder";
import { ITariff } from "ocn-bridge/dist/models/ocpi/tariffs";
import { Tariff } from "../../models/translators/tariffs";

export class Tariffs extends Forwarder {

    public sender = {

        getList: async (): Promise<ITariff[]> => {
            try {
                const endpoint = await this.backendDb.getEndpoint("tariffs", "SENDER")
                const result = await this.makeOcpiRequest("GET", endpoint)
                return result.map((tariff: any) => new Tariff(tariff, this.country_code, this.party_id))
            } catch (err) {
                return []
            }
        }

    }

}