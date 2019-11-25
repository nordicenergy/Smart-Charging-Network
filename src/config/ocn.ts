import { IBridgeConfigurationOptions, DefaultRegistry } from "ocn-bridge"
import { ModuleImplementation } from "ocn-bridge/dist/models/bridgeConfigurationOptions"
import { OcpiBridge } from "../ocpi-bridge"
import { BridgeDB } from "../models/database/bridge-db"

export const ocnBridgeConfig: IBridgeConfigurationOptions = {
    publicBridgeURL: "http://localhost:3000",
    port: 3000,
    ocnClientURL: "http://localhost:8080",
    roles: [
        {
            country_code: "NL",
            party_id: "NKL",
            role: "CPO",
            business_details: {
                name: "NKL (DRIIVZ)"
            }
        }
    ],
    modules: {
        implementation: ModuleImplementation.CUSTOM,
        receiver: []
    },
    pluggableAPI: new OcpiBridge(),
    pluggableDB: new BridgeDB(),
    pluggableRegistry: new DefaultRegistry("http://localhost:8544", "0x345ca3e014aaf5dca488057592ee47305d9b3e10")
}
