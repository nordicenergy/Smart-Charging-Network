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
    ocnClientURL: "http://localhost:8080",
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
        receiver: [],
        sender: ["locations", "tariffs", "sessions", "cdrs"]
    },
    pluggableAPI: new OcpiBridge(backendConfig.pluggableDB, "NL", "ABC", backendConfig.publicURL, events),
    pluggableDB: new OcnDB(),
    pluggableRegistry: new DefaultRegistry("http://localhost:8544", "0x345ca3e014aaf5dca488057592ee47305d9b3e10"),
    logger: true,
    dryRun: false
}
