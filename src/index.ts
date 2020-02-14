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
import { startBridge } from "ocn-bridge"
import { ocnBridgeConfig } from "./config/config"
import { startOcpiApi } from "./api/ocpi/ocpi"
import { backendConfig } from "./config/config"

const main = async () => {
    await startBridge(ocnBridgeConfig)
    await startOcpiApi(backendConfig)
    console.log(`OCN Bridge reachable at ${ocnBridgeConfig.publicBridgeURL}/`)
    console.log(`OCPI 2.1.1 reachable at ${backendConfig.publicURL}/backend`)
}

main()
