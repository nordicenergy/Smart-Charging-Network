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
import { IBridgeConfigurationOptions, DefaultRegistry } from "scn-bridge"
import { ModuleImplementation } from "scn-bridge/dist/models/bridgeConfigurationOptions"
import { ScniBridge } from "../scni-bridge"
import { ScnDB } from "../models/database/scn-db"
import { IScpiBackendConfig } from "../models/scpi";
import { BackendDB } from "../models/database/backend-db";
import { EventEmitter } from "events";

const events = new EventEmitter()

export const backendConfig: IScpiBackendConfig = {
    registration: {
        versionsURL: "https://smartcharging.solutions/scpi/versions",
        tokenA: "1234567890"
    },
    publicURL: "https://smartcharging.solutions/bridge-frontend/",
    party_id: "ABC",
    country_code: "FI",
    business_details: {
        name: "SCN Bridge run by someone"
    },
    pluggableDB: new BackendDB(),
    events
}

export const scnBridgeConfig: IBridgeConfigurationOptions = {
    publicBridgeURL: "http://localhost:3000",
    port: 3000,
    scnNodeURL: "http://localhost:8080",
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
    pluggableAPI: new ScniBridge(backendConfig.pluggableDB, "NL", "ABC", backendConfig.publicURL, events),
    pluggableDB: new ScnDB(),
    pluggableRegistry: new DefaultRegistry("http://localhost:8544", "0x5Cba9EA604Ca760177f4B6F5E2B34414930e3402"),
    logger: true,
    dryRun: false
}
