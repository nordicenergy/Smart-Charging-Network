import { IBridgeConfigurationOptions, DefaultRegistry } from "ocn-bridge"
import { ModuleImplementation } from "ocn-bridge/dist/models/bridgeConfigurationOptions"
import { OcpiBridge } from "../ocpi-bridge"
import { OcnDB } from "../models/database/ocn-db"
import { backendConfig } from "./backend"

export const ocnBridgeConfig: IBridgeConfigurationOptions = {
    publicBridgeURL: "http://localhost:3000",
    port: 3000,
    ocnClientURL: "http://localhost:8080",
    roles: [
        {
            country_code: "NL",
            party_id: "ELD",
            role: "CPO",
            business_details: {
                name: "Elaad (DRIIVZ backend)"
            }
        }
    ],
    modules: {
        implementation: ModuleImplementation.CUSTOM,
        receiver: [],
        sender: []
    },
    pluggableAPI: new OcpiBridge(backendConfig.pluggableDB, "NL", "ELD"),
    pluggableDB: new OcnDB(),
    pluggableRegistry: new DefaultRegistry("http://localhost:8544", "0x345ca3e014aaf5dca488057592ee47305d9b3e10"),
    dryRun: true
}
