/*
    Copyright 2020 Smart Charging Solutions

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
import { IChargeDetailRecord } from "scn-bridge/dist/models/scpi/cdrs";
import { Cdr } from "../../models/translators/cdr";

export class Cdrs extends Forwarder {

    public sender = {

        getList: async (): Promise<IChargeDetailRecord[]> => {
            try {
                const endpoint = await this.backendDb.getEndpoint("cdrs", "SENDER")
                const result = await this.makeScpiRequest("GET", endpoint)
                return result.map((cdr: any) => new Cdr(cdr, this.country_code, this.party_id))
            } catch (err) {
                return []
            }
        }

    }

}
