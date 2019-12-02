import { Forwarder } from "./forwarder";
import { ITariff } from "ocn-bridge/dist/models/ocpi/tariffs";
import { Tariff } from "../../models/translators/tariffs";

export class Tariffs extends Forwarder {

    public receiver = {

        getList: async (): Promise<ITariff[]> => {
            const endpoint = await this.backendDb.getEndpoint("tariffs", "RECEIVER")
            const result = await this.makeOcpiRequest("GET", endpoint)
            return result.map((tariff: any) => new Tariff(tariff, this.country_code, this.party_id))
        }

    }

}