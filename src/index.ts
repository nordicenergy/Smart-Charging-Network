import { startBridge } from "ocn-bridge"
import { ocnBridgeConfig } from "./config/ocn"
import { startOcpiApi } from "./api/ocpi/ocpi"
import { backendConfig } from "./config/backend"

const main = async () => {
    await startBridge(ocnBridgeConfig)
    await startOcpiApi(backendConfig)
    console.log(`OCN Bridge reachable at ${ocnBridgeConfig.publicBridgeURL}/`)
    console.log(`OCPI 2.1.1 reachable at ${backendConfig.publicURL}/backend`)
}

main()
