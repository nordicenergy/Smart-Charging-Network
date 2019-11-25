import { IBridgeConfigurationOptions, DefaultRegistry } from "ocn-bridge"
import { ModuleImplementation } from "ocn-bridge/dist/models/bridgeConfigurationOptions"
import { OcpiBridge } from "../ocpi-bridge"
import { BridgeDB } from "../bridge-db"

export const config: IBridgeConfigurationOptions = {

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
    pluggableRegistry: new DefaultRegistry("http://localhost:8544", "")
}
