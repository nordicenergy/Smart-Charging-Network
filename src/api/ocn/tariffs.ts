/*
    Copyright 2019-2020 eMobilify GmbH

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
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