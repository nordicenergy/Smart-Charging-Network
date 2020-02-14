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
import { IBridgeConfigurationOptions, DefaultRegistry } from "ocn-bridge"
import { ModuleImplementation } from "ocn-bridge/dist/models/bridgeConfigurationOptions"
import { OcpiBridge } from "../ocpi-bridge"
import { OcnDB } from "../models/database/ocn-db"
import { IOcpiBackendConfig } from "../models/ocpi";
import { BackendDB } from "../models/database/backend-db";
import { EventEmitter } from "events";

const events = new EventEmitter()

export const backendConfig: IOcpiBackendConfig = {
    registration: {
        versionsURL: "https://qa.backoffice.net/ocpi/versions",
        tokenA: "1234567890"
    },
    publicURL: "http://localhost:3001",
    party_id: "ABC",
    country_code: "DE",
    business_details: {
        name: "OCN Bridge run by someone"
    },
    pluggableDB: new BackendDB(),
    events
}

export const ocnBridgeConfig: IBridgeConfigurationOptions = {
    publicBridgeURL: "http://localhost:3000",
    port: 3000,
    ocnNodeURL: "http://localhost:8080",
    roles: [
        {
            country_code: "NL",
            party_id: "ABC",
            role: "CPO",
            business_details: {
                name: "some business name"
            }
        }
    ],
    modules: {
        implementation: ModuleImplementation.CUSTOM,
        receiver: ["commands"],
        sender: ["locations", "tariffs", "sessions", "cdrs"]
    },
    pluggableAPI: new OcpiBridge(backendConfig.pluggableDB, "NL", "ABC", backendConfig.publicURL, events),
    pluggableDB: new OcnDB(),
    pluggableRegistry: new DefaultRegistry("http://localhost:8544", "0x345ca3e014aaf5dca488057592ee47305d9b3e10"),
    logger: true,
    dryRun: false
}
