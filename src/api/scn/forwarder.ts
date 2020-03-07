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
import fetch from "node-fetch"
import { IPluggableDB } from "scn-bridge"
import { EventEmitter } from "events"

export class Forwarder {

    constructor(
        public backendDb: IPluggableDB,
        public country_code: string,
        public party_id: string,
        public publicIP: string,
        public events: EventEmitter) {
    }

    public async makeScpiRequest(method: string, url: string, body?: any): Promise<any> {
        const options: any = {
            method,
            headers: {
                "Authorization": `Token ${await this.backendDb.getTokenC()}`,
            }
        }
        if (body) {
            options.headers["Content-Type"] = "application/json"
            options.body = JSON.stringify(body)
        }
        const result = await fetch(url, options)
        if (!result.ok) {
            throw Error(`HTTP request ${method} ${url} failed: ${result.status} ${await result.text()}`)
        }
        const scpiResult = await result.json()
        if (scpiResult.status_code !== 1000) {
            throw Error(`SCPI request ${method} ${url} failed: ${scpiResult.status_code} ${scpiResult.status_message}`)
        }
        return scpiResult.data
    }

}
